/**
 * The text directionality of the document or a subtree.
 *
 * - `"ltr"` — Left-to-right (English, French, etc.)
 * - `"rtl"` — Right-to-left (Arabic, Hebrew, etc.)
 *
 * All Paramanu CSS uses CSS logical properties (`margin-inline-start`,
 * `padding-inline-end`, etc.) so components automatically adapt to
 * the configured direction.
 */
export type Direction = "ltr" | "rtl"

/**
 * Options for direction provider functions.
 *
 * The direction provider manages the `dir` HTML attribute which controls
 * CSS logical properties and the layout direction of text, flexbox, and
 * grid containers.
 *
 * @example
 * ```ts
 * setDirection("rtl")
 * // <html dir="rtl">
 *
 * getDirection()
 * // => "rtl"
 * ```
 */
export interface DirectionProviderOptions {
  /**
   * The DOM element to set the `dir` attribute on.
   * Defaults to `document.documentElement` for whole-page directionality.
   *
   * @default document.documentElement
   */
  target?: HTMLElement
}
