/** Size preset controlling the max-height of the bottom sheet. */
export type SheetSize = "sm" | "md" | "lg" | "full"

/**
 * Options for generating sheet CSS class names.
 * Used by both BEM (`sheetClasses`) and CSS module (`sheetModuleClasses`) builders.
 */
export interface SheetClassesOptions {
  /** Size preset controlling the max-height of the sheet. @default "md" */
  size?: SheetSize
  /** Whether the sheet is dismissible by swiping down. @default true */
  dismissible?: boolean
}

/** Options for generating sheet header CSS class names. */
export interface SheetHeaderClassesOptions {}

/** Options for generating sheet body CSS class names. */
export interface SheetBodyClassesOptions {}

/** Options for generating sheet handle (drag indicator) CSS class names. */
export interface SheetHandleClassesOptions {}

/**
 * Options for creating a vanilla JS sheet instance.
 */
export interface CreateSheetOptions {
  /** Callback invoked when the sheet is closed. */
  onClose?: () => void
  /** Element or CSS selector to receive initial focus when the sheet opens. */
  initialFocus?: HTMLElement | string
  /** Whether clicking the backdrop closes the sheet. @default true */
  closeOnBackdropClick?: boolean
  /** Whether pressing Escape closes the sheet. @default true */
  closeOnEscape?: boolean
}

/**
 * Imperative sheet instance returned by `createSheet()`.
 */
export interface SheetInstance {
  /** Opens the sheet with slide-up animation. */
  open: () => void
  /** Closes the sheet with slide-down animation. */
  close: () => void
  /** Fully destroys the instance and cleans up all listeners. */
  destroy: () => void
}
