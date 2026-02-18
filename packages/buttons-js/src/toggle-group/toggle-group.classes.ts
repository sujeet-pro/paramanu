import type {
  ToggleGroupClassesOptions,
  ToggleGroupItemClassesOptions,
} from "./toggle-group.types.js"

const BASE = "pm-toggle-group"
const ITEM_BASE = "pm-toggle-group__item"

/**
 * Returns BEM class names for the toggle group container (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * toggleGroupClasses() // "pm-toggle-group pm-toggle-group--horizontal pm-toggle-group--md"
 * toggleGroupClasses({ attached: true, orientation: "vertical" })
 * ```
 */
export function toggleGroupClasses(options: ToggleGroupClassesOptions = {}): string {
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
 * toggleGroupModuleClasses(styles, { attached: true })
 * ```
 */
export function toggleGroupModuleClasses(
  classMap: Record<string, string>,
  options: ToggleGroupClassesOptions = {},
): string {
  const { orientation = "horizontal", size = "md", attached = false, fullWidth = false } = options

  const classes = [
    classMap["pm-toggle-group"],
    classMap[`pm-toggle-group--${orientation}`],
    classMap[`pm-toggle-group--${size}`],
  ]

  if (attached) classes.push(classMap["pm-toggle-group--attached"])
  if (fullWidth) classes.push(classMap["pm-toggle-group--full-width"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a toggle group item (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * toggleGroupItemClasses() // "pm-toggle-group__item pm-toggle-group__item--default pm-toggle-group__item--md"
 * toggleGroupItemClasses({ pressed: true, variant: "outline" })
 * ```
 */
export function toggleGroupItemClasses(options: ToggleGroupItemClassesOptions = {}): string {
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
 * toggleGroupItemModuleClasses(styles, { pressed: true })
 * ```
 */
export function toggleGroupItemModuleClasses(
  classMap: Record<string, string>,
  options: ToggleGroupItemClassesOptions = {},
): string {
  const { size = "md", variant = "default", pressed = false, disabled = false } = options

  const classes = [
    classMap["pm-toggle-group__item"],
    classMap[`pm-toggle-group__item--${variant}`],
    classMap[`pm-toggle-group__item--${size}`],
  ]

  if (pressed) classes.push(classMap["pm-toggle-group__item--pressed"])
  if (disabled) classes.push(classMap["pm-toggle-group__item--disabled"])

  return classes.filter(Boolean).join(" ")
}
