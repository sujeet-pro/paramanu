import type { PresenceClassesOptions } from "./presence.types.js"

const BASE = "pm-presence"

export function presenceClasses(options: PresenceClassesOptions = {}): string {
  const { state } = options
  const classes = [BASE]
  if (state) classes.push(`${BASE}--${state}`)
  return classes.join(" ")
}

export function presenceModuleClasses(
  classMap: Record<string, string>,
  options: PresenceClassesOptions = {},
): string {
  const { state } = options
  const classes = [classMap["pm-presence"]]
  if (state) classes.push(classMap[`pm-presence--${state}`])
  return classes.filter(Boolean).join(" ")
}
