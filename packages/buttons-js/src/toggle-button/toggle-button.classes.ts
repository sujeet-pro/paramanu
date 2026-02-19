import type { ToggleBtnClassesOptions } from "./toggle-button.types.js"

const BASE = "pm-toggle-btn"

/**
 * Returns BEM class names for the toggle button component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * toggleBtnClasses() // "pm-toggle-btn pm-toggle-btn--default pm-toggle-btn--md"
 * toggleBtnClasses({ pressed: true, variant: "outline" })
 * // "pm-toggle-btn pm-toggle-btn--outline pm-toggle-btn--md pm-toggle-btn--pressed"
 * ```
 */
export function toggleBtnClasses(options: ToggleBtnClassesOptions = {}): string {
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
 * toggleBtnModuleClasses(styles, { pressed: true })
 * ```
 */
export function toggleBtnModuleClasses(
  classMap: Record<string, string>,
  options: ToggleBtnClassesOptions = {},
): string {
  const {
    variant = "default",
    size = "md",
    pressed = false,
    disabled = false,
    fullWidth = false,
  } = options

  const classes = [
    classMap["pm-toggle-btn"],
    classMap[`pm-toggle-btn--${variant}`],
    classMap[`pm-toggle-btn--${size}`],
  ]

  if (pressed) classes.push(classMap["pm-toggle-btn--pressed"])
  if (disabled) classes.push(classMap["pm-toggle-btn--disabled"])
  if (fullWidth) classes.push(classMap["pm-toggle-btn--full-width"])

  return classes.filter(Boolean).join(" ")
}
