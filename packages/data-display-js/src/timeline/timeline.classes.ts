import type {
  TimelineClassesOptions,
  TimelineClassesResult,
  TimelineModuleClassesResult,
  TimelineDotClassesOptions,
} from "./timeline.types.js"

const BASE = "pm-timeline"

/**
 * Returns BEM class names for the TimelineDot sub-component.
 *
 * @example
 * ```ts
 * timelineDotClasses({ variant: "outline", color: "success" })
 * // => "pm-timeline__dot pm-timeline__dot--outline pm-timeline__dot--success"
 * ```
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
 * Returns CSS module class names for the TimelineDot sub-component.
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
 * Returns BEM class names for the Timeline component.
 *
 * Timeline displays chronological events in a vertical or horizontal layout
 * with connector lines and dot indicators.
 *
 * @example
 * ```ts
 * const cls = timelineClasses({ orientation: "vertical", align: "alternate" })
 * // cls.root      => "pm-timeline pm-timeline--vertical pm-timeline--alternate"
 * // cls.connector => "pm-timeline__connector"
 * ```
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
 * Returns CSS module class names for the Timeline component.
 * Used by bundled consumers who import CSS modules.
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
