/** Size preset for the close button */
export type CloseBtnSize = "xs" | "sm" | "md" | "lg"

/**
 * Options for generating close button CSS class names.
 * Used by both BEM (`closeBtnClasses`) and CSS module (`closeBtnModuleClasses`) builders.
 */
export interface CloseBtnClassesOptions {
  /** Size preset controlling dimensions. @default "md" */
  size?: CloseBtnSize
  /** Whether the button is in a disabled state. @default false */
  disabled?: boolean
}

/**
 * Full props interface for the close button component.
 * Used in alerts, dialogs, toasts, and other dismissible UI.
 */
export interface CloseBtnProps extends CloseBtnClassesOptions {
  /** Accessible label for the close button. @default "Close" */
  "aria-label"?: string
}
