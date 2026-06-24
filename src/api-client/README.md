# api-client

`fetch` 기반 요청, 공통 응답 타입, API 오류, 인증 토큰 갱신을 묶은 복합 모듈입니다.

이 모듈은 내부 파일 관계가 있으므로 **파일 하나가 아니라 `api-client` 폴더 전체를 복사**합니다. 외부 런타임 의존성은 없고, 브라우저 또는 fetch 구현체가 있는 환경을 전제로 합니다.

## 가장 먼저 볼 파일

| 목적 | 파일 |
| --- | --- |
| 클라이언트 생성 | `http-client/client.ts` |
| 설정과 요청 타입 | `http-client/types.ts` |
| 공통 응답 타입 | `types.ts` |
| 에러 처리 | `api-error/error.ts` |
| 전체 공개 API | `index.ts` |

## 기본 사용

```ts
import { createApiClient } from "./api-client";

const api = createApiClient("https://api.example.com", {
  authMode: "cookie",
});

const users = await api.get<User[]>("/users");
```

## refresh 흐름

- 기본 refresh 경로는 `/v1/auth/refresh`입니다.
- 기본 정책은 `401` 응답 중 `ACCESS_TOKEN_EXPIRED`, `TOKEN_EXPIRED`, `JWT_EXPIRED` 코드일 때만 refresh를 시도합니다.
- `shouldRefresh`를 주입하면 프로젝트별 refresh 조건을 직접 결정할 수 있습니다.
- `refresh()` 메서드로 수동 갱신을 실행할 수 있습니다.
- `refreshOnStart`가 `true`이면 클라이언트 생성 직후 저장된 세션 상태에 따라 초기 refresh를 시도합니다.

## 확장 포인트

| 옵션 | 용도 |
| --- | --- |
| `authMode` | `cookie` 또는 `localStorage` 인증 방식 선택 |
| `refreshTokenTransport` | refresh token을 cookie, body, none 중 어디로 보낼지 선택 |
| `fetcher` | 테스트나 서버 환경에서 사용할 fetch 구현체 주입 |
| `tokenStorage` | localStorage mode에서 사용할 token storage 주입 |
| `createError` | HTTP 오류 응답을 프로젝트 전용 Error로 변환 |
| `shouldRefresh` | refresh 대상 응답 판정 |
| `onRequestError` | 논리 요청 최종 실패 후처리 |
| `onRefreshFailure` | 공유 refresh flight 실패 후처리 |
| `refreshTimeout` | refresh HTTP 요청 타임아웃 |
| `refreshSignal` | 클라이언트 수명주기 단위 refresh 중단 signal |

서버 규격이 다르면 먼저 `http-client/types.ts`의 설정 주석을 확인합니다.
