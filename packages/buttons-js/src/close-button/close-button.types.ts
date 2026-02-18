/** Size preset for the close button */
export type CloseButtonSize = "xs" | "sm" | "md" | "lg"

/**
 * Options for generating close button CSS class names.
 * Used by both BEM (`closeButtonClasses`) and CSS module (`closeButtonModuleClasses`) builders.
 */
export interface CloseButtonClassesOptions {
  /** Size preset controlling dimensions. @default "md" */
  size?: CloseButtonSize
  /** Whether the button is in a disabled state. @default false */
  disabled?: boolean
}

/**
 * Full props interface for the close button component.
 * Used in alerts, dialogs, toasts, and other dismissible UI.
 */
export interface CloseButtonProps extends CloseButtonClassesOptions {
  /** Accessible label for the close button. @default "Close" */
  "aria-label"?: string
}
