import type { ProgressClassesOptions } from "./progress-bar.types.js"

const BASE = "pm-progress"

/** Structured class names for the progress bar component and its sub-elements. */
export interface ProgressClassesResult {
  /** Root element class names. */
  root: string
  /** Track (background) element class. */
  track: string
  /** Fill (indicator) element class. */
  fill: string
  /** Label element class (percentage text). */
  label: string
}

/**
 * Returns BEM class names for the progress bar component (human-readable).
 * Returns an object with classes for root, track, fill, and label sub-elements.
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * const classes = progressClasses({ variant: "success", striped: true, animated: true })
 * // classes.root => "pm-progress pm-progress--md pm-progress--success pm-progress--striped pm-progress--animated"
 * ```
 */
export function progressClasses(options: ProgressClassesOptions = {}): ProgressClassesResult {
  const {
    size = "md",
    variant = "primary",
    striped = false,
    animated = false,
    indeterminate = false,
    showLabel = false,
  } = options

  const rootClasses = [BASE, `${BASE}--${size}`, `${BASE}--${variant}`]

  if (striped) rootClasses.push(`${BASE}--striped`)
  if (animated) rootClasses.push(`${BASE}--animated`)
  if (indeterminate) rootClasses.push(`${BASE}--indeterminate`)
  if (showLabel) rootClasses.push(`${BASE}--with-label`)

  return {
    root: rootClasses.join(" "),
    track: `${BASE}__track`,
    fill: `${BASE}__fill`,
    label: `${BASE}__label`,
  }
}

/**
 * Returns CSS module class names for the progress bar component (hashed).
 * Returns an object with classes for root, track, fill, and label sub-elements.
 * Used by bundled/template consumers who import CSS modules.
 */
export function progressModuleClasses(
  classMap: Record<string, string>,
  options: ProgressClassesOptions = {},
): ProgressClassesResult {
  const {
    size = "md",
    variant = "primary",
    striped = false,
    animated = false,
    indeterminate = false,
    showLabel = false,
  } = options

  const rootClasses = [
    classMap["pm-progress"],
    classMap[`pm-progress--${size}`],
    classMap[`pm-progress--${variant}`],
  ]

  if (striped) rootClasses.push(classMap["pm-progress--striped"])
  if (animated) rootClasses.push(classMap["pm-progress--animated"])
  if (indeterminate) rootClasses.push(classMap["pm-progress--indeterminate"])
  if (showLabel) rootClasses.push(classMap["pm-progress--with-label"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    track: classMap["pm-progress__track"] ?? "",
    fill: classMap["pm-progress__fill"] ?? "",
    label: classMap["pm-progress__label"] ?? "",
  }
}
