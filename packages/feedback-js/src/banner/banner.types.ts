/** Visual status variant for the banner. */
export type BannerVariant = "info" | "success" | "warning" | "danger"

/** Placement position of the banner. */
export type BannerPosition = "top" | "bottom"

/** Options for generating banner class names. */
export interface BannerClassesOptions {
  /** The status variant of the banner. Determines color scheme.
   * @default "info"
   */
  variant?: BannerVariant

  /** Whether the banner sticks to the viewport edge.
   * @default false
   */
  sticky?: boolean

  /** Whether the banner can be dismissed via a close button.
   * @default false
   */
  dismissible?: boolean

  /** Position of the banner (only relevant when sticky).
   * @default "top"
   */
  position?: BannerPosition
}

/** Props for the banner component (extends class options for framework adapters). */
export interface BannerProps extends BannerClassesOptions {
  /** Callback invoked when the close button is clicked. */
  onClose?: () => void
}
