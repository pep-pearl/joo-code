export type AuthSlot = {};
export type RefreshSlot = {};
export type ErrorSlot = {};
export type ParamsSerializerSlot = {};

export type ApiClientConfig = {
  baseUrl: string;
  fetcher?: typeof fetch;
  timeout?: number;
  auth?: AuthSlot;
  refresh?: RefreshSlot;
  error?: ErrorSlot;
  paramsSerializer?: ParamsSerializerSlot;
};

export type ApiRequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: unknown;
  params?: unknown;
  headers?: HeadersInit;
  auth?: boolean;
};

export function createApiClient(config: ApiClientConfig) {
  return {
    get: null,
    post: null,
    put: null,
    delete: null,
    patch: null,
  };
}
