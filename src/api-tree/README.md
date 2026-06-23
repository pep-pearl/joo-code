# api-tree

API 경로와 HTTP 메서드를 중첩 객체로 선언하고, 각 endpoint를 `{ method, path }` 형태로 조회하는 모듈입니다.

요청을 직접 보내지는 않습니다. API 주소를 한 곳에서 관리하거나 HTTP 클라이언트에 전달할 경로와 메서드를 타입 안전하게 찾을 때 사용합니다.

이 모듈은 내부 파일이 함께 동작하므로 **`api-tree` 폴더 전체를 복사**합니다. 외부 런타임 의존성은 없습니다.

## 가장 먼저 볼 파일

| 목적 | 파일 |
| --- | --- |
| API 구조 선언과 기본 `apiMap` | `tree.ts` |
| 트리를 endpoint 정보로 변환 | `decorate.ts` |
| HTTP 메서드와 변환 타입 | `types.ts` |
| 기본 공개 API | `index.ts` |

## 기본 사용

`API_TREE`에 선언된 endpoint는 같은 구조의 `apiMap`에서 조회합니다.

```ts
import { apiMap } from "./api-tree";

apiMap.auth.user.login;
// { method: "POST", path: "/auth/user/login" }

apiMap.posts._;
// { method: "GET", path: "/posts" }

apiMap.posts[":postId"].comments.create;
// { method: "POST", path: "/posts/:postId/comments/create" }
```

`_`는 현재 노드 자체를 endpoint로 사용할 때 지정합니다. `_`를 제외한 키는 경로 조각으로 이어집니다.

```ts
const tree = {
  posts: {
    _: "GET", // GET /posts
    create: "POST", // POST /posts/create
    ":postId": {
      _: "GET", // GET /posts/:postId
      update: "PUT", // PUT /posts/:postId/update
    },
  },
} as const;
```

## 경로 파라미터 사용

`:postId` 같은 키는 실제 값으로 자동 치환되지 않습니다. 요청 직전에 필요한 값으로 바꿉니다.

```ts
const postId = 42;
const endpoint = apiMap.posts[":postId"].update;
const path = endpoint.path.replace(":postId", String(postId));

fetch(path, { method: endpoint.method });
```

## 커스텀 트리 만들기

`Tree` 타입으로 선언 구조를 검사하고 `decorate`로 같은 구조의 endpoint map을 만듭니다.

```ts
import { decorate } from "./api-tree/decorate";
import type { Tree } from "./api-tree/types";

const MY_API_TREE = {
  health: "GET",
  users: {
    _: "GET",
    create: "POST",
    ":userId": {
      _: "GET",
      profile: {
        update: "PATCH",
      },
    },
  },
} as const satisfies Tree;

export const myApiMap = decorate(MY_API_TREE);
```

`myApiMap.users[":userId"].profile.update`의 타입은 다음 리터럴 정보를 유지합니다.

```ts
{
  method: "PATCH";
  path: "/users/:userId/profile/update";
}
```

## 지원 규칙

| 항목 | 동작 |
| --- | --- |
| HTTP 메서드 | `GET`, `POST`, `PUT`, `DELETE`, `PATCH` |
| leaf 문자열 | 해당 키까지의 경로를 endpoint로 생성 |
| `_` 키 | 현재 노드 경로를 endpoint로 생성 |
| 중첩 객체 | 상위 경로를 이어서 하위 endpoint 생성 |
| `undefined` 값 | 결과에서 제외 |

기본 API 구조를 바꾸려면 `tree.ts`의 `API_TREE`만 수정합니다. `ApiTree`는 선언 원본 타입이고, `ApiMap`은 `decorate`가 만든 결과 타입입니다.
