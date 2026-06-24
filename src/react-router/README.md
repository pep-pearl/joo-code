# react-router

React Router에 의존하는 코드입니다. React 전용 코드와 분리해 불필요한 의존성이 따라오지 않게 했습니다.

| 항목 | 용도 | 파일 | 의존성 |
| --- | --- | --- | --- |
| `useCurrentRoute` | 현재 활성 라우트와 계층 조회 | `useCurrentRoute.ts` | `react`, `react-router` |
| `RouteMeta`, `RouteObjectWithMeta` | 라우트에 메뉴·제목 메타데이터 추가 | `route-meta.ts` | `react-router` |

```tsx
const { route, tree } = useCurrentRoute(routes);
```

```ts
const routes: RouteObjectWithMeta[] = [
  { path: "/users", meta: { title: "사용자" } },
];
```

전역 타입 확장 대신 명시적인 타입을 사용하므로 React Router 버전과 충돌할 가능성이 낮습니다.
