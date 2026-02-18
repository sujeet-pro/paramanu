import type { ButtonClassesOptions } from "./button.types.js"

const BASE = "pm-button"

/**
 * Returns BEM class names for the button component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * buttonClasses() // "pm-button pm-button--primary pm-button--md"
 * buttonClasses({ variant: "danger", size: "lg", loading: true })
 * // "pm-button pm-button--danger pm-button--lg pm-button--loading"
 * ```
 */
export function buttonClasses(options: ButtonClassesOptions = {}): string {
  const {
    variant = "primary",
    size = "md",
    disabled = false,
    fullWidth = false,
    loading = false,
    active = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (fullWidth) classes.push(`${BASE}--full-width`)
  if (loading) classes.push(`${BASE}--loading`)
  if (active) classes.push(`${BASE}--active`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 *
 * @example
 * ```ts
 * import styles from "./button.module.css"
 * buttonModuleClasses(styles, { variant: "primary" })
 * ```
 */
export function buttonModuleClasses(
  classMap: Record<string, string>,
  options: ButtonClassesOptions = {},
): string {
  const {
    variant = "primary",
    size = "md",
    disabled = false,
    fullWidth = false,
    loading = false,
    active = false,
  } = options

  const classes = [
    classMap["pm-button"],
    classMap[`pm-button--${variant}`],
    classMap[`pm-button--${size}`],
  ]

  if (disabled) classes.push(classMap["pm-button--disabled"])
  if (fullWidth) classes.push(classMap["pm-button--full-width"])
  if (loading) classes.push(classMap["pm-button--loading"])
  if (active) classes.push(classMap["pm-button--active"])

  return classes.filter(Boolean).join(" ")
}
