[**Joo Code Library API**](../../../../README.md)

***

[Joo Code Library API](../../../../modules.md) / shared/ts/api-client/api-error/error

# shared/ts/api-client/api-error/error

## Classes

### ApiError

Defined in: shared/ts/api-client/api-error/error.ts:24

API 실패 응답을 표현하는 Error 확장 클래스입니다.

- HTTP 상태 코드, 서버 error code, 필드 상세 정보, meta, 원본 body를 함께 보관합니다.
- `createApiError`가 서버 error envelope를 감지하면 이 클래스로 변환합니다.

#### Extends

- `Error`

#### Constructors

##### Constructor

> **new ApiError**(`__namedParameters`): [`ApiError`](#apierror)

Defined in: shared/ts/api-client/api-error/error.ts:31

###### Parameters

###### \_\_namedParameters

###### body?

`unknown` = `null`

###### code

`string`

###### details?

[`ApiErrorDetail`](types.md#apierrordetail)[] = `[]`

###### message

`string`

###### meta?

[`ApiMeta`](../types.md#apimeta)

###### status

`number`

###### Returns

[`ApiError`](#apierror)

###### Overrides

`Error.constructor`

#### Properties

##### body

> **body**: `unknown`

Defined in: shared/ts/api-client/api-error/error.ts:29

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

`Error.cause`

##### code

> **code**: `string`

Defined in: shared/ts/api-client/api-error/error.ts:26

##### details

> **details**: [`ApiErrorDetail`](types.md#apierrordetail)[]

Defined in: shared/ts/api-client/api-error/error.ts:27

##### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

`Error.message`

##### meta?

> `optional` **meta**: [`ApiMeta`](../types.md#apimeta)

Defined in: shared/ts/api-client/api-error/error.ts:28

##### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

`Error.name`

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

`Error.stack`

##### status

> **status**: `number`

Defined in: shared/ts/api-client/api-error/error.ts:25

#### Methods

##### isError()

> `static` **isError**(`error`): `error is Error`

Defined in: node\_modules/typescript/lib/lib.esnext.error.d.ts:23

Indicates whether the argument provided is a built-in Error instance or not.

###### Parameters

###### error

`unknown`

###### Returns

`error is Error`

###### Inherited from

`Error.isError`

## Functions

### getApiErrorMessage()

> **getApiErrorMessage**(`error`): `string`

Defined in: shared/ts/api-client/api-error/error.ts:110

에러 객체에서 사용자에게 보여줄 메시지를 가져옵니다.

#### Parameters

##### error

`unknown`

메시지를 추출할 에러 값입니다.

#### Returns

`string`

`ApiError` 또는 `Error`의 message를 반환하고, 알 수 없는 값이면 기본 문구를 반환합니다.

***

### getApiFieldErrorMap()

> **getApiFieldErrorMap**(`error`): `Record`\<`string`, `string`\>

Defined in: shared/ts/api-client/api-error/error.ts:128

API 검증 에러 상세 정보를 field별 메시지 맵으로 변환합니다.

#### Parameters

##### error

`unknown`

field error map으로 변환할 에러 값입니다.

#### Returns

`Record`\<`string`, `string`\>

`field` 또는 `param`을 key로, `rule` 또는 에러 메시지를 value로 갖는 객체입니다.

***

### isApiError()

> **isApiError**(`error`): `error is ApiError`

Defined in: shared/ts/api-client/api-error/error.ts:100

값이 `ApiError` 인스턴스인지 확인합니다.

#### Parameters

##### error

`unknown`

검사할 에러 값입니다.

#### Returns

`error is ApiError`

`ApiError` 인스턴스이면 `true`를 반환합니다.

***

### isApiErrorResponse()

> **isApiErrorResponse**(`value`): `value is ApiErrorResponse`

Defined in: shared/ts/api-client/api-error/error.ts:76

값이 서버의 API 에러 응답 envelope인지 확인합니다.

#### Parameters

##### value

`unknown`

검사할 값입니다.

#### Returns

`value is ApiErrorResponse`

`error.code`와 `error.message`가 문자열이면 `true`를 반환합니다.

***

### isRefreshSessionExpiredCode()

> **isRefreshSessionExpiredCode**(`code`): code is "REFRESH\_TOKEN\_INVALID" \| "REFRESH\_TOKEN\_EXPIRED" \| "REFRESH\_TOKEN\_REUSED"

Defined in: shared/ts/api-client/api-error/error.ts:56

#### Parameters

##### code

`string`

#### Returns

code is "REFRESH\_TOKEN\_INVALID" \| "REFRESH\_TOKEN\_EXPIRED" \| "REFRESH\_TOKEN\_REUSED"

***

### isRefreshUserBlockedCode()

> **isRefreshUserBlockedCode**(`code`): code is "USER\_NOT\_APPROVED" \| "USER\_INACTIVE"

Defined in: shared/ts/api-client/api-error/error.ts:64

#### Parameters

##### code

`string`

#### Returns

code is "USER\_NOT\_APPROVED" \| "USER\_INACTIVE"
