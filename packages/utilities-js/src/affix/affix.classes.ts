import type { AffixClassesOptions } from "./affix.types.js"

const BASE = "pm-affix"

/**
 * Returns BEM class names for the affix (sticky positioning) utility.
 *
 * Generates classes for `position: sticky` with a configurable
 * top/bottom position and offset from the sticky edge.
 *
 * @param options - Configuration options
 * @returns Space-separated class string
 *
 * @example
 * ```ts
 * affixClasses()
 * // => "pm-affix pm-affix--top"
 *
 * affixClasses({ position: "bottom", offset: "4" })
 * // => "pm-affix pm-affix--bottom pm-affix--offset-4"
 * ```
 */
export function affixClasses(options: AffixClassesOptions = {}): string {
  const { position = "top", offset } = options
  const classes = [BASE, `${BASE}--${position}`]
  if (offset !== undefined) classes.push(`${BASE}--offset-${offset}`)
  return classes.join(" ")
}

/**
 * Returns CSS module class names for the affix utility.
 *
 * @param classMap - CSS modules class name mapping object
 * @param options - Configuration options
 * @returns Space-separated mapped class string
 */
export function affixModuleClasses(
  classMap: Record<string, string>,
  options: AffixClassesOptions = {},
): string {
  const { position = "top", offset } = options
  const classes = [classMap["pm-affix"], classMap[`pm-affix--${position}`]]
  if (offset !== undefined) classes.push(classMap[`pm-affix--offset-${offset}`])
  return classes.filter(Boolean).join(" ")
}
