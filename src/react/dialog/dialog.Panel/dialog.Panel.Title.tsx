import { DialogTitle } from '@headlessui/react';
import clsx from 'clsx';
import type { ComponentProps, FC } from 'react';

/**
 * 다이얼로그 패널 - 타이틀
 * @param param0
 * @returns
 */
const Title: FC<ComponentProps<typeof DialogTitle>> = ({ className, children, ...props }) => {
  return (
    <DialogTitle className={clsx('text-sm lg:text-base font-semibold', className)} {...props}>
      {children}
    </DialogTitle>
  );
};

export default Title;
