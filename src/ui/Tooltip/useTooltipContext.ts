import { useContext } from "react";
import { TooltipContext } from "./context";

export function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (context === null) {
    throw new Error("useTooltipContext must be used within a Tooltip");
  }
  return context;
}

export function useTooltipActionContext() {
  const {
    type,
    open,
    close,
    toggle,
    scheduleClose,
    triggerRef,
    contentRef,
    actionPointRef,
    keepOpenOnContentHover,
    positionAnchor,
    setActionPoint,
    contentId,
    isOpen,
  } = useTooltipContext();

  return {
    type,
    open,
    close,
    toggle,
    scheduleClose,
    triggerRef,
    contentRef,
    actionPointRef,
    keepOpenOnContentHover,
    positionAnchor,
    setActionPoint,
    contentId,
    isOpen,
  };
}
