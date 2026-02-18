import type { TagClassesOptions, TagClassesResult } from "./tag.types.js"

const BASE = "pm-tag"

export function tagClasses(options: TagClassesOptions = {}): TagClassesResult {
  const {
    variant = "filled",
    size = "md",
    color = "primary",
    removable = false,
    interactive = false,
    disabled = false,
  } = options

  const rootClasses = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--${color}`]
  if (removable) rootClasses.push(`${BASE}--removable`)
  if (interactive) rootClasses.push(`${BASE}--interactive`)
  if (disabled) rootClasses.push(`${BASE}--disabled`)

  return {
    root: rootClasses.join(" "),
    remove: `${BASE}__remove`,
  }
}

export function tagModuleClasses(
  classMap: Record<string, string>,
  options: TagClassesOptions = {},
): TagClassesResult {
  const {
    variant = "filled",
    size = "md",
    color = "primary",
    removable = false,
    interactive = false,
    disabled = false,
  } = options

  const rootClasses = [
    classMap[BASE],
    classMap[`${BASE}--${variant}`],
    classMap[`${BASE}--${size}`],
    classMap[`${BASE}--${color}`],
  ]
  if (removable) rootClasses.push(classMap[`${BASE}--removable`])
  if (interactive) rootClasses.push(classMap[`${BASE}--interactive`])
  if (disabled) rootClasses.push(classMap[`${BASE}--disabled`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    remove: classMap[`${BASE}__remove`] || "",
  }
}
