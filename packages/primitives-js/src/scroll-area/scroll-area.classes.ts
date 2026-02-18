import type { ScrollAreaClassesOptions } from "./scroll-area.types.js"

const BASE = "pm-scroll-area"

/**
 * Returns BEM class names for the scroll-area component (human-readable).
 * Used by CDN and template consumers.
 */
export function scrollAreaClasses(options: ScrollAreaClassesOptions = {}): string {
  const { direction = "vertical", scrollbar = "auto" } = options
  const classes = [BASE, `${BASE}--${direction}`, `${BASE}--scrollbar-${scrollbar}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the scroll-area component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function scrollAreaModuleClasses(
  classMap: Record<string, string>,
  options: ScrollAreaClassesOptions = {},
): string {
  const { direction = "vertical", scrollbar = "auto" } = options

  const classes = [
    classMap["pm-scroll-area"],
    classMap[`pm-scroll-area--${direction}`],
    classMap[`pm-scroll-area--scrollbar-${scrollbar}`],
  ]

  return classes.filter(Boolean).join(" ")
}
