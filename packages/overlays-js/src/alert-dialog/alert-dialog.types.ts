export type AlertDialogVariant = "info" | "danger" | "warning"

export interface AlertDialogClassesOptions {
  variant?: AlertDialogVariant
}

export interface AlertDialogHeaderClassesOptions {}
export interface AlertDialogBodyClassesOptions {}
export interface AlertDialogFooterClassesOptions {}

export interface CreateAlertDialogOptions {
  onClose?: () => void
  initialFocus?: HTMLElement | string
  closeOnEscape?: boolean
}

export interface AlertDialogInstance {
  open: () => void
  close: () => void
  destroy: () => void
}
