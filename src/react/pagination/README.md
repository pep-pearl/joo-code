# pagination

페이지 번호 목록과 처음·이전·다음·마지막 이동 버튼 속성을 만드는 React 코드입니다.

두 함수는 함께 사용할 수 있지만 서로 직접 의존하지 않습니다. 번호 목록만 필요하면 `usePages.ts` 하나를 복사하고, 전체 페이지네이션을 구성할 때는 이 폴더 전체를 복사합니다.

| 함수 | 용도 | 파일 | 의존성 |
| --- | --- | --- | --- |
| `usePages` | 현재 페이지 주변에 노출할 페이지 번호 계산 | `usePages.ts` | React |
| `usePaginationButtonsAttrs` | 이동 버튼의 비활성 상태, 접근성 이름, 클릭 동작 생성 | `usePaginationButtonsAttrs.ts` | React 타입 |

## 기본 사용

```tsx
import { useState } from "react";
import {
  usePages,
  usePaginationButtonsAttrs,
} from "./pagination";

export function Pagination() {
  const max = 12;
  const [current, setCurrent] = useState(1);
  const pages = usePages({ max, offset: 5, current });
  const { firstAttrs, prevAttrs, nextAttrs, lastAttrs } =
    usePaginationButtonsAttrs({ max, current, onChange: setCurrent });

  return (
    <nav aria-label="페이지 이동">
      <button type="button" {...firstAttrs}>처음</button>
      <button type="button" {...prevAttrs}>이전</button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === current ? "page" : undefined}
          onClick={() => setCurrent(page)}
        >
          {page}
        </button>
      ))}

      <button type="button" {...nextAttrs}>다음</button>
      <button type="button" {...lastAttrs}>마지막</button>
    </nav>
  );
}
```

## usePages 옵션

| 값 | 역할 |
| --- | --- |
| `max` | 전체 페이지 수. `0` 이하면 빈 배열 반환 |
| `offset` | 한 번에 노출할 페이지 번호 개수 |
| `current` | 현재 페이지 번호 |

`offset`이 전체 페이지 수 이상이면 `1`부터 `max`까지 모두 반환합니다. 처음과 끝 구간에서는 번호 개수를 유지하도록 표시 범위를 이동합니다.

```ts
usePages({ max: 12, offset: 5, current: 1 }); // [1, 2, 3, 4, 5]
usePages({ max: 12, offset: 5, current: 7 }); // [5, 6, 7, 8, 9]
usePages({ max: 12, offset: 5, current: 12 }); // [8, 9, 10, 11, 12]
```

## 이동 버튼 속성

`usePaginationButtonsAttrs`는 버튼 요소에 그대로 펼칠 수 있는 네 속성 객체를 반환합니다.

| 반환값 | 이동 위치 | 비활성 조건 |
| --- | --- | --- |
| `firstAttrs` | `1` | 첫 페이지 |
| `prevAttrs` | `current - 1` | 첫 페이지 |
| `nextAttrs` | `current + 1` | 마지막 페이지 |
| `lastAttrs` | `max` | 마지막 페이지 |

각 객체에는 한국어 `aria-label`, `disabled`, `onClick`이 포함됩니다. 버튼의 `type`, 내용, 스타일은 사용하는 화면에서 지정합니다.
