# react

React 자체에만 의존하는 재사용 코드입니다.

| 함수 | 용도 | 파일 | 의존성 |
| --- | --- | --- | --- |
| `useDebouncedValue` | 빠르게 변하는 값을 지연 반영 | `useDebouncedValue.ts` | `react` |

```tsx
const debouncedKeyword = useDebouncedValue(keyword, 500);

useEffect(() => {
  search(debouncedKeyword);
}, [debouncedKeyword]);
```
