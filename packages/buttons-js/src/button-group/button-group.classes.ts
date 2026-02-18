import type { ButtonGroupClassesOptions } from "./button-group.types.js"

const BASE = "pm-button-group"

/**
 * Returns BEM class names for the button group component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * buttonGroupClasses() // "pm-button-group pm-button-group--horizontal"
 * buttonGroupClasses({ attached: true, orientation: "vertical" })
 * // "pm-button-group pm-button-group--vertical pm-button-group--attached"
 * ```
 */
export function buttonGroupClasses(options: ButtonGroupClassesOptions = {}): string {
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
 * buttonGroupModuleClasses(styles, { attached: true })
 * ```
 */
export function buttonGroupModuleClasses(
  classMap: Record<string, string>,
  options: ButtonGroupClassesOptions = {},
): string {
  const { orientation = "horizontal", attached = false, fullWidth = false } = options

  const classes = [classMap["pm-button-group"], classMap[`pm-button-group--${orientation}`]]

  if (attached) classes.push(classMap["pm-button-group--attached"])
  if (fullWidth) classes.push(classMap["pm-button-group--full-width"])

  return classes.filter(Boolean).join(" ")
}
