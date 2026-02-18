import type {
  StatClassesOptions,
  StatClassesResult,
  StatHelpTextClassesOptions,
} from "./stat.types.js"

const BASE = "pm-stat"

/**
 * Returns BEM class names for the Stat component.
 *
 * Stat displays a numerical value with a descriptive label and optional
 * help text showing trend direction (up/down arrows with color coding).
 *
 * @example
 * ```ts
 * const cls = statClasses({ size: "lg", align: "center" })
 * // cls.root  => "pm-stat pm-stat--lg pm-stat--align-center"
 * // cls.value => "pm-stat__value"
 * ```
 */
export function statClasses(options: StatClassesOptions = {}): StatClassesResult {
  const { size = "md", align = "start" } = options

  return {
    root: [BASE, `${BASE}--${size}`, `${BASE}--align-${align}`].join(" "),
    label: `${BASE}__label`,
    value: `${BASE}__value`,
    helpText: `${BASE}__help-text`,
    arrow: `${BASE}__arrow`,
  }
}

/**
 * Returns BEM class names for the Stat help text with optional trend modifier.
 *
 * @example
 * ```ts
 * statHelpTextClasses({ trend: "up" })
 * // => "pm-stat__help-text pm-stat__help-text--up"
 * ```
 */
export function statHelpTextClasses(options: StatHelpTextClassesOptions = {}): string {
  const { trend } = options
  const classes = [`${BASE}__help-text`]
  if (trend) classes.push(`${BASE}__help-text--${trend}`)
  return classes.join(" ")
}

/**
 * Returns BEM class names for the Stat arrow indicator.
 *
 * @example
 * ```ts
 * statArrowClasses({ trend: "down" })
 * // => "pm-stat__arrow pm-stat__arrow--down"
 * ```
 */
export function statArrowClasses(options: StatHelpTextClassesOptions = {}): string {
  const { trend } = options
  const classes = [`${BASE}__arrow`]
  if (trend) classes.push(`${BASE}__arrow--${trend}`)
  return classes.join(" ")
}

/**
 * Returns CSS module class names for the Stat component.
 * Used by bundled consumers who import CSS modules.
 */
export function statModuleClasses(
  classMap: Record<string, string>,
  options: StatClassesOptions = {},
): StatClassesResult {
  const { size = "md", align = "start" } = options

  return {
    root: [classMap[BASE], classMap[`${BASE}--${size}`], classMap[`${BASE}--align-${align}`]]
      .filter(Boolean)
      .join(" "),
    label: classMap[`${BASE}__label`] || "",
    value: classMap[`${BASE}__value`] || "",
    helpText: classMap[`${BASE}__help-text`] || "",
    arrow: classMap[`${BASE}__arrow`] || "",
  }
}
