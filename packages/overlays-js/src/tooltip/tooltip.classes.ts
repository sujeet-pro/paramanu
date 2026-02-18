import type { TooltipClassesOptions, TooltipArrowClassesOptions } from "./tooltip.types.js"

const BASE = "pm-tooltip"

/**
 * Returns BEM class names for the tooltip component (human-readable).
 * Used by CDN and template consumers.
 */
export function tooltipClasses(options: TooltipClassesOptions = {}): string {
  const { placement = "top" } = options
  const classes = [BASE, `${BASE}--${placement}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the tooltip component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function tooltipModuleClasses(
  classMap: Record<string, string>,
  options: TooltipClassesOptions = {},
): string {
  const { placement = "top" } = options

  const classes = [classMap["pm-tooltip"], classMap[`pm-tooltip--${placement}`]]

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the tooltip arrow element.
 */
export function tooltipArrowClasses(_options: TooltipArrowClassesOptions = {}): string {
  return `${BASE}__arrow`
}

/**
 * Returns CSS module class names for the tooltip arrow element.
 */
export function tooltipArrowModuleClasses(
  classMap: Record<string, string>,
  _options: TooltipArrowClassesOptions = {},
): string {
  return classMap["pm-tooltip__arrow"] ?? ""
}
