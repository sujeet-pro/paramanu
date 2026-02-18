import type { LinkClassesOptions } from "./link.types.js"

const BASE = "pm-link"

export function linkClasses(options: LinkClassesOptions = {}): string {
  const {
    variant = "default",
    active = false,
    disabled = false,
    external = false,
    underline = "auto",
  } = options
  const classes = [BASE, `${BASE}--${variant}`]

  if (active) classes.push(`${BASE}--active`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (external) classes.push(`${BASE}--external`)
  if (underline !== "auto") classes.push(`${BASE}--underline-${underline}`)

  return classes.join(" ")
}

export function linkModuleClasses(
  classMap: Record<string, string>,
  options: LinkClassesOptions = {},
): string {
  const {
    variant = "default",
    active = false,
    disabled = false,
    external = false,
    underline = "auto",
  } = options
  const classes = [classMap["pm-link"], classMap[`pm-link--${variant}`]]

  if (active) classes.push(classMap["pm-link--active"])
  if (disabled) classes.push(classMap["pm-link--disabled"])
  if (external) classes.push(classMap["pm-link--external"])
  if (underline !== "auto") classes.push(classMap[`pm-link--underline-${underline}`])

  return classes.filter(Boolean).join(" ")
}
