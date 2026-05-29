# react/hooks/use-debounced-value

값 변경을 지연 반영하는 React debounce hook입니다.

## Runtime

| Runtime | Path | Notes |
| --- | --- | --- |
| React | `react/` | React hook 구현입니다. |

## Copy

다른 프로젝트에서 사용할 때는 다음 폴더를 복사합니다.

```txt
kits/react/hooks/use-debounced-value/
```

React 구현만 필요하면 다음 파일만 복사해도 됩니다.

```txt
kits/react/hooks/use-debounced-value/react/index.ts
```

## Exports

```ts
export * from "./react";
```

현재 React 구현은 다음 hook을 제공합니다.

- `useDebouncedValue`

## Dependencies

`react`가 필요합니다.

```json
{
  "peerDependencies": {
    "react": "^19.1.4"
  }
}
```

React 18 프로젝트에서도 일반적인 hook 사용 방식은 동일하지만, 이 저장소의 현재 React workspace 기준 버전은 19.1.4입니다.

## Usage

```tsx
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

useEffect(() => {
  fetchData(debouncedSearchTerm);
}, [debouncedSearchTerm]);
```

## Migration

| Old | New |
| --- | --- |
| `frontend/react-ts/src/pures/hooks/useDebouncedValue.ts` | `kits/react/hooks/use-debounced-value/react/index.ts` |

기존 `frontend/react-ts/src/pures/hooks/useDebouncedValue.ts` 경로는 호환성을 위해 새 위치를 re-export합니다.
