import type { ImageClassesOptions, ImageClassesResult } from "./image.types.js"

const BASE = "pm-image"

/**
 * Returns BEM class names for the image component (human-readable).
 * Used by CDN and template consumers.
 */
export function imageClasses(options: ImageClassesOptions = {}): ImageClassesResult {
  const { fit = "cover", radius = "none", fallback = false, loading = false } = options

  const rootClasses = [BASE, `${BASE}--fit-${fit}`]

  if (radius !== "none") rootClasses.push(`${BASE}--radius-${radius}`)
  if (fallback) rootClasses.push(`${BASE}--fallback`)
  if (loading) rootClasses.push(`${BASE}--loading`)

  return {
    root: rootClasses.join(" "),
    img: `${BASE}__img`,
    fallback: `${BASE}__fallback`,
    caption: `${BASE}__caption`,
  }
}

/**
 * Returns CSS module class names for the image component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function imageModuleClasses(
  classMap: Record<string, string>,
  options: ImageClassesOptions = {},
): ImageClassesResult {
  const { fit = "cover", radius = "none", fallback = false, loading = false } = options

  const rootClasses = [classMap["pm-image"], classMap[`pm-image--fit-${fit}`]]

  if (radius !== "none") rootClasses.push(classMap[`pm-image--radius-${radius}`])
  if (fallback) rootClasses.push(classMap["pm-image--fallback"])
  if (loading) rootClasses.push(classMap["pm-image--loading"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    img: classMap["pm-image__img"] ?? "",
    fallback: classMap["pm-image__fallback"] ?? "",
    caption: classMap["pm-image__caption"] ?? "",
  }
}
