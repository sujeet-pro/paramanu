export type DrawerPlacement = "start" | "end" | "top" | "bottom"
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full"

export interface DrawerClassesOptions {
  placement?: DrawerPlacement
  size?: DrawerSize
}

export interface DrawerHeaderClassesOptions {}
export interface DrawerBodyClassesOptions {}
export interface DrawerFooterClassesOptions {}

export interface CreateDrawerOptions {
  onClose?: () => void
  initialFocus?: HTMLElement | string
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
}

export interface DrawerInstance {
  open: () => void
  close: () => void
  destroy: () => void
}
