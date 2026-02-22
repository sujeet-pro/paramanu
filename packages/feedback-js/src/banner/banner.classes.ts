import type { BannerClassesOptions } from "./banner.types.js"

const BASE = "pm-banner"

/** Structured class names for the banner component and its sub-elements. */
export interface BannerClassesResult {
  /** Root element class names. */
  root: string
  /** Icon container class. */
  icon: string
  /** Content wrapper class. */
  content: string
  /** Actions container class. */
  actions: string
  /** Close button container class. */
  close: string
}

/**
 * Returns BEM class names for the banner component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * const classes = bannerClasses({ variant: "warning", sticky: true })
 * // classes.root => "pm-banner pm-banner--warning pm-banner--sticky pm-banner--top"
 * ```
 */
export function bannerClasses(options: BannerClassesOptions = {}): BannerClassesResult {
  const { variant = "info", sticky = false, dismissible = false, position = "top" } = options
  const rootClasses = [BASE, `${BASE}--${variant}`]

  if (sticky) rootClasses.push(`${BASE}--sticky`)
  if (dismissible) rootClasses.push(`${BASE}--dismissible`)
  rootClasses.push(`${BASE}--${position}`)

  return {
    root: rootClasses.join(" "),
    icon: `${BASE}__icon`,
    content: `${BASE}__content`,
    actions: `${BASE}__actions`,
    close: `${BASE}__close`,
  }
}

/**
 * Returns CSS module class names for the banner component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function bannerModuleClasses(
  classMap: Record<string, string>,
  options: BannerClassesOptions = {},
): BannerClassesResult {
  const { variant = "info", sticky = false, dismissible = false, position = "top" } = options

  const rootClasses = [classMap["pm-banner"], classMap[`pm-banner--${variant}`]]

  if (sticky) rootClasses.push(classMap["pm-banner--sticky"])
  if (dismissible) rootClasses.push(classMap["pm-banner--dismissible"])
  rootClasses.push(classMap[`pm-banner--${position}`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    icon: classMap["pm-banner__icon"] ?? "",
    content: classMap["pm-banner__content"] ?? "",
    actions: classMap["pm-banner__actions"] ?? "",
    close: classMap["pm-banner__close"] ?? "",
  }
}
