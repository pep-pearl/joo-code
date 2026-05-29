[**Joo Code Archive API**](../../../README.md)

***

[Joo Code Archive API](../../../modules.md) / shared/ts/api-client/http-client

# shared/ts/api-client/http-client

`fetch`를 감싼 HTTP API 클라이언트와 인증 토큰 저장 helper를 제공합니다.

- `createApiClient`는 GET, POST, PUT, PATCH, DELETE 요청 메서드를 생성합니다.
- 401 응답 중 갱신 가능한 에러 코드에 대해서만 access token refresh를 시도합니다.
- cookie mode와 localStorage mode를 설정으로 전환할 수 있습니다.

## References

### ApiClient

Re-exports [ApiClient](http-client/types.md#apiclient)

***

### ApiClientConfig

Re-exports [ApiClientConfig](http-client/types.md#apiclientconfig)

***

### ApiClientFetch

Re-exports [ApiClientFetch](http-client/types.md#apiclientfetch)

***

### ApiClientOptions

Re-exports [ApiClientOptions](http-client/types.md#apiclientoptions)

***

### AuthMode

Re-exports [AuthMode](http-client/types.md#authmode-1)

***

### AuthTokenPayload

Re-exports [AuthTokenPayload](http-client/types.md#authtokenpayload)

***

### clearStoredTokens

Re-exports [clearStoredTokens](http-client/storage.md#clearstoredtokens)

***

### createApiClient

Re-exports [createApiClient](http-client/client.md#createapiclient)

***

### createAuthTokenStorage

Re-exports [createAuthTokenStorage](http-client/storage.md#createauthtokenstorage)

***

### createRefreshLockStorage

Re-exports [createRefreshLockStorage](http-client/storage.md#createrefreshlockstorage)

***

### DEFAULT\_ACCESS\_TOKEN\_KEY

Re-exports [DEFAULT_ACCESS_TOKEN_KEY](http-client/storage.md#default_access_token_key)

***

### DEFAULT\_REFRESH\_TOKEN\_KEY

Re-exports [DEFAULT_REFRESH_TOKEN_KEY](http-client/storage.md#default_refresh_token_key)

***

### getAccessToken

Re-exports [getAccessToken](http-client/storage.md#getaccesstoken)

***

### getDefaultTokenStorage

Re-exports [getDefaultTokenStorage](http-client/storage.md#getdefaulttokenstorage)

***

### getRefreshToken

Re-exports [getRefreshToken](http-client/storage.md#getrefreshtoken)

***

### hasWindow

Re-exports [hasWindow](http-client/storage.md#haswindow)

***

### QueryParams

Re-exports [QueryParams](http-client/types.md#queryparams)

***

### QueryParamValue

Re-exports [QueryParamValue](http-client/types.md#queryparamvalue)

***

### RefreshResponse

Re-exports [RefreshResponse](http-client/types.md#refreshresponse)

***

### RefreshTokenResult

Re-exports [RefreshTokenResult](http-client/types.md#refreshtokenresult)

***

### RefreshTokenTransport

Re-exports [RefreshTokenTransport](http-client/types.md#refreshtokentransport-1)

***

### ResolvedApiClientConfig

Re-exports [ResolvedApiClientConfig](http-client/types.md#resolvedapiclientconfig)

***

### setAccessToken

Re-exports [setAccessToken](http-client/storage.md#setaccesstoken)

***

### setRefreshToken

Re-exports [setRefreshToken](http-client/storage.md#setrefreshtoken)

***

### TokenStorage

Re-exports [TokenStorage](http-client/types.md#tokenstorage-1)
