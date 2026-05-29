[**Joo Code Archive API**](../../../../README.md)

***

[Joo Code Archive API](../../../../modules.md) / shared/ts/api-client/http-client/client

# shared/ts/api-client/http-client/client

## Functions

### createApiClient()

> **createApiClient**(`apiBaseUrl`, `config`): [`ApiClient`](types.md#apiclient)

Defined in: shared/ts/api-client/http-client/client.ts:34

지정한 API 기본 URL을 기준으로 HTTP 메서드가 포함된 API 클라이언트를 생성합니다.

- 모든 요청은 `request`를 통해 실행되며, 공통 timeout, 인증, refresh 설정을 공유합니다.
- `apiBaseUrl` 끝의 `/`와 요청 `path` 앞의 `/`는 내부에서 정규화됩니다.
- 응답 타입은 호출 시 제네릭으로 지정합니다.

#### Parameters

##### apiBaseUrl

`string`

요청을 보낼 API 기본 URL입니다.

##### config

[`ApiClientConfig`](types.md#apiclientconfig) = `{}`

인증 방식, timeout, refresh 경로, fetch 구현체 등을 지정하는 설정입니다.

#### Returns

[`ApiClient`](types.md#apiclient)

GET, POST, PUT, PATCH, DELETE 메서드를 가진 API 클라이언트입니다.

#### Example

```ts
const apiClient = createApiClient("https://api.example.com", {
  authMode: "cookie",
  timeout: 5000,
});

const response = await apiClient.get<ApiResponse<User>>("/users/me");
```
