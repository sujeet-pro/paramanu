import type { IconBtnClassesOptions } from "./icon-button.types.js"

const BASE = "pm-icon-btn"

/**
 * Returns BEM class names for the icon button component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * iconBtnClasses() // "pm-icon-btn pm-icon-btn--primary pm-icon-btn--md pm-icon-btn--square"
 * iconBtnClasses({ variant: "ghost", shape: "circle", loading: true })
 * ```
 */
export function iconBtnClasses(options: IconBtnClassesOptions = {}): string {
  const {
    variant = "primary",
    size = "md",
    shape = "square",
    disabled = false,
    loading = false,
    active = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--${shape}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (loading) classes.push(`${BASE}--loading`)
  if (active) classes.push(`${BASE}--active`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the icon button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 *
 * @example
 * ```ts
 * import styles from "./icon-button.module.css"
 * iconBtnModuleClasses(styles, { variant: "ghost" })
 * ```
 */
export function iconBtnModuleClasses(
  classMap: Record<string, string>,
  options: IconBtnClassesOptions = {},
): string {
  const {
    variant = "primary",
    size = "md",
    shape = "square",
    disabled = false,
    loading = false,
    active = false,
  } = options

  const classes = [
    classMap["pm-icon-btn"],
    classMap[`pm-icon-btn--${variant}`],
    classMap[`pm-icon-btn--${size}`],
    classMap[`pm-icon-btn--${shape}`],
  ]

  if (disabled) classes.push(classMap["pm-icon-btn--disabled"])
  if (loading) classes.push(classMap["pm-icon-btn--loading"])
  if (active) classes.push(classMap["pm-icon-btn--active"])

  return classes.filter(Boolean).join(" ")
}
