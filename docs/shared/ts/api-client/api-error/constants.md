[**Joo Code Library API**](../../../../README.md)

***

[Joo Code Library API](../../../../modules.md) / shared/ts/api-client/api-error/constants

# shared/ts/api-client/api-error/constants

## Type Aliases

### DefaultRefreshableErrorCode

> **DefaultRefreshableErrorCode** = *typeof* [`DEFAULT_REFRESHABLE_ERROR_CODES`](#default_refreshable_error_codes)\[`number`\]

Defined in: shared/ts/api-client/api-error/constants.ts:39

***

### RefreshSessionExpiredCode

> **RefreshSessionExpiredCode** = *typeof* [`REFRESH_SESSION_EXPIRED_CODES`](#refresh_session_expired_codes)\[`number`\]

Defined in: shared/ts/api-client/api-error/constants.ts:33

***

### RefreshUserBlockedCode

> **RefreshUserBlockedCode** = *typeof* [`REFRESH_USER_BLOCKED_CODES`](#refresh_user_blocked_codes)\[`number`\]

Defined in: shared/ts/api-client/api-error/constants.ts:36

## Variables

### DEFAULT\_REFRESHABLE\_ERROR\_CODES

> `const` **DEFAULT\_REFRESHABLE\_ERROR\_CODES**: readonly \[`"ACCESS_TOKEN_EXPIRED"`, `"TOKEN_EXPIRED"`, `"JWT_EXPIRED"`\]

Defined in: shared/ts/api-client/api-error/constants.ts:27

access token이 만료되어 refresh를 시도해도 되는 코드.

현재 공유된 일반 API 예시에는 ACCESS_KEY_MISSING / ACCESS_KEY_INVALID만 있어
이 둘은 refresh 대상이 아니다.
BE가 access token 만료 시 다른 code를 내려주면 ApiClientConfig.refreshableErrorCodes에 추가한다.

***

### REFRESH\_SESSION\_EXPIRED\_CODES

> `const` **REFRESH\_SESSION\_EXPIRED\_CODES**: readonly \[`"REFRESH_TOKEN_INVALID"`, `"REFRESH_TOKEN_EXPIRED"`, `"REFRESH_TOKEN_REUSED"`\]

Defined in: shared/ts/api-client/api-error/constants.ts:5

refresh token으로 session을 갱신하려 할 때 발생하는 에러 코드.
세션 만료

***

### REFRESH\_USER\_BLOCKED\_CODES

> `const` **REFRESH\_USER\_BLOCKED\_CODES**: readonly \[`"USER_NOT_APPROVED"`, `"USER_INACTIVE"`\]

Defined in: shared/ts/api-client/api-error/constants.ts:15

refresh token으로 session을 갱신하려 할 때 발생하는 에러 코드.
사용자 비활성화
