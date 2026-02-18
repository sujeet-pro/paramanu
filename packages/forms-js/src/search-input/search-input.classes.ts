import type { SearchInputClassesOptions } from "./search-input.types.js"

const BASE = "pm-search-input"

/**
 * Returns BEM class names for the search input wrapper (human-readable).
 */
export function searchInputClasses(options: SearchInputClassesOptions = {}): string {
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
export function searchInputModuleClasses(
  classMap: Record<string, string>,
  options: SearchInputClassesOptions = {},
): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false, fullWidth = false } =
    options

  const classes = [
    classMap["pm-search-input"],
    classMap[`pm-search-input--${variant}`],
    classMap[`pm-search-input--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-search-input--invalid"])
  if (disabled) classes.push(classMap["pm-search-input--disabled"])
  if (fullWidth) classes.push(classMap["pm-search-input--full-width"])

  return classes.filter(Boolean).join(" ")
}
