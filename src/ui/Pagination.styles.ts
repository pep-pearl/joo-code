import { cva } from "class-variance-authority";
import type { PaginationCssVars, KrdsPaginationTemplate } from "./Pagination.types";
import { cn } from "./utils";

export const defaultPaginationVars = {
  "--pagination-surface": "var(--color-white)",
  "--pagination-surface-soft": "var(--color-slate-50)",
  "--pagination-fg": "var(--color-slate-900)",
  "--pagination-muted": "var(--color-slate-500)",
  "--pagination-line": "var(--color-slate-200)",
  "--pagination-line-strong": "var(--color-slate-300)",
  "--pagination-primary": "var(--color-indigo-600)",
  "--pagination-primary-weak": "var(--color-indigo-50)",
  "--pagination-inverse": "var(--color-slate-950)",
  "--pagination-inverse-fg": "var(--color-white)",
  "--pagination-radius-sm": "var(--radius-pagination-sm, 0.5rem)",
  "--pagination-radius-md": "var(--radius-pagination-md, 0.75rem)",
  "--pagination-radius-lg": "var(--radius-pagination-lg, 1.25rem)",
  "--pagination-control-size": "2.5rem",
  "--pagination-font-size": "0.875rem",
} satisfies PaginationCssVars;

export const touchPaginationVars = {
  "--pagination-control-size": "3.25rem",
  "--pagination-font-size": "1.125rem",
} satisfies PaginationCssVars;

export const compactPaginationVars = {
  "--pagination-control-size": "2.125rem",
} satisfies PaginationCssVars;

export function getDefaultOffset(template: KrdsPaginationTemplate) {
  if (
    template === "krds-friendly-mobile-stack" ||
    template === "krds-friendly-icon-control" ||
    template === "service-chip-numbered"
  ) {
    return 3;
  }

  if (template === "krds-friendly-touch-large") return 5;

  return 5;
}

export const rootVariants = cva(
  "text-[length:var(--pagination-font-size)] text-[color:var(--pagination-fg)]",
  {
    variants: {
      template: {
        "krds-friendly-numbered-basic": "",
        "krds-friendly-numbered-boundary": "",
        "krds-friendly-numbered-edge-start": "",
        "krds-friendly-numbered-edge-end": "",
        "krds-friendly-numbered-with-jump": "",
        "krds-friendly-load-more-basic": "",
        "krds-friendly-mobile-stack": "",
        "krds-friendly-numbered-with-summary": "",
        "krds-friendly-numbered-with-page-size": "",
        "krds-friendly-icon-control": "",
        "krds-friendly-touch-large": "",
        "service-simple-prev-next": "w-full",
        "service-mobile-counter-pill": "w-full",
        "service-commerce-load-more-progress": "w-full",
        "service-infinite-scroll-fallback": "w-full",
        "service-carousel-dot": "w-full",
        "service-carousel-thumbnail": "w-full",
        "service-cursor-older-newer": "w-full",
        "service-timeline-load-previous": "w-full",
        "service-table-footer": "w-full",
        "service-select-page": "w-full",
        "service-sticky-bottom-bar": "w-full",
        "service-chip-numbered": "w-full",
        "service-step-progress": "w-full",
        "service-index-korean-initial": "w-full",
        "service-date-navigator": "w-full",
        "service-section-load-more": "w-full",
        "service-season-selector": "w-full",
      },
    },
  },
);

export const paginationNavVariants = cva(
  cn("flex flex-wrap items-center justify-center gap-2"),
  {
    variants: {
      stack: {
        true: "flex-col gap-3",
        false: "",
      },
      sticky: {
        true: cn(
          "mx-auto max-w-[26.25rem] rounded-full p-2.5 shadow-lg",
          "bg-[var(--pagination-inverse)] text-[color:var(--pagination-inverse-fg)]",
        ),
        false: "",
      },
    },
    defaultVariants: {
      stack: false,
      sticky: false,
    },
  },
);

export const pageListVariants = cva(
  "m-0 flex list-none items-center justify-center gap-2 p-0",
  {
    variants: {
      wrap: {
        true: "flex-wrap",
        false: "",
      },
    },
    defaultVariants: {
      wrap: true,
    },
  },
);

export const controlButtonVariants = cva(
  cn(
    "inline-flex min-h-[var(--pagination-control-size)] min-w-[var(--pagination-control-size)] items-center justify-center",
    "rounded-[var(--pagination-radius-sm)] border border-[color:var(--pagination-line)] bg-[var(--pagination-surface)] px-3",
    "font-bold text-[color:var(--pagination-fg)] transition duration-150",
    "hover:not-disabled:border-[color:var(--pagination-primary)] hover:not-disabled:bg-[var(--pagination-primary-weak)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]",
    "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-45",
  ),
  {
    variants: {
      active: {
        true: cn(
          "scale-[1.06] border-[color:var(--pagination-primary)] bg-[var(--pagination-primary)]",
          "text-white underline underline-offset-4",
        ),
        false: "",
      },
      ghost: {
        true: "border-transparent bg-transparent text-[color:var(--pagination-muted)] hover:not-disabled:bg-transparent",
        false: "",
      },
      pill: {
        true: "rounded-full px-3.5",
        false: "",
      },
      inverse: {
        true: "border-transparent bg-white text-slate-950 hover:not-disabled:bg-slate-100",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
      ghost: false,
      pill: false,
      inverse: false,
    },
  },
);

export const cardButtonClassName = cn(
  "flex min-h-16 flex-1 flex-col rounded-[var(--pagination-radius-md)] border border-[color:var(--pagination-line)]",
  "bg-[var(--pagination-surface-soft)] p-4 font-bold transition hover:border-[color:var(--pagination-primary)] hover:bg-[var(--pagination-primary-weak)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)] disabled:cursor-not-allowed disabled:opacity-45",
);

export const pillButtonClassName = cn(
  "inline-flex h-12 w-12 items-center justify-center rounded-full border-0 bg-white/10 font-black text-white",
  "transition hover:not-disabled:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-45",
);

export const visuallyHiddenClassName = cn(
  "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0",
  "[-webkit-clip-path:inset(50%)] [clip-path:inset(50%)]",
);
