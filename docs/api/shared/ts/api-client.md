[**Joo Code Archive API**](../../README.md)

***

[Joo Code Archive API](../../modules.md) / shared/ts/api-client

# shared/ts/api-client

HTTP 요청, API 응답 타입, 에러 처리, 인증 토큰 갱신을 함께 제공하는 API 클라이언트 모듈입니다.

- `createApiClient`로 `fetch` 기반 HTTP 메서드 묶음을 생성합니다.
- cookie 인증과 localStorage Bearer 인증을 모두 지원합니다.
- 표준 API 응답과 에러 페이로드 타입을 함께 내보냅니다.

## References

### ApiClient

Re-exports [ApiClient](api-client/http-client/types.md#apiclient)

***

### ApiClientConfig

Re-exports [ApiClientConfig](api-client/http-client/types.md#apiclientconfig)

***

### ApiClientFetch

Re-exports [ApiClientFetch](api-client/http-client/types.md#apiclientfetch)

***

### ApiClientOptions

Re-exports [ApiClientOptions](api-client/http-client/types.md#apiclientoptions)

***

### ApiError

Re-exports [ApiError](api-client/api-error/error.md#apierror)

***

### ApiErrorDetail

Re-exports [ApiErrorDetail](api-client/api-error/types.md#apierrordetail)

***

### ApiErrorPayload

Re-exports [ApiErrorPayload](api-client/api-error/types.md#apierrorpayload)

***

### ApiErrorResponse

Re-exports [ApiErrorResponse](api-client/api-error/types.md#apierrorresponse)

***

### ApiMeta

Re-exports [ApiMeta](api-client/types.md#apimeta)

***

### ApiResponse

Re-exports [ApiResponse](api-client/types.md#apiresponse)

***

### AuthMode

Re-exports [AuthMode](api-client/http-client/types.md#authmode-1)

***

### AuthTokenPayload

Re-exports [AuthTokenPayload](api-client/http-client/types.md#authtokenpayload)

***

### clearStoredTokens

Re-exports [clearStoredTokens](api-client/http-client/storage.md#clearstoredtokens)

***

### createApiClient

Re-exports [createApiClient](api-client/http-client/client.md#createapiclient)

***

### createAuthTokenStorage

Re-exports [createAuthTokenStorage](api-client/http-client/storage.md#createauthtokenstorage)

***

### createRefreshLockStorage

Re-exports [createRefreshLockStorage](api-client/http-client/storage.md#createrefreshlockstorage)

***

### DEFAULT\_ACCESS\_TOKEN\_KEY

Re-exports [DEFAULT_ACCESS_TOKEN_KEY](api-client/http-client/storage.md#default_access_token_key)

***

### DEFAULT\_REFRESH\_TOKEN\_KEY

Re-exports [DEFAULT_REFRESH_TOKEN_KEY](api-client/http-client/storage.md#default_refresh_token_key)

***

### DEFAULT\_REFRESHABLE\_ERROR\_CODES

Re-exports [DEFAULT_REFRESHABLE_ERROR_CODES](api-client/api-error/constants.md#default_refreshable_error_codes)

***

### DefaultRefreshableErrorCode

Re-exports [DefaultRefreshableErrorCode](api-client/api-error/constants.md#defaultrefreshableerrorcode)

***

### getAccessToken

Re-exports [getAccessToken](api-client/http-client/storage.md#getaccesstoken)

***

### getApiErrorMessage

Re-exports [getApiErrorMessage](api-client/api-error/error.md#getapierrormessage)

***

### getApiFieldErrorMap

Re-exports [getApiFieldErrorMap](api-client/api-error/error.md#getapifielderrormap)

***

### getDefaultTokenStorage

Re-exports [getDefaultTokenStorage](api-client/http-client/storage.md#getdefaulttokenstorage)

***

### getRefreshToken

Re-exports [getRefreshToken](api-client/http-client/storage.md#getrefreshtoken)

***

### hasWindow

Re-exports [hasWindow](api-client/http-client/storage.md#haswindow)

***

### isApiError

Re-exports [isApiError](api-client/api-error/error.md#isapierror)

***

### isApiErrorResponse

Re-exports [isApiErrorResponse](api-client/api-error/error.md#isapierrorresponse)

***

### isRefreshSessionExpiredCode

Re-exports [isRefreshSessionExpiredCode](api-client/api-error/error.md#isrefreshsessionexpiredcode)

***

### isRefreshUserBlockedCode

Re-exports [isRefreshUserBlockedCode](api-client/api-error/error.md#isrefreshuserblockedcode)

***

### QueryParams

Re-exports [QueryParams](api-client/http-client/types.md#queryparams)

***

### QueryParamValue

Re-exports [QueryParamValue](api-client/http-client/types.md#queryparamvalue)

***

### REFRESH\_SESSION\_EXPIRED\_CODES

Re-exports [REFRESH_SESSION_EXPIRED_CODES](api-client/api-error/constants.md#refresh_session_expired_codes)

***

### REFRESH\_USER\_BLOCKED\_CODES

Re-exports [REFRESH_USER_BLOCKED_CODES](api-client/api-error/constants.md#refresh_user_blocked_codes)

***

### RefreshResponse

Re-exports [RefreshResponse](api-client/http-client/types.md#refreshresponse)

***

### RefreshSessionExpiredCode

Re-exports [RefreshSessionExpiredCode](api-client/api-error/constants.md#refreshsessionexpiredcode)

***

### RefreshTokenResult

Re-exports [RefreshTokenResult](api-client/http-client/types.md#refreshtokenresult)

***

### RefreshTokenTransport

Re-exports [RefreshTokenTransport](api-client/http-client/types.md#refreshtokentransport-1)

***

### RefreshUserBlockedCode

Re-exports [RefreshUserBlockedCode](api-client/api-error/constants.md#refreshuserblockedcode)

***

### ResolvedApiClientConfig

Re-exports [ResolvedApiClientConfig](api-client/http-client/types.md#resolvedapiclientconfig)

***

### setAccessToken

Re-exports [setAccessToken](api-client/http-client/storage.md#setaccesstoken)

***

### setRefreshToken

Re-exports [setRefreshToken](api-client/http-client/storage.md#setrefreshtoken)

***

### TokenStorage

Re-exports [TokenStorage](api-client/http-client/types.md#tokenstorage-1)
