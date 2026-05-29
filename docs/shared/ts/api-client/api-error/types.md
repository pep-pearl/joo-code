[**Joo Code Library API**](../../../../README.md)

***

[Joo Code Library API](../../../../modules.md) / shared/ts/api-client/api-error/types

# shared/ts/api-client/api-error/types

## Type Aliases

### ApiErrorDetail

> **ApiErrorDetail** = `object`

Defined in: shared/ts/api-client/api-error/types.ts:11

API 에러 상세 정보입니다.

- `field`는 form field 검증 실패 위치를 나타냅니다.
- `param`은 query 또는 path parameter 검증 실패 위치를 나타냅니다.
- `rule`은 실패한 검증 규칙이나 서버가 내려준 상세 코드를 담습니다.

#### Properties

##### field?

> `optional` **field**: `string`

Defined in: shared/ts/api-client/api-error/types.ts:12

##### param?

> `optional` **param**: `string`

Defined in: shared/ts/api-client/api-error/types.ts:13

##### rule?

> `optional` **rule**: `string`

Defined in: shared/ts/api-client/api-error/types.ts:14

***

### ApiErrorPayload

> **ApiErrorPayload** = `object`

Defined in: shared/ts/api-client/api-error/types.ts:20

서버가 내려주는 API 에러 payload 타입입니다.

#### Properties

##### code

> **code**: `string`

Defined in: shared/ts/api-client/api-error/types.ts:21

##### details?

> `optional` **details**: [`ApiErrorDetail`](#apierrordetail)[]

Defined in: shared/ts/api-client/api-error/types.ts:23

##### message

> **message**: `string`

Defined in: shared/ts/api-client/api-error/types.ts:22

***

### ApiErrorResponse

> **ApiErrorResponse** = `object`

Defined in: shared/ts/api-client/api-error/types.ts:29

서버가 실패 응답으로 반환하는 공통 error envelope 타입입니다.

#### Properties

##### error

> **error**: [`ApiErrorPayload`](#apierrorpayload)

Defined in: shared/ts/api-client/api-error/types.ts:30

##### meta?

> `optional` **meta**: [`ApiMeta`](../types.md#apimeta)

Defined in: shared/ts/api-client/api-error/types.ts:31

## References

### ApiMeta

Re-exports [ApiMeta](../types.md#apimeta)
