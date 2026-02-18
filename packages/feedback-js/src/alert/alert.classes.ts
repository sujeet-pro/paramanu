import type { AlertClassesOptions } from "./alert.types.js"

const BASE = "pm-alert"

/** Structured class names for the alert component and its sub-elements. */
export interface AlertClassesResult {
  /** Root element class names. */
  root: string
  /** Icon container class. */
  icon: string
  /** Content wrapper class. */
  content: string
  /** Title element class. */
  title: string
  /** Description element class. */
  description: string
  /** Close button container class. */
  close: string
}

/**
 * Returns BEM class names for the alert component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * const classes = alertClasses({ variant: "success", dismissible: true })
 * // classes.root => "pm-alert pm-alert--success pm-alert--subtle pm-alert--dismissible"
 * ```
 */
export function alertClasses(options: AlertClassesOptions = {}): AlertClassesResult {
  const { variant = "info", alertStyle = "subtle", dismissible = false } = options
  const rootClasses = [BASE, `${BASE}--${variant}`, `${BASE}--${alertStyle}`]

  if (dismissible) rootClasses.push(`${BASE}--dismissible`)

  return {
    root: rootClasses.join(" "),
    icon: `${BASE}__icon`,
    content: `${BASE}__content`,
    title: `${BASE}__title`,
    description: `${BASE}__description`,
    close: `${BASE}__close`,
  }
}

/**
 * Returns CSS module class names for the alert component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 *
 * @example
 * ```ts
 * import styles from "./alert.module.css"
 * const classes = alertModuleClasses(styles, { variant: "danger" })
 * ```
 */
export function alertModuleClasses(
  classMap: Record<string, string>,
  options: AlertClassesOptions = {},
): AlertClassesResult {
  const { variant = "info", alertStyle = "subtle", dismissible = false } = options

  const rootClasses = [
    classMap["pm-alert"],
    classMap[`pm-alert--${variant}`],
    classMap[`pm-alert--${alertStyle}`],
  ]

  if (dismissible) rootClasses.push(classMap["pm-alert--dismissible"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    icon: classMap["pm-alert__icon"] ?? "",
    content: classMap["pm-alert__content"] ?? "",
    title: classMap["pm-alert__title"] ?? "",
    description: classMap["pm-alert__description"] ?? "",
    close: classMap["pm-alert__close"] ?? "",
  }
}
