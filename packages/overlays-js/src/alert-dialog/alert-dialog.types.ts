/** Visual variant for the alert dialog, indicating severity. */
export type AlertdialogVariant = "info" | "danger" | "warning"

/**
 * Options for generating alert dialog container CSS class names.
 * Used by both BEM and CSS module builders.
 */
export interface AlertdialogClassesOptions {
  /** Visual variant indicating the severity of the alert. @default "info" */
  variant?: AlertdialogVariant
}

/** Options for generating alert dialog header CSS class names. */
export interface AlertdialogHeaderClassesOptions {}

/** Options for generating alert dialog body CSS class names. */
export interface AlertdialogBodyClassesOptions {}

/** Options for generating alert dialog footer CSS class names. */
export interface AlertdialogFooterClassesOptions {}

/**
 * Options for creating a vanilla JS alert dialog instance.
 * Alert dialogs require explicit user action to dismiss (no overlay click to close).
 */
export interface CreateAlertdialogOptions {
  /** Callback invoked when the alert dialog is closed. */
  onClose?: () => void
  /** Element or CSS selector to receive initial focus when the dialog opens. */
  initialFocus?: HTMLElement | string
  /** Whether pressing Escape closes the alert dialog. @default false */
  closeOnEscape?: boolean
}

/**
 * Imperative alert dialog instance returned by `createAlertdialog()`.
 */
export interface AlertdialogInstance {
  /** Opens the alert dialog, locks scroll, traps focus. */
  open: () => void
  /** Closes the alert dialog with exit animation. */
  close: () => void
  /** Fully destroys the instance and cleans up all listeners. */
  destroy: () => void
}
