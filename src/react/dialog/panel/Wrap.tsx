import { DialogPanel } from '@headlessui/react';
import clsx from 'clsx';
import type { ComponentProps, FC, ReactNode } from 'react';
import { useDialogStore } from '../stores';

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
        'relative flex max-h-[calc(100vh-5rem)] w-[min(32rem,calc(100vw-2rem))] flex-col',
        'rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl',
        className,
      )}
      {...props}
    >
      <div className={clsx('flex grow flex-col gap-4 overflow-auto pr-4 -mr-4', bodyClassName)}>
        {showCloseButton && (
          <button
            className={clsx(
              'absolute right-4 top-4 grid size-8 place-items-center rounded-full text-slate-500',
              'transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500',
              closeButtonClassName,
            )}
            type="button"
            onClick={handleClose}
            aria-label={closeLabel}
          >
            {closeIcon ?? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
        <>{children}</>
      </div>
    </DialogPanel>
  );
};

export default Wrap;
