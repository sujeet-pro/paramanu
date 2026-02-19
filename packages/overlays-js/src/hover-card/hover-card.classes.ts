import type {
  HovercardClassesOptions,
  HovercardArrowClassesOptions,
} from "./hover-card.types.js"

const BASE = "pm-hovercard"

/**
 * Returns BEM class names for the hover card component (human-readable).
 * Used by CDN and template consumers.
 */
export function hovercardClasses(options: HovercardClassesOptions = {}): string {
  const { placement = "bottom" } = options
  const classes = [BASE, `${BASE}--${placement}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the hover card component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function hovercardModuleClasses(
  classMap: Record<string, string>,
  options: HovercardClassesOptions = {},
): string {
  const { placement = "bottom" } = options

  const classes = [classMap["pm-hovercard"], classMap[`pm-hovercard--${placement}`]]

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the hover card arrow element.
 */
export function hoverCardArrowClasses(_options: HovercardArrowClassesOptions = {}): string {
  return `${BASE}__arrow`
}

/**
 * Returns CSS module class names for the hover card arrow element.
 */
export function hoverCardArrowModuleClasses(
  classMap: Record<string, string>,
  _options: HovercardArrowClassesOptions = {},
): string {
  return classMap["pm-hovercard__arrow"] ?? ""
}
