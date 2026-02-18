import type { CascaderClassesOptions } from "./cascader.types.js"

const BASE = "pm-cascader"

/**
 * Returns BEM class names for the cascader component (human-readable).
 */
export function cascaderClasses(options: CascaderClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
    fullWidth = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (open) classes.push(`${BASE}--open`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the cascader component (hashed).
 */
export function cascaderModuleClasses(
  classMap: Record<string, string>,
  options: CascaderClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
    fullWidth = false,
  } = options

  const classes = [
    classMap["pm-cascader"],
    classMap[`pm-cascader--${variant}`],
    classMap[`pm-cascader--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-cascader--invalid"])
  if (disabled) classes.push(classMap["pm-cascader--disabled"])
  if (open) classes.push(classMap["pm-cascader--open"])
  if (fullWidth) classes.push(classMap["pm-cascader--full-width"])

  return classes.filter(Boolean).join(" ")
}
