import type { CalendarClassesOptions } from "./calendar.types.js"

const BASE = "pm-calendar"

/**
 * Returns BEM class names for the calendar component (human-readable).
 */
export function calendarClasses(options: CalendarClassesOptions = {}): string {
  const { size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the calendar component (hashed).
 */
export function calendarModuleClasses(
  classMap: Record<string, string>,
  options: CalendarClassesOptions = {},
): string {
  const { size = "md" } = options

  const classes = [classMap["pm-calendar"], classMap[`pm-calendar--${size}`]]

  return classes.filter(Boolean).join(" ")
}
