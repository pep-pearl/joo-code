import type { ApiMeta } from "../types";
export type { ApiMeta };

/**
 * API 에러 상세 정보
 */
export type ApiErrorDetail<
  TField extends string = string,
  TParam extends string = string,
  TRule extends string = string,
> = {
  field?: TField;
  param?: TParam;
  rule?: TRule;
};

/**
 * API 에러 응답 페이로드 타입
 */
export type ApiErrorPayload<
  TCode extends string = string,
  TDetail = ApiErrorDetail,
> = {
  code: TCode;
  message: string;
  details?: TDetail[];
};

/**
 * API 에러 응답 타입
 */
export type ApiErrorResponse<
  TPayload extends { code: string; message: string } = ApiErrorPayload,
  TMeta = ApiMeta,
> = {
  error: TPayload;
  meta?: TMeta;
};
