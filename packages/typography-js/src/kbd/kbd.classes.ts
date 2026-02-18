import type { KbdClassesOptions } from "./kbd.types.js"

const BASE = "pm-kbd"

export function kbdClasses(options: KbdClassesOptions = {}): string {
  const { size = "md", variant = "default" } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (variant !== "default") classes.push(`${BASE}--${variant}`)

  return classes.join(" ")
}

export function kbdModuleClasses(
  classMap: Record<string, string>,
  options: KbdClassesOptions = {},
): string {
  const { size = "md", variant = "default" } = options
  const classes = [classMap["pm-kbd"], classMap[`pm-kbd--${size}`]]

  if (variant !== "default") classes.push(classMap[`pm-kbd--${variant}`])

  return classes.filter(Boolean).join(" ")
}
