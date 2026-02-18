import type { ProgressBarClassesOptions } from "./progress-bar.types.js"

const BASE = "pm-progress-bar"

/** Structured class names for the progress bar component and its sub-elements. */
export interface ProgressBarClassesResult {
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
 * const classes = progressBarClasses({ variant: "success", striped: true, animated: true })
 * // classes.root => "pm-progress-bar pm-progress-bar--md pm-progress-bar--success pm-progress-bar--striped pm-progress-bar--animated"
 * ```
 */
export function progressBarClasses(options: ProgressBarClassesOptions = {}): ProgressBarClassesResult {
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
export function progressBarModuleClasses(
  classMap: Record<string, string>,
  options: ProgressBarClassesOptions = {},
): ProgressBarClassesResult {
  const {
    size = "md",
    variant = "primary",
    striped = false,
    animated = false,
    indeterminate = false,
    showLabel = false,
  } = options

  const rootClasses = [
    classMap["pm-progress-bar"],
    classMap[`pm-progress-bar--${size}`],
    classMap[`pm-progress-bar--${variant}`],
  ]

  if (striped) rootClasses.push(classMap["pm-progress-bar--striped"])
  if (animated) rootClasses.push(classMap["pm-progress-bar--animated"])
  if (indeterminate) rootClasses.push(classMap["pm-progress-bar--indeterminate"])
  if (showLabel) rootClasses.push(classMap["pm-progress-bar--with-label"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    track: classMap["pm-progress-bar__track"] ?? "",
    fill: classMap["pm-progress-bar__fill"] ?? "",
    label: classMap["pm-progress-bar__label"] ?? "",
  }
}
