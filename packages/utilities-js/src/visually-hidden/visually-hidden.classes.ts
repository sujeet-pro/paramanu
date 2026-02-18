import type { VisuallyHiddenClassesOptions } from "./visually-hidden.types.js"

const BASE = "pm-visually-hidden"

export function visuallyHiddenClasses(options: VisuallyHiddenClassesOptions = {}): string {
  const { focusable = false } = options
  const classes = [BASE]
  if (focusable) classes.push(`${BASE}--focusable`)
  return classes.join(" ")
}

export function visuallyHiddenModuleClasses(
  classMap: Record<string, string>,
  options: VisuallyHiddenClassesOptions = {},
): string {
  const { focusable = false } = options
  const classes = [classMap["pm-visually-hidden"]]
  if (focusable) classes.push(classMap["pm-visually-hidden--focusable"])
  return classes.filter(Boolean).join(" ")
}
