[**Joo Code Library API**](../../../../README.md)

***

[Joo Code Library API](../../../../modules.md) / shared/ts/api-client/http-client/refresh

# shared/ts/api-client/http-client/refresh

## Functions

### createRefreshRequestBody()

> **createRefreshRequestBody**(`config`): `string` \| `undefined`

Defined in: shared/ts/api-client/http-client/refresh.ts:94

refresh token을 body로 전달해야 하는지 확인

#### Parameters

##### config

[`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

API 클라이언트 설정

#### Returns

`string` \| `undefined`

refresh token을 body로 전달해야 하는지 여부

***

### handleRefreshFailure()

> **handleRefreshFailure**(`error`, `config`): `void`

Defined in: shared/ts/api-client/http-client/refresh.ts:219

refresh token 갱신 실패 처리

#### Parameters

##### error

`unknown`

에러 객체

##### config

[`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

API 클라이언트 설정

#### Returns

`void`

***

### isRefreshAuthExpiredError()

> **isRefreshAuthExpiredError**(`error`): `error is ApiError`

Defined in: shared/ts/api-client/http-client/refresh.ts:55

refresh token이 만료되었는지 확인

#### Parameters

##### error

`unknown`

에러 객체

#### Returns

`error is ApiError`

refresh token이 만료되었는지 여부

***

### isRefreshUserBlockedError()

> **isRefreshUserBlockedError**(`error`): `error is ApiError`

Defined in: shared/ts/api-client/http-client/refresh.ts:70

refresh token이 비활성화되었는지 확인

#### Parameters

##### error

`unknown`

에러 객체

#### Returns

`error is ApiError`

refresh token이 비활성화되었는지 여부

***

### refreshAccessToken()

> **refreshAccessToken**(`apiBaseUrl`, `config`): `Promise`\<`void`\>

Defined in: shared/ts/api-client/http-client/refresh.ts:136

access token 갱신

#### Parameters

##### apiBaseUrl

`string`

API 기본 URL

##### config

[`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

API 클라이언트 설정

#### Returns

`Promise`\<`void`\>

Promise<void>

***

### shouldRefreshAccessToken()

> **shouldRefreshAccessToken**(`options`): `boolean`

Defined in: shared/ts/api-client/http-client/refresh.ts:26

refresh token이 필요한지 확인

#### Parameters

##### options

인증 여부, API 경로, HTTP 상태 코드, 파싱된 응답 바디, API 클라이언트 설정

###### auth

`boolean`

###### config

[`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

###### parsedBody

`unknown`

###### path

`string`

###### status

`number`

#### Returns

`boolean`

refresh token이 필요한지 여부

***

### shouldSendRefreshCookie()

> **shouldSendRefreshCookie**(`config`): `boolean`

Defined in: shared/ts/api-client/http-client/refresh.ts:85

refresh token을 쿠키로 전달해야 하는지 확인

#### Parameters

##### config

[`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

API 클라이언트 설정

#### Returns

`boolean`

refresh token을 쿠키로 전달해야 하는지 여부
