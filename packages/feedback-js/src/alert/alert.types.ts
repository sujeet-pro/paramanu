/** Visual style variants for the alert component. */
export type AlertVariant = "info" | "success" | "warning" | "danger"

/** Visual style of the alert. */
export type AlertStyle = "subtle" | "solid" | "outline"

/** Options for generating alert class names. */
export interface AlertClassesOptions {
  /** The status variant of the alert. Determines color scheme and default icon.
   * @default "info"
   */
  variant?: AlertVariant

  /** The visual style of the alert.
   * - `"subtle"` -- light background with colored border (default)
   * - `"solid"` -- fully colored background with white text
   * - `"outline"` -- transparent background with colored border
   * @default "subtle"
   */
  alertStyle?: AlertStyle

  /** Whether the alert can be dismissed via a close button.
   * @default false
   */
  dismissible?: boolean
}

/** Props for the alert component (extends class options for framework adapters). */
export interface AlertProps extends AlertClassesOptions {
  /** Callback invoked when the close button is clicked. */
  onClose?: () => void
}
