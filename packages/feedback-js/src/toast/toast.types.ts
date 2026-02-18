/** Visual status variant for the toast. */
export type ToastVariant = "info" | "success" | "warning" | "danger"

/** Placement position of the toast container on screen. */
export type ToastPlacement =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"

/** Options for generating toast class names. */
export interface ToastClassesOptions {
  /** The status variant of the toast. Determines color accent.
   * @default "info"
   */
  variant?: ToastVariant

  /** Whether the toast can be dismissed via a close button.
   * @default false
   */
  dismissible?: boolean

  /** Whether the toast is entering the viewport (triggers enter animation).
   * @default false
   */
  entering?: boolean

  /** Whether the toast is exiting the viewport (triggers exit animation).
   * @default false
   */
  exiting?: boolean
}

/** Options for generating toast container class names. */
export interface ToastContainerClassesOptions {
  /** Placement of the toast container on screen.
   * @default "top-right"
   */
  placement?: ToastPlacement
}
