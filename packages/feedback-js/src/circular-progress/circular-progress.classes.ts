import type { RingProgressClassesOptions } from "./circular-progress.types.js"

const BASE = "pm-ring-progress"

/** Structured class names for the circular progress component and its sub-elements. */
export interface RingProgressClassesResult {
  /** Root element class names. */
  root: string
  /** SVG element class. */
  svg: string
  /** Track circle class. */
  track: string
  /** Fill circle class. */
  fill: string
  /** Label element class. */
  label: string
}

/**
 * Returns BEM class names for the circular progress component (human-readable).
 * Returns an object with classes for root, svg, track, fill, and label sub-elements.
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * const classes = ringProgressClasses({ size: "lg", variant: "success" })
 * // classes.root => "pm-ring-progress pm-ring-progress--lg pm-ring-progress--success"
 * ```
 */
export function ringProgressClasses(
  options: RingProgressClassesOptions = {},
): RingProgressClassesResult {
  const { size = "md", variant = "primary", indeterminate = false, showLabel = false } = options

  const rootClasses = [BASE, `${BASE}--${size}`, `${BASE}--${variant}`]

  if (indeterminate) rootClasses.push(`${BASE}--indeterminate`)
  if (showLabel) rootClasses.push(`${BASE}--with-label`)

  return {
    root: rootClasses.join(" "),
    svg: `${BASE}__svg`,
    track: `${BASE}__track`,
    fill: `${BASE}__fill`,
    label: `${BASE}__label`,
  }
}

/**
 * Returns CSS module class names for the circular progress component (hashed).
 * Returns an object with classes for root, svg, track, fill, and label sub-elements.
 * Used by bundled/template consumers who import CSS modules.
 */
export function ringProgressModuleClasses(
  classMap: Record<string, string>,
  options: RingProgressClassesOptions = {},
): RingProgressClassesResult {
  const { size = "md", variant = "primary", indeterminate = false, showLabel = false } = options

  const rootClasses = [
    classMap["pm-ring-progress"],
    classMap[`pm-ring-progress--${size}`],
    classMap[`pm-ring-progress--${variant}`],
  ]

  if (indeterminate) rootClasses.push(classMap["pm-ring-progress--indeterminate"])
  if (showLabel) rootClasses.push(classMap["pm-ring-progress--with-label"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    svg: classMap["pm-ring-progress__svg"] ?? "",
    track: classMap["pm-ring-progress__track"] ?? "",
    fill: classMap["pm-ring-progress__fill"] ?? "",
    label: classMap["pm-ring-progress__label"] ?? "",
  }
}
