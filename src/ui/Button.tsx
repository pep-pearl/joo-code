import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import type { CSSProperties } from "react";
import { cn } from "./utils";

export type ButtonIntent =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "ghost";
export type ButtonVariant = "outline" | "plain" | "solid";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full";

const BUTTON_BG_NAME = "--button-bg";
const BUTTON_BG_HOVER_NAME = "--button-bg-hover";
const BUTTON_FG_NAME = "--button-fg";
const BUTTON_BORDER_COLOR_NAME = "--button-border-color";
const BUTTON_BORDER_COLOR_HOVER_NAME = "--button-border-color-hover";
const BUTTON_RADIUS_NAME = "--button-radius";
const BUTTON_PADDING_NAME = "--button-padding";
const BUTTON_FONT_SIZE_NAME = "--button-font-size";
const BUTTON_HEIGHT_NAME = "--button-height";

export type ButtonCssVars = {
  [BUTTON_BG_NAME]?: string;
  [BUTTON_BG_HOVER_NAME]?: string;
  [BUTTON_FG_NAME]?: string;
  [BUTTON_BORDER_COLOR_NAME]?: string;
  [BUTTON_BORDER_COLOR_HOVER_NAME]?: string;
  [BUTTON_RADIUS_NAME]?: string;
  [BUTTON_PADDING_NAME]?: string;
  [BUTTON_FONT_SIZE_NAME]?: string;
  [BUTTON_HEIGHT_NAME]?: string;
};

const buttonIntentVars = {
  solid: {
    primary: {
      [BUTTON_BG_NAME]: "var(--color-indigo-500)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-indigo-600)",
      [BUTTON_FG_NAME]: "var(--color-white)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
    success: {
      [BUTTON_BG_NAME]: "var(--color-emerald-500)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-emerald-600)",
      [BUTTON_FG_NAME]: "var(--color-white)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
    danger: {
      [BUTTON_BG_NAME]: "var(--color-rose-500)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-rose-600)",
      [BUTTON_FG_NAME]: "var(--color-white)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
    warning: {
      [BUTTON_BG_NAME]: "var(--color-amber-500)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-amber-600)",
      [BUTTON_FG_NAME]: "var(--color-white)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
    ghost: {
      [BUTTON_BG_NAME]: "var(--color-slate-100)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-slate-200)",
      [BUTTON_FG_NAME]: "var(--color-slate-700)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
  },

  outline: {
    primary: {
      [BUTTON_BG_NAME]: "var(--color-white)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-white)",
      [BUTTON_FG_NAME]: "var(--color-indigo-500)",
      [BUTTON_BORDER_COLOR_NAME]: "var(--color-indigo-200)",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "var(--color-indigo-500)",
    },
    success: {
      [BUTTON_BG_NAME]: "var(--color-white)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-white)",
      [BUTTON_FG_NAME]: "var(--color-emerald-500)",
      [BUTTON_BORDER_COLOR_NAME]: "var(--color-emerald-200)",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "var(--color-emerald-500)",
    },
    danger: {
      [BUTTON_BG_NAME]: "var(--color-white)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-white)",
      [BUTTON_FG_NAME]: "var(--color-rose-500)",
      [BUTTON_BORDER_COLOR_NAME]: "var(--color-rose-200)",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "var(--color-rose-500)",
    },
    warning: {
      [BUTTON_BG_NAME]: "var(--color-white)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-white)",
      [BUTTON_FG_NAME]: "var(--color-amber-500)",
      [BUTTON_BORDER_COLOR_NAME]: "var(--color-amber-200)",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "var(--color-amber-500)",
    },
    ghost: {
      [BUTTON_BG_NAME]: "var(--color-white)",
      [BUTTON_BG_HOVER_NAME]: "var(--color-white)",
      [BUTTON_FG_NAME]: "var(--color-slate-500)",
      [BUTTON_BORDER_COLOR_NAME]: "var(--color-slate-200)",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "var(--color-slate-500)",
    },
  },

  plain: {
    primary: {
      [BUTTON_BG_NAME]: "transparent",
      [BUTTON_BG_HOVER_NAME]: "var(--color-indigo-100)",
      [BUTTON_FG_NAME]: "var(--color-indigo-600)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
    success: {
      [BUTTON_BG_NAME]: "transparent",
      [BUTTON_BG_HOVER_NAME]: "var(--color-emerald-100)",
      [BUTTON_FG_NAME]: "var(--color-emerald-600)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
    danger: {
      [BUTTON_BG_NAME]: "transparent",
      [BUTTON_BG_HOVER_NAME]: "var(--color-rose-100)",
      [BUTTON_FG_NAME]: "var(--color-rose-600)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
    warning: {
      [BUTTON_BG_NAME]: "transparent",
      [BUTTON_BG_HOVER_NAME]: "var(--color-amber-100)",
      [BUTTON_FG_NAME]: "var(--color-amber-600)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
    ghost: {
      [BUTTON_BG_NAME]: "transparent",
      [BUTTON_BG_HOVER_NAME]: "var(--color-slate-100)",
      [BUTTON_FG_NAME]: "var(--color-slate-400)",
      [BUTTON_BORDER_COLOR_NAME]: "transparent",
      [BUTTON_BORDER_COLOR_HOVER_NAME]: "transparent",
    },
  },
} satisfies Record<ButtonVariant, Record<ButtonIntent, ButtonCssVars>>;

const buttonSizeVars = {
  xs: {
    [BUTTON_HEIGHT_NAME]: "1.5rem",
    [BUTTON_PADDING_NAME]: "0 0.25rem",
    [BUTTON_FONT_SIZE_NAME]: "0.75rem",
  },
  sm: {
    [BUTTON_HEIGHT_NAME]: "1.75rem",
    [BUTTON_PADDING_NAME]: "0 0.5rem",
    [BUTTON_FONT_SIZE_NAME]: "0.75rem",
  },
  md: {
    [BUTTON_HEIGHT_NAME]: "2rem",
    [BUTTON_PADDING_NAME]: "0 0.75rem",
    [BUTTON_FONT_SIZE_NAME]: "0.875rem",
  },
  lg: {
    [BUTTON_HEIGHT_NAME]: "2.5rem",
    [BUTTON_PADDING_NAME]: "0 1rem",
    [BUTTON_FONT_SIZE_NAME]: "1rem",
  },
  xl: {
    [BUTTON_HEIGHT_NAME]: "3rem",
    [BUTTON_PADDING_NAME]: "0 1.25rem",
    [BUTTON_FONT_SIZE_NAME]: "1.125rem",
  },
} satisfies Record<ButtonSize, ButtonCssVars>;

const buttonRadiusVars = {
  xs: { [BUTTON_RADIUS_NAME]: "var(--radius-button-xs, 0.125rem)" },
  sm: { [BUTTON_RADIUS_NAME]: "var(--radius-button-sm, 0.25rem)" },
  md: { [BUTTON_RADIUS_NAME]: "var(--radius-button-md, 0.375rem)" },
  lg: { [BUTTON_RADIUS_NAME]: "var(--radius-button-lg, 0.5rem)" },
  xl: { [BUTTON_RADIUS_NAME]: "var(--radius-button-xl, 0.75rem)" },
  full: { [BUTTON_RADIUS_NAME]: "calc(infinity * 1px)" },
} satisfies Record<ButtonRadius, ButtonCssVars>;

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "border font-medium cursor-pointer",

    // size
    "h-[var(--button-height)]",
    "p-[var(--button-padding)]",
    "text-[length:var(--button-font-size)]",

    // radius
    "rounded-[var(--button-radius)]",

    // intent & variant
    "bg-[var(--button-bg)]",
    "text-[color:var(--button-fg)]",
    "border-[color:var(--button-border-color)]",
    "hover:not-disabled:bg-[var(--button-bg-hover)]",
    "hover:not-disabled:border-[color:var(--button-border-color-hover)]",

    // interaction
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--focus-ring-color)]",
    "data-disabled:opacity-50",
    "data-disabled:cursor-not-allowed",
    "transition-colors duration-150",
  ),
  {
    variants: {
      intent: {
        primary: null,
        success: null,
        danger: null,
        warning: null,
        ghost: null,
      },
      variant: {
        outline: null,
        plain: null,
        solid: null,
      },
      size: {
        xs: null,
        sm: null,
        md: null,
        lg: null,
        xl: null,
      },
      radius: {
        xs: null,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        full: null,
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      intent: "primary",
      variant: "solid",
      size: "md",
      radius: "md",
      fullWidth: false,
    },
  },
);

export type ButtonProps = Omit<HeadlessButtonProps, "className" | "style"> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    style?: CSSProperties & ButtonCssVars;
  };

export function Button({
  intent,
  variant,
  size,
  radius,
  fullWidth,
  className,
  style,
  children,
  ...restProps
}: ButtonProps) {
  const resolvedIntent = intent ?? "primary";
  const resolvedVariant = variant ?? "solid";
  const resolvedSize = size ?? "md";
  const resolvedRadius = radius ?? "md";

  return (
    <HeadlessButton
      {...restProps}
      className={cn(
        buttonVariants({ intent, variant, size, radius, fullWidth }),
        className,
      )}
      style={{
        ...buttonIntentVars[resolvedVariant][resolvedIntent],
        ...buttonSizeVars[resolvedSize],
        ...buttonRadiusVars[resolvedRadius],
        ...style,
      }}
    >
      {children}
    </HeadlessButton>
  );
}
