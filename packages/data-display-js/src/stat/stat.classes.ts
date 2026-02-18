import type {
  StatClassesOptions,
  StatClassesResult,
  StatHelpTextClassesOptions,
} from "./stat.types.js"

const BASE = "pm-stat"

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

export function statHelpTextClasses(options: StatHelpTextClassesOptions = {}): string {
  const { trend } = options
  const classes = [`${BASE}__help-text`]
  if (trend) classes.push(`${BASE}__help-text--${trend}`)
  return classes.join(" ")
}

export function statArrowClasses(options: StatHelpTextClassesOptions = {}): string {
  const { trend } = options
  const classes = [`${BASE}__arrow`]
  if (trend) classes.push(`${BASE}__arrow--${trend}`)
  return classes.join(" ")
}

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
