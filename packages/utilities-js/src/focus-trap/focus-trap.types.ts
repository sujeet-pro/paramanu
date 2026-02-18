export interface FocusTrapOptions {
  initialFocus?: HTMLElement | string
  returnFocusOnDeactivate?: boolean
  onEscapeKey?: () => void
}

export interface FocusTrapInstance {
  activate: () => void
  deactivate: () => void
  destroy: () => void
}
