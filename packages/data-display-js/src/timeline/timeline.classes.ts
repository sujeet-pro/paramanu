import type {
  TimelineClassesOptions,
  TimelineClassesResult,
  TimelineModuleClassesResult,
  TimelineDotClassesOptions,
} from "./timeline.types.js"

const BASE = "pm-timeline"

/**
 * Returns BEM class names for the timeline dot sub-component (human-readable).
 */
export function timelineDotClasses(options: TimelineDotClassesOptions = {}): string {
  const { variant = "filled", color = "primary" } = options
  return [
    `${BASE}__dot`,
    `${BASE}__dot--${variant}`,
    `${BASE}__dot--${color}`,
  ].join(" ")
}

/**
 * Returns CSS module class names for the timeline dot sub-component (hashed).
 */
export function timelineDotModuleClasses(
  classMap: Record<string, string>,
  options: TimelineDotClassesOptions = {},
): string {
  const { variant = "filled", color = "primary" } = options

  return [
    classMap[`${BASE}__dot`],
    classMap[`${BASE}__dot--${variant}`],
    classMap[`${BASE}__dot--${color}`],
  ]
    .filter(Boolean)
    .join(" ")
}

/**
 * Returns BEM class names for the timeline component (human-readable).
 * Used by CDN and template consumers.
 */
export function timelineClasses(options: TimelineClassesOptions = {}): TimelineClassesResult {
  const { orientation = "vertical", align = "start" } = options

  const rootClasses = [BASE, `${BASE}--${orientation}`, `${BASE}--${align}`]

  return {
    root: rootClasses.join(" "),
    item: `${BASE}__item`,
    connector: `${BASE}__connector`,
    dot: `${BASE}__dot`,
    content: `${BASE}__content`,
    opposite: `${BASE}__opposite`,
  }
}

/**
 * Returns CSS module class names for the timeline component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function timelineModuleClasses(
  classMap: Record<string, string>,
  options: TimelineClassesOptions = {},
): TimelineModuleClassesResult {
  const { orientation = "vertical", align = "start" } = options

  const rootClasses = [
    classMap[BASE],
    classMap[`${BASE}--${orientation}`],
    classMap[`${BASE}--${align}`],
  ]

  return {
    root: rootClasses.filter(Boolean).join(" "),
    item: classMap[`${BASE}__item`] ?? "",
    connector: classMap[`${BASE}__connector`] ?? "",
    dot: classMap[`${BASE}__dot`] ?? "",
    content: classMap[`${BASE}__content`] ?? "",
    opposite: classMap[`${BASE}__opposite`] ?? "",
  }
}
