import type { FormClassesOptions } from "./form.types.js"

const BASE = "pm-form"

/**
 * Returns BEM class names for the form component (human-readable).
 */
export function formClasses(options: FormClassesOptions = {}): string {
  const { layout = "vertical", gap = "md" } = options
  const classes = [BASE, `${BASE}--${layout}`, `${BASE}--gap-${gap}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the form component (hashed).
 */
export function formModuleClasses(
  classMap: Record<string, string>,
  options: FormClassesOptions = {},
): string {
  const { layout = "vertical", gap = "md" } = options

  const classes = [
    classMap["pm-form"],
    classMap[`pm-form--${layout}`],
    classMap[`pm-form--gap-${gap}`],
  ]

  return classes.filter(Boolean).join(" ")
}
