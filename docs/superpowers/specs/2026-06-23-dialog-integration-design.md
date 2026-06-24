# Dialog integration design

## Goal

`src/react/dialog`의 공개 API와 Zustand 기반 동작을 유지하면서 프로젝트 전용 `@dmp/*` 의존성을 제거하고, 이 저장소의 `src/ui` 스타일에 맞는 기본 UI·Storybook·playground·문서를 제공한다.

## Scope

- `DialogProvider`, `DialogPanel`, confirm/alert store와 Promise 결과 규칙을 유지한다.
- 기본 확인·취소·삭제·저장 버튼은 `src/ui/Button`으로 구성한다.
- 프로젝트 전용 SVG 대신 내부 close icon을 사용한다.
- dialog를 `src/react`와 최상위 public API에서 export한다.
- Storybook에 alert, confirm, custom body, 일반 dialog 흐름을 추가한다.
- playground에 실제 store를 호출하고 Promise 결과를 확인하는 예제를 추가한다.
- dialog README와 상위 README의 목록·사용 예제를 갱신한다.

## Default visual design

- 흰색 중립 패널, 얇은 slate 계열 border, 16px radius, 적당한 shadow를 사용한다.
- 제목과 설명은 현재 `src/ui`의 typography·색상 체계에 맞춘다.
- 취소는 `Button`의 ghost/outline 계열, 기본 확인은 primary solid, 삭제는 danger solid를 사용한다.
- 단순 alert/confirm은 우측 정렬 action row를 사용한다.
- 복잡한 폼을 위해 기존 compound API(`DialogPanel.Title`, `Description`, `Form`, `FormWithProvider`)는 유지한다.

## API and behavior

- `useDialogStore.open(key, props)`와 `close()` 동작을 유지한다.
- `confirm()`은 확인 시 `true`, 취소·dismiss 시 `false`를 resolve한다.
- `alert()`는 확인 시 `true`, dismiss 시 `dismissResult`를 resolve한다.
- confirm/alert가 열린 동안 아래의 일반 dialog는 숨김·비활성 상태를 유지한다.
- provider와 개별 dialog의 UI slot override 우선순위를 유지한다.

## Dependencies

- runtime: `zustand`, `react-hook-form`을 설치한다.
- `@loadable/component` 타입 결합은 일반 React component type으로 대체해 불필요한 의존성을 만들지 않는다.
- tests: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`을 설치한다.
- Storybook 설정에만 있고 사용되지 않는 addon 항목은 제거한다. `@storybook/addon-docs`는 autodocs 때문에 유지한다.

## Verification

- 기존 store/provider 테스트를 정상 한글로 정리하고 먼저 실패하는 테스트를 추가한다.
- dialog 테스트, TypeScript check, playground build, Storybook build를 실행한다.
- Storybook과 playground에서 alert, confirm, custom body, 일반 dialog를 직접 확인한다.

## Non-goals

- store 구조나 Promise 계약을 새 API로 재설계하지 않는다.
- dialog stack, animation system, focus management를 별도로 새로 만들지 않는다. 접근성·focus trap은 Headless UI 동작을 사용한다.
- `src/temp`, `src/api-slot-kit`은 읽거나 변경하지 않는다.
