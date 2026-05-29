/**
 * @packageDocumentation
 * `fetch`를 감싼 HTTP API 클라이언트와 인증 토큰 저장 helper를 제공합니다.
 *
 * - `createApiClient`는 GET, POST, PUT, PATCH, DELETE 요청 메서드를 생성합니다.
 * - 401 응답 중 갱신 가능한 에러 코드에 대해서만 access token refresh를 시도합니다.
 * - cookie mode와 localStorage mode를 설정으로 전환할 수 있습니다.
 */

export * from "./types";
export * from "./storage";
export * from "./client";
