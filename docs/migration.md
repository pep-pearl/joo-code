# Migration

구조 리팩토링 중 기존 경로에서 새 아카이브 경로로 이동한 내역입니다.

## 2026-05-29

| Old | New | Notes |
| --- | --- | --- |
| `shared/ts/format/number.ts` | `kits/format/number/vanilla-ts/index.ts` | 구현 파일을 첫 번째 copy-ready kit으로 이동했습니다. 기존 경로는 호환성을 위해 re-export합니다. |
| `shared/ts/dom/viewport.ts` | `kits/browser/viewport/vanilla-ts/index.ts` | viewport 높이 보정 유틸을 browser kit으로 이동했습니다. 기존 경로는 호환성을 위해 re-export합니다. |
| `frontend/react-ts/src/pures/hooks/useDebouncedValue.ts` | `kits/react/hooks/use-debounced-value/react/index.ts` | debounce hook을 React hook kit으로 이동했습니다. 기존 경로는 호환성을 위해 re-export합니다. |
