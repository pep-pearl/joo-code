import CloseIcon from '@dmp/assets/svgs/close_24dp_1F1F1F_FILL1_wght700_GRAD0_opsz24.svg?react';
import { DialogPanel } from '@headlessui/react';
import clsx from 'clsx';
import type { ComponentProps, FC, ReactNode } from 'react';
import { useDialogStore } from '../dialog.stores';

/**
 * 다이얼로그 패널 wrapper
 * - onClose가 있으면 해당 핸들러만 호출한다.
 * - onClose가 없으면 일반 다이얼로그 store를 닫는다.
 * - confirm/alert store를 직접 건드리지 않아 중첩 다이얼로그 사이드이펙트를 줄인다.
 */
const Wrap: FC<
  Omit<ComponentProps<typeof DialogPanel>, 'children'> & {
    children: ReactNode;
    onClose?: () => void;
    showCloseButton?: boolean;
    closeLabel?: string;
    closeIcon?: ReactNode;
    bodyClassName?: string;
    closeButtonClassName?: string;
  }
> = ({
  children,
  className,
  onClose,
  showCloseButton = true,
  closeLabel = '닫기',
  closeIcon,
  bodyClassName,
  closeButtonClassName,
  ...props
}) => {
  const fallbackClose = useDialogStore(s => s.close);

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    fallbackClose();
  };

  return (
    <DialogPanel
      className={clsx(
        'relative max-w-7/8 max-h-[calc(100vh-80px)] lg:min-w-sm bg-background p-6 lg:p-8 rounded-2xl',
        'flex flex-col border border-foreground-subtle',
        className,
      )}
      {...props}
    >
      <div className={clsx('overflow-auto grow pr-4 -mr-4 flex flex-col gap-4', bodyClassName)}>
        {showCloseButton && (
          <button
            className={clsx(
              'absolute right-4 top-4 lg:right-8 lg:top-8 size-4 flex-center-center text-foreground-subtle',
              closeButtonClassName,
            )}
            type="button"
            onClick={handleClose}
            aria-label={closeLabel}
          >
            {closeIcon ?? <CloseIcon className="size-5" />}
          </button>
        )}
        <>{children}</>
      </div>
    </DialogPanel>
  );
};

export default Wrap;
