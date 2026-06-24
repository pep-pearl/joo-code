# playground

`src/index.ts`의 public API를 실제 브라우저에서 import해 확인하는 작은 Vite 앱입니다.
별도 workspace나 별도 `package.json`을 사용하지 않습니다.

```bash
pnpm install
pnpm playground
```

프로덕션 빌드까지 확인하려면 다음을 실행합니다.

```bash
pnpm playground:build
```

새 코드를 시험할 때는 `playground/src/App.tsx`에 예제를 추가합니다. 검증이 끝난 구현은 `src`에 두고, playground에는 사용 예제만 남깁니다.

현재 숫자 포맷, 로마 숫자 변환, debounce, viewport 높이, 페이지네이션 훅, API tree, API download parser, dialog store 결과를 확인할 수 있습니다. Button, Badge, GridLayout, Tooltip처럼 상태와 형태 조합이 많은 UI 컴포넌트는 Storybook에서 자세히 확인합니다.
