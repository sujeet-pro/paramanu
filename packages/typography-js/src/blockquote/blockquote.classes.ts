import type { BlockquoteClassesOptions } from "./blockquote.types.js"

const BASE = "pm-blockquote"

export function blockquoteClasses(options: BlockquoteClassesOptions = {}): string {
  const { variant = "default", size = "md", color, withCite = false, withIcon = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (color) classes.push(`${BASE}--color-${color}`)
  if (withCite) classes.push(`${BASE}--with-cite`)
  if (withIcon) classes.push(`${BASE}--with-icon`)

  return classes.join(" ")
}

export function blockquoteModuleClasses(
  classMap: Record<string, string>,
  options: BlockquoteClassesOptions = {},
): string {
  const { variant = "default", size = "md", color, withCite = false, withIcon = false } = options
  const classes = [
    classMap["pm-blockquote"],
    classMap[`pm-blockquote--${variant}`],
    classMap[`pm-blockquote--${size}`],
  ]

  if (color) classes.push(classMap[`pm-blockquote--color-${color}`])
  if (withCite) classes.push(classMap["pm-blockquote--with-cite"])
  if (withIcon) classes.push(classMap["pm-blockquote--with-icon"])

  return classes.filter(Boolean).join(" ")
}
