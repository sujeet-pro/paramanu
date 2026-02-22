import type { ToggleGrpClassesOptions, ToggleGrpItemClassesOptions } from "./toggle-group.types.js"

const BASE = "pm-toggle-grp"
const ITEM_BASE = "pm-toggle-grp__item"

/**
 * Returns BEM class names for the toggle group container (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * toggleGrpClasses() // "pm-toggle-grp pm-toggle-grp--horizontal pm-toggle-grp--md"
 * toggleGrpClasses({ attached: true, orientation: "vertical" })
 * ```
 */
export function toggleGrpClasses(options: ToggleGrpClassesOptions = {}): string {
  const { orientation = "horizontal", size = "md", attached = false, fullWidth = false } = options
  const classes = [BASE, `${BASE}--${orientation}`, `${BASE}--${size}`]

  if (attached) classes.push(`${BASE}--attached`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the toggle group container (hashed).
 * Used by bundled/template consumers who import CSS modules.
 *
 * @example
 * ```ts
 * import styles from "./toggle-group.module.css"
 * toggleGrpModuleClasses(styles, { attached: true })
 * ```
 */
export function toggleGrpModuleClasses(
  classMap: Record<string, string>,
  options: ToggleGrpClassesOptions = {},
): string {
  const { orientation = "horizontal", size = "md", attached = false, fullWidth = false } = options

  const classes = [
    classMap["pm-toggle-grp"],
    classMap[`pm-toggle-grp--${orientation}`],
    classMap[`pm-toggle-grp--${size}`],
  ]

  if (attached) classes.push(classMap["pm-toggle-grp--attached"])
  if (fullWidth) classes.push(classMap["pm-toggle-grp--full-width"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a toggle group item (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * toggleGrpItemClasses() // "pm-toggle-grp__item pm-toggle-grp__item--default pm-toggle-grp__item--md"
 * toggleGrpItemClasses({ pressed: true, variant: "outline" })
 * ```
 */
export function toggleGrpItemClasses(options: ToggleGrpItemClassesOptions = {}): string {
  const { size = "md", variant = "default", pressed = false, disabled = false } = options
  const classes = [ITEM_BASE, `${ITEM_BASE}--${variant}`, `${ITEM_BASE}--${size}`]

  if (pressed) classes.push(`${ITEM_BASE}--pressed`)
  if (disabled) classes.push(`${ITEM_BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for a toggle group item (hashed).
 * Used by bundled/template consumers who import CSS modules.
 *
 * @example
 * ```ts
 * import styles from "./toggle-group.module.css"
 * toggleGrpItemModuleClasses(styles, { pressed: true })
 * ```
 */
export function toggleGrpItemModuleClasses(
  classMap: Record<string, string>,
  options: ToggleGrpItemClassesOptions = {},
): string {
  const { size = "md", variant = "default", pressed = false, disabled = false } = options

  const classes = [
    classMap["pm-toggle-grp__item"],
    classMap[`pm-toggle-grp__item--${variant}`],
    classMap[`pm-toggle-grp__item--${size}`],
  ]

  if (pressed) classes.push(classMap["pm-toggle-grp__item--pressed"])
  if (disabled) classes.push(classMap["pm-toggle-grp__item--disabled"])

  return classes.filter(Boolean).join(" ")
}
