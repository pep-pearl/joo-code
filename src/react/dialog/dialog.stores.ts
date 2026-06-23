import type { LoadableComponent } from '@loadable/component';
import type { ComponentType } from 'react';
import { create } from 'zustand';
import type {
  AlertDialogProps,
  ConfirmAlertDialogConfig,
  ConfirmAlertDialogProps,
  ConfirmDialogProps,
} from './dialog.types';
import type { AppDialogPropMap } from './index';

export type ComponentLike = ComponentType<any> | LoadableComponent<any>;

type DialogKey = Extract<keyof AppDialogPropMap, string>;

export type DialogState =
  | { key: undefined; props: undefined }
  | { [P in DialogKey]: { key: P; props: AppDialogPropMap[P] } }[DialogKey];

export type DialogStore = DialogState & {
  open: <T extends DialogKey>(key: T, props: AppDialogPropMap[T]) => void;
  close: () => void;
  forceClose: () => void;
};

/**
 * 전역 다이얼로그 상태 훅
 * - `key`: DIALOG_MAP에 등록된 다이얼로그 키
 * - `props`: `key`의 컴포넌트 프롭
 * - `open(key, props)`: 지정한 다이얼로그를 연다.
 * - `close()`: 현재 다이얼로그를 닫는다.
 */
export const useDialogStore = create<DialogStore>()(set => ({
  key: undefined,
  props: undefined,
  open: (key, props) => set({ key, props } as DialogState),
  close: () => set({ key: undefined, props: undefined }),
  forceClose: () => set({ key: undefined, props: undefined }),
}));

//////////////////////////////////////////////////////////////////

type ConfirmAlertDialogStore = {
  props?: ConfirmAlertDialogProps;
  open: (props: ConfirmAlertDialogProps) => void;
  /** 상태만 비운다. confirm()/alert() Promise 정리는 props.close/onOk/onCancel을 통해 처리한다. */
  close: () => void;
  /** 현재 confirm/alert를 사용자 dismiss로 처리한다. Esc/backdrop/X 버튼에서 사용한다. */
  dismiss: () => void;
  confirm: (
    props: Omit<ConfirmDialogProps, 'close' | 'type'>,
    config?: ConfirmAlertDialogConfig,
  ) => Promise<boolean>;
  alert: (props: Omit<AlertDialogProps, 'close' | 'type'>, config?: ConfirmAlertDialogConfig) => Promise<boolean>;
};

const getConfig = (config?: ConfirmAlertDialogConfig): Required<ConfirmAlertDialogConfig> => ({
  okDialogClose: config?.okDialogClose ?? true,
  dismissResult: config?.dismissResult ?? false,
});

/**
 * Confirm/Alert 다이얼로그 상태 훅
 */
export const useConfirmAlertDialogStore = create<ConfirmAlertDialogStore>()((set, get) => ({
  props: undefined,
  open: props => set({ props }),
  close: () => set({ props: undefined }),
  dismiss: () => {
    const props = get().props;
    if (!props) return;
    props.close();
  },
  confirm: (props, config) =>
    new Promise<boolean>(resolve => {
      const { okDialogClose } = getConfig(config);
      let settled = false;

      const settle = (result: boolean, callback?: () => void) => {
        if (settled) return;
        settled = true;

        callback?.();
        get().close();

        // 확인 시 기존 일반 다이얼로그도 닫기
        if (result && okDialogClose) useDialogStore.getState().close();

        resolve(result);
      };

      get().open({
        ...props,
        close: () => settle(false, props.onCancel),
        onOk: () => settle(true, props.onOk),
        onCancel: () => settle(false, props.onCancel),
        type: 'confirm',
      });
    }),
  alert: (props, config) =>
    new Promise<boolean>(resolve => {
      const { okDialogClose, dismissResult } = getConfig(config);
      let settled = false;

      const settle = (result: boolean, callback?: () => void) => {
        if (settled) return;
        settled = true;

        callback?.();
        get().close();

        // 확인 시 기존 일반 다이얼로그도 닫기
        if (result && okDialogClose) useDialogStore.getState().close();

        resolve(result);
      };

      get().open({
        ...props,
        close: () => settle(dismissResult),
        onOk: () => settle(true, props.onOk),
        type: 'alert',
      });
    }),
}));
