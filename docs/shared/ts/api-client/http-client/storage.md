[**Joo Code Library API**](../../../../README.md)

***

[Joo Code Library API](../../../../modules.md) / shared/ts/api-client/http-client/storage

# shared/ts/api-client/http-client/storage

## Variables

### DEFAULT\_ACCESS\_TOKEN\_KEY

> `const` **DEFAULT\_ACCESS\_TOKEN\_KEY**: `"access_token"` = `"access_token"`

Defined in: shared/ts/api-client/http-client/storage.ts:32

Access Token Key

#### Default

```ts
"access_token"
```

***

### DEFAULT\_REFRESH\_TOKEN\_KEY

> `const` **DEFAULT\_REFRESH\_TOKEN\_KEY**: `"refresh_token"` = `"refresh_token"`

Defined in: shared/ts/api-client/http-client/storage.ts:38

Refresh Token Key

#### Default

```ts
"refresh_token"
```

## Functions

### clearStoredTokens()

> **clearStoredTokens**(`config`): `void`

Defined in: shared/ts/api-client/http-client/storage.ts:88

#### Parameters

##### config

[`ResolvedApiClientConfig`](types.md#resolvedapiclientconfig)

#### Returns

`void`

***

### createAuthTokenStorage()

> **createAuthTokenStorage**(`__namedParameters`): `object`

Defined in: shared/ts/api-client/http-client/storage.ts:103

로그인 성공 시 localStorage mode에서 토큰을 넣고,
로그아웃/세션 만료 시 토큰을 빼기 위한 helper.

#### Parameters

##### \_\_namedParameters

###### accessTokenKey?

`string` = `DEFAULT_ACCESS_TOKEN_KEY`

###### refreshTokenKey?

`string` = `DEFAULT_REFRESH_TOKEN_KEY`

###### storage?

[`TokenStorage`](types.md#tokenstorage-1) = `...`

#### Returns

`object`

##### clear()

> **clear**: () => `void`

###### Returns

`void`

##### getAccessToken()

> **getAccessToken**: () => `string` \| `null`

###### Returns

`string` \| `null`

##### getRefreshToken()

> **getRefreshToken**: () => `string` \| `null`

###### Returns

`string` \| `null`

##### setTokens()

> **setTokens**: (`__namedParameters`) => `void`

###### Parameters

###### \_\_namedParameters

`Pick`\<[`AuthTokenPayload`](types.md#authtokenpayload), `"access_token"` \| `"refresh_token"`\>

###### Returns

`void`

***

### createRefreshLockStorage()

> **createRefreshLockStorage**(`options`): `object`

Defined in: shared/ts/api-client/http-client/storage.ts:153

refresh lock storage를 생성

#### Parameters

##### options

refresh lock key와 ttl을 지정하는 옵션입니다.

###### lockKey?

`string` = `DEFAULT_REFRESH_LOCK_KEY`

###### lockTtl?

`number` = `DEFAULT_REFRESH_LOCK_TTL`

#### Returns

`object`

refresh lock storage

##### clearRefreshLock()

> **clearRefreshLock**: () => `void`

###### Returns

`void`

##### isRefreshLocked()

> **isRefreshLocked**: () => `boolean`

###### Returns

`boolean`

##### setRefreshLock()

> **setRefreshLock**: () => `void`

###### Returns

`void`

***

### getAccessToken()

> **getAccessToken**(`key`, `storage`): `string` \| `null`

Defined in: shared/ts/api-client/http-client/storage.ts:45

Access Token 가져오기

#### Parameters

##### key

`string`

Access Token Key

##### storage

[`TokenStorage`](types.md#tokenstorage-1) | `undefined`

#### Returns

`string` \| `null`

Access Token

***

### getDefaultTokenStorage()

> **getDefaultTokenStorage**(): [`TokenStorage`](types.md#tokenstorage-1) \| `undefined`

Defined in: shared/ts/api-client/http-client/storage.ts:18

#### Returns

[`TokenStorage`](types.md#tokenstorage-1) \| `undefined`

***

### getRefreshToken()

> **getRefreshToken**(`key`, `storage`): `string` \| `null`

Defined in: shared/ts/api-client/http-client/storage.ts:65

#### Parameters

##### key

`string`

##### storage

[`TokenStorage`](types.md#tokenstorage-1) | `undefined`

#### Returns

`string` \| `null`

***

### hasWindow()

> **hasWindow**(): `boolean`

Defined in: shared/ts/api-client/http-client/storage.ts:16

#### Returns

`boolean`

***

### setAccessToken()

> **setAccessToken**(`key`, `token`, `storage`): `void`

Defined in: shared/ts/api-client/http-client/storage.ts:53

#### Parameters

##### key

`string`

##### token

`string`

##### storage

[`TokenStorage`](types.md#tokenstorage-1) | `undefined`

#### Returns

`void`

***

### setRefreshToken()

> **setRefreshToken**(`key`, `token`, `storage`): `void`

Defined in: shared/ts/api-client/http-client/storage.ts:76

#### Parameters

##### key

`string`

##### token

`string`

##### storage

[`TokenStorage`](types.md#tokenstorage-1) | `undefined`

#### Returns

`void`
