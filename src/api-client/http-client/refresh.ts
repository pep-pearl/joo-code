import {
  ApiError,
  isApiErrorResponse,
  isRefreshSessionExpiredCode,
  isRefreshUserBlockedCode,
} from "../api-error";
import {
  clearStoredTokens,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./storage";
import type { ResolvedApiClientConfig } from "./types";
import {
  createApiError,
  createUrl,
  isSamePath,
  parseResponseBody,
} from "./utils";

/**
 * refresh token이 필요한지 확인
 * @param options 인증 여부, API 경로, HTTP 상태 코드, 파싱된 응답 바디, API 클라이언트 설정
 * @returns refresh token이 필요한지 여부
 */
export const shouldRefreshAccessToken = ({
  auth,
  path,
  status,
  parsedBody,
  config,
}: {
  auth: boolean;
  path: string;
  status: number;
  parsedBody: unknown;
  config: ResolvedApiClientConfig;
}) => {
  if (!auth || status !== 401 || isSamePath(path, config.refreshPath)) {
    return false;
  }

  if (!isApiErrorResponse(parsedBody)) {
    return false;
  }

  return config.refreshableErrorCodes.includes(parsedBody.error.code);
};

/**
 * refresh token이 만료되었는지 확인
 * @param error 에러 객체
 * @returns refresh token이 만료되었는지 여부
 */
export const isRefreshAuthExpiredError = (
  error: unknown,
): error is ApiError => {
  return (
    error instanceof ApiError &&
    error.status === 401 &&
    isRefreshSessionExpiredCode(error.code)
  );
};

/**
 * refresh token이 비활성화되었는지 확인
 * @param error 에러 객체
 * @returns refresh token이 비활성화되었는지 여부
 */
export const isRefreshUserBlockedError = (
  error: unknown,
): error is ApiError => {
  return (
    error instanceof ApiError &&
    error.status === 403 &&
    isRefreshUserBlockedCode(error.code)
  );
};

/**
 * refresh token을 쿠키로 전달해야 하는지 확인
 * @param config API 클라이언트 설정
 * @returns refresh token을 쿠키로 전달해야 하는지 여부
 */
export const shouldSendRefreshCookie = (config: ResolvedApiClientConfig) => {
  return config.refreshTokenTransport === "cookie";
};

/**
 * refresh token을 body로 전달해야 하는지 확인
 * @param config API 클라이언트 설정
 * @returns refresh token을 body로 전달해야 하는지 여부
 */
export const createRefreshRequestBody = (config: ResolvedApiClientConfig) => {
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
 * refresh token 갱신을 요청한 경우,
 * 2개 이상의 요청이 발생하는 것을 막는 변수
 */
const refreshFlights = new Map<string, Promise<void>>();

const createRefreshFlightKey = (
  apiBaseUrl: string,
  config: ResolvedApiClientConfig,
) => {
  return JSON.stringify({
    accessTokenKey: config.accessTokenKey,
    authMode: config.authMode,
    refreshTokenKey: config.refreshTokenKey,
    refreshTokenTransport: config.refreshTokenTransport,
    url: createUrl(apiBaseUrl, config.refreshPath),
  });
};

/**
 * access token 갱신
 * @param apiBaseUrl API 기본 URL
 * @param config API 클라이언트 설정
 * @returns Promise<void>
 */
export const refreshAccessToken = async (
  apiBaseUrl: string,
  config: ResolvedApiClientConfig,
) => {
  const flightKey = createRefreshFlightKey(apiBaseUrl, config);
  const pendingRefresh = refreshFlights.get(flightKey);

  if (pendingRefresh) {
    return pendingRefresh;
  }

  const refreshFlight = (async () => {
    const body = createRefreshRequestBody(config);

    const response = await config.fetcher(createUrl(apiBaseUrl, config.refreshPath), {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body,
      credentials: shouldSendRefreshCookie(config) ? "include" : "omit",
    });

    const parsedBody = await parseResponseBody(response);

    if (!response.ok) {
      throw createApiError({
        status: response.status,
          fallbackMessage: `토큰 갱신에 실패했습니다. (${response.status})`,
        parsedBody,
      });
    }

      /**
       * production cookie mode:
       * - BE가 Set-Cookie로 access/refresh를 갱신한다면 FE가 저장할 토큰이 없다.
       *
       * development localStorage mode:
       * - BE refresh 응답 data.access_token / data.refresh_token을 storage에 반영한다.
       */
    if (config.authMode === "localStorage") {
      const tokens = config.getRefreshTokens(parsedBody);

      if (!tokens.accessToken) {
        throw new ApiError({
          status: 500,
          code: "MISSING_ACCESS_TOKEN",
            message: "refresh 응답에 access_token이 없습니다.",
          body: parsedBody,
        });
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
  })().finally(() => {
    if (refreshFlights.get(flightKey) === refreshFlight) {
      refreshFlights.delete(flightKey);
    }
  });

  refreshFlights.set(flightKey, refreshFlight);

  return refreshFlight;
};

/**
 * refresh token 갱신 실패 처리
 * @param error 에러 객체
 * @param config API 클라이언트 설정
 */
export const handleRefreshFailure = (
  error: unknown,
  config: ResolvedApiClientConfig,
) => {
  if (isRefreshAuthExpiredError(error)) {
    clearStoredTokens(config);
    config.onAuthExpired?.(error);
    return;
  }

  if (isRefreshUserBlockedError(error)) {
    clearStoredTokens(config);
    config.onUserBlocked?.(error);
  }
};
