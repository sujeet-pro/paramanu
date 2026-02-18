import type { ToggleButtonClassesOptions } from "./toggle-button.types.js"

const BASE = "pm-toggle-button"

/**
 * Returns BEM class names for the toggle button component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * toggleButtonClasses() // "pm-toggle-button pm-toggle-button--default pm-toggle-button--md"
 * toggleButtonClasses({ pressed: true, variant: "outline" })
 * // "pm-toggle-button pm-toggle-button--outline pm-toggle-button--md pm-toggle-button--pressed"
 * ```
 */
export function toggleButtonClasses(options: ToggleButtonClassesOptions = {}): string {
  const {
    variant = "default",
    size = "md",
    pressed = false,
    disabled = false,
    fullWidth = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (pressed) classes.push(`${BASE}--pressed`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the toggle button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 *
 * @example
 * ```ts
 * import styles from "./toggle-button.module.css"
 * toggleButtonModuleClasses(styles, { pressed: true })
 * ```
 */
export function toggleButtonModuleClasses(
  classMap: Record<string, string>,
  options: ToggleButtonClassesOptions = {},
): string {
  const {
    variant = "default",
    size = "md",
    pressed = false,
    disabled = false,
    fullWidth = false,
  } = options

  const classes = [
    classMap["pm-toggle-button"],
    classMap[`pm-toggle-button--${variant}`],
    classMap[`pm-toggle-button--${size}`],
  ]

  if (pressed) classes.push(classMap["pm-toggle-button--pressed"])
  if (disabled) classes.push(classMap["pm-toggle-button--disabled"])
  if (fullWidth) classes.push(classMap["pm-toggle-button--full-width"])

  return classes.filter(Boolean).join(" ")
}
