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
        'text-xs lg:text-sm text-foreground-muted mt-1 whitespace-pre-line leading-4.5 font-light',
      )}
      {...props}
    >
      {children}
    </HeadlessuiDescription>
  );
};

export default Description;
