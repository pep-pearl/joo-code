# react

React 자체에만 의존하는 재사용 코드입니다.

| 함수 | 용도 | 파일 | 의존성 |
| --- | --- | --- | --- |
| `useDebouncedValue` | 빠르게 변하는 값을 지연 반영 | `useDebouncedValue.ts` | `react` |
| `usePages` | 현재 페이지 주변의 페이지 번호 계산 | `pagination/usePages.ts` | `react` |
| `usePaginationButtonsAttrs` | 페이지 이동 버튼 속성 생성 | `pagination/usePaginationButtonsAttrs.ts` | `react` 타입 |
| `DialogProvider` | 일반 dialog와 confirm/alert 렌더링 | `dialog/` | Headless UI, Zustand |
| `DialogPanel` | dialog 패널 compound UI | `dialog/panel/` | Headless UI, React Hook Form |

```tsx
const debouncedKeyword = useDebouncedValue(keyword, 500);

useEffect(() => {
  search(debouncedKeyword);
}, [debouncedKeyword]);
```

페이지네이션 두 함수의 조합 방법과 옵션은 [`pagination/README.md`](pagination/README.md)를 확인합니다.

전역 dialog 등록, module augmentation, confirm/alert Promise 사용법은 [`dialog/README.md`](dialog/README.md)를 확인합니다.
