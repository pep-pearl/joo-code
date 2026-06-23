import { type ComponentPropsWithoutRef } from "react";
import { cn } from "../utils";
import { TooltipContextProvider } from "./TooltipContextProvider";
import { type TooltipPositionAnchor, type TooltipType } from "./context";

type TooltipWrapProps = ComponentPropsWithoutRef<"span"> & {
  className?: string;
  type?: TooltipType;
  keepOpenOnContentHover?: boolean;
  positionAnchor?: TooltipPositionAnchor;
};

export function TooltipWrap({
  children,
  className,
  type = "hover",
  keepOpenOnContentHover = false,
  positionAnchor = "trigger",
  ...props
}: TooltipWrapProps) {
  return (
    <TooltipContextProvider
      type={type}
      keepOpenOnContentHover={keepOpenOnContentHover}
      positionAnchor={positionAnchor}
    >
      <span className={cn("inline-block", className)} {...props}>
        {children}
      </span>
    </TooltipContextProvider>
  );
}
