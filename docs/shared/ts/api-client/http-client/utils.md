[**Joo Code Library API**](../../../../README.md)

***

[Joo Code Library API](../../../../modules.md) / shared/ts/api-client/http-client/utils

# shared/ts/api-client/http-client/utils

## Functions

### createApiError()

> **createApiError**(`options`): [`ApiError`](../api-error/error.md#apierror)

Defined in: shared/ts/api-client/http-client/utils.ts:139

API 에러 생성

#### Parameters

##### options

HTTP 상태 코드, 폴백 메시지, 파싱된 응답 바디

###### fallbackMessage

`string`

###### parsedBody

`unknown`

###### status

`number`

#### Returns

[`ApiError`](../api-error/error.md#apierror)

ApiError 인스턴스

***

### createHeaders()

> **createHeaders**\<`TBody`\>(`options`): `Headers`

Defined in: shared/ts/api-client/http-client/utils.ts:100

헤더 생성

#### Type Parameters

##### TBody

`TBody`

#### Parameters

##### options

API 요청 바디, 헤더, 인증 여부, 인증 방식, access token key, token storage

###### accessTokenKey

`string`

###### auth

`boolean`

###### authMode

[`AuthMode`](types.md#authmode-1)

###### body?

`TBody`

###### headers?

`HeadersInit`

###### tokenStorage?

[`TokenStorage`](types.md#tokenstorage-1)

#### Returns

`Headers`

Headers

***

### createRequestBody()

> **createRequestBody**\<`TBody`\>(`body`): `string` \| `TBody` & `FormData` \| `undefined`

Defined in: shared/ts/api-client/http-client/utils.ts:83

요청 바디 생성

#### Type Parameters

##### TBody

`TBody`

#### Parameters

##### body

API 요청 바디

`TBody` | `undefined`

#### Returns

`string` \| `TBody` & `FormData` \| `undefined`

string | FormData | undefined

***

### createUrl()

> **createUrl**(`apiBaseUrl`, `path`, `params?`): `string`

Defined in: shared/ts/api-client/http-client/utils.ts:15

요청 URL 생성

#### Parameters

##### apiBaseUrl

`string`

API 기본 URL

##### path

`string`

API 경로

##### params?

[`QueryParams`](types.md#queryparams)

쿼리 파라미터

#### Returns

`string`

요청 URL

***

### isJsonContent()

> **isJsonContent**(`response`): `boolean` \| `undefined`

Defined in: shared/ts/api-client/http-client/utils.ts:56

JSON 컨텐츠인지 확인

#### Parameters

##### response

`Response`

Response

#### Returns

`boolean` \| `undefined`

boolean

***

### isSamePath()

> **isSamePath**(`pathA`, `pathB`): `boolean`

Defined in: shared/ts/api-client/http-client/utils.ts:45

두 패스가 동일한지 확인

#### Parameters

##### pathA

`string`

패스 A

##### pathB

`string`

패스 B

#### Returns

`boolean`

동일한 패스인지 여부

***

### parseResponseBody()

> **parseResponseBody**(`response`): `Promise`\<`any`\>

Defined in: shared/ts/api-client/http-client/utils.ts:65

응답 바디 파싱

#### Parameters

##### response

`Response`

Response

#### Returns

`Promise`\<`any`\>

Promise<unknown>
