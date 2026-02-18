import type { CircularProgressClassesOptions } from "./circular-progress.types.js"

const BASE = "pm-circular-progress"

/** Structured class names for the circular progress component and its sub-elements. */
export interface CircularProgressClassesResult {
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
 * const classes = circularProgressClasses({ size: "lg", variant: "success" })
 * // classes.root => "pm-circular-progress pm-circular-progress--lg pm-circular-progress--success"
 * ```
 */
export function circularProgressClasses(
  options: CircularProgressClassesOptions = {},
): CircularProgressClassesResult {
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
export function circularProgressModuleClasses(
  classMap: Record<string, string>,
  options: CircularProgressClassesOptions = {},
): CircularProgressClassesResult {
  const { size = "md", variant = "primary", indeterminate = false, showLabel = false } = options

  const rootClasses = [
    classMap["pm-circular-progress"],
    classMap[`pm-circular-progress--${size}`],
    classMap[`pm-circular-progress--${variant}`],
  ]

  if (indeterminate) rootClasses.push(classMap["pm-circular-progress--indeterminate"])
  if (showLabel) rootClasses.push(classMap["pm-circular-progress--with-label"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    svg: classMap["pm-circular-progress__svg"] ?? "",
    track: classMap["pm-circular-progress__track"] ?? "",
    fill: classMap["pm-circular-progress__fill"] ?? "",
    label: classMap["pm-circular-progress__label"] ?? "",
  }
}
