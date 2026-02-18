/**
 * The sticky edge position for an affixed element.
 *
 * - `"top"` — Sticks to the top of the scrolling container
 * - `"bottom"` — Sticks to the bottom of the scrolling container
 */
export type AffixPosition = "top" | "bottom"

/**
 * Available spacing scale values for the affix offset.
 * Maps to Paramanu spacing tokens (`--pm-spacing-*`).
 */
export type SpacingScale = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16"

/**
 * Options for generating affix (sticky positioning) class names.
 *
 * The Affix utility applies `position: sticky` with configurable
 * top/bottom offset using Paramanu spacing tokens. Useful for
 * sticky headers, toolbars, table headers, and floating action buttons.
 *
 * The element will stick to the specified edge when it reaches that
 * position during scrolling, within its parent's scroll context.
 *
 * @example
 * ```ts
 * // Sticky header at top with no offset
 * affixClasses()
 * // => "pm-affix pm-affix--top"
 *
 * // Sticky footer with 16px offset from bottom
 * affixClasses({ position: "bottom", offset: "4" })
 * // => "pm-affix pm-affix--bottom pm-affix--offset-4"
 * ```
 */
export interface AffixClassesOptions {
  /**
   * Which edge the element sticks to.
   *
   * @default "top"
   */
  position?: AffixPosition

  /**
   * The distance from the sticky edge, using the Paramanu spacing scale.
   * Maps to `--pm-spacing-*` tokens. When not set, the element sticks
   * at exactly 0 offset from the edge.
   */
  offset?: SpacingScale
}
