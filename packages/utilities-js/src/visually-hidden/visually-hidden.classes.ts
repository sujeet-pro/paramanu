import type { SrOnlyClassesOptions } from "./visually-hidden.types.js"

const BASE = "pm-sr-only"

/**
 * Returns BEM class names for the visually hidden utility.
 *
 * Generates classes that visually hide an element while keeping it
 * accessible to screen readers. Uses the well-established clip-rect
 * technique recommended by WebAIM and used by major design systems
 * (Radix, Chakra, Mantine, React Aria).
 *
 * @param options - Configuration options
 * @returns Space-separated class string
 *
 * @example
 * ```ts
 * srOnlyClasses()
 * // => "pm-sr-only"
 *
 * srOnlyClasses({ focusable: true })
 * // => "pm-sr-only pm-sr-only--focusable"
 * ```
 */
export function srOnlyClasses(options: SrOnlyClassesOptions = {}): string {
  const { focusable = false } = options
  const classes = [BASE]
  if (focusable) classes.push(`${BASE}--focusable`)
  return classes.join(" ")
}

/**
 * Returns CSS module class names for the visually hidden utility.
 *
 * Maps BEM class names through a CSS modules class map for hashed
 * class name support in bundled environments.
 *
 * @param classMap - CSS modules class name mapping object
 * @param options - Configuration options
 * @returns Space-separated mapped class string
 *
 * @example
 * ```ts
 * import styles from "@paramanu/utilities-js/modules/visually-hidden/map"
 * srOnlyModuleClasses(styles, { focusable: true })
 * ```
 */
export function srOnlyModuleClasses(
  classMap: Record<string, string>,
  options: SrOnlyClassesOptions = {},
): string {
  const { focusable = false } = options
  const classes = [classMap["pm-sr-only"]]
  if (focusable) classes.push(classMap["pm-sr-only--focusable"])
  return classes.filter(Boolean).join(" ")
}
