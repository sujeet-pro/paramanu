import type { IconButtonClassesOptions } from "./icon-button.types.js"

const BASE = "pm-icon-button"

/**
 * Returns BEM class names for the icon button component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * iconButtonClasses() // "pm-icon-button pm-icon-button--primary pm-icon-button--md pm-icon-button--square"
 * iconButtonClasses({ variant: "ghost", shape: "circle", loading: true })
 * ```
 */
export function iconButtonClasses(options: IconButtonClassesOptions = {}): string {
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
 * iconButtonModuleClasses(styles, { variant: "ghost" })
 * ```
 */
export function iconButtonModuleClasses(
  classMap: Record<string, string>,
  options: IconButtonClassesOptions = {},
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
    classMap["pm-icon-button"],
    classMap[`pm-icon-button--${variant}`],
    classMap[`pm-icon-button--${size}`],
    classMap[`pm-icon-button--${shape}`],
  ]

  if (disabled) classes.push(classMap["pm-icon-button--disabled"])
  if (loading) classes.push(classMap["pm-icon-button--loading"])
  if (active) classes.push(classMap["pm-icon-button--active"])

  return classes.filter(Boolean).join(" ")
}
