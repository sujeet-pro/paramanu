import type { CloseBtnClassesOptions } from "./close-button.types.js"

const BASE = "pm-close-btn"

/**
 * Returns BEM class names for the close button component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * closeBtnClasses() // "pm-close-btn pm-close-btn--md"
 * closeBtnClasses({ size: "sm", disabled: true })
 * // "pm-close-btn pm-close-btn--sm pm-close-btn--disabled"
 * ```
 */
export function closeBtnClasses(options: CloseBtnClassesOptions = {}): string {
  const { size = "md", disabled = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the close button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 *
 * @example
 * ```ts
 * import styles from "./close-button.module.css"
 * closeBtnModuleClasses(styles, { size: "sm" })
 * ```
 */
export function closeBtnModuleClasses(
  classMap: Record<string, string>,
  options: CloseBtnClassesOptions = {},
): string {
  const { size = "md", disabled = false } = options

  const classes = [classMap["pm-close-btn"], classMap[`pm-close-btn--${size}`]]

  if (disabled) classes.push(classMap["pm-close-btn--disabled"])

  return classes.filter(Boolean).join(" ")
}
