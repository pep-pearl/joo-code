import { TooltipContent } from "./TooltipContent";
import { TooltipTrigger } from "./TooltipTrigger";
import { TooltipWrap } from "./TooltipWrap";
import {
  useTooltipActionContext,
  useTooltipContext,
} from "./useTooltipContext";

type TooltipNS = typeof TooltipWrap & {
  Trigger: typeof TooltipTrigger;
  Content: typeof TooltipContent;
};

const Tooltip = TooltipWrap as TooltipNS;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export { Tooltip, useTooltipActionContext, useTooltipContext };
export type { TooltipPositionAnchor, TooltipType } from "./context";
