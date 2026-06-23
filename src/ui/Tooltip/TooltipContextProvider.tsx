import {
  TooltipContext,
  type TooltipActionPoint,
  type TooltipPositionAnchor,
  type TooltipType,
} from "./context";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export function TooltipContextProvider({
  children,
  type,
  keepOpenOnContentHover = false,
  positionAnchor = "trigger",
}: {
  children: ReactNode;
  type: TooltipType;
  keepOpenOnContentHover?: boolean;
  positionAnchor?: TooltipPositionAnchor;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const actionPointRef = useRef<TooltipActionPoint | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reactId = useId();
  const contentId = `tooltip-${reactId.replace(/:/g, "")}`;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const setActionPoint = useCallback((point: TooltipActionPoint | null) => {
    actionPointRef.current = point;
  }, []);

  const open = useCallback(() => {
    clearCloseTimer();
    setIsOpen(true);
  }, [clearCloseTimer]);

  const close = useCallback(() => {
    clearCloseTimer();
    actionPointRef.current = null;
    setIsOpen(false);
  }, [clearCloseTimer]);

  const toggle = useCallback(() => {
    clearCloseTimer();
    setIsOpen((prevIsOpen) => {
      const nextIsOpen = !prevIsOpen;

      if (!nextIsOpen) {
        actionPointRef.current = null;
      }

      return nextIsOpen;
    });
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      actionPointRef.current = null;
      setIsOpen(false);
    }, 120);
  }, [clearCloseTimer]);

  useEffect(() => {
    return clearCloseTimer;
  }, [clearCloseTimer]);

  useEffect(() => {
    if (type !== "click" || !isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (
        triggerRef.current?.contains(target) ||
        contentRef.current?.contains(target)
      ) {
        return;
      }

      close();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [close, isOpen, type]);

  return (
    <TooltipContext.Provider
      value={{
        type,
        isOpen,
        contentId,
        triggerRef,
        contentRef,
        actionPointRef,
        keepOpenOnContentHover,
        positionAnchor,
        setActionPoint,
        open,
        close,
        toggle,
        scheduleClose,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}
