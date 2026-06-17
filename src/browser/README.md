# browser

브라우저 DOM에 직접 접근하는 작은 유틸입니다.

| 함수 | 용도 | 파일 |
| --- | --- | --- |
| `initViewportHeight` | 모바일 주소창 변화에 맞춰 `--vh` 갱신 | `initViewportHeight.ts` |

```ts
const cleanup = initViewportHeight();
cleanup();
```

```css
.page {
  min-height: calc(var(--vh, 1vh) * 100);
}
```

브라우저 전용 코드이지만 SSR에서 호출해도 오류가 발생하지 않습니다.
