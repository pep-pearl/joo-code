import {
  ApiError,
  DEFAULT_REFRESHABLE_ERROR_CODES,
  isApiErrorResponse,
} from "../api-error";
import { refreshAccessToken, shouldRefreshAccessToken } from "./refresh";
import {
  DEFAULT_ACCESS_TOKEN_KEY,
  DEFAULT_REFRESH_TOKEN_KEY,
  getAccessToken,
} from "./storage";
import type {
  ApiClientConfig,
  ApiClientOptions,
  ResolvedApiClientConfig,
} from "./types";
import {
  createAbortScope,
  createDefaultApiError,
  createHeaders,
  createRequestBody,
  createUrl,
  isSamePath,
  parseResponseBody,
} from "./utils";

type RequestRuntime<TBody, TError extends Error> = {
  apiBaseUrl: string;
  path: string;
  options: ApiClientOptions<TBody>;
  config: ResolvedApiClientConfig<TError>;
};

const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_REFRESH_PATH = "/v1/auth/refresh";
const DEFAULT_REFRESH_REQUEST_TOKEN_KEY = "refresh_token";
const DEFAULT_REFRESH_RESPONSE_DATA_KEY = "data";
const DEFAULT_ACCESS_TOKEN_RESPONSE_KEY = "access_token";
const DEFAULT_REFRESH_TOKEN_RESPONSE_KEY = "refresh_token";

const getGlobalFetch = () => {
  if (typeof globalThis.fetch !== "function") {
    throw new Error("ApiClient requires a fetch implementation.");
  }

  return globalThis.fetch.bind(globalThis);
};

const getRefreshTokens = (
  body: unknown,
  config: Pick<
    ResolvedApiClientConfig,
    | "accessTokenResponseKey"
    | "refreshResponseDataKey"
    | "refreshTokenResponseKey"
  >,
) => {
  const container =
    config.refreshResponseDataKey === null
      ? body
      : (body as Record<string, unknown> | null | undefined)?.[
          config.refreshResponseDataKey
        ];

  if (!container || typeof container !== "object") {
    return {};
  }

  const record = container as Record<string, unknown>;
  const accessToken = record[config.accessTokenResponseKey];
  const refreshToken = record[config.refreshTokenResponseKey];

  return {
    accessToken: typeof accessToken === "string" ? accessToken : undefined,
    refreshToken: typeof refreshToken === "string" ? refreshToken : undefined,
  };
};

const getRefreshTokenTransport = <TError extends Error>(
  config: ApiClientConfig<TError>,
  authMode: ResolvedApiClientConfig["authMode"],
) =>
  config.refreshTokenTransport ?? (authMode === "cookie" ? "cookie" : "body");

const createDefaultRefreshTokensGetter = <TError extends Error>(
  config: ApiClientConfig<TError>,
) => {
  const accessTokenResponseKey =
    config.accessTokenResponseKey ?? DEFAULT_ACCESS_TOKEN_RESPONSE_KEY;
  const refreshResponseDataKey =
    config.refreshResponseDataKey === undefined
      ? DEFAULT_REFRESH_RESPONSE_DATA_KEY
      : config.refreshResponseDataKey;
  const refreshTokenResponseKey =
    config.refreshTokenResponseKey ?? DEFAULT_REFRESH_TOKEN_RESPONSE_KEY;

  return (body: unknown) =>
    getRefreshTokens(body, {
      accessTokenResponseKey,
      refreshResponseDataKey,
      refreshTokenResponseKey,
    });
};

const createDefaultShouldRefresh = (refreshableErrorCodes: readonly string[]) =>
  ({
    auth,
    status,
    path,
    refreshPath,
    parsedBody,
  }: Parameters<ResolvedApiClientConfig["shouldRefresh"]>[0]) => {
    if (!auth || status !== 401 || isSamePath(path, refreshPath)) {
      return false;
    }

    if (!isApiErrorResponse(parsedBody)) {
      return false;
    }

    return refreshableErrorCodes.includes(parsedBody.error.code);
  };

export const resolveApiClientConfig = <TError extends Error = ApiError>(
  config: ApiClientConfig<TError>,
): ResolvedApiClientConfig<TError> => {
  const timeout = config.timeout ?? DEFAULT_TIMEOUT;
  const authMode = config.authMode ?? "cookie";
  const refreshableErrorCodes =
    config.refreshableErrorCodes ?? DEFAULT_REFRESHABLE_ERROR_CODES;

  return {
    timeout,
    refreshTimeout: config.refreshTimeout ?? timeout,
    refreshSignal: config.refreshSignal,
    authMode,
    accessTokenKey: config.accessTokenKey ?? DEFAULT_ACCESS_TOKEN_KEY,
    refreshTokenKey: config.refreshTokenKey ?? DEFAULT_REFRESH_TOKEN_KEY,
    refreshPath: config.refreshPath ?? DEFAULT_REFRESH_PATH,
    refreshTokenTransport: getRefreshTokenTransport(config, authMode),
    tokenStorage: config.tokenStorage,
    fetcher: config.fetcher ?? getGlobalFetch(),
    refreshRequestTokenKey:
      config.refreshRequestTokenKey ?? DEFAULT_REFRESH_REQUEST_TOKEN_KEY,
    refreshResponseDataKey:
      config.refreshResponseDataKey === undefined
        ? DEFAULT_REFRESH_RESPONSE_DATA_KEY
        : config.refreshResponseDataKey,
    accessTokenResponseKey:
      config.accessTokenResponseKey ?? DEFAULT_ACCESS_TOKEN_RESPONSE_KEY,
    refreshTokenResponseKey:
      config.refreshTokenResponseKey ?? DEFAULT_REFRESH_TOKEN_RESPONSE_KEY,
    getRefreshTokens:
      config.getRefreshTokens ?? createDefaultRefreshTokensGetter(config),
    refreshableErrorCodes,
    createError:
      config.createError ??
      (createDefaultApiError as unknown as ResolvedApiClientConfig<TError>["createError"]),
    shouldRefresh:
      config.shouldRefresh ?? createDefaultShouldRefresh(refreshableErrorCodes),
    onRequestError: config.onRequestError,
    onRefreshFailure: config.onRefreshFailure,
    refreshOnStart: config.refreshOnStart ?? true,
    onAuthExpired: config.onAuthExpired,
    onUserBlocked: config.onUserBlocked,
  };
};

const executeAttempt = async <TBody, TError extends Error>({
  apiBaseUrl,
  path,
  options,
  config,
}: RequestRuntime<TBody, TError>) => {
  const {
    body,
    params,
    headers,
    auth = true,
    timeout = config.timeout,
    signal,
    ...init
  } = options;
  const method = init.method ?? "GET";
  const url = createUrl(apiBaseUrl, path, params);

  if (
    auth &&
    config.authMode === "localStorage" &&
    !getAccessToken(config.accessTokenKey, config.tokenStorage)
  ) {
    throw config.createError({
      phase: "request",
      status: 401,
      code: "ACCESS_TOKEN_MISSING",
      fallbackMessage: "인증 토큰이 없어 요청을 보내지 않았습니다.",
      parsedBody: null,
      method,
      path,
      url,
    });
  }

  const abortScope = createAbortScope({
    signal,
    timeout,
    timeoutMessage: `${method} ${path} timed out after ${timeout}ms.`,
  });

  try {
    const response = await config.fetcher(url, {
      ...init,
      body: createRequestBody(body),
      headers: createHeaders({
        body,
        headers,
        auth,
        authMode: config.authMode,
        accessTokenKey: config.accessTokenKey,
        tokenStorage: config.tokenStorage,
      }),
      signal: abortScope.signal,
      credentials: auth && config.authMode === "cookie" ? "include" : "omit",
    });
    const parsedBody = await parseResponseBody(response);

    return { parsedBody, response };
  } finally {
    abortScope.cleanup();
  }
};

const fetchWithRefreshRetry = async <TBody, TError extends Error>(
  runtime: RequestRuntime<TBody, TError>,
) => {
  let result = await executeAttempt(runtime);
  const auth = runtime.options.auth ?? true;
  const method = runtime.options.method ?? "GET";

  if (
    shouldRefreshAccessToken({
      auth,
      path: runtime.path,
      method,
      response: result.response,
      parsedBody: result.parsedBody,
      config: runtime.config,
    })
  ) {
    await refreshAccessToken(runtime.apiBaseUrl, runtime.config, {
      signal: runtime.options.signal ?? undefined,
    });
    result = await executeAttempt(runtime);
  }

  return result;
};

export const request = async <
  TResponse,
  TBody = unknown,
  TError extends Error = ApiError,
>(
  apiBaseUrl: string,
  path: string,
  options: ApiClientOptions<TBody> = {},
  config: ResolvedApiClientConfig<TError>,
): Promise<TResponse> => {
  const method = options.method ?? "GET";
  const url = createUrl(apiBaseUrl, path, options.params);

  const { response, parsedBody } = await fetchWithRefreshRetry({
    apiBaseUrl,
    path,
    options,
    config,
  });

  if (!response.ok) {
    throw config.createError({
      phase: "request",
      status: response.status,
      fallbackMessage: `API request failed. (${response.status})`,
      parsedBody,
      response,
      method,
      path,
      url,
    });
  }

  return parsedBody as TResponse;
};
