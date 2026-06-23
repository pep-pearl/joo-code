import { getOrSetRefreshFlight } from "./refresh";
import { resolveApiClientConfig } from "./resolve-api-client-config";
import { createTimeoutAbortScope } from "./timeout-abort-scope";
import { ApiClientConfig, ApiRequestOptions, ParamsSerializer } from "./types";

const createUrl = ({
  baseUrl,
  path,
  params,
  paramsSerializer,
}: {
  baseUrl: string;
  path: string;
  params?: unknown;
  paramsSerializer?: ParamsSerializer;
}) => {
  const url = new URL(path, baseUrl);

  if (params && paramsSerializer) {
    const query = paramsSerializer(params);

    if (query) {
      url.search = query;
    }
  }

  return url.toString();
};

const parseResponseBody = async (response: Response) => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
};

export const createApiClient = <TError extends Error = Error>(
  config: ApiClientConfig<TError>,
) => {
  const resolvedConfig = resolveApiClientConfig(config);
  const fetcher = resolvedConfig.fetcher ?? fetch;

  const sendOnce = async (
    path: string,
    options: ApiRequestOptions = {
      method: "GET",
    },
  ) => {
    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    if (options.body !== undefined && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    if (options.auth !== false) {
      await config.auth?.applyAuth({ headers });
    }

    const url = createUrl({
      baseUrl: config.baseUrl,
      path,
      params: options.params,
      paramsSerializer: config.paramsSerializer,
    });

    const timeoutAbortScope = createTimeoutAbortScope({
      timeout:
        options.timeout !== undefined
          ? options.timeout
          : resolvedConfig.timeout,
      signal: options.signal,
      timeoutMessage: `${options.method ?? "GET"} ${path} timed out after ${options.timeout ?? resolvedConfig.timeout}ms.`,
    });

    try {
      const response = await fetcher(url, {
        method: options.method ?? "GET",
        headers,
        signal: timeoutAbortScope.signal,
        body:
          options.body === undefined
            ? undefined
            : options.body instanceof FormData
              ? options.body
              : JSON.stringify(options.body),
        credentials: "include",
      });

      const body = await parseResponseBody(response);

      return {
        response,
        body,
      };
    } finally {
      timeoutAbortScope.cleanup();
    }
  };

  const request = async <TResponse>(
    path: string,
    options: ApiRequestOptions = { method: "GET" },
  ): Promise<TResponse> => {
    let result = await sendOnce(path, options);

    const shouldRefresh =
      options.auth !== false &&
      config.refresh &&
      config.error.shouldRefresh?.({
        status: result.response.status,
        body: result.body,
        response: result.response,
      });

    if (shouldRefresh) {
      await getOrSetRefreshFlight(config);
      result = await sendOnce(path, options);
    }

    if (!result.response.ok) {
      throw config.error.createError({
        status: result.response.status,
        body: result.body,
        response: result.response,
      });
    }

    return result.body as TResponse;
  };

  return {
    request,

    get: <TResponse>(
      path: string,
      options?: Omit<ApiRequestOptions, "method">,
    ) =>
      request<TResponse>(path, {
        ...options,
        method: "GET",
      }),

    post: <TResponse, TBody = unknown>(
      path: string,
      body?: TBody,
      options?: Omit<ApiRequestOptions, "method" | "body">,
    ) =>
      request<TResponse>(path, {
        ...options,
        method: "POST",
        body,
      }),

    put: <TResponse, TBody = unknown>(
      path: string,
      body?: TBody,
      options?: Omit<ApiRequestOptions, "method" | "body">,
    ) =>
      request<TResponse>(path, {
        ...options,
        method: "PUT",
        body,
      }),

    patch: <TResponse, TBody = unknown>(
      path: string,
      body?: TBody,
      options?: Omit<ApiRequestOptions, "method" | "body">,
    ) =>
      request<TResponse>(path, {
        ...options,
        method: "PATCH",
        body,
      }),

    delete: <TResponse>(
      path: string,
      options?: Omit<ApiRequestOptions, "method">,
    ) =>
      request<TResponse>(path, {
        ...options,
        method: "DELETE",
      }),
  };
};
