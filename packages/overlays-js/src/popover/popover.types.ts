export type PopoverPlacement =
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

export interface PopoverClassesOptions {
  placement?: PopoverPlacement
  hasArrow?: boolean
}

export interface PopoverArrowClassesOptions {}

export interface CreatePopoverOptions {
  placement?: PopoverPlacement
  offset?: number
  onClose?: () => void
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  trapFocus?: boolean
}

export interface PopoverInstance {
  open: () => void
  close: () => void
  updatePosition: () => void
  destroy: () => void
}
