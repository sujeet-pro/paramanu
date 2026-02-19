import type { SearchClassesOptions } from "./search-input.types.js"

const BASE = "pm-search"

/**
 * Returns BEM class names for the search input wrapper (human-readable).
 */
export function searchClasses(options: SearchClassesOptions = {}): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false, fullWidth = false } =
    options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the search input wrapper (hashed).
 */
export function searchModuleClasses(
  classMap: Record<string, string>,
  options: SearchClassesOptions = {},
): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false, fullWidth = false } =
    options

  const classes = [
    classMap["pm-search"],
    classMap[`pm-search--${variant}`],
    classMap[`pm-search--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-search--invalid"])
  if (disabled) classes.push(classMap["pm-search--disabled"])
  if (fullWidth) classes.push(classMap["pm-search--full-width"])

  return classes.filter(Boolean).join(" ")
}
