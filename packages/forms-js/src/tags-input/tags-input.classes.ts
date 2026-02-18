import type { TagsInputClassesOptions } from "./tags-input.types.js"

const BASE = "pm-tags-input"

/**
 * Returns BEM class names for the tags input component (human-readable).
 */
export function tagsInputClasses(options: TagsInputClassesOptions = {}): string {
  const { variant = "outline", size = "md", disabled = false, invalid = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (invalid) classes.push(`${BASE}--invalid`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the tags input component (hashed).
 */
export function tagsInputModuleClasses(
  classMap: Record<string, string>,
  options: TagsInputClassesOptions = {},
): string {
  const { variant = "outline", size = "md", disabled = false, invalid = false } = options

  const classes = [
    classMap["pm-tags-input"],
    classMap[`pm-tags-input--${variant}`],
    classMap[`pm-tags-input--${size}`],
  ]

  if (disabled) classes.push(classMap["pm-tags-input--disabled"])
  if (invalid) classes.push(classMap["pm-tags-input--invalid"])

  return classes.filter(Boolean).join(" ")
}
