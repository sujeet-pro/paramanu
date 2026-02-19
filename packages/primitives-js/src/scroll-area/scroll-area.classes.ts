import type { ScrollClassesOptions } from "./scroll-area.types.js"

const BASE = "pm-scroll"

/**
 * Returns BEM class names for the scroll-area component (human-readable).
 * Used by CDN and template consumers.
 */
export function scrollClasses(options: ScrollClassesOptions = {}): string {
  const { direction = "vertical", scrollbar = "auto", scrollbarSize, bordered } = options
  const classes = [BASE, `${BASE}--${direction}`, `${BASE}--scrollbar-${scrollbar}`]

  if (scrollbarSize) classes.push(`${BASE}--scrollbar-${scrollbarSize}`)
  if (bordered) classes.push(`${BASE}--bordered`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the scroll-area component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function scrollModuleClasses(
  classMap: Record<string, string>,
  options: ScrollClassesOptions = {},
): string {
  const { direction = "vertical", scrollbar = "auto", scrollbarSize, bordered } = options

  const classes = [
    classMap["pm-scroll"],
    classMap[`pm-scroll--${direction}`],
    classMap[`pm-scroll--scrollbar-${scrollbar}`],
  ]

  if (scrollbarSize) classes.push(classMap[`pm-scroll--scrollbar-${scrollbarSize}`])
  if (bordered) classes.push(classMap["pm-scroll--bordered"])

  return classes.filter(Boolean).join(" ")
}
