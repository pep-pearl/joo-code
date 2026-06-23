import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";
import { useTooltipContext } from "./useTooltipContext";

type TooltipPosition = {
  top: number;
  left: number;
};

type TooltipAnchorRect = Pick<
  DOMRect,
  "top" | "right" | "bottom" | "left" | "width" | "height"
>;

type TooltipContentProps = ComponentPropsWithoutRef<"div"> & {
  className?: string;
  offset?: number;
};

const VIEWPORT_PADDING = 8;
const DEFAULT_OFFSET = 8;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function getPointAnchorRect(x: number, y: number): TooltipAnchorRect {
  return {
    top: y,
    right: x,
    bottom: y,
    left: x,
    width: 0,
    height: 0,
  };
}

function getTooltipPosition({
  anchorRect,
  contentRect,
  offset,
}: {
  anchorRect: TooltipAnchorRect;
  contentRect: DOMRect;
  offset: number;
}): TooltipPosition {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top = anchorRect.bottom + offset;

  const hasEnoughSpaceBelow =
    top + contentRect.height <= viewportHeight - VIEWPORT_PADDING;
  const topWhenFlipped = anchorRect.top - contentRect.height - offset;
  const hasEnoughSpaceAbove = topWhenFlipped >= VIEWPORT_PADDING;

  if (!hasEnoughSpaceBelow && hasEnoughSpaceAbove) {
    top = topWhenFlipped;
  }

  let left = anchorRect.left + anchorRect.width / 2 - contentRect.width / 2;

  const maxLeft = Math.max(
    VIEWPORT_PADDING,
    viewportWidth - contentRect.width - VIEWPORT_PADDING,
  );
  const maxTop = Math.max(
    VIEWPORT_PADDING,
    viewportHeight - contentRect.height - VIEWPORT_PADDING,
  );

  left = Math.min(Math.max(left, VIEWPORT_PADDING), maxLeft);
  top = Math.min(Math.max(top, VIEWPORT_PADDING), maxTop);

  return { top, left };
}

export function TooltipContent({
  children,
  className,
  offset = DEFAULT_OFFSET,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: TooltipContentProps) {
  const {
    type,
    isOpen,
    contentId,
    triggerRef,
    contentRef,
    actionPointRef,
    keepOpenOnContentHover,
    positionAnchor,
    open,
    scheduleClose,
  } = useTooltipContext();
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  const updatePosition = useCallback(() => {
    const triggerElement = triggerRef.current;
    const contentElement = contentRef.current;

    if (!triggerElement || !contentElement) {
      return;
    }

    const actionPoint = actionPointRef.current;
    const anchorRect =
      positionAnchor === "pointer" && actionPoint
        ? getPointAnchorRect(actionPoint.x, actionPoint.y)
        : triggerElement.getBoundingClientRect();

    setPosition(
      getTooltipPosition({
        anchorRect,
        contentRect: contentElement.getBoundingClientRect(),
        offset,
      }),
    );
  }, [actionPointRef, contentRef, offset, positionAnchor, triggerRef]);

  useIsomorphicLayoutEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    updatePosition();
  }, [children, isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(updatePosition) : null;

    if (resizeObserver && triggerRef.current) {
      resizeObserver.observe(triggerRef.current);
    }

    if (resizeObserver && contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      resizeObserver?.disconnect();
    };
  }, [contentRef, isOpen, triggerRef, updatePosition]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      {...props}
      id={contentId}
      ref={contentRef}
      role="tooltip"
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (
          !event.defaultPrevented &&
          type === "hover" &&
          keepOpenOnContentHover
        ) {
          open();
        }
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (
          !event.defaultPrevented &&
          type === "hover" &&
          keepOpenOnContentHover
        ) {
          if (triggerRef.current?.contains(document.activeElement)) {
            return;
          }

          scheduleClose();
        }
      }}
      className={cn(
        "z-50 rounded-md text-xs bg-gray-900 text-gray-200 px-2 py-1 shadow-lg",
        "cursor-default",
        "backdrop-blur-xl",
        className,
      )}
      style={{
        ...style,
        position: "fixed",
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        visibility: position ? style?.visibility : "hidden",
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
