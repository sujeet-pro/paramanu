import type { LinkClassesOptions } from "./link.types.js"

const BASE = "pm-link"

export function linkClasses(options: LinkClassesOptions = {}): string {
  const { variant = "default", active = false, disabled = false, external = false } = options
  const classes = [BASE, `${BASE}--${variant}`]

  if (active) classes.push(`${BASE}--active`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (external) classes.push(`${BASE}--external`)

  return classes.join(" ")
}

export function linkModuleClasses(
  classMap: Record<string, string>,
  options: LinkClassesOptions = {},
): string {
  const { variant = "default", active = false, disabled = false, external = false } = options
  const classes = [classMap["pm-link"], classMap[`pm-link--${variant}`]]

  if (active) classes.push(classMap["pm-link--active"])
  if (disabled) classes.push(classMap["pm-link--disabled"])
  if (external) classes.push(classMap["pm-link--external"])

  return classes.filter(Boolean).join(" ")
}
