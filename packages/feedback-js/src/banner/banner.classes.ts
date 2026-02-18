import type { BannerClassesOptions } from "./banner.types.js"

const BASE = "pm-banner"

export interface BannerClassesResult {
  root: string
  content: string
  close: string
}

/**
 * Returns BEM class names for the banner component (human-readable).
 * Used by CDN and template consumers.
 */
export function bannerClasses(options: BannerClassesOptions = {}): BannerClassesResult {
  const { variant = "info", sticky = false, dismissible = false } = options
  const rootClasses = [BASE, `${BASE}--${variant}`]

  if (sticky) rootClasses.push(`${BASE}--sticky`)
  if (dismissible) rootClasses.push(`${BASE}--dismissible`)

  return {
    root: rootClasses.join(" "),
    content: `${BASE}__content`,
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
  const { variant = "info", sticky = false, dismissible = false } = options

  const rootClasses = [classMap["pm-banner"], classMap[`pm-banner--${variant}`]]

  if (sticky) rootClasses.push(classMap["pm-banner--sticky"])
  if (dismissible) rootClasses.push(classMap["pm-banner--dismissible"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    content: classMap["pm-banner__content"] ?? "",
    close: classMap["pm-banner__close"] ?? "",
  }
}
