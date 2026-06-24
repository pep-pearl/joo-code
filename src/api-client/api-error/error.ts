import {
  REFRESH_SESSION_EXPIRED_CODES,
  REFRESH_USER_BLOCKED_CODES,
  type RefreshSessionExpiredCode,
  type RefreshUserBlockedCode,
} from "./constants";
import type { ApiErrorDetail, ApiErrorResponse, ApiMeta } from "./types";

/**
 * API 에러
 */
export class ApiError<
  TBody = unknown,
  TDetail = ApiErrorDetail,
  TMeta = ApiMeta,
  TCode extends string = string,
> extends Error {
  status: number;
  code: TCode;
  details: TDetail[];
  meta?: TMeta;
  body: TBody | null;

  constructor({
    status,
    code,
    message,
    details = [],
    meta,
    body,
  }: {
    status: number;
    code: TCode;
    message: string;
    details?: TDetail[];
    meta?: TMeta;
    body?: TBody | null;
  }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.meta = meta;
    this.body = body ?? null;
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
 * API 에러 응답인지 확인
 */
export const isApiErrorResponse = <
  TPayload extends { code: string; message: string } = {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  },
  TMeta = ApiMeta,
>(value: unknown): value is ApiErrorResponse<TPayload, TMeta> => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const maybeResponse = value as Partial<ApiErrorResponse<TPayload, TMeta>>;
  const maybeError = maybeResponse.error;

  return (
    !!maybeError &&
    typeof maybeError === "object" &&
    typeof maybeError.code === "string" &&
    typeof maybeError.message === "string"
  );
};

/**
 * ApiError 타입인지 확인
 */
export const isApiError = <
  TBody = unknown,
  TDetail = ApiErrorDetail,
  TMeta = ApiMeta,
  TCode extends string = string,
>(error: unknown): error is ApiError<TBody, TDetail, TMeta, TCode> => {
  return error instanceof ApiError;
};

/**
 * API 에러 메시지 가져오기
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
 * API 에러 필드 맵 가져오기
 */
export const getApiFieldErrorMap = (
  error: unknown,
): Record<string, string> => {
  if (!(error instanceof ApiError)) {
    return {};
  }

  return error.details.reduce<Record<string, string>>((acc, detail) => {
    if (!detail || typeof detail !== "object") {
      return acc;
    }

    const record = detail as {
      field?: unknown;
      param?: unknown;
      rule?: unknown;
    };
    const key =
      typeof record.field === "string"
        ? record.field
        : typeof record.param === "string"
          ? record.param
          : undefined;

    if (key) {
      acc[key] =
        typeof record.rule === "string" ? record.rule : error.message;
    }

    return acc;
  }, {});
};
