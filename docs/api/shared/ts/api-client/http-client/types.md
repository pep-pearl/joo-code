[**Joo Code Archive API**](../../../../README.md)

***

[Joo Code Archive API](../../../../modules.md) / shared/ts/api-client/http-client/types

# shared/ts/api-client/http-client/types

## Type Aliases

### ApiClient

> **ApiClient** = `object`

Defined in: shared/ts/api-client/http-client/types.ts:216

API 클라이언트가 제공하는 HTTP 메서드 contract입니다.

#### Properties

##### delete()

> **delete**: \<`TResponse`\>(`path`, `options?`) => `Promise`\<`TResponse`\>

Defined in: shared/ts/api-client/http-client/types.ts:278

DELETE 요청을 실행합니다.

###### Type Parameters

###### TResponse

`TResponse`

###### Parameters

###### path

`string`

API 경로입니다.

###### options?

[`ApiClientOptions`](#apiclientoptions)

요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.

###### Returns

`Promise`\<`TResponse`\>

응답 body를 호출자가 지정한 타입으로 반환합니다.

##### get()

> **get**: \<`TResponse`\>(`path`, `options?`) => `Promise`\<`TResponse`\>

Defined in: shared/ts/api-client/http-client/types.ts:224

GET 요청을 실행합니다.

###### Type Parameters

###### TResponse

`TResponse`

###### Parameters

###### path

`string`

API 경로입니다.

###### options?

[`ApiClientOptions`](#apiclientoptions)\<`unknown`\>

요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.

###### Returns

`Promise`\<`TResponse`\>

응답 body를 호출자가 지정한 타입으로 반환합니다.

##### patch()

> **patch**: \<`TResponse`, `TBody`\>(`path`, `body?`, `options?`) => `Promise`\<`TResponse`\>

Defined in: shared/ts/api-client/http-client/types.ts:265

PATCH 요청을 실행합니다.

###### Type Parameters

###### TResponse

`TResponse`

###### TBody

`TBody` = `unknown`

###### Parameters

###### path

`string`

API 경로입니다.

###### body?

`TBody`

JSON으로 직렬화하거나 FormData로 전송할 요청 본문입니다.

###### options?

[`ApiClientOptions`](#apiclientoptions)\<`TBody`\>

요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.

###### Returns

`Promise`\<`TResponse`\>

응답 body를 호출자가 지정한 타입으로 반환합니다.

##### post()

> **post**: \<`TResponse`, `TBody`\>(`path`, `body?`, `options?`) => `Promise`\<`TResponse`\>

Defined in: shared/ts/api-client/http-client/types.ts:237

POST 요청을 실행합니다.

###### Type Parameters

###### TResponse

`TResponse`

###### TBody

`TBody` = `unknown`

###### Parameters

###### path

`string`

API 경로입니다.

###### body?

`TBody`

JSON으로 직렬화하거나 FormData로 전송할 요청 본문입니다.

###### options?

[`ApiClientOptions`](#apiclientoptions)\<`TBody`\>

요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.

###### Returns

`Promise`\<`TResponse`\>

응답 body를 호출자가 지정한 타입으로 반환합니다.

##### put()

> **put**: \<`TResponse`, `TBody`\>(`path`, `body?`, `options?`) => `Promise`\<`TResponse`\>

Defined in: shared/ts/api-client/http-client/types.ts:251

PUT 요청을 실행합니다.

###### Type Parameters

###### TResponse

`TResponse`

###### TBody

`TBody` = `unknown`

###### Parameters

###### path

`string`

API 경로입니다.

###### body?

`TBody`

JSON으로 직렬화하거나 FormData로 전송할 요청 본문입니다.

###### options?

[`ApiClientOptions`](#apiclientoptions)\<`TBody`\>

요청별 timeout, headers, params, auth 사용 여부 등을 지정합니다.

###### Returns

`Promise`\<`TResponse`\>

응답 body를 호출자가 지정한 타입으로 반환합니다.

***

### ApiClientConfig

> **ApiClientConfig** = `object`

Defined in: shared/ts/api-client/http-client/types.ts:97

API 클라이언트의 공통 동작을 제어하는 설정입니다.

- 기본 인증 방식은 cookie mode입니다.
- localStorage mode에서는 `tokenStorage`를 주입하지 않으면 브라우저의 `window.localStorage`를 사용합니다.
- 서버/테스트/headless 환경에서는 `fetcher`와 `tokenStorage`를 명시적으로 주입할 수 있습니다.

#### Properties

##### accessTokenKey?

> `optional` **accessTokenKey**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:112

Access Token Key

###### Default

```ts
"access_token"
```

##### accessTokenResponseKey?

> `optional` **accessTokenResponseKey**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:152

refresh 응답 token payload 안의 access token 필드명.

###### Default

```ts
"access_token"
```

##### authMode?

> `optional` **authMode**: [`AuthMode`](#authmode-1)

Defined in: shared/ts/api-client/http-client/types.ts:107

인증 방식

###### Default

```ts
"cookie"
```

##### fetcher?

> `optional` **fetcher**: [`ApiClientFetch`](#apiclientfetch)

Defined in: shared/ts/api-client/http-client/types.ts:136

fetch 구현체. 기본값은 globalThis.fetch.

##### getRefreshTokens()?

> `optional` **getRefreshTokens**: (`body`) => [`RefreshTokenResult`](#refreshtokenresult)

Defined in: shared/ts/api-client/http-client/types.ts:161

refresh 응답 구조가 기본 field mapping으로 표현되지 않을 때 사용하는 token extractor.

###### Parameters

###### body

`unknown`

###### Returns

[`RefreshTokenResult`](#refreshtokenresult)

##### onAuthExpired()?

> `optional` **onAuthExpired**: (`error`) => `void`

Defined in: shared/ts/api-client/http-client/types.ts:170

refresh token invalid/expired/reused일 때 호출한다.

###### Parameters

###### error

[`ApiError`](../api-error/error.md#apierror)

###### Returns

`void`

##### onUserBlocked()?

> `optional` **onUserBlocked**: (`error`) => `void`

Defined in: shared/ts/api-client/http-client/types.ts:174

USER_NOT_APPROVED / USER_INACTIVE일 때 호출한다.

###### Parameters

###### error

[`ApiError`](../api-error/error.md#apierror)

###### Returns

`void`

##### refreshableErrorCodes?

> `optional` **refreshableErrorCodes**: readonly `string`[]

Defined in: shared/ts/api-client/http-client/types.ts:166

이 에러 코드일 때만 refresh를 시도한다.
ACCESS_KEY_MISSING / ACCESS_KEY_INVALID 같은 일반 401은 refresh하지 않는다.

##### refreshPath?

> `optional` **refreshPath**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:122

Access token 갱신 경로

###### Default

```ts
"/auth/refresh"
```

##### refreshRequestTokenKey?

> `optional` **refreshRequestTokenKey**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:141

refresh token을 body로 보낼 때 사용할 필드명.

###### Default

```ts
"refresh_token"
```

##### refreshResponseDataKey?

> `optional` **refreshResponseDataKey**: `string` \| `null`

Defined in: shared/ts/api-client/http-client/types.ts:147

refresh 응답에서 token payload를 찾을 wrapper 필드명.
null이면 응답 body 자체를 token payload로 본다.

###### Default

```ts
"data"
```

##### refreshTokenKey?

> `optional` **refreshTokenKey**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:117

Refresh Token Key

###### Default

```ts
"refresh_token"
```

##### refreshTokenResponseKey?

> `optional` **refreshTokenResponseKey**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:157

refresh 응답 token payload 안의 refresh token 필드명.

###### Default

```ts
"refresh_token"
```

##### refreshTokenTransport?

> `optional` **refreshTokenTransport**: [`RefreshTokenTransport`](#refreshtokentransport-1)

Defined in: shared/ts/api-client/http-client/types.ts:127

refresh token 전달 방식

###### Default

```ts
authMode가 "cookie"면 "cookie", "localStorage"면 "body"
```

##### timeout?

> `optional` **timeout**: `number`

Defined in: shared/ts/api-client/http-client/types.ts:102

타임아웃 (ms)

###### Default

```ts
10000
```

##### tokenStorage?

> `optional` **tokenStorage**: [`TokenStorage`](#tokenstorage-1)

Defined in: shared/ts/api-client/http-client/types.ts:132

localStorage mode에서 access token을 읽고 쓰는 storage.
기본값은 브라우저 window.localStorage이며, 서버/테스트/headless 환경에서는 주입해서 사용한다.

***

### ApiClientFetch

> **ApiClientFetch** = *typeof* `fetch`

Defined in: shared/ts/api-client/http-client/types.ts:61

API 클라이언트에 주입할 수 있는 fetch 구현체 타입입니다.

***

### ApiClientOptions

> **ApiClientOptions**\<`TBody`\> = `Omit`\<`RequestInit`, `"body"`\> & `object`

Defined in: shared/ts/api-client/http-client/types.ts:206

단일 API 요청에 적용할 옵션입니다.

- `RequestInit`에서 `body`만 제외하고, typed body와 query params를 추가합니다.
- `auth`가 `false`이면 인증 헤더/cookie와 token refresh를 사용하지 않습니다.

#### Type Declaration

##### auth?

> `optional` **auth**: `boolean`

##### body?

> `optional` **body**: `TBody`

##### params?

> `optional` **params**: [`QueryParams`](#queryparams)

##### timeout?

> `optional` **timeout**: `number`

#### Type Parameters

##### TBody

`TBody` = `unknown`

요청 body의 타입입니다.

***

### AuthMode

> **AuthMode** = `"cookie"` \| `"localStorage"`

Defined in: shared/ts/api-client/http-client/types.ts:38

API 클라이언트가 요청에 인증 정보를 싣는 방식입니다.

- `cookie`: production 권장 방식입니다. HttpOnly/Secure cookie를 `credentials: "include"`로 전달합니다.
- `localStorage`: development 편의용 방식입니다. 저장된 access token을 `Authorization: Bearer` 헤더로 전달합니다.

***

### AuthTokenPayload

> **AuthTokenPayload**\<`TUser`\> = `object`

Defined in: shared/ts/api-client/http-client/types.ts:68

인증 API가 반환하는 token payload 구조입니다.

#### Type Parameters

##### TUser

`TUser` = `unknown`

token payload에 함께 포함될 사용자 정보 타입입니다.

#### Properties

##### access\_expires\_at?

> `optional` **access\_expires\_at**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:69

##### access\_token?

> `optional` **access\_token**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:70

##### refresh\_expires\_at?

> `optional` **refresh\_expires\_at**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:71

##### refresh\_token?

> `optional` **refresh\_token**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:72

##### token\_type?

> `optional` **token\_type**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:73

##### user?

> `optional` **user**: `TUser`

Defined in: shared/ts/api-client/http-client/types.ts:74

***

### QueryParams

> **QueryParams** = `Record`\<`string`, [`QueryParamValue`](#queryparamvalue)\>

Defined in: shared/ts/api-client/http-client/types.ts:30

요청 URL에 붙일 쿼리 파라미터 객체입니다.

***

### QueryParamValue

> **QueryParamValue** = `string` \| `number` \| `boolean` \| (`string` \| `number` \| `boolean`)[] \| `null` \| `undefined`

Defined in: shared/ts/api-client/http-client/types.ts:19

URL 쿼리 파라미터 값으로 사용할 수 있는 타입입니다.

- 배열 값은 같은 key를 여러 번 append합니다.
- `null`과 `undefined`는 URL에 포함하지 않습니다.

***

### RefreshResponse

> **RefreshResponse** = [`ApiResponse`](../types.md#apiresponse)\<[`AuthTokenPayload`](#authtokenpayload)\>

Defined in: shared/ts/api-client/http-client/types.ts:80

refresh API가 반환하는 기본 응답 타입입니다.

***

### RefreshTokenResult

> **RefreshTokenResult** = `object`

Defined in: shared/ts/api-client/http-client/types.ts:85

refresh 응답에서 추출한 token 값입니다.

#### Properties

##### accessToken?

> `optional` **accessToken**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:86

##### refreshToken?

> `optional` **refreshToken**: `string`

Defined in: shared/ts/api-client/http-client/types.ts:87

***

### RefreshTokenTransport

> **RefreshTokenTransport** = `"cookie"` \| `"body"` \| `"none"`

Defined in: shared/ts/api-client/http-client/types.ts:47

access token refresh 요청에서 refresh token을 전달하는 방식입니다.

- `cookie`: refresh token이 HttpOnly cookie에 있고 `credentials: "include"`로 전달합니다.
- `body`: `TokenStorage`에서 refresh token을 읽어 JSON body에 담습니다.
- `none`: refresh 요청에 별도 refresh token을 싣지 않습니다.

***

### ResolvedApiClientConfig

> **ResolvedApiClientConfig** = `Required`\<`Omit`\<[`ApiClientConfig`](#apiclientconfig), `"fetcher"` \| `"getRefreshTokens"` \| `"onAuthExpired"` \| `"onUserBlocked"` \| `"refreshableErrorCodes"` \| `"refreshResponseDataKey"` \| `"tokenStorage"`\>\> & `object`

Defined in: shared/ts/api-client/http-client/types.ts:177

#### Type Declaration

##### fetcher

> **fetcher**: [`ApiClientFetch`](#apiclientfetch)

##### getRefreshTokens()

> **getRefreshTokens**: (`body`) => [`RefreshTokenResult`](#refreshtokenresult)

###### Parameters

###### body

`unknown`

###### Returns

[`RefreshTokenResult`](#refreshtokenresult)

##### onAuthExpired()?

> `optional` **onAuthExpired**: (`error`) => `void`

###### Parameters

###### error

[`ApiError`](../api-error/error.md#apierror)

###### Returns

`void`

##### onUserBlocked()?

> `optional` **onUserBlocked**: (`error`) => `void`

###### Parameters

###### error

[`ApiError`](../api-error/error.md#apierror)

###### Returns

`void`

##### refreshableErrorCodes

> **refreshableErrorCodes**: readonly `string`[]

##### refreshResponseDataKey

> **refreshResponseDataKey**: `string` \| `null`

##### tokenStorage?

> `optional` **tokenStorage**: [`TokenStorage`](#tokenstorage-1)

***

### TokenStorage

> **TokenStorage** = `object`

Defined in: shared/ts/api-client/http-client/types.ts:52

access token과 refresh token을 읽고 쓰는 storage contract입니다.

#### Properties

##### getItem()

> **getItem**: (`key`) => `string` \| `null`

Defined in: shared/ts/api-client/http-client/types.ts:53

###### Parameters

###### key

`string`

###### Returns

`string` \| `null`

##### removeItem()

> **removeItem**: (`key`) => `void`

Defined in: shared/ts/api-client/http-client/types.ts:55

###### Parameters

###### key

`string`

###### Returns

`void`

##### setItem()

> **setItem**: (`key`, `value`) => `void`

Defined in: shared/ts/api-client/http-client/types.ts:54

###### Parameters

###### key

`string`

###### value

`string`

###### Returns

`void`
