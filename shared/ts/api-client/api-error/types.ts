import type { ApiMeta } from "../types";
export type { ApiMeta };

/**
 * API 에러 상세 정보입니다.
 *
 * - `field`는 form field 검증 실패 위치를 나타냅니다.
 * - `param`은 query 또는 path parameter 검증 실패 위치를 나타냅니다.
 * - `rule`은 실패한 검증 규칙이나 서버가 내려준 상세 코드를 담습니다.
 */
export type ApiErrorDetail = {
  field?: string;
  param?: string;
  rule?: string;
};

/**
 * 서버가 내려주는 API 에러 payload 타입입니다.
 */
export type ApiErrorPayload = {
  code: string;
  message: string;
  details?: ApiErrorDetail[];
};

/**
 * 서버가 실패 응답으로 반환하는 공통 error envelope 타입입니다.
 */
export type ApiErrorResponse = {
  error: ApiErrorPayload;
  meta?: ApiMeta;
};
