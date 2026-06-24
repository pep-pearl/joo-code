# dialog

Zustand store에서 일반 다이얼로그와 confirm/alert를 열고, `DialogProvider` 한 곳에서 렌더링하는 React 모듈입니다. 접근성, focus trap, Esc·backdrop dismiss는 Headless UI `Dialog`가 처리합니다.

| 항목 | 용도 | 의존성 |
| --- | --- | --- |
| `DialogProvider` | 등록된 일반 dialog와 confirm/alert 렌더링 | React, Headless UI |
| `useDialogStore` | key와 props로 일반 dialog 열기 | Zustand |
| `useConfirmAlertDialogStore` | Promise 기반 confirm/alert 열기 | Zustand |
| `DialogPanel` | 패널, 제목, 설명, form compound UI | Headless UI |
| `ModeDialogPanel` | mode에 따른 하단 버튼 구성 | React Hook Form |

기본 UI는 `src/ui/Button`과 Tailwind CSS를 사용합니다. 다른 프로젝트로 복사할 때는 `dialog` 폴더와 함께 `src/ui/Button.tsx`, `src/ui/utils.ts`, `src/ui/global.css`를 복사합니다.

## Provider 설정

앱 최상단에 `DialogProvider`를 한 번 렌더링합니다.

```tsx
const dialogMap = { profile: ProfileDialog };

export function App() {
  return <DialogProvider dialogMap={dialogMap} fallback={null} />;
}
```

## 일반 dialog

dialog 컴포넌트에는 등록한 props와 `close`가 전달됩니다.

```tsx
export function ProfileDialog({ name, close }: { name: string; close: () => void }) {
  return (
    <DialogPanel>
      <DialogPanel.Title>프로필 편집</DialogPanel.Title>
      <DialogPanel.Description>{name}님의 정보를 수정합니다.</DialogPanel.Description>
      <Button onClick={close}>닫기</Button>
    </DialogPanel>
  );
}
```

key별 props 타입은 module augmentation으로 연결합니다.

```ts
declare module "./react/dialog" {
  interface AppDialogPropMap {
    profile: { name: string };
  }
}

useDialogStore.getState().open("profile", { name: "홍길동" });
```

## confirm과 alert

`confirm()`과 `alert()`는 사용자가 선택한 결과를 `Promise<boolean>`으로 반환합니다.

```ts
const confirmed = await useConfirmAlertDialogStore.getState().confirm({
  title: "삭제할까요?",
  description: "삭제한 항목은 복구할 수 없습니다.",
  okText: "삭제",
  cancelText: "취소",
});
```

```ts
await useConfirmAlertDialogStore.getState().alert({
  title: "저장 완료",
  description: "변경사항을 저장했습니다.",
});
```

| 동작 | confirm 결과 | alert 결과 |
| --- | --- | --- |
| 확인 버튼 | `true` | `true` |
| 취소 버튼 | `false` | 해당 없음 |
| Esc, backdrop, 닫기 버튼 | `false` | 기본 `false` |

두 번째 인자로 동작을 조정합니다.

```ts
await useConfirmAlertDialogStore.getState().alert(props, {
  okDialogClose: false,
  dismissResult: true,
});
```

- `okDialogClose`: 확인할 때 아래에 열린 일반 dialog도 닫습니다. 기본값은 `true`입니다.
- `dismissResult`: alert를 dismiss할 때 반환할 값입니다. 기본값은 `false`입니다.

## custom body

기본 action 버튼 대신 입력이나 검증 UI를 직접 구성합니다.

```tsx
useConfirmAlertDialogStore.getState().confirm({
  title: "직접 입력해 확인",
  customBody: (ok, cancel) => (
    <div>
      <input aria-label="확인 문구" />
      <Button onClick={cancel}>취소</Button>
      <Button intent="danger" onClick={ok}>삭제</Button>
    </div>
  ),
});
```

## UI 교체

`DialogProvider`의 `ui`는 backdrop과 confirm/alert slot을 교체합니다. 개별 confirm/alert의 `ui`가 Provider 설정보다 우선합니다.

```tsx
<DialogProvider
  dialogMap={dialogMap}
  ui={{
    backdropClassName: "bg-slate-950/70",
    confirmAlert: { OkButton: BrandButton, CancelButton: SecondaryButton },
  }}
/>
```

교체 가능한 slot은 `Panel`, `Title`, `Description`, `Actions`, `OkButton`, `CancelButton`입니다.

## Form panel

일반 form은 `DialogPanel.Form`, React Hook Form을 함께 사용할 때는 `DialogPanel.FormWithProvider`를 사용합니다.

```tsx
<DialogPanel.FormWithProvider methods={methods} onSubmit={methods.handleSubmit(save)}>
  <input {...methods.register("name")} />
  <Button type="submit">저장</Button>
</DialogPanel.FormWithProvider>
```

## 확인

```bash
pnpm storybook
pnpm playground
```

Storybook의 `React/Dialog`에서 confirm, alert, custom body, 일반 dialog를 확인할 수 있습니다.
