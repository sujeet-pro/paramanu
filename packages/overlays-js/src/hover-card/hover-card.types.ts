export type HovercardPlacement =
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

export interface HovercardClassesOptions {
  placement?: HovercardPlacement
}

export interface HovercardArrowClassesOptions {}

export interface CreateHovercardOptions {
  placement?: HovercardPlacement
  offset?: number
  openDelay?: number
  closeDelay?: number
}

export interface HovercardInstance {
  open: () => void
  close: () => void
  destroy: () => void
}
