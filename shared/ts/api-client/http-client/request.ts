/*
 * @ai-purpose 공통 request 실행, config resolve, timeout, auth header, token refresh retry를 담당한다.
 * @ai-entry false
 * @ai-domain api, auth, shared
 * @ai-depends ../api-error, ./refresh, ./storage, ./types, ./utils
 * @ai-used-by createApiClient
 * @ai-keywords request, resolveApiClientConfig, refreshableErrorCodes, timeout, credentials
 */

import { DEFAULT_REFRESHABLE_ERROR_CODES } from "../api-error";
import {
  shouldRefreshAccessToken,
  refreshAccessToken,
  handleRefreshFailure,
} from "./refresh";
import {
  DEFAULT_ACCESS_TOKEN_KEY,
  DEFAULT_REFRESH_TOKEN_KEY,
} from "./storage";
import type {
  ApiClientConfig,
  ApiClientOptions,
  ResolvedApiClientConfig,
} from "./types";
import {
  createApiError,
  createHeaders,
  createRequestBody,
  createUrl,
  parseResponseBody,
} from "./utils";

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

/**
 * API 클라이언트 설정 resolve
 * @param config API 클라이언트 설정
 * @returns resolve된 API 클라이언트 설정
 */
export const resolveApiClientConfig = (
  config: ApiClientConfig,
): ResolvedApiClientConfig => {
  const authMode = config.authMode ?? "cookie";

  return {
    timeout: config.timeout ?? 10_000,
    authMode,
    accessTokenKey: config.accessTokenKey ?? DEFAULT_ACCESS_TOKEN_KEY,
    refreshTokenKey: config.refreshTokenKey ?? DEFAULT_REFRESH_TOKEN_KEY,
    refreshPath: config.refreshPath ?? "/auth/refresh",
    refreshTokenTransport:
      config.refreshTokenTransport ??
      (authMode === "cookie" ? "cookie" : "body"),
    tokenStorage: config.tokenStorage,
    fetcher: config.fetcher ?? getGlobalFetch(),
    refreshRequestTokenKey: config.refreshRequestTokenKey ?? "refresh_token",
    refreshResponseDataKey: config.refreshResponseDataKey ?? "data",
    accessTokenResponseKey: config.accessTokenResponseKey ?? "access_token",
    refreshTokenResponseKey: config.refreshTokenResponseKey ?? "refresh_token",
    getRefreshTokens:
      config.getRefreshTokens ??
      ((body) =>
        getRefreshTokens(body, {
          accessTokenResponseKey:
            config.accessTokenResponseKey ?? "access_token",
          refreshResponseDataKey: config.refreshResponseDataKey ?? "data",
          refreshTokenResponseKey:
            config.refreshTokenResponseKey ?? "refresh_token",
        })),
    refreshableErrorCodes:
      config.refreshableErrorCodes ?? DEFAULT_REFRESHABLE_ERROR_CODES,
    onAuthExpired: config.onAuthExpired,
    onUserBlocked: config.onUserBlocked,
  };
};

/**
 * API 요청
 * @param apiBaseUrl API 기본 URL
 * @param path API 경로
 * @param options API 클라이언트 옵션
 * @returns API 응답
 */
export const request = async <TResponse, TBody = unknown>(
  apiBaseUrl: string,
  path: string,
  options: ApiClientOptions<TBody> = {},
  config: ResolvedApiClientConfig,
): Promise<TResponse> => {
  const {
    body,
    params,
    timeout = config.timeout,
    headers,
    auth = true,
    signal,
    ...init
  } = options;

  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), timeout);

  const abortByOuterSignal = () => controller.abort();
  signal?.addEventListener("abort", abortByOuterSignal);

  const executeFetch = () =>
    config.fetcher(createUrl(apiBaseUrl, path, params), {
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
      signal: controller.signal,
      /**
       * production: Secure HttpOnly Cookie 인증
       * development: localStorage Bearer 인증
       */
      credentials: auth && config.authMode === "cookie" ? "include" : "omit",
    });

  try {
    let response = await executeFetch();
    let parsedBody = await parseResponseBody(response);

    if (
      shouldRefreshAccessToken({
        auth,
        path,
        status: response.status,
        parsedBody,
        config,
      })
    ) {
      try {
        await refreshAccessToken(apiBaseUrl, config);

        response = await executeFetch();
        parsedBody = await parseResponseBody(response);
      } catch (error) {
        handleRefreshFailure(error, config);
        throw error;
      }
    }

    if (!response.ok) {
      throw createApiError({
        status: response.status,
        fallbackMessage: `API 요청에 실패했습니다. (${response.status})`,
        parsedBody,
      });
    }

    return parsedBody as TResponse;
  } finally {
    globalThis.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortByOuterSignal);
  }
};
