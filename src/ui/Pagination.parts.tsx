import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { PaginationButtonAttrs, PaginationItem } from "../react";
import {
  controlButtonVariants,
  pageListVariants,
} from "./Pagination.styles";
import { cn } from "./utils";

export function PageControl({
  children,
  active,
  ghost,
  pill,
  inverse,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof controlButtonVariants>) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        controlButtonVariants({ active, ghost, pill, inverse }),
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PageList({
  items,
  current,
  getPageAttrs,
  compact = false,
}: {
  items: PaginationItem[];
  current: number;
  getPageAttrs: (page: number) => PaginationButtonAttrs;
  compact?: boolean;
}) {
  return (
    <ul className={pageListVariants({ wrap: true })}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>
          {item === "ellipsis" ? (
            <span
              className={cn(
                controlButtonVariants({ ghost: true }),
                compact && "min-h-8 min-w-6 px-1",
              )}
              aria-hidden="true"
            >
              …
            </span>
          ) : item === current ? (
            <span
              className={cn(
                controlButtonVariants({ active: true }),
                compact && "min-h-8 min-w-8 px-2",
              )}
              aria-current="page"
            >
              {item}
            </span>
          ) : (
            <PageControl
              {...getPageAttrs(item)}
              className={compact ? "min-h-8 min-w-8 px-2" : undefined}
            >
              {item}
            </PageControl>
          )}
        </li>
      ))}
    </ul>
  );
}
