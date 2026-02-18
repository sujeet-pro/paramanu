import type { MentionsClassesOptions } from "./mentions.types.js"

const BASE = "pm-mentions"

/**
 * Returns BEM class names for the mentions component (human-readable).
 */
export function mentionsClasses(options: MentionsClassesOptions = {}): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the mentions component (hashed).
 */
export function mentionsModuleClasses(
  classMap: Record<string, string>,
  options: MentionsClassesOptions = {},
): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false } = options

  const classes = [
    classMap["pm-mentions"],
    classMap[`pm-mentions--${variant}`],
    classMap[`pm-mentions--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-mentions--invalid"])
  if (disabled) classes.push(classMap["pm-mentions--disabled"])

  return classes.filter(Boolean).join(" ")
}
