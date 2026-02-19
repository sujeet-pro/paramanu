import type { LoadingClassesOptions } from "./loading-overlay.types.js"

const BASE = "pm-loading"

/**
 * Returns BEM class names for the loading overlay component (human-readable).
 * Returns an object with classes for root, backdrop, and content sub-elements.
 * Used by CDN and template consumers.
 */
export function loadingClasses(options: LoadingClassesOptions = {}): {
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
export function loadingModuleClasses(
  classMap: Record<string, string>,
  options: LoadingClassesOptions = {},
): {
  root: string
  backdrop: string
  content: string
} {
  const { visible = false, blur = false } = options

  const rootClasses = [classMap["pm-loading"]]

  if (visible) rootClasses.push(classMap["pm-loading--visible"])
  if (blur) rootClasses.push(classMap["pm-loading--blur"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    backdrop: classMap["pm-loading__backdrop"] || "",
    content: classMap["pm-loading__content"] || "",
  }
}
