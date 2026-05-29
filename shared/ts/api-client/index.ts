/**
 * @packageDocumentation
 * HTTP 요청, API 응답 타입, 에러 처리, 인증 토큰 갱신을 함께 제공하는 API 클라이언트 모듈입니다.
 *
 * - `createApiClient`로 `fetch` 기반 HTTP 메서드 묶음을 생성합니다.
 * - cookie 인증과 localStorage Bearer 인증을 모두 지원합니다.
 * - 표준 API 응답과 에러 페이로드 타입을 함께 내보냅니다.
 */

/*
 * @ai-purpose API 클라이언트 공개 진입점이다. HTTP client, API error, response 타입을 재export한다.
 * @ai-entry true
 * @ai-domain api, shared
 * @ai-depends ./api-error, ./http-client, ./types
 * @ai-used-by shared/ts/index.ts and API integration code
 * @ai-keywords api-client, createApiClient, ApiError, ApiResponse, auth refresh
 */

export * from "./api-error";
export * from "./http-client";
export * from "./types";
