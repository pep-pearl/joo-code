[**Joo Code Archive API**](../../../../README.md)

***

[Joo Code Archive API](../../../../modules.md) / shared/ts/api-client/http-client/request

# shared/ts/api-client/http-client/request

## Functions

### request()

> **request**\<`TResponse`, `TBody`\>(`apiBaseUrl`, `path`, `options`, `config`): `Promise`\<`TResponse`\>

Defined in: shared/ts/api-client/http-client/request.ts:120

API 요청

#### Type Parameters

##### TResponse

`TResponse`

##### TBody

`TBody` = `unknown`

#### Parameters

##### apiBaseUrl

`string`

API 기본 URL

##### path

`string`

API 경로

##### options

[`ApiClientOptions`](types.md#apiclientoptions)\<`TBody`\> = `{}`

API 클라이언트 옵션

##### config

[`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

#### Returns

`Promise`\<`TResponse`\>

API 응답

***

### resolveApiClientConfig()

> **resolveApiClientConfig**(`config`): [`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

Defined in: shared/ts/api-client/http-client/request.ts:76

API 클라이언트 설정 resolve

#### Parameters

##### config

[`ApiClientConfig`](types.md#apiclientconfig)

API 클라이언트 설정

#### Returns

[`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

resolve된 API 클라이언트 설정
