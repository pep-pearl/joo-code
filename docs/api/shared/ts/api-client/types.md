[**Joo Code Archive API**](../../../README.md)

***

[Joo Code Archive API](../../../modules.md) / shared/ts/api-client/types

# shared/ts/api-client/types

## Type Aliases

### ApiMeta

> **ApiMeta** = `Record`\<`string`, `unknown`\>

Defined in: shared/ts/api-client/types.ts:10

API 응답의 부가 정보를 담는 meta 객체입니다.

***

### ApiResponse

> **ApiResponse**\<`TData`, `TMeta`\> = `TData` *extends* `null` \| `void` ? `object` : `object`

Defined in: shared/ts/api-client/types.ts:22

서버가 성공 응답으로 반환하는 공통 envelope 타입입니다.

- 실제 payload는 `data`에 들어갑니다.
- 페이지네이션, trace id 같은 부가 정보는 `meta`에 둘 수 있습니다.
- `TData`가 `null` 또는 `void`이면 `data`는 `null`로 고정됩니다.

#### Type Parameters

##### TData

`TData`

응답 data의 타입입니다.

##### TMeta

`TMeta` = [`ApiMeta`](#apimeta)

응답 meta의 타입입니다.

## References

### ApiErrorDetail

Re-exports [ApiErrorDetail](api-error/types.md#apierrordetail)

***

### ApiErrorPayload

Re-exports [ApiErrorPayload](api-error/types.md#apierrorpayload)

***

### ApiErrorResponse

Re-exports [ApiErrorResponse](api-error/types.md#apierrorresponse)
