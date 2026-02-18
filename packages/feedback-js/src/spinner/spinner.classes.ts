import type { SpinnerClassesOptions } from "./spinner.types.js"

const BASE = "pm-spinner"

/**
 * Returns BEM class names for the spinner component (human-readable).
 * Used by CDN and template consumers.
 */
export function spinnerClasses(options: SpinnerClassesOptions = {}): string {
  const { size = "md", variant = "primary" } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--${variant}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the spinner component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function spinnerModuleClasses(
  classMap: Record<string, string>,
  options: SpinnerClassesOptions = {},
): string {
  const { size = "md", variant = "primary" } = options

  const classes = [
    classMap["pm-spinner"],
    classMap[`pm-spinner--${size}`],
    classMap[`pm-spinner--${variant}`],
  ]

  return classes.filter(Boolean).join(" ")
}
