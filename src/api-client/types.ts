import type {
  ApiErrorDetail,
  ApiErrorPayload,
  ApiErrorResponse,
} from "./api-error/types";

/**
 * API 응답의 부가 정보를 담는 meta 객체입니다.
 */
export type ApiMeta = Record<string, unknown>;

/**
 * 서버가 성공 응답으로 반환하는 공통 envelope 타입입니다.
 *
 * - 실제 payload는 `data`에 들어갑니다.
 * - 페이지네이션, trace id 같은 부가 정보는 `meta`에 둘 수 있습니다.
 * - `TData`가 `null` 또는 `void`이면 `data`는 `null`로 고정됩니다.
 *
 * @template TData - 응답 data의 타입입니다.
 * @template TMeta - 응답 meta의 타입입니다.
 */
export type ApiResponse<TData, TMeta = ApiMeta> = TData extends null | void
  ? {
      data: null;
      meta?: TMeta;
    }
  : {
      data: TData;
      meta?: TMeta;
    };

export type { ApiErrorDetail, ApiErrorPayload, ApiErrorResponse };
