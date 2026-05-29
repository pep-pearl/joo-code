# format/number

숫자 표기와 변환에 자주 쓰는 순수 TypeScript 유틸리티입니다.

## Runtime

| Runtime | Path | Notes |
| --- | --- | --- |
| TypeScript | `vanilla-ts/` | React나 특정 프레임워크에 묶이지 않는 구현입니다. |

## Copy

다른 프로젝트에서 사용할 때는 다음 폴더를 복사합니다.

```txt
kits/format/number/
```

TypeScript 구현만 필요하면 다음 파일만 복사해도 됩니다.

```txt
kits/format/number/vanilla-ts/index.ts
```

## Exports

```ts
export * from "./vanilla-ts";
```

현재 TypeScript 구현은 다음 함수를 제공합니다.

- `formatCommaNumber`
- `formatThousandToEok`
- `romanToNumber`

## Dependencies

외부 런타임 의존성이 없습니다.

## Migration

| Old | New |
| --- | --- |
| `shared/ts/format/number.ts` | `kits/format/number/vanilla-ts/index.ts` |

기존 `shared/ts/format/number.ts` 경로는 호환성을 위해 새 위치를 re-export합니다.
