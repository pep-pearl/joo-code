import { Dialog } from '@headlessui/react';
import type { LoadableComponent } from '@loadable/component';
import clsx from 'clsx';
import { Suspense } from 'react';
import ConfirmAlertDialog from './dialog.ConfirmAlertDialog';
import { useConfirmAlertDialogStore, useDialogStore } from './dialog.stores';
import type { DialogBackdropSlotProps, DialogProviderUI } from './dialog.types';

export interface DialogProviderProps {
  dialogMap: Record<string, React.ComponentType<any> | LoadableComponent<any>>;
  fallback?: React.ReactNode;
  /** Backdrop/confirm-alert 버튼/패널 등 UI 교체용 설정. 미지정 시 기본 UI 사용 */
  ui?: DialogProviderUI;
}

const backdropBase =
  'fixed bg-black/50 backdrop-blur-xs inset-0 overflow-y-auto flex w-screen h-dvh items-center justify-center';

const DefaultBackdrop: React.FC<DialogBackdropSlotProps> = ({ children, className }) => {
  return <div className={clsx(backdropBase, className)}>{children}</div>;
};

const DialogProvider: React.FC<DialogProviderProps> = ({ dialogMap, fallback, ui }) => {
  /* 다이얼로그 state */
  const props = useDialogStore(s => s.props);
  const key = useDialogStore(s => s.key);
  const close = useDialogStore(s => s.close);

  /* confirm / alert 다이얼로그 state */
  const confirmAlertProps = useConfirmAlertDialogStore(s => s.props);
  const dismissConfirmAlert = useConfirmAlertDialogStore(s => s.dismiss);

  const Comp = key ? (dialogMap[key] as React.ComponentType<any>) : null;
  const Backdrop = ui?.Backdrop ?? DefaultBackdrop;
  const confirmAlertOpen = !!confirmAlertProps;

  function handleDialogClose() {
    if (!confirmAlertOpen) close();
  }

  return (
    <>
      {/* 일반 다이얼로그 */}
      {key && Comp && (
        <Dialog
          open
          onClose={handleDialogClose}
          aria-hidden={confirmAlertOpen || undefined}
          className={clsx('fixed inset-0 z-50', confirmAlertOpen && 'pointer-events-none', ui?.dialogClassName)}
        >
          <Backdrop className={ui?.backdropClassName} confirmAlertOpen={confirmAlertOpen}>
            <Suspense fallback={fallback}>
              <Comp {...(props as unknown as object)} close={close} />
            </Suspense>
          </Backdrop>
        </Dialog>
      )}

      {/* confirm / alert 다이얼로그 */}
      {confirmAlertProps && (
        <Dialog
          open
          role="alertdialog"
          onClose={dismissConfirmAlert}
          className={clsx('fixed inset-0 z-[60]', ui?.confirmAlertDialogClassName)}
        >
          <Backdrop className={ui?.backdropClassName} confirmAlertOpen>
            <Suspense fallback={fallback}>
              <ConfirmAlertDialog props={confirmAlertProps} ui={ui?.confirmAlert} />
            </Suspense>
          </Backdrop>
        </Dialog>
      )}
    </>
  );
};

export default DialogProvider;
