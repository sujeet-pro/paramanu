export type HoverCardPlacement =
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

export interface HoverCardClassesOptions {
  placement?: HoverCardPlacement
}

export interface HoverCardArrowClassesOptions {}

export interface CreateHoverCardOptions {
  placement?: HoverCardPlacement
  offset?: number
  openDelay?: number
  closeDelay?: number
}

export interface HoverCardInstance {
  open: () => void
  close: () => void
  destroy: () => void
}
