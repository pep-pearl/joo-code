# browser/viewport

모바일 브라우저에서 실제 viewport 높이를 CSS 변수로 보정하기 위한 DOM 유틸리티입니다.

## Runtime

| Runtime | Path | Notes |
| --- | --- | --- |
| TypeScript | `vanilla-ts/` | React나 특정 프레임워크에 묶이지 않는 브라우저 DOM 구현입니다. |

## Copy

다른 프로젝트에서 사용할 때는 다음 폴더를 복사합니다.

```txt
kits/browser/viewport/
```

TypeScript 구현만 필요하면 다음 파일만 복사해도 됩니다.

```txt
kits/browser/viewport/vanilla-ts/index.ts
```

## Exports

```ts
export * from "./vanilla-ts";
```

현재 TypeScript 구현은 다음 함수를 제공합니다.

- `initViewportHeight`

## Dependencies

외부 런타임 의존성이 없습니다.

브라우저의 `window`와 `document.documentElement.style`을 사용합니다. SSR 환경에서는 아무 작업도 하지 않는 cleanup 함수를 반환합니다.

## Usage

```ts
const cleanup = initViewportHeight();

cleanup();
```

```css
.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
```

## Migration

| Old | New |
| --- | --- |
| `shared/ts/dom/viewport.ts` | `kits/browser/viewport/vanilla-ts/index.ts` |

기존 `shared/ts/dom/viewport.ts` 경로는 호환성을 위해 새 위치를 re-export합니다.
