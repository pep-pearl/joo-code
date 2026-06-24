import type {
  ApiErrorDetail,
  ApiErrorPayload,
  ApiErrorResponse,
} from "./api-error/types";

export type ApiMeta = Record<string, unknown>;

export type ApiResponse<TData = unknown, TMeta = ApiMeta> =
  TData extends null | void
    ? {
        data: null;
        meta?: TMeta;
      }
    : {
        data: TData;
        meta?: TMeta;
      };

export type { ApiErrorDetail, ApiErrorPayload, ApiErrorResponse };
