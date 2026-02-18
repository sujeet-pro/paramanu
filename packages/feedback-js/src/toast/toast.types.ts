export type ToastVariant = "info" | "success" | "warning" | "danger"

export type ToastPlacement =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"

export interface ToastClassesOptions {
  variant?: ToastVariant
  dismissible?: boolean
  entering?: boolean
  exiting?: boolean
}

export interface ToastContainerClassesOptions {
  placement?: ToastPlacement
}
