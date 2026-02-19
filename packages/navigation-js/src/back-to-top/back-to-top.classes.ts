import type { BttClassesOptions } from "./back-to-top.types.js"

const BASE = "pm-btt"

export function bttClasses(options: BttClassesOptions = {}): string {
  const { size = "md", position = "bottom-right", visible = true } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--${position}`]

  if (visible) classes.push(`${BASE}--visible`)

  return classes.join(" ")
}

export function bttModuleClasses(
  classMap: Record<string, string>,
  options: BttClassesOptions = {},
): string {
  const { size = "md", position = "bottom-right", visible = true } = options
  const classes = [
    classMap["pm-btt"],
    classMap[`pm-btt--${size}`],
    classMap[`pm-btt--${position}`],
  ]

  if (visible) classes.push(classMap["pm-btt--visible"])

  return classes.filter(Boolean).join(" ")
}
