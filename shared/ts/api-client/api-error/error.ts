/*
 * @ai-purpose 서버 API error envelope를 ApiError 인스턴스와 UI용 helper로 변환한다.
 * @ai-entry false
 * @ai-domain api, error, shared
 * @ai-depends ./constants, ./types
 * @ai-used-by http-client request and UI error handling code
 * @ai-keywords ApiError, isApiErrorResponse, getApiErrorMessage, getApiFieldErrorMap
 */

import {
  REFRESH_SESSION_EXPIRED_CODES,
  REFRESH_USER_BLOCKED_CODES,
  type RefreshSessionExpiredCode,
  type RefreshUserBlockedCode,
} from "./constants";
import type { ApiErrorDetail, ApiErrorResponse, ApiMeta } from "./types";

/**
 * API 실패 응답을 표현하는 Error 확장 클래스입니다.
 *
 * - HTTP 상태 코드, 서버 error code, 필드 상세 정보, meta, 원본 body를 함께 보관합니다.
 * - `createApiError`가 서버 error envelope를 감지하면 이 클래스로 변환합니다.
 */
export class ApiError extends Error {
  status: number;
  code: string;
  details: ApiErrorDetail[];
  meta?: ApiMeta;
  body: unknown;

  constructor({
    status,
    code,
    message,
    details = [],
    meta,
    body = null,
  }: {
    status: number;
    code: string;
    message: string;
    details?: ApiErrorDetail[];
    meta?: ApiMeta;
    body?: unknown;
  }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.meta = meta;
    this.body = body;
  }
}

export const isRefreshSessionExpiredCode = (
  code: string,
): code is RefreshSessionExpiredCode => {
  return REFRESH_SESSION_EXPIRED_CODES.includes(
    code as RefreshSessionExpiredCode,
  );
};

export const isRefreshUserBlockedCode = (
  code: string,
): code is RefreshUserBlockedCode => {
  return REFRESH_USER_BLOCKED_CODES.includes(code as RefreshUserBlockedCode);
};

/**
 * 값이 서버의 API 에러 응답 envelope인지 확인합니다.
 *
 * @param value - 검사할 값입니다.
 * @returns `error.code`와 `error.message`가 문자열이면 `true`를 반환합니다.
 */
export const isApiErrorResponse = (
  value: unknown,
): value is ApiErrorResponse => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const maybeResponse = value as Partial<ApiErrorResponse>;
  const maybeError = maybeResponse.error;

  return (
    !!maybeError &&
    typeof maybeError === "object" &&
    typeof maybeError.code === "string" &&
    typeof maybeError.message === "string"
  );
};

/**
 * 값이 `ApiError` 인스턴스인지 확인합니다.
 *
 * @param error - 검사할 에러 값입니다.
 * @returns `ApiError` 인스턴스이면 `true`를 반환합니다.
 */
export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

/**
 * 에러 객체에서 사용자에게 보여줄 메시지를 가져옵니다.
 *
 * @param error - 메시지를 추출할 에러 값입니다.
 * @returns `ApiError` 또는 `Error`의 message를 반환하고, 알 수 없는 값이면 기본 문구를 반환합니다.
 */
export const getApiErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
};

/**
 * API 검증 에러 상세 정보를 field별 메시지 맵으로 변환합니다.
 *
 * @param error - field error map으로 변환할 에러 값입니다.
 * @returns `field` 또는 `param`을 key로, `rule` 또는 에러 메시지를 value로 갖는 객체입니다.
 */
export const getApiFieldErrorMap = (error: unknown) => {
  if (!(error instanceof ApiError)) {
    return {} as Record<string, string>;
  }

  return error.details.reduce<Record<string, string>>((acc, detail) => {
    const key = detail.field ?? detail.param;

    if (key) {
      acc[key] = detail.rule ?? error.message;
    }

    return acc;
  }, {});
};
