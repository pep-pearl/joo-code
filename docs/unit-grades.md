# Unit Grades

각 kit은 복사 단위와 유지 비용에 따라 Small, Medium, Large 중 하나로 관리합니다.

## Small

작은 순수 함수, 단일 hook, 단일 타입 유틸에 사용합니다.

필수 구성:

```txt
README.md
<runtime>/index.ts
```

권장 구성:

```txt
index.ts
example.ts
```

## Medium

여러 타입, 옵션, 환경 조건이 있는 유틸에 사용합니다.

필수 구성:

```txt
README.md
<runtime>/index.ts
<runtime>/types.ts
```

권장 구성:

```txt
index.ts
examples/
tests/
deps.md
```

## Large

API client처럼 파일이 여러 개이고 내부 의존 관계가 있는 복합 로직에 사용합니다.

필수 구성:

```txt
README.md
deps.md
<runtime>/
examples/
```

권장 구성:

```txt
tests/
MIGRATION.md
```

## Runtime Folder Names

| Runtime | Use for |
| --- | --- |
| `vanilla-ts` | React, Node, Electron 등에 직접 묶이지 않는 TypeScript 구현 |
| `vanilla-js` | JavaScript 구현 |
| `react` | React 전용 hook, component helper, type |
| `react-router` | React Router 전용 pattern이나 hook |

새 런타임은 실제 유닛이 생길 때 추가합니다.
