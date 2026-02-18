/** Visual status variant for the inline message. */
export type InlineMessageVariant = "info" | "success" | "warning" | "danger"

/** Size of the inline message. */
export type InlineMessageSize = "sm" | "md"

/** Options for generating inline message class names. */
export interface InlineMessageClassesOptions {
  /** The status variant of the inline message. Determines color scheme.
   * @default "info"
   */
  variant?: InlineMessageVariant

  /** The size of the inline message.
   * - `"sm"` -- compact, suitable for form field hints
   * - `"md"` -- standard size (default)
   * @default "md"
   */
  size?: InlineMessageSize
}
