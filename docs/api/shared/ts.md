[**Joo Code Archive API**](../README.md)

***

[Joo Code Archive API](../modules.md) / shared/ts

# shared/ts

프로젝트 전반에서 재사용되는 핵심 TypeScript 로직 저장소입니다.
외부 의존성을 최소화하고, 안정적인 타입 정의와 순수 유틸리티를 제공하는 것을 목표로 합니다.
*이 패키지는 모든 프론트엔드 환경(React, Vanilla JS 등)에서 공통으로 참조할 수 있습니다.*

## References

### ApiClient

Re-exports [ApiClient](ts/api-client/http-client/types.md#apiclient)

***

### ApiClientConfig

Re-exports [ApiClientConfig](ts/api-client/http-client/types.md#apiclientconfig)

***

### ApiClientFetch

Re-exports [ApiClientFetch](ts/api-client/http-client/types.md#apiclientfetch)

***

### ApiClientOptions

Re-exports [ApiClientOptions](ts/api-client/http-client/types.md#apiclientoptions)

***

### ApiError

Re-exports [ApiError](ts/api-client/api-error/error.md#apierror)

***

### ApiErrorDetail

Re-exports [ApiErrorDetail](ts/api-client/api-error/types.md#apierrordetail)

***

### ApiErrorPayload

Re-exports [ApiErrorPayload](ts/api-client/api-error/types.md#apierrorpayload)

***

### ApiErrorResponse

Re-exports [ApiErrorResponse](ts/api-client/api-error/types.md#apierrorresponse)

***

### ApiMeta

Re-exports [ApiMeta](ts/api-client/types.md#apimeta)

***

### ApiResponse

Re-exports [ApiResponse](ts/api-client/types.md#apiresponse)

***

### AuthMode

Re-exports [AuthMode](ts/api-client/http-client/types.md#authmode-1)

***

### AuthTokenPayload

Re-exports [AuthTokenPayload](ts/api-client/http-client/types.md#authtokenpayload)

***

### clearStoredTokens

Re-exports [clearStoredTokens](ts/api-client/http-client/storage.md#clearstoredtokens)

***

### createApiClient

Re-exports [createApiClient](ts/api-client/http-client/client.md#createapiclient)

***

### createAuthTokenStorage

Re-exports [createAuthTokenStorage](ts/api-client/http-client/storage.md#createauthtokenstorage)

***

### createRefreshLockStorage

Re-exports [createRefreshLockStorage](ts/api-client/http-client/storage.md#createrefreshlockstorage)

***

### DEFAULT\_ACCESS\_TOKEN\_KEY

Re-exports [DEFAULT_ACCESS_TOKEN_KEY](ts/api-client/http-client/storage.md#default_access_token_key)

***

### DEFAULT\_REFRESH\_TOKEN\_KEY

Re-exports [DEFAULT_REFRESH_TOKEN_KEY](ts/api-client/http-client/storage.md#default_refresh_token_key)

***

### DEFAULT\_REFRESHABLE\_ERROR\_CODES

Re-exports [DEFAULT_REFRESHABLE_ERROR_CODES](ts/api-client/api-error/constants.md#default_refreshable_error_codes)

***

### DefaultRefreshableErrorCode

Re-exports [DefaultRefreshableErrorCode](ts/api-client/api-error/constants.md#defaultrefreshableerrorcode)

***

### formatCommaNumber

Re-exports [formatCommaNumber](../kits/format/number/vanilla-ts.md#formatcommanumber)

***

### formatThousandToEok

Re-exports [formatThousandToEok](../kits/format/number/vanilla-ts.md#formatthousandtoeok)

***

### getAccessToken

Re-exports [getAccessToken](ts/api-client/http-client/storage.md#getaccesstoken)

***

### getApiErrorMessage

Re-exports [getApiErrorMessage](ts/api-client/api-error/error.md#getapierrormessage)

***

### getApiFieldErrorMap

Re-exports [getApiFieldErrorMap](ts/api-client/api-error/error.md#getapifielderrormap)

***

### getDefaultTokenStorage

Re-exports [getDefaultTokenStorage](ts/api-client/http-client/storage.md#getdefaulttokenstorage)

***

### getRefreshToken

Re-exports [getRefreshToken](ts/api-client/http-client/storage.md#getrefreshtoken)

***

### hasWindow

Re-exports [hasWindow](ts/api-client/http-client/storage.md#haswindow)

***

### initViewportHeight

Re-exports [initViewportHeight](../kits/browser/viewport/vanilla-ts.md#initviewportheight)

***

### isApiError

Re-exports [isApiError](ts/api-client/api-error/error.md#isapierror)

***

### isApiErrorResponse

Re-exports [isApiErrorResponse](ts/api-client/api-error/error.md#isapierrorresponse)

***

### isRefreshSessionExpiredCode

Re-exports [isRefreshSessionExpiredCode](ts/api-client/api-error/error.md#isrefreshsessionexpiredcode)

***

### isRefreshUserBlockedCode

Re-exports [isRefreshUserBlockedCode](ts/api-client/api-error/error.md#isrefreshuserblockedcode)

***

### QueryParams

Re-exports [QueryParams](ts/api-client/http-client/types.md#queryparams)

***

### QueryParamValue

Re-exports [QueryParamValue](ts/api-client/http-client/types.md#queryparamvalue)

***

### REFRESH\_SESSION\_EXPIRED\_CODES

Re-exports [REFRESH_SESSION_EXPIRED_CODES](ts/api-client/api-error/constants.md#refresh_session_expired_codes)

***

### REFRESH\_USER\_BLOCKED\_CODES

Re-exports [REFRESH_USER_BLOCKED_CODES](ts/api-client/api-error/constants.md#refresh_user_blocked_codes)

***

### RefreshResponse

Re-exports [RefreshResponse](ts/api-client/http-client/types.md#refreshresponse)

***

### RefreshSessionExpiredCode

Re-exports [RefreshSessionExpiredCode](ts/api-client/api-error/constants.md#refreshsessionexpiredcode)

***

### RefreshTokenResult

Re-exports [RefreshTokenResult](ts/api-client/http-client/types.md#refreshtokenresult)

***

### RefreshTokenTransport

Re-exports [RefreshTokenTransport](ts/api-client/http-client/types.md#refreshtokentransport-1)

***

### RefreshUserBlockedCode

Re-exports [RefreshUserBlockedCode](ts/api-client/api-error/constants.md#refreshuserblockedcode)

***

### ResolvedApiClientConfig

Re-exports [ResolvedApiClientConfig](ts/api-client/http-client/types.md#resolvedapiclientconfig)

***

### romanToNumber

Re-exports [romanToNumber](../kits/format/number/vanilla-ts.md#romantonumber)

***

### setAccessToken

Re-exports [setAccessToken](ts/api-client/http-client/storage.md#setaccesstoken)

***

### setRefreshToken

Re-exports [setRefreshToken](ts/api-client/http-client/storage.md#setrefreshtoken)

***

### TokenStorage

Re-exports [TokenStorage](ts/api-client/http-client/types.md#tokenstorage-1)
