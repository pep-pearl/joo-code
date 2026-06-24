import { ApiError } from "../api-error";
import type { ApiMeta, ApiResponse } from "../types";

/**
 * 쿼리 파라미터
 */
export type QueryParamValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | null
  | undefined;
export type QueryParams = Record<string, QueryParamValue>;

/**
 * 인증 방식
 * - cookie: production 권장. HttpOnly/Secure cookie 기반 인증.
 * - localStorage: development 편의용. Authorization Bearer 헤더 기반 인증.
 */
export type AuthMode = "cookie" | "localStorage";

/**
 * refresh token 전달 방식
 * - cookie: refresh token이 HttpOnly cookie에 있고 credentials include로 전달
 * - body: refresh token을 storage에서 꺼내 body.refresh_token으로 전달
 * - none: refresh 요청에 별도 refresh token을 싣지 않음
 */
export type RefreshTokenTransport = "cookie" | "body" | "none";

export type TokenStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

export type ApiClientFetch = typeof fetch;

export type AuthTokenPayload<TUser = unknown> = {
  access_expires_at?: string;
  access_token?: string;
  refresh_expires_at?: string;
  refresh_token?: string;
  token_type?: string;
  user?: TUser;
};

export type RefreshResponse<
  TTokenPayload = AuthTokenPayload,
  TMeta = ApiMeta,
> = ApiResponse<TTokenPayload, TMeta>;

export type RefreshTokenResult = {
  accessToken?: string;
  refreshToken?: string;
};

export type ApiClientErrorPhase = "request" | "refresh";

/**
 * HTTP 응답을 애플리케이션 에러로 변환할 때 전달되는 정보.
 * 커스텀 Error를 사용하려면 createError를 주입한다.
 */
export type ApiClientErrorContext<TParsedBody = unknown> = {
  phase: ApiClientErrorPhase;
  status: number;
  fallbackMessage: string;
  code?: string;
  parsedBody: TParsedBody;
  response?: Response;
  method: string;
  path: string;
  url: string;
};

export type ApiClientErrorFactory<TError extends Error = ApiError> = (
  context: ApiClientErrorContext,
) => TError;

/**
 * access token refresh 여부를 외부 정책으로 결정하기 위한 컨텍스트.
 */
export type ApiClientShouldRefreshContext<TParsedBody = unknown> = {
  auth: boolean;
  status: number;
  parsedBody: TParsedBody;
  response: Response;
  method: string;
  path: string;
  refreshPath: string;
};

export type ApiClientShouldRefresh = (
  context: ApiClientShouldRefreshContext,
) => boolean;

export type ApiClientRequestErrorContext = {
  apiBaseUrl: string;
  method: string;
  path: string;
  url: string;
};

export type ApiClientRefreshFailureContext = {
  apiBaseUrl: string;
  method: "POST";
  path: string;
  url: string;
  /** 현재 클라이언트의 access/refresh token을 제거한다. */
  clearTokens: () => void;
};

export type ApiClientErrorCallback<
  TError extends Error,
  TContext,
> = (error: TError | Error, context: TContext) => void | Promise<void>;

/**
 * API 클라이언트 설정
 */
export type ApiClientConfig<TError extends Error = ApiError> = {
  /**
   * 각 일반 HTTP 요청 시도의 타임아웃 (ms).
   * refresh 대기 시간은 포함하지 않으며, refresh 후 재시도에는 새 타이머가 적용된다.
   * @default 10000
   */
  timeout?: number;
  /**
   * 실제 refresh HTTP 요청의 타임아웃 (ms).
   * @default timeout
   */
  refreshTimeout?: number;
  /**
   * 공유 refresh HTTP 요청 자체를 취소할 수 있는 클라이언트 수명주기 signal.
   * 개별 요청의 signal은 다른 대기자에게 영향을 주지 않도록 refresh 자체에는 연결하지 않는다.
   */
  refreshSignal?: AbortSignal;
  /**
   * 인증 방식
   * @default "cookie"
   */
  authMode?: AuthMode;
  /**
   * Access Token Key
   * @default "access_token"
   */
  accessTokenKey?: string;
  /**
   * Refresh Token Key
   * @default "refresh_token"
   */
  refreshTokenKey?: string;
  /**
   * Access token 갱신 경로
   * @default "/v1/auth/refresh"
   */
  refreshPath?: string;
  /**
   * refresh token 전달 방식
   * @default authMode가 "cookie"면 "cookie", "localStorage"면 "body"
   */
  refreshTokenTransport?: RefreshTokenTransport;
  /**
   * localStorage mode에서 access token을 읽고 쓰는 storage.
   * 기본값은 브라우저 window.localStorage이며, 서버/테스트/headless 환경에서는 주입해서 사용한다.
   */
  tokenStorage?: TokenStorage;
  /**
   * fetch 구현체. 기본값은 globalThis.fetch.
   */
  fetcher?: ApiClientFetch;
  /**
   * refresh token을 body로 보낼 때 사용할 필드명.
   * @default "refresh_token"
   */
  refreshRequestTokenKey?: string;
  /**
   * refresh 응답에서 token payload를 찾을 wrapper 필드명.
   * null이면 응답 body 자체를 token payload로 본다.
   * @default "data"
   */
  refreshResponseDataKey?: string | null;
  /**
   * refresh 응답 token payload 안의 access token 필드명.
   * @default "access_token"
   */
  accessTokenResponseKey?: string;
  /**
   * refresh 응답 token payload 안의 refresh token 필드명.
   * @default "refresh_token"
   */
  refreshTokenResponseKey?: string;
  /**
   * refresh 응답 구조가 기본 field mapping으로 표현되지 않을 때 사용하는 token extractor.
   */
  getRefreshTokens?: (body: unknown) => RefreshTokenResult;
  /**
   * 기본 refresh 정책에서 refresh 대상으로 볼 에러 코드.
   * shouldRefresh를 주입하면 이 값 대신 주입된 정책이 사용된다.
   */
  refreshableErrorCodes?: readonly string[];
  /**
   * HTTP 오류 응답을 커스텀 Error로 변환한다.
   * 커스텀 TError를 사용할 때 함께 주입하는 것을 권장한다.
   */
  createError?: ApiClientErrorFactory<TError>;
  /**
   * refresh 여부를 결정하는 외부 정책. 미지정 시 401 + refreshableErrorCodes를 사용한다.
   */
  shouldRefresh?: ApiClientShouldRefresh;
  /**
   * 각 논리 요청이 최종 실패했을 때 한 번 호출된다.
   * 같은 refresh 실패를 기다린 요청이 여러 개면 요청 수만큼 호출될 수 있다.
   */
  onRequestError?: ApiClientErrorCallback<
    TError,
    ApiClientRequestErrorContext
  >;
  /**
   * 공유 refresh flight가 최종 실패했을 때 flight당 정확히 한 번 호출된다.
   * 토큰 제거가 필요하면 context.clearTokens()를 명시적으로 호출할 수 있다.
   */
  onRefreshFailure?: ApiClientErrorCallback<
    TError,
    ApiClientRefreshFailureContext
  >;
  /**
   * API 클라이언트 생성 직후 refresh를 먼저 시도할지 여부.
   * @default true
   */
  refreshOnStart?: boolean;
  /**
   * @deprecated 범용 구현에서는 onRefreshFailure를 사용한다.
   * refresh token invalid/expired/reused일 때 호출한다.
   */
  onAuthExpired?: (error: ApiError) => void;
  /**
   * @deprecated 범용 구현에서는 onRefreshFailure를 사용한다.
   * USER_NOT_APPROVED / USER_INACTIVE일 때 호출한다.
   */
  onUserBlocked?: (error: ApiError) => void;
};

export type ResolvedApiClientConfig<TError extends Error = ApiError> = {
  timeout: number;
  refreshTimeout: number;
  refreshSignal?: AbortSignal;
  authMode: AuthMode;
  accessTokenKey: string;
  refreshTokenKey: string;
  refreshPath: string;
  refreshTokenTransport: RefreshTokenTransport;
  tokenStorage?: TokenStorage;
  fetcher: ApiClientFetch;
  refreshRequestTokenKey: string;
  refreshResponseDataKey: string | null;
  accessTokenResponseKey: string;
  refreshTokenResponseKey: string;
  getRefreshTokens: (body: unknown) => RefreshTokenResult;
  refreshableErrorCodes: readonly string[];
  createError: ApiClientErrorFactory<TError>;
  shouldRefresh: ApiClientShouldRefresh;
  onRequestError?: ApiClientErrorCallback<
    TError,
    ApiClientRequestErrorContext
  >;
  onRefreshFailure?: ApiClientErrorCallback<
    TError,
    ApiClientRefreshFailureContext
  >;
  refreshOnStart: boolean;
  onAuthExpired?: (error: ApiError) => void;
  onUserBlocked?: (error: ApiError) => void;
};

/**
 * API 클라이언트 옵션
 */
export type ApiClientOptions<TBody = unknown> = Omit<RequestInit, "body"> & {
  body?: TBody;
  params?: QueryParams;
  /** 각 HTTP 시도에 적용되는 타임아웃. */
  timeout?: number;
  auth?: boolean;
};

/**
 * 수동 refresh 호출자의 대기 제어 옵션.
 * signal/timeout은 공유 refresh HTTP 요청 자체를 취소하지 않고 현재 호출자의 대기만 취소한다.
 */
export type ApiClientRefreshOptions = {
  signal?: AbortSignal;
  timeout?: number;
};

/**
 * API 클라이언트 타입
 */
export type ApiClient = {
  /**
   * Access token refresh를 직접 실행한다.
   */
  refresh: (options?: ApiClientRefreshOptions) => Promise<void>;

  get: <TResponse>(
    path: string,
    options?: ApiClientOptions<unknown>,
  ) => Promise<TResponse>;

  post: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiClientOptions<TBody>,
  ) => Promise<TResponse>;

  put: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiClientOptions<TBody>,
  ) => Promise<TResponse>;

  patch: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiClientOptions<TBody>,
  ) => Promise<TResponse>;

  delete: <TResponse>(
    path: string,
    options?: ApiClientOptions,
  ) => Promise<TResponse>;
};
