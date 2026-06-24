import { Description as HeadlessuiDescription } from '@headlessui/react';
import clsx from 'clsx';
import type { ComponentProps, FC } from 'react';

/**
 * 다이얼로그 패널 - 설명
 * @param param0
 * @returns
 */
const Description: FC<ComponentProps<typeof HeadlessuiDescription>> = ({ className, children, ...props }) => {
  return (
    <HeadlessuiDescription
      className={clsx(
        className,
        'mt-1 whitespace-pre-line text-sm leading-6 text-slate-600',
      )}
      {...props}
    >
      {children}
    </HeadlessuiDescription>
  );
};

export default Description;
