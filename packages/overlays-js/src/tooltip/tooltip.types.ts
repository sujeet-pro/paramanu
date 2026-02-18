export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"

export interface TooltipClassesOptions {
  placement?: TooltipPlacement
}

export interface TooltipArrowClassesOptions {}

export interface CreateTooltipOptions {
  placement?: TooltipPlacement
  offset?: number
  showDelay?: number
  hideDelay?: number
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
  destroy: () => void
}
