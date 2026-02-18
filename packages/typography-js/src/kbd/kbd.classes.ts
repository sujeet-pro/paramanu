import type { KbdClassesOptions } from "./kbd.types.js"

const BASE = "pm-kbd"

export function kbdClasses(options: KbdClassesOptions = {}): string {
  const { size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]

  return classes.join(" ")
}

export function kbdModuleClasses(
  classMap: Record<string, string>,
  options: KbdClassesOptions = {},
): string {
  const { size = "md" } = options
  const classes = [classMap["pm-kbd"], classMap[`pm-kbd--${size}`]]

  return classes.filter(Boolean).join(" ")
}
