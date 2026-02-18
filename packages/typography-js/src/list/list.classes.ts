import type { ListClassesOptions } from "./list.types.js"

const BASE = "pm-list"

export function listClasses(options: ListClassesOptions = {}): string {
  const { type = "unordered", styleType, spacing = "md", unstyled = false } = options
  const classes = [BASE, `${BASE}--${type}`, `${BASE}--spacing-${spacing}`]

  if (styleType) classes.push(`${BASE}--style-${styleType}`)
  if (unstyled) classes.push(`${BASE}--unstyled`)

  return classes.join(" ")
}

export function listModuleClasses(
  classMap: Record<string, string>,
  options: ListClassesOptions = {},
): string {
  const { type = "unordered", styleType, spacing = "md", unstyled = false } = options
  const classes = [
    classMap["pm-list"],
    classMap[`pm-list--${type}`],
    classMap[`pm-list--spacing-${spacing}`],
  ]

  if (styleType) classes.push(classMap[`pm-list--style-${styleType}`])
  if (unstyled) classes.push(classMap["pm-list--unstyled"])

  return classes.filter(Boolean).join(" ")
}
