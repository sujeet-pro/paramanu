import type { AlertClassesOptions } from "./alert.types.js"

const BASE = "pm-alert"

export interface AlertClassesResult {
  root: string
  icon: string
  content: string
  title: string
  description: string
  close: string
}

/**
 * Returns BEM class names for the alert component (human-readable).
 * Used by CDN and template consumers.
 */
export function alertClasses(options: AlertClassesOptions = {}): AlertClassesResult {
  const { variant = "info", dismissible = false } = options
  const rootClasses = [BASE, `${BASE}--${variant}`]

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
 */
export function alertModuleClasses(
  classMap: Record<string, string>,
  options: AlertClassesOptions = {},
): AlertClassesResult {
  const { variant = "info", dismissible = false } = options

  const rootClasses = [classMap["pm-alert"], classMap[`pm-alert--${variant}`]]

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
