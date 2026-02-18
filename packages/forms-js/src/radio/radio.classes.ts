import type { RadioClassesOptions, RadioGroupClassesOptions } from "./radio.types.js"

const RADIO_BASE = "pm-radio"
const GROUP_BASE = "pm-radio-group"

/**
 * Returns BEM class names for the radio component (human-readable).
 */
export function radioClasses(options: RadioClassesOptions = {}): string {
  const { size = "md", disabled = false, invalid = false, checked = false } = options
  const classes = [RADIO_BASE, `${RADIO_BASE}--${size}`]

  if (disabled) classes.push(`${RADIO_BASE}--disabled`)
  if (invalid) classes.push(`${RADIO_BASE}--invalid`)
  if (checked) classes.push(`${RADIO_BASE}--checked`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the radio component (hashed).
 */
export function radioModuleClasses(
  classMap: Record<string, string>,
  options: RadioClassesOptions = {},
): string {
  const { size = "md", disabled = false, invalid = false, checked = false } = options

  const classes = [classMap["pm-radio"], classMap[`pm-radio--${size}`]]

  if (disabled) classes.push(classMap["pm-radio--disabled"])
  if (invalid) classes.push(classMap["pm-radio--invalid"])
  if (checked) classes.push(classMap["pm-radio--checked"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the radio group component (human-readable).
 */
export function radioGroupClasses(options: RadioGroupClassesOptions = {}): string {
  const { orientation = "vertical", size = "md" } = options
  const classes = [GROUP_BASE, `${GROUP_BASE}--${orientation}`, `${GROUP_BASE}--${size}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the radio group component (hashed).
 */
export function radioGroupModuleClasses(
  classMap: Record<string, string>,
  options: RadioGroupClassesOptions = {},
): string {
  const { orientation = "vertical", size = "md" } = options

  const classes = [
    classMap["pm-radio-group"],
    classMap[`pm-radio-group--${orientation}`],
    classMap[`pm-radio-group--${size}`],
  ]

  return classes.filter(Boolean).join(" ")
}
