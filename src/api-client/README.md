# api-client

`fetch` 기반 요청, 공통 응답 타입, API 오류, 인증 토큰 갱신을 묶은 복합 모듈입니다.

이 모듈은 내부 파일 관계가 있으므로 **파일 하나가 아니라 `api-client` 폴더 전체를 복사**합니다. 외부 런타임 의존성은 없습니다.

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

로컬 스토리지 토큰, refresh 요청 형식, 인증 만료 콜백 등은 `ApiClientConfig`로 조정합니다. 서버 규격이 다르면 먼저 `http-client/types.ts`의 설정 주석을 확인합니다.
