import { ApiError } from "../api-error";
import { refreshAccessToken } from "./refresh";
import { request, resolveApiClientConfig } from "./request";
import { getAccessToken, getRefreshToken } from "./storage";
import type {
  ApiClient,
  ApiClientConfig,
  ApiClientOptions,
  ApiClientRefreshOptions,
  ResolvedApiClientConfig,
} from "./types";
import { createUrl, isSamePath, toError, waitForPromise } from "./utils";

type BodyMethod = "POST" | "PUT" | "PATCH";

const shouldRunInitialRefresh = <TError extends Error>(
  config: ResolvedApiClientConfig<TError>,
) => {
  if (config.refreshTokenTransport === "body") {
    const accessToken = getAccessToken(
      config.accessTokenKey,
      config.tokenStorage,
    );
    const refreshToken = getRefreshToken(
      config.refreshTokenKey,
      config.tokenStorage,
    );

    return !accessToken && !!refreshToken;
  }

  return !!getAccessToken(config.accessTokenKey, config.tokenStorage);
};

export const createApiClient = <TError extends Error = ApiError>(
  apiBaseUrl: string,
  config: ApiClientConfig<TError> = {},
): ApiClient => {
  const resolvedConfig = resolveApiClientConfig(config);
  const refresh = (options?: ApiClientRefreshOptions) =>
    refreshAccessToken(apiBaseUrl, resolvedConfig, options);
  const initialRefreshPromise =
    resolvedConfig.refreshOnStart && shouldRunInitialRefresh(resolvedConfig)
      ? refresh().catch(() => undefined)
      : null;

  const waitForInitialRefresh = async (
    path: string,
    options?: ApiClientOptions,
  ) => {
    const auth = options?.auth ?? true;

    if (
      !initialRefreshPromise ||
      !auth ||
      isSamePath(path, resolvedConfig.refreshPath)
    ) {
      return;
    }

    await waitForPromise(initialRefreshPromise, { signal: options?.signal });
  };

  const requestWithInitialRefresh = async <TResponse, TBody = unknown>(
    path: string,
    options: ApiClientOptions<TBody>,
  ) => {
    const method = options.method ?? "GET";
    const url = createUrl(apiBaseUrl, path, options.params);

    try {
      await waitForInitialRefresh(path, options as ApiClientOptions);
      return await request<TResponse, TBody, TError>(
        apiBaseUrl,
        path,
        options,
        resolvedConfig,
      );
    } catch (error) {
      if (resolvedConfig.onRequestError) {
        await resolvedConfig.onRequestError(toError(error), {
          apiBaseUrl,
          method,
          path,
          url,
        });
      }
      throw error;
    }
  };

  const requestBodyMethod =
    (method: BodyMethod) =>
    <TResponse, TBody = unknown>(
      path: string,
      body?: TBody,
      options?: ApiClientOptions<TBody>,
    ) =>
      requestWithInitialRefresh<TResponse, TBody>(path, {
        ...options,
        method,
        body,
      });

  return {
    refresh,
    get: <TResponse>(path: string, options?: ApiClientOptions) =>
      requestWithInitialRefresh<TResponse>(path, {
        ...options,
        method: "GET",
      }),
    post: requestBodyMethod("POST"),
    put: requestBodyMethod("PUT"),
    patch: requestBodyMethod("PATCH"),
    delete: <TResponse>(path: string, options?: ApiClientOptions) =>
      requestWithInitialRefresh<TResponse>(path, {
        ...options,
        method: "DELETE",
      }),
  };
};
