import {
  ApiError,
  isRefreshUserBlockedCode,
} from "../api-error";
import {
  clearStoredTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./storage";
import type {
  ApiClientRefreshOptions,
  ResolvedApiClientConfig,
} from "./types";
import {
  createAbortError,
  createAbortScope,
  createUrl,
  isSamePath,
  parseResponseBody,
  toError,
  waitForPromise,
} from "./utils";

/**
 * refresh token이 필요한지 확인
 */
export const shouldRefreshAccessToken = <TError extends Error>({
  auth,
  path,
  method,
  response,
  parsedBody,
  config,
}: {
  auth: boolean;
  path: string;
  method: string;
  response: Response;
  parsedBody: unknown;
  config: ResolvedApiClientConfig<TError>;
}) => {
  if (!auth || isSamePath(path, config.refreshPath)) {
    return false;
  }

  return config.shouldRefresh({
    auth,
    status: response.status,
    parsedBody,
    response,
    method,
    path,
    refreshPath: config.refreshPath,
  });
};

export const isRefreshAuthExpiredError = (
  error: unknown,
): error is ApiError => {
  return error instanceof ApiError && error.status === 401;
};

export const isRefreshUserBlockedError = (
  error: unknown,
): error is ApiError => {
  return (
    error instanceof ApiError &&
    error.status === 403 &&
    isRefreshUserBlockedCode(error.code)
  );
};

export const shouldSendRefreshCookie = <TError extends Error>(
  config: ResolvedApiClientConfig<TError>,
) => {
  return config.refreshTokenTransport === "cookie";
};

export const createRefreshRequestBody = <TError extends Error>(
  config: ResolvedApiClientConfig<TError>,
) => {
  if (config.refreshTokenTransport !== "body") {
    return undefined;
  }

  const refreshToken = getRefreshToken(
    config.refreshTokenKey,
    config.tokenStorage,
  );

  if (!refreshToken) {
    return undefined;
  }

  return JSON.stringify({ [config.refreshRequestTokenKey]: refreshToken });
};

/**
 * resolved config 인스턴스별 refresh single-flight.
 * 서로 다른 클라이언트의 fetcher/handler가 섞이지 않도록 WeakMap으로 격리한다.
 */
const refreshFlights = new WeakMap<object, Promise<void>>();

const hasAuthSessionChanged = <TError extends Error>(
  config: ResolvedApiClientConfig<TError>,
  accessTokenBeforeRefresh: string | null,
  refreshTokenBeforeRefresh: string | null,
) => {
  return (
    config.authMode === "localStorage" &&
    (getAccessToken(config.accessTokenKey, config.tokenStorage) !==
      accessTokenBeforeRefresh ||
      getRefreshToken(config.refreshTokenKey, config.tokenStorage) !==
        refreshTokenBeforeRefresh)
  );
};

/**
 * refresh token 갱신 실패 처리.
 * refresh flight 내부에서만 호출되어 동시 요청 수와 무관하게 한 번 실행된다.
 */
export const handleRefreshFailure = async <TError extends Error>(
  error: unknown,
  apiBaseUrl: string,
  config: ResolvedApiClientConfig<TError>,
) => {
  const normalizedError = toError(error);
  const context = {
    apiBaseUrl,
    method: "POST" as const,
    path: config.refreshPath,
    url: createUrl(apiBaseUrl, config.refreshPath),
    clearTokens: () => clearStoredTokens(config),
  };

  if (config.onRefreshFailure) {
    await config.onRefreshFailure(normalizedError, context);
    return;
  }

  // 기존 프로젝트용 기본 정책. 범용 사용에서는 onRefreshFailure 주입을 권장한다.
  if (isRefreshAuthExpiredError(error)) {
    context.clearTokens();
    config.onAuthExpired?.(error);
    return;
  }

  if (isRefreshUserBlockedError(error)) {
    context.clearTokens();
    config.onUserBlocked?.(error);
  }
};

const runRefreshFlight = async <TError extends Error>(
  apiBaseUrl: string,
  config: ResolvedApiClientConfig<TError>,
) => {
  const accessTokenBeforeRefresh = getAccessToken(
    config.accessTokenKey,
    config.tokenStorage,
  );
  const refreshTokenBeforeRefresh = getRefreshToken(
    config.refreshTokenKey,
    config.tokenStorage,
  );
  const body = createRefreshRequestBody(config);
  const url = createUrl(apiBaseUrl, config.refreshPath);
  const abortScope = createAbortScope({
    signal: config.refreshSignal,
    timeout: config.refreshTimeout,
    timeoutMessage: `POST ${config.refreshPath} timed out after ${config.refreshTimeout}ms.`,
  });

  try {
    const response = await config.fetcher(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body,
      credentials: shouldSendRefreshCookie(config) ? "include" : "omit",
      signal: abortScope.signal,
    });
    const parsedBody = await parseResponseBody(response);

    if (!response.ok) {
      throw config.createError({
        phase: "refresh",
        status: response.status,
        fallbackMessage: `Token refresh failed. (${response.status})`,
        parsedBody,
        response,
        method: "POST",
        path: config.refreshPath,
        url,
      });
    }

    if (config.authMode === "localStorage") {
      const tokens = config.getRefreshTokens(parsedBody);

      if (!tokens.accessToken) {
        throw config.createError({
          phase: "refresh",
          status: 500,
          code: "MISSING_ACCESS_TOKEN",
          fallbackMessage: "refresh 응답에 access_token이 없습니다.",
          parsedBody,
          response,
          method: "POST",
          path: config.refreshPath,
          url,
        });
      }

      if (
        hasAuthSessionChanged(
          config,
          accessTokenBeforeRefresh,
          refreshTokenBeforeRefresh,
        )
      ) {
        return;
      }

      setAccessToken(
        config.accessTokenKey,
        tokens.accessToken,
        config.tokenStorage,
      );

      if (tokens.refreshToken) {
        setRefreshToken(
          config.refreshTokenKey,
          tokens.refreshToken,
          config.tokenStorage,
        );
      }
    }
  } catch (error) {
    if (
      !hasAuthSessionChanged(
        config,
        accessTokenBeforeRefresh,
        refreshTokenBeforeRefresh,
      )
    ) {
      await handleRefreshFailure(error, apiBaseUrl, config);
    }
    throw error;
  } finally {
    abortScope.cleanup();
  }
};

/**
 * access token 갱신.
 * options.signal/timeout은 공유 flight를 중단하지 않고 현재 호출자의 대기만 중단한다.
 */
export const refreshAccessToken = <TError extends Error>(
  apiBaseUrl: string,
  config: ResolvedApiClientConfig<TError>,
  options: ApiClientRefreshOptions = {},
): Promise<void> => {
  if (options.signal?.aborted) {
    return Promise.reject(options.signal.reason ?? createAbortError());
  }

  let refreshFlight = refreshFlights.get(config);

  if (!refreshFlight) {
    refreshFlight = runRefreshFlight(apiBaseUrl, config).finally(() => {
      if (refreshFlights.get(config) === refreshFlight) {
        refreshFlights.delete(config);
      }
    });
    refreshFlights.set(config, refreshFlight);
  }

  return waitForPromise(refreshFlight, {
    signal: options.signal,
    timeout: options.timeout,
    timeoutMessage: `Waiting for token refresh timed out after ${options.timeout}ms.`,
  });
};
