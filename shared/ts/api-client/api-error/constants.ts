/**
 * refresh token으로 session을 갱신하려 할 때 발생하는 에러 코드.
 * 세션 만료
 */
export const REFRESH_SESSION_EXPIRED_CODES = [
  "REFRESH_TOKEN_INVALID",
  "REFRESH_TOKEN_EXPIRED",
  "REFRESH_TOKEN_REUSED",
] as const;

/**
 * refresh token으로 session을 갱신하려 할 때 발생하는 에러 코드.
 * 사용자 비활성화
 */
export const REFRESH_USER_BLOCKED_CODES = [
  "USER_NOT_APPROVED",
  "USER_INACTIVE",
] as const;

/**
 * access token이 만료되어 refresh를 시도해도 되는 코드.
 *
 * 현재 공유된 일반 API 예시에는 ACCESS_KEY_MISSING / ACCESS_KEY_INVALID만 있어
 * 이 둘은 refresh 대상이 아니다.
 * BE가 access token 만료 시 다른 code를 내려주면 ApiClientConfig.refreshableErrorCodes에 추가한다.
 */
export const DEFAULT_REFRESHABLE_ERROR_CODES = [
  "ACCESS_TOKEN_EXPIRED",
  "TOKEN_EXPIRED",
  "JWT_EXPIRED",
] as const;

export type RefreshSessionExpiredCode =
  (typeof REFRESH_SESSION_EXPIRED_CODES)[number];

export type RefreshUserBlockedCode =
  (typeof REFRESH_USER_BLOCKED_CODES)[number];

export type DefaultRefreshableErrorCode =
  (typeof DEFAULT_REFRESHABLE_ERROR_CODES)[number];
