[**Joo Code Archive API**](../../../README.md)

***

[Joo Code Archive API](../../../modules.md) / shared/ts/api-client/api-error

# shared/ts/api-client/api-error

API 에러 응답을 `ApiError` 인스턴스와 타입 가드로 다루기 위한 모듈입니다.

- 서버의 `{ error, meta }` 응답 구조를 타입으로 표현합니다.
- 인증 갱신 실패, 사용자 차단, 필드 단위 검증 에러를 구분하는 helper를 제공합니다.

## References

### ApiError

Re-exports [ApiError](api-error/error.md#apierror)

***

### ApiErrorDetail

Re-exports [ApiErrorDetail](api-error/types.md#apierrordetail)

***

### ApiErrorPayload

Re-exports [ApiErrorPayload](api-error/types.md#apierrorpayload)

***

### ApiErrorResponse

Re-exports [ApiErrorResponse](api-error/types.md#apierrorresponse)

***

### ApiMeta

Re-exports [ApiMeta](types.md#apimeta)

***

### DEFAULT\_REFRESHABLE\_ERROR\_CODES

Re-exports [DEFAULT_REFRESHABLE_ERROR_CODES](api-error/constants.md#default_refreshable_error_codes)

***

### DefaultRefreshableErrorCode

Re-exports [DefaultRefreshableErrorCode](api-error/constants.md#defaultrefreshableerrorcode)

***

### getApiErrorMessage

Re-exports [getApiErrorMessage](api-error/error.md#getapierrormessage)

***

### getApiFieldErrorMap

Re-exports [getApiFieldErrorMap](api-error/error.md#getapifielderrormap)

***

### isApiError

Re-exports [isApiError](api-error/error.md#isapierror)

***

### isApiErrorResponse

Re-exports [isApiErrorResponse](api-error/error.md#isapierrorresponse)

***

### isRefreshSessionExpiredCode

Re-exports [isRefreshSessionExpiredCode](api-error/error.md#isrefreshsessionexpiredcode)

***

### isRefreshUserBlockedCode

Re-exports [isRefreshUserBlockedCode](api-error/error.md#isrefreshuserblockedcode)

***

### REFRESH\_SESSION\_EXPIRED\_CODES

Re-exports [REFRESH_SESSION_EXPIRED_CODES](api-error/constants.md#refresh_session_expired_codes)

***

### REFRESH\_USER\_BLOCKED\_CODES

Re-exports [REFRESH_USER_BLOCKED_CODES](api-error/constants.md#refresh_user_blocked_codes)

***

### RefreshSessionExpiredCode

Re-exports [RefreshSessionExpiredCode](api-error/constants.md#refreshsessionexpiredcode)

***

### RefreshUserBlockedCode

Re-exports [RefreshUserBlockedCode](api-error/constants.md#refreshuserblockedcode)
