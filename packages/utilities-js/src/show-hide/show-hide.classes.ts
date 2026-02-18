import type { ShowHideClassesOptions } from "./show-hide.types.js"

/**
 * Returns the BEM class name for show/hide visibility toggling.
 *
 * - `"pm-show"` uses `display: revert` to preserve the element's
 *   original display type (block, flex, inline, etc.).
 * - `"pm-hide"` uses `display: none` to remove the element from
 *   the visual flow.
 *
 * @param options - Configuration options
 * @returns Either `"pm-show"` or `"pm-hide"`
 *
 * @example
 * ```ts
 * showHideClasses()
 * // => "pm-show"
 *
 * showHideClasses({ display: "hide" })
 * // => "pm-hide"
 * ```
 */
export function showHideClasses(options: ShowHideClassesOptions = {}): string {
  const { display = "show" } = options
  return display === "show" ? "pm-show" : "pm-hide"
}

/**
 * Returns the CSS module mapped class name for show/hide visibility.
 *
 * @param classMap - CSS modules class name mapping object
 * @param options - Configuration options
 * @returns Mapped class string, or empty string if not found
 */
export function showHideModuleClasses(
  classMap: Record<string, string>,
  options: ShowHideClassesOptions = {},
): string {
  const { display = "show" } = options
  const key = display === "show" ? "pm-show" : "pm-hide"
  return classMap[key] ?? ""
}
