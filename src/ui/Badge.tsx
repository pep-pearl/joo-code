import { cva, type VariantProps } from "class-variance-authority";
import type { PolymorphicProps } from "./types";
import { cn } from "./utils";

export type BadgeIntent =
  | "info"
  | "warning"
  | "error"
  | "success"
  | "primary"
  | "ghost";
export type BadgeVariant = "outline" | "plain" | "solid";
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full";

const BADGE_BG_NAME = "--badge-bg";
const BADGE_FG_NAME = "--badge-fg";
const BADGE_BORDER_COLOR_NAME = "--badge-border-color";
const BADGE_RADIUS_NAME = "--badge-radius";
const BADGE_FONT_SIZE_NAME = "--badge-font-size";
const BADGE_PADDING_BLOCK_NAME = "--badge-padding-block";
const BADGE_PADDING_INLINE_NAME = "--badge-padding-inline";
const BADGE_HEIGHT_NAME = "--badge-height";

type BadgeCssVars = {
  [BADGE_BG_NAME]?: string;
  [BADGE_FG_NAME]?: string;
  [BADGE_BORDER_COLOR_NAME]?: string;
  [BADGE_RADIUS_NAME]?: string;
  [BADGE_FONT_SIZE_NAME]?: string;
  [BADGE_PADDING_BLOCK_NAME]?: string;
  [BADGE_PADDING_INLINE_NAME]?: string;
  [BADGE_HEIGHT_NAME]?: string;
};

const badgeIntentVars = {
  outline: {
    info: {
      [BADGE_BG_NAME]: "var(--color-blue-100)",
      [BADGE_FG_NAME]: "var(--color-blue-500)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-blue-500)",
    },
    warning: {
      [BADGE_BG_NAME]: "var(--color-amber-100)",
      [BADGE_FG_NAME]: "var(--color-amber-500)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-amber-500)",
    },
    error: {
      [BADGE_BG_NAME]: "var(--color-rose-100)",
      [BADGE_FG_NAME]: "var(--color-rose-500)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-rose-500)",
    },
    success: {
      [BADGE_BG_NAME]: "var(--color-emerald-100)",
      [BADGE_FG_NAME]: "var(--color-emerald-500)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-emerald-500)",
    },
    primary: {
      [BADGE_BG_NAME]: "var(--color-indigo-100)",
      [BADGE_FG_NAME]: "var(--color-indigo-500)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-indigo-500)",
    },
    ghost: {
      [BADGE_BG_NAME]: "var(--color-slate-100)",
      [BADGE_FG_NAME]: "var(--color-slate-500)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-slate-500)",
    },
  },

  plain: {
    info: {
      [BADGE_BG_NAME]: "transparent",
      [BADGE_FG_NAME]: "var(--color-blue-500)",
      [BADGE_BORDER_COLOR_NAME]: "transparent",
    },
    warning: {
      [BADGE_BG_NAME]: "transparent",
      [BADGE_FG_NAME]: "var(--color-amber-500)",
      [BADGE_BORDER_COLOR_NAME]: "transparent",
    },
    error: {
      [BADGE_BG_NAME]: "transparent",
      [BADGE_FG_NAME]: "var(--color-rose-500)",
      [BADGE_BORDER_COLOR_NAME]: "transparent",
    },
    success: {
      [BADGE_BG_NAME]: "transparent",
      [BADGE_FG_NAME]: "var(--color-emerald-500)",
      [BADGE_BORDER_COLOR_NAME]: "transparent",
    },
    primary: {
      [BADGE_BG_NAME]: "transparent",
      [BADGE_FG_NAME]: "var(--color-indigo-500)",
      [BADGE_BORDER_COLOR_NAME]: "transparent",
    },
    ghost: {
      [BADGE_BG_NAME]: "transparent",
      [BADGE_FG_NAME]: "var(--color-slate-300)",
      [BADGE_BORDER_COLOR_NAME]: "transparent",
    },
  },

  solid: {
    info: {
      [BADGE_BG_NAME]: "var(--color-blue-500)",
      [BADGE_FG_NAME]: "var(--color-blue-100)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-blue-500)",
    },
    warning: {
      [BADGE_BG_NAME]: "var(--color-amber-500)",
      [BADGE_FG_NAME]: "var(--color-amber-100)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-amber-500)",
    },
    error: {
      [BADGE_BG_NAME]: "var(--color-rose-500)",
      [BADGE_FG_NAME]: "var(--color-rose-100)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-rose-500)",
    },
    success: {
      [BADGE_BG_NAME]: "var(--color-emerald-500)",
      [BADGE_FG_NAME]: "var(--color-emerald-100)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-emerald-500)",
    },
    primary: {
      [BADGE_BG_NAME]: "var(--color-indigo-500)",
      [BADGE_FG_NAME]: "var(--color-indigo-100)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-indigo-500)",
    },
    ghost: {
      [BADGE_BG_NAME]: "var(--color-slate-300)",
      [BADGE_FG_NAME]: "var(--color-slate-600)",
      [BADGE_BORDER_COLOR_NAME]: "var(--color-slate-300)",
    },
  },
} satisfies Record<BadgeVariant, Record<BadgeIntent, BadgeCssVars>>;

const badgeSizeVars: Record<BadgeSize, BadgeCssVars> = {
  xs: {
    [BADGE_HEIGHT_NAME]: "1.5rem",
    [BADGE_PADDING_BLOCK_NAME]: "0",
    [BADGE_PADDING_INLINE_NAME]: "0.25rem",
    [BADGE_FONT_SIZE_NAME]: "0.75rem",
  },
  sm: {
    [BADGE_HEIGHT_NAME]: "1.75rem",
    [BADGE_PADDING_BLOCK_NAME]: "0",
    [BADGE_PADDING_INLINE_NAME]: "0.5rem",
    [BADGE_FONT_SIZE_NAME]: "0.875rem",
  },
  md: {
    [BADGE_HEIGHT_NAME]: "2rem",
    [BADGE_PADDING_BLOCK_NAME]: "0",
    [BADGE_PADDING_INLINE_NAME]: "0.75rem",
    [BADGE_FONT_SIZE_NAME]: "0.875rem",
  },
  lg: {
    [BADGE_HEIGHT_NAME]: "2.5rem",
    [BADGE_PADDING_BLOCK_NAME]: "0",
    [BADGE_PADDING_INLINE_NAME]: "1rem",
    [BADGE_FONT_SIZE_NAME]: "1rem",
  },
  xl: {
    [BADGE_HEIGHT_NAME]: "3rem",
    [BADGE_PADDING_BLOCK_NAME]: "0",
    [BADGE_PADDING_INLINE_NAME]: "1.25rem",
    [BADGE_FONT_SIZE_NAME]: "1.125rem",
  },
} satisfies Record<BadgeSize, BadgeCssVars>;

const badgeRadiusVars: Record<BadgeRadius, BadgeCssVars> = {
  xs: { [BADGE_RADIUS_NAME]: "var(--radius-badge-xs, 0.125rem)" },
  sm: { [BADGE_RADIUS_NAME]: "var(--radius-badge-sm, 0.25rem)" },
  md: { [BADGE_RADIUS_NAME]: "var(--radius-badge-md, 0.375rem)" },
  lg: { [BADGE_RADIUS_NAME]: "var(--radius-badge-lg, 0.5rem)" },
  xl: { [BADGE_RADIUS_NAME]: "var(--radius-badge-xl, 0.75rem)" },
  full: { [BADGE_RADIUS_NAME]: "calc(infinity * 1px)" },
} as const;

const badgeVariants = cva(
  cn(
    "inline-flex items-center justify-center",

    // size
    "h-[var(--badge-height)]",
    "px-[var(--badge-padding-inline)]",
    "py-[var(--badge-padding-block)]",
    "text-[length:var(--badge-font-size)]",

    // radius
    "rounded-[var(--badge-radius)]",

    // intent & variant
    "bg-[var(--badge-bg)]",
    "text-[color:var(--badge-fg)]",
    "border",
    "border-[color:var(--badge-border-color)]",
  ),
  {
    variants: {
      intent: {
        info: null,
        warning: null,
        error: null,
        success: null,
        primary: null,
      },
      variant: {
        outline: null,
        plain: null,
        solid: null,
      },
      radius: {
        xs: null,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        full: null,
      },
      size: {
        xs: null,
        sm: null,
        md: null,
        lg: null,
        xl: null,
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        variant: "solid",
        className: "",
      },
    ],
  },
);

type BadgeProps = PolymorphicProps<"div", VariantProps<typeof badgeVariants>>;

export function Badge({
  variant,
  fullWidth,
  intent,
  radius,
  size,
  children,
  className,
  as = "div",
  style,

  ...restProps
}: BadgeProps) {
  const Component = as as React.ElementType;
  return (
    <Component
      {...restProps}
      className={cn(
        badgeVariants({ variant, fullWidth, intent, radius, size }),
        className,
      )}
      style={{
        ...badgeIntentVars[variant ?? "solid"][intent ?? "primary"],
        ...badgeSizeVars[size ?? "md"],
        ...badgeRadiusVars[radius ?? "md"],
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
