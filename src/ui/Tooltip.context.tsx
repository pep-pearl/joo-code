import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";

export type TooltipType = "hover" | "click";
export type TooltipPositionAnchor = "trigger" | "pointer";

export type TooltipActionPoint = {
  x: number;
  y: number;
};

type TooltipContextValue = {
  type: TooltipType;
  isOpen: boolean;
  contentId: string;
  triggerRef: MutableRefObject<HTMLDivElement | null>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  actionPointRef: MutableRefObject<TooltipActionPoint | null>;
  keepOpenOnContentHover: boolean;
  positionAnchor: TooltipPositionAnchor;
  setActionPoint: (point: TooltipActionPoint | null) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  scheduleClose: () => void;
};

export const TooltipContext = createContext<TooltipContextValue | null>(null);

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
