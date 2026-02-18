/**
 * The visibility display state.
 * - `"show"` — renders the element (uses `display: revert` to preserve original display type)
 * - `"hide"` — hides the element with `display: none`
 */
export type ShowHideDisplay = "show" | "hide"

/**
 * Options for generating show/hide class names.
 *
 * Show/Hide is a CSS-driven conditional visibility utility.
 * For conditional rendering that removes elements from the DOM entirely,
 * use the `<Show>` and `<Hide>` React components instead.
 *
 * @example
 * ```ts
 * showHideClasses({ display: "show" })
 * // => "pm-show"
 *
 * showHideClasses({ display: "hide" })
 * // => "pm-hide"
 * ```
 */
export interface ShowHideClassesOptions {
  /**
   * The visibility state to apply.
   *
   * @default "show"
   */
  display?: ShowHideDisplay
}
