import type { ImgClassesOptions, ImgClassesResult } from "./image.types.js"

const BASE = "pm-img"

/**
 * Returns BEM class names for the Img component.
 *
 * Enhanced `<img>` wrapper rendered as a `<figure>` with support for
 * fallback placeholders, loading skeletons, captions, and object-fit control.
 *
 * @example
 * ```ts
 * const cls = imgClasses({ fit: "contain", radius: "lg" })
 * // cls.root    => "pm-img pm-img--fit-contain pm-img--radius-lg"
 * // cls.img     => "pm-img__img"
 * // cls.caption => "pm-img__caption"
 * ```
 */
export function imgClasses(options: ImgClassesOptions = {}): ImgClassesResult {
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
 * Returns CSS module class names for the Img component.
 * Used by bundled consumers who import CSS modules.
 */
export function imgModuleClasses(
  classMap: Record<string, string>,
  options: ImgClassesOptions = {},
): ImgClassesResult {
  const { fit = "cover", radius = "none", fallback = false, loading = false } = options

  const rootClasses = [classMap["pm-img"], classMap[`pm-img--fit-${fit}`]]

  if (radius !== "none") rootClasses.push(classMap[`pm-img--radius-${radius}`])
  if (fallback) rootClasses.push(classMap["pm-img--fallback"])
  if (loading) rootClasses.push(classMap["pm-img--loading"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    img: classMap["pm-img__img"] ?? "",
    fallback: classMap["pm-img__fallback"] ?? "",
    caption: classMap["pm-img__caption"] ?? "",
  }
}
