/** Size preset for the dialog panel. */
export type DialogSize = "xs" | "sm" | "md" | "lg" | "xl" | "full"

/** Controls where the scrollbar appears when content overflows. */
export type DialogScrollBehavior = "inside" | "outside"

/**
 * Options for generating dialog container CSS class names.
 * Used by both BEM (`dialogClasses`) and CSS module (`dialogModuleClasses`) builders.
 */
export interface DialogClassesOptions {
  /** Size preset controlling the max-width of the dialog panel. @default "md" */
  size?: DialogSize
  /** Whether to vertically center the dialog in the viewport. @default false */
  centered?: boolean
  /** Controls scroll behavior when content overflows. @default "outside" */
  scrollBehavior?: DialogScrollBehavior
}

/**
 * Options for generating dialog header CSS class names.
 */
export interface DialogHeaderClassesOptions {}

/**
 * Options for generating dialog body CSS class names.
 */
export interface DialogBodyClassesOptions {
  /** Controls scroll behavior on the body element. */
  scrollBehavior?: DialogScrollBehavior
}

/**
 * Options for generating dialog footer CSS class names.
 */
export interface DialogFooterClassesOptions {}

/**
 * Options for creating a vanilla JS dialog instance.
 * Used by `createDialog()` for imperative dialog control.
 */
export interface CreateDialogOptions {
  /** Callback invoked when the dialog is closed. */
  onClose?: () => void
  /** Element or CSS selector to receive initial focus when the dialog opens. */
  initialFocus?: HTMLElement | string
  /** Whether clicking the backdrop closes the dialog. @default true */
  closeOnBackdropClick?: boolean
  /** Whether pressing Escape closes the dialog. @default true */
  closeOnEscape?: boolean
}

/**
 * Imperative dialog instance returned by `createDialog()`.
 * Provides methods to programmatically open, close, and clean up the dialog.
 */
export interface DialogInstance {
  /** Opens the dialog, locks scroll, traps focus. */
  open: () => void
  /** Closes the dialog with exit animation. */
  close: () => void
  /** Fully destroys the dialog instance and cleans up all listeners. */
  destroy: () => void
}
