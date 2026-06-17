/**
 * @packageDocumentation
 * API 에러 응답을 `ApiError` 인스턴스와 타입 가드로 다루기 위한 모듈입니다.
 *
 * - 서버의 `{ error, meta }` 응답 구조를 타입으로 표현합니다.
 * - 인증 갱신 실패, 사용자 차단, 필드 단위 검증 에러를 구분하는 helper를 제공합니다.
 */

export * from "./types";
export * from "./constants";
export * from "./error";
