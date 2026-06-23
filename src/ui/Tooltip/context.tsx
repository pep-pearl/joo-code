import { createContext, type MutableRefObject } from "react";

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
