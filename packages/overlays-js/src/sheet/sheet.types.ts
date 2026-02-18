export type SheetSize = "sm" | "md" | "lg" | "full"

export interface SheetClassesOptions {
  size?: SheetSize
}

export interface SheetHeaderClassesOptions {}
export interface SheetBodyClassesOptions {}
export interface SheetHandleClassesOptions {}

export interface CreateSheetOptions {
  onClose?: () => void
  initialFocus?: HTMLElement | string
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
}

export interface SheetInstance {
  open: () => void
  close: () => void
  destroy: () => void
}
