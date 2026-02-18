import type { BackToTopClassesOptions } from "./back-to-top.types.js"

const BASE = "pm-back-to-top"

export function backToTopClasses(options: BackToTopClassesOptions = {}): string {
  const { size = "md", position = "bottom-right", visible = true } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--${position}`]

  if (visible) classes.push(`${BASE}--visible`)

  return classes.join(" ")
}

export function backToTopModuleClasses(
  classMap: Record<string, string>,
  options: BackToTopClassesOptions = {},
): string {
  const { size = "md", position = "bottom-right", visible = true } = options
  const classes = [
    classMap["pm-back-to-top"],
    classMap[`pm-back-to-top--${size}`],
    classMap[`pm-back-to-top--${position}`],
  ]

  if (visible) classes.push(classMap["pm-back-to-top--visible"])

  return classes.filter(Boolean).join(" ")
}
