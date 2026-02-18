import type { Direction } from "./direction-provider.types.js"

/**
 * Sets the text directionality on the target element.
 *
 * Applies the `dir` attribute which controls CSS logical properties,
 * flexbox/grid layout direction, and text alignment for the element
 * and its descendants.
 *
 * @param dir - The direction to set (`"ltr"` or `"rtl"`)
 * @param target - The element to apply the direction to (defaults to `document.documentElement`)
 *
 * @example
 * ```ts
 * // Set RTL on the whole page
 * setDirection("rtl")
 *
 * // Set LTR on a specific container
 * setDirection("ltr", document.getElementById("content")!)
 * ```
 */
export function setDirection(dir: Direction, target?: HTMLElement): void {
  const el = target ?? document.documentElement
  el.setAttribute("dir", dir)
}

/**
 * Reads the current text directionality from the target element.
 *
 * Returns the value of the `dir` attribute. If the attribute is not set
 * or has an unrecognized value (e.g. `"auto"`), defaults to `"ltr"`.
 *
 * @param target - The element to read the direction from (defaults to `document.documentElement`)
 * @returns The current direction (`"ltr"` or `"rtl"`)
 *
 * @example
 * ```ts
 * getDirection()
 * // => "ltr"
 *
 * document.documentElement.setAttribute("dir", "rtl")
 * getDirection()
 * // => "rtl"
 * ```
 */
export function getDirection(target?: HTMLElement): Direction {
  const el = target ?? document.documentElement
  const dir = el.getAttribute("dir")
  return dir === "rtl" ? "rtl" : "ltr"
}
