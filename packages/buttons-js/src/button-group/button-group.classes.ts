import type { BtnGroupClassesOptions } from "./button-group.types.js"

const BASE = "pm-btn-group"

/**
 * Returns BEM class names for the button group component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * btnGroupClasses() // "pm-btn-group pm-btn-group--horizontal"
 * btnGroupClasses({ attached: true, orientation: "vertical" })
 * // "pm-btn-group pm-btn-group--vertical pm-btn-group--attached"
 * ```
 */
export function btnGroupClasses(options: BtnGroupClassesOptions = {}): string {
  const { orientation = "horizontal", attached = false, fullWidth = false } = options
  const classes = [BASE, `${BASE}--${orientation}`]

  if (attached) classes.push(`${BASE}--attached`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the button group component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 *
 * @example
 * ```ts
 * import styles from "./button-group.module.css"
 * btnGroupModuleClasses(styles, { attached: true })
 * ```
 */
export function btnGroupModuleClasses(
  classMap: Record<string, string>,
  options: BtnGroupClassesOptions = {},
): string {
  const { orientation = "horizontal", attached = false, fullWidth = false } = options

  const classes = [classMap["pm-btn-group"], classMap[`pm-btn-group--${orientation}`]]

  if (attached) classes.push(classMap["pm-btn-group--attached"])
  if (fullWidth) classes.push(classMap["pm-btn-group--full-width"])

  return classes.filter(Boolean).join(" ")
}
