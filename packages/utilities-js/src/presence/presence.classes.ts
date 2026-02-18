import type { PresenceClassesOptions } from "./presence.types.js"

const BASE = "pm-presence"

/**
 * Returns BEM class names for the presence animation utility.
 *
 * Generates state-based classes that can be used alongside the
 * `data-pm-presence` attribute for CSS-driven enter/exit animations.
 *
 * @param options - Configuration options
 * @returns Space-separated class string
 *
 * @example
 * ```ts
 * presenceClasses()
 * // => "pm-presence"
 *
 * presenceClasses({ state: "entering" })
 * // => "pm-presence pm-presence--entering"
 * ```
 */
export function presenceClasses(options: PresenceClassesOptions = {}): string {
  const { state } = options
  const classes = [BASE]
  if (state) classes.push(`${BASE}--${state}`)
  return classes.join(" ")
}

/**
 * Returns CSS module class names for the presence animation utility.
 *
 * @param classMap - CSS modules class name mapping object
 * @param options - Configuration options
 * @returns Space-separated mapped class string
 */
export function presenceModuleClasses(
  classMap: Record<string, string>,
  options: PresenceClassesOptions = {},
): string {
  const { state } = options
  const classes = [classMap["pm-presence"]]
  if (state) classes.push(classMap[`pm-presence--${state}`])
  return classes.filter(Boolean).join(" ")
}
