import type { ComponentType, ReactNode } from 'react';

export type DialogActionHandler = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

export interface ConfirmAlertButtonSlotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface ConfirmAlertActionsSlotProps {
  children?: ReactNode;
  className?: string;
}

export interface ConfirmAlertPanelSlotProps {
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface ConfirmAlertTextSlotProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Confirm/Alert 기본 UI를 프로젝트별 디자인 시스템으로 교체하기 위한 슬롯.
 * 전달하지 않은 슬롯은 내장 기본 UI를 사용한다.
 */
export interface ConfirmAlertDialogUI {
  Panel?: ComponentType<ConfirmAlertPanelSlotProps>;
  Title?: ComponentType<ConfirmAlertTextSlotProps>;
  Description?: ComponentType<ConfirmAlertTextSlotProps>;
  Actions?: ComponentType<ConfirmAlertActionsSlotProps>;
  OkButton?: ComponentType<ConfirmAlertButtonSlotProps>;
  CancelButton?: ComponentType<ConfirmAlertButtonSlotProps>;
}

export interface AlertDialogProps {
  type: 'alert';
  title?: ReactNode;
  description?: ReactNode;
  customBody?: (ok: DialogActionHandler) => ReactNode;
  onOk?: () => void;
  okText?: string;
  close: () => void;
  ui?: ConfirmAlertDialogUI;
}

export interface ConfirmDialogProps extends Omit<AlertDialogProps, 'type' | 'customBody'> {
  type: 'confirm';
  onCancel?: () => void;
  cancelText?: string;
  customBody?: (ok: DialogActionHandler, cancel: () => void) => ReactNode;
}

export type ConfirmAlertDialogProps = AlertDialogProps | ConfirmDialogProps;

export interface ConfirmAlertDialogConfig {
  /** 확인 시 기존 일반 다이얼로그 닫기 (default true) */
  okDialogClose?: boolean;
  /** Esc/backdrop/닫기 버튼으로 닫힐 때 Promise resolve 값 (default false) */
  dismissResult?: boolean;
}

export interface DialogBackdropSlotProps {
  children?: ReactNode;
  className?: string;
  confirmAlertOpen?: boolean;
}

/**
 * DialogProvider의 외형을 외부에서 교체하기 위한 슬롯/클래스 설정.
 * 전달하지 않으면 기본 backdrop, z-index, confirm/alert UI를 사용한다.
 */
export interface DialogProviderUI {
  Backdrop?: ComponentType<DialogBackdropSlotProps>;
  backdropClassName?: string;
  dialogClassName?: string;
  confirmAlertDialogClassName?: string;
  confirmAlert?: ConfirmAlertDialogUI;
}

export type PropsOf<C> = C extends ComponentType<infer P> ? P : never;

export type CustomAppDialogPropMap<T extends Record<string, unknown>> = {
  [K in keyof T]: PropsOf<T[K]>;
};
