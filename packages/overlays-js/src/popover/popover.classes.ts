import type { PopoverClassesOptions, PopoverArrowClassesOptions } from "./popover.types.js"

const BASE = "pm-popover"

/**
 * Returns BEM class names for the popover component (human-readable).
 * Used by CDN and template consumers.
 */
export function popoverClasses(options: PopoverClassesOptions = {}): string {
  const { placement = "bottom", hasArrow = false } = options
  const classes = [BASE, `${BASE}--${placement}`]

  if (hasArrow) classes.push(`${BASE}--has-arrow`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the popover component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function popoverModuleClasses(
  classMap: Record<string, string>,
  options: PopoverClassesOptions = {},
): string {
  const { placement = "bottom", hasArrow = false } = options

  const classes = [classMap["pm-popover"], classMap[`pm-popover--${placement}`]]

  if (hasArrow) classes.push(classMap["pm-popover--has-arrow"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the popover arrow element.
 */
export function popoverArrowClasses(_options: PopoverArrowClassesOptions = {}): string {
  return `${BASE}__arrow`
}

/**
 * Returns CSS module class names for the popover arrow element.
 */
export function popoverArrowModuleClasses(
  classMap: Record<string, string>,
  _options: PopoverArrowClassesOptions = {},
): string {
  return classMap["pm-popover__arrow"] ?? ""
}
