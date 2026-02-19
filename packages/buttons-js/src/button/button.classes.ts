import type { BtnClassesOptions } from "./button.types.js"

const BASE = "pm-btn"

/**
 * Returns BEM class names for the button component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * btnClasses() // "pm-btn pm-btn--primary pm-btn--md"
 * btnClasses({ variant: "danger", size: "lg", loading: true })
 * // "pm-btn pm-btn--danger pm-btn--lg pm-btn--loading"
 * ```
 */
export function btnClasses(options: BtnClassesOptions = {}): string {
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
 * btnModuleClasses(styles, { variant: "primary" })
 * ```
 */
export function btnModuleClasses(
  classMap: Record<string, string>,
  options: BtnClassesOptions = {},
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
    classMap["pm-btn"],
    classMap[`pm-btn--${variant}`],
    classMap[`pm-btn--${size}`],
  ]

  if (disabled) classes.push(classMap["pm-btn--disabled"])
  if (fullWidth) classes.push(classMap["pm-btn--full-width"])
  if (loading) classes.push(classMap["pm-btn--loading"])
  if (active) classes.push(classMap["pm-btn--active"])

  return classes.filter(Boolean).join(" ")
}
