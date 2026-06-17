/*
 * @ai-purpose API client 설정, 요청 옵션, 응답 method contract 타입을 정의한다.
 * @ai-entry false
 * @ai-domain api, shared, types
 * @ai-depends ../api-error, ../types
 * @ai-used-by createApiClient, request, refresh, storage helpers
 * @ai-keywords ApiClientConfig, ApiClientOptions, AuthMode, RefreshTokenTransport, TokenStorage
 */

import { ApiError } from "../api-error";
import type { ApiResponse } from "../types";

/**
 * URL 쿼리 파라미터 값으로 사용할 수 있는 타입입니다.
 *
 * - 배열 값은 같은 key를 여러 번 append합니다.
 * - `null`과 `undefined`는 URL에 포함하지 않습니다.
 */
export type QueryParamValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | null
  | undefined;

/**
 * 요청 URL에 붙일 쿼리 파라미터 객체입니다.
 */
export type QueryParams = Record<string, QueryParamValue>;

/**
 * API 클라이언트가 요청에 인증 정보를 싣는 방식입니다.
 *
 * - `cookie`: production 권장 방식입니다. HttpOnly/Secure cookie를 `credentials: "include"`로 전달합니다.
 * - `localStorage`: development 편의용 방식입니다. 저장된 access token을 `Authorization: Bearer` 헤더로 전달합니다.
 */
export type AuthMode = "cookie" | "localStorage";

/**
 * access token refresh 요청에서 refresh token을 전달하는 방식입니다.
 *
 * - `cookie`: refresh token이 HttpOnly cookie에 있고 `credentials: "include"`로 전달합니다.
 * - `body`: `TokenStorage`에서 refresh token을 읽어 JSON body에 담습니다.
 * - `none`: refresh 요청에 별도 refresh token을 싣지 않습니다.
 */
export type RefreshTokenTransport = "cookie" | "body" | "none";

/**
 * access token과 refresh token을 읽고 쓰는 storage contract입니다.
 */
export type TokenStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

/**
 * API 클라이언트에 주입할 수 있는 fetch 구현체 타입입니다.
 */
export type ApiClientFetch = typeof fetch;

/**
 * 인증 API가 반환하는 token payload 구조입니다.
 *
 * @template TUser - token payload에 함께 포함될 사용자 정보 타입입니다.
 */
export type AuthTokenPayload<TUser = unknown> = {
  access_expires_at?: string;
  access_token?: string;
  refresh_expires_at?: string;
  refresh_token?: string;
  token_type?: string;
  user?: TUser;
};

/**
 * refresh API가 반환하는 기본 응답 타입입니다.
 */
export type RefreshResponse = ApiResponse<AuthTokenPayload>;

/**
 * refresh 응답에서 추출한 token 값입니다.
 */
export type RefreshTokenResult = {
  accessToken?: string;
  refreshToken?: string;
};

/**
 * API 클라이언트의 공통 동작을 제어하는 설정입니다.
 *
 * - 기본 인증 방식은 cookie mode입니다.
 * - localStorage mode에서는 `tokenStorage`를 주입하지 않으면 브라우저의 `window.localStorage`를 사용합니다.
 * - 서버/테스트/headless 환경에서는 `fetcher`와 `tokenStorage`를 명시적으로 주입할 수 있습니다.
 */
export type ApiClientConfig = {
  /**
   * 타임아웃 (ms)
   * @default 10000
   */
  timeout?: number;
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
   * @default "/auth/refresh"
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
   * 이 에러 코드일 때만 refresh를 시도한다.
   * ACCESS_KEY_MISSING / ACCESS_KEY_INVALID 같은 일반 401은 refresh하지 않는다.
   */
  refreshableErrorCodes?: readonly string[];
  /**
   * refresh token invalid/expired/reused일 때 호출한다.
   */
  onAuthExpired?: (error: ApiError) => void;
  /**
   * USER_NOT_APPROVED / USER_INACTIVE일 때 호출한다.
   */
  onUserBlocked?: (error: ApiError) => void;
};

export type ResolvedApiClientConfig = Required<
  Omit<
    ApiClientConfig,
    | "fetcher"
    | "getRefreshTokens"
    | "onAuthExpired"
    | "onUserBlocked"
    | "refreshableErrorCodes"
    | "refreshResponseDataKey"
    | "tokenStorage"
  >
> & {
  fetcher: ApiClientFetch;
  getRefreshTokens: (body: unknown) => RefreshTokenResult;
  refreshableErrorCodes: readonly string[];
  refreshResponseDataKey: string | null;
  tokenStorage?: TokenStorage;
  onAuthExpired?: (error: ApiError) => void;
  onUserBlocked?: (error: ApiError) => void;
};

/**
 * 단일 API 요청에 적용할 옵션입니다.
 *
 * - `RequestInit`에서 `body`만 제외하고, typed body와 query params를 추가합니다.
 * - `auth`가 `false`이면 인증 헤더/cookie와 token refresh를 사용하지 않습니다.
 *
 * @template TBody - 요청 body의 타입입니다.
 */
export type ApiClientOptions<TBody = unknown> = Omit<RequestInit, "body"> & {
  body?: TBody;
  params?: QueryParams;
  timeout?: number;
  auth?: boolean;
};

/**
 * API 클라이언트가 제공하는 HTTP 메서드 contract입니다.
 */
export type ApiClient = {
  /**
   * GET 요청을 실행합니다.
   *
   * @param path - API 경로입니다.
   * @param options - 요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.
   * @returns 응답 body를 호출자가 지정한 타입으로 반환합니다.
   */
  get: <TResponse>(
    path: string,
    options?: ApiClientOptions<unknown>,
  ) => Promise<TResponse>;

  /**
   * POST 요청을 실행합니다.
   *
   * @param path - API 경로입니다.
   * @param body - JSON으로 직렬화하거나 FormData로 전송할 요청 본문입니다.
   * @param options - 요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.
   * @returns 응답 body를 호출자가 지정한 타입으로 반환합니다.
   */
  post: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiClientOptions<TBody>,
  ) => Promise<TResponse>;

  /**
   * PUT 요청을 실행합니다.
   *
   * @param path - API 경로입니다.
   * @param body - JSON으로 직렬화하거나 FormData로 전송할 요청 본문입니다.
   * @param options - 요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.
   * @returns 응답 body를 호출자가 지정한 타입으로 반환합니다.
   */
  put: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiClientOptions<TBody>,
  ) => Promise<TResponse>;

  /**
   * PATCH 요청을 실행합니다.
   *
   * @param path - API 경로입니다.
   * @param body - JSON으로 직렬화하거나 FormData로 전송할 요청 본문입니다.
   * @param options - 요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.
   * @returns 응답 body를 호출자가 지정한 타입으로 반환합니다.
   */
  patch: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiClientOptions<TBody>,
  ) => Promise<TResponse>;

  /**
   * DELETE 요청을 실행합니다.
   *
   * @param path - API 경로입니다.
   * @param options - 요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.
   * @returns 응답 body를 호출자가 지정한 타입으로 반환합니다.
   */
  delete: <TResponse>(
    path: string,
    options?: ApiClientOptions,
  ) => Promise<TResponse>;
};
