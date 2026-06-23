import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent,
  forwardRef,
} from "react";
import { cn } from "../utils";
import { useTooltipActionContext } from "./useTooltipContext";

type TooltipTriggerProps = ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

function assignRef<T>(ref: ForwardedRef<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

export const TooltipTrigger = forwardRef<HTMLDivElement, TooltipTriggerProps>(
  function TooltipTrigger(
    {
      children,
      className,
      tabIndex,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      onClick,
      ...props
    },
    forwardedRef,
  ) {
    const {
      type,
      isOpen,
      contentId,
      triggerRef,
      contentRef,
      positionAnchor,
      setActionPoint,
      open,
      close,
      toggle,
      scheduleClose,
    } = useTooltipActionContext();

    const setMouseActionPoint = (event: MouseEvent<HTMLDivElement>) => {
      if (positionAnchor !== "pointer") {
        setActionPoint(null);
        return;
      }

      setActionPoint({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "Escape") {
        close();
        return;
      }

      if (type === "click" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        setActionPoint(null);
        toggle();
      }
    };

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      onClick?.(event);

      if (!event.defaultPrevented && type === "click") {
        setMouseActionPoint(event);
        toggle();
      }
    };

    return (
      <div
        ref={(node) => {
          triggerRef.current = node;
          assignRef(forwardedRef, node);
        }}
        tabIndex={tabIndex ?? 0}
        aria-describedby={isOpen ? contentId : undefined}
        aria-expanded={type === "click" ? isOpen : undefined}
        aria-controls={type === "click" && isOpen ? contentId : undefined}
        data-open={isOpen ? "" : undefined}
        data-type={type}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (!event.defaultPrevented && type === "hover") {
            setMouseActionPoint(event);
            open();
          }
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (!event.defaultPrevented && type === "hover") {
            if (event.currentTarget.contains(document.activeElement)) {
              return;
            }

            scheduleClose();
          }
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (!event.defaultPrevented && type === "hover") {
            setActionPoint(null);
            open();
          }
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.defaultPrevented) {
            const nextFocusedElement = event.relatedTarget;

            const isNextFocusInTooltip =
              nextFocusedElement instanceof Node &&
              (event.currentTarget.contains(nextFocusedElement) ||
                contentRef.current?.contains(nextFocusedElement));

            if (isNextFocusInTooltip) {
              return;
            }

            if (type === "hover" || type === "click") {
              close();
            }
          }
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn("data-open:text-blue-600", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TooltipTrigger.displayName = "TooltipTrigger";
