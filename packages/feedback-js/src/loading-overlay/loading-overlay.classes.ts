import type { LoadingOverlayClassesOptions } from "./loading-overlay.types.js"

const BASE = "pm-loading-overlay"

/**
 * Returns BEM class names for the loading overlay component (human-readable).
 * Returns an object with classes for root, backdrop, and content sub-elements.
 * Used by CDN and template consumers.
 */
export function loadingOverlayClasses(options: LoadingOverlayClassesOptions = {}): {
  root: string
  backdrop: string
  content: string
} {
  const { visible = false, blur = false } = options

  const rootClasses = [BASE]

  if (visible) rootClasses.push(`${BASE}--visible`)
  if (blur) rootClasses.push(`${BASE}--blur`)

  return {
    root: rootClasses.join(" "),
    backdrop: `${BASE}__backdrop`,
    content: `${BASE}__content`,
  }
}

/**
 * Returns CSS module class names for the loading overlay component (hashed).
 * Returns an object with classes for root, backdrop, and content sub-elements.
 * Used by bundled/template consumers who import CSS modules.
 */
export function loadingOverlayModuleClasses(
  classMap: Record<string, string>,
  options: LoadingOverlayClassesOptions = {},
): {
  root: string
  backdrop: string
  content: string
} {
  const { visible = false, blur = false } = options

  const rootClasses = [classMap["pm-loading-overlay"]]

  if (visible) rootClasses.push(classMap["pm-loading-overlay--visible"])
  if (blur) rootClasses.push(classMap["pm-loading-overlay--blur"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    backdrop: classMap["pm-loading-overlay__backdrop"] || "",
    content: classMap["pm-loading-overlay__content"] || "",
  }
}
