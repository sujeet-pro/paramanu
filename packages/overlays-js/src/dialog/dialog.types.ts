export type DialogSize = "sm" | "md" | "lg" | "xl" | "full"
export type DialogScrollBehavior = "inside" | "outside"

export interface DialogClassesOptions {
  size?: DialogSize
  centered?: boolean
}

export interface DialogHeaderClassesOptions {}
export interface DialogBodyClassesOptions {
  scrollBehavior?: DialogScrollBehavior
}
export interface DialogFooterClassesOptions {}

export interface CreateDialogOptions {
  onClose?: () => void
  initialFocus?: HTMLElement | string
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
}

export interface DialogInstance {
  open: () => void
  close: () => void
  destroy: () => void
}
