# Archive Map

`joo-code`의 복붙용 유닛 목록입니다.

## Format

| Unit | Runtime | Use when | Copy path |
| --- | --- | --- | --- |
| [`format/number`](../kits/format/number/README.md) | `vanilla-ts` | 숫자 콤마 표기, 천원 단위 금액 변환, 로마 숫자 변환이 필요할 때 | `kits/format/number/` |

## Browser

| Unit | Runtime | Use when | Copy path |
| --- | --- | --- | --- |
| [`browser/viewport`](../kits/browser/viewport/README.md) | `vanilla-ts` | 모바일 브라우저의 실제 viewport 높이를 CSS 변수로 보정해야 할 때 | `kits/browser/viewport/` |

## React

| Unit | Runtime | Use when | Copy path |
| --- | --- | --- | --- |
| [`react/hooks/use-debounced-value`](../kits/react/hooks/use-debounced-value/README.md) | `react` | 빠르게 바뀌는 값을 지연 반영해 API 호출이나 후속 처리를 줄이고 싶을 때 | `kits/react/hooks/use-debounced-value/` |

## Reading Order

1. 필요한 문제 영역을 이 파일에서 찾습니다.
2. 유닛 README를 읽고 복사할 폴더와 의존성을 확인합니다.
3. 기존 경로에서 찾고 있다면 [`migration.md`](migration.md)를 확인합니다.
