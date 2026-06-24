import { TooltipContent, TooltipTrigger, TooltipWrap } from "./Tooltip.parts";

type TooltipNS = typeof TooltipWrap & {
  Trigger: typeof TooltipTrigger;
  Content: typeof TooltipContent;
};

const Tooltip = TooltipWrap as TooltipNS;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export { useTooltipActionContext, useTooltipContext } from "./Tooltip.context";
export type { TooltipPositionAnchor, TooltipType } from "./Tooltip.context";
export { Tooltip };
