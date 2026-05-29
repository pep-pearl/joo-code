/*
 * @ai-purpose fetch 기반 API client 인스턴스를 생성하는 공개 factory를 제공한다.
 * @ai-entry true
 * @ai-domain api, shared
 * @ai-depends ./request, ./types
 * @ai-used-by API integration code that needs typed HTTP methods
 * @ai-keywords createApiClient, ApiClient, GET, POST, PUT, PATCH, DELETE
 */

import { request, resolveApiClientConfig } from "./request";
import type { ApiClient, ApiClientConfig, ApiClientOptions } from "./types";

/**
 * 지정한 API 기본 URL을 기준으로 HTTP 메서드가 포함된 API 클라이언트를 생성합니다.
 *
 * - 모든 요청은 `request`를 통해 실행되며, 공통 timeout, 인증, refresh 설정을 공유합니다.
 * - `apiBaseUrl` 끝의 `/`와 요청 `path` 앞의 `/`는 내부에서 정규화됩니다.
 * - 응답 타입은 호출 시 제네릭으로 지정합니다.
 *
 * @param apiBaseUrl - 요청을 보낼 API 기본 URL입니다.
 * @param config - 인증 방식, timeout, refresh 경로, fetch 구현체 등을 지정하는 설정입니다.
 * @returns GET, POST, PUT, PATCH, DELETE 메서드를 가진 API 클라이언트입니다.
 *
 * @example
 * ```ts
 * const apiClient = createApiClient("https://api.example.com", {
 *   authMode: "cookie",
 *   timeout: 5000,
 * });
 *
 * const response = await apiClient.get<ApiResponse<User>>("/users/me");
 * ```
 */
export const createApiClient = (
  apiBaseUrl: string,
  config: ApiClientConfig = {},
): ApiClient => {
  const resolvedConfig = resolveApiClientConfig(config);

  return {
    /**
     * GET 요청
     * @param path API 경로
     * @param options API 클라이언트 옵션
     * @returns API 응답
     */
    get: <TResponse>(path: string, options?: ApiClientOptions) =>
      request<TResponse>(
        apiBaseUrl,
        path,
        {
          ...options,
          method: "GET",
        },
        resolvedConfig,
      ),

    /**
     * POST 요청
     * @param path API 경로
     * @param body API 요청 바디
     * @param options API 클라이언트 옵션
     * @returns API 응답
     */
    post: <TResponse, TBody = unknown>(
      path: string,
      body?: TBody,
      options?: ApiClientOptions<TBody>,
    ) =>
      request<TResponse, TBody>(
        apiBaseUrl,
        path,
        {
          ...options,
          method: "POST",
          body,
        },
        resolvedConfig,
      ),

    /**
     * PUT 요청
     * @param path API 경로
     * @param body API 요청 바디
     * @param options API 클라이언트 옵션
     * @returns API 응답
     */
    put: <TResponse, TBody = unknown>(
      path: string,
      body?: TBody,
      options?: ApiClientOptions<TBody>,
    ) =>
      request<TResponse, TBody>(
        apiBaseUrl,
        path,
        {
          ...options,
          method: "PUT",
          body,
        },
        resolvedConfig,
      ),

    /**
     * PATCH 요청
     * @param path API 경로
     * @param body API 요청 바디
     * @param options API 클라이언트 옵션
     * @returns API 응답
     */
    patch: <TResponse, TBody = unknown>(
      path: string,
      body?: TBody,
      options?: ApiClientOptions<TBody>,
    ) =>
      request<TResponse, TBody>(
        apiBaseUrl,
        path,
        {
          ...options,
          method: "PATCH",
          body,
        },
        resolvedConfig,
      ),

    /**
     * DELETE 요청
     * @param path API 경로
     * @param options API 클라이언트 옵션
     * @returns API 응답
     */
    delete: <TResponse>(path: string, options?: ApiClientOptions) =>
      request<TResponse>(
        apiBaseUrl,
        path,
        {
          ...options,
          method: "DELETE",
        },
        resolvedConfig,
      ),
  };
};
