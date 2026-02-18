import type { BlockquoteClassesOptions } from "./blockquote.types.js"

const BASE = "pm-blockquote"

export function blockquoteClasses(options: BlockquoteClassesOptions = {}): string {
  const { variant = "default", size = "md" } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  return classes.join(" ")
}

export function blockquoteModuleClasses(
  classMap: Record<string, string>,
  options: BlockquoteClassesOptions = {},
): string {
  const { variant = "default", size = "md" } = options
  const classes = [
    classMap["pm-blockquote"],
    classMap[`pm-blockquote--${variant}`],
    classMap[`pm-blockquote--${size}`],
  ]

  return classes.filter(Boolean).join(" ")
}
