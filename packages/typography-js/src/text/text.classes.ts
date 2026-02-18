import type { TextClassesOptions } from "./text.types.js"

const BASE = "pm-text"

export function textClasses(options: TextClassesOptions = {}): string {
  const { size, weight, align, lineHeight, truncate = false, italic = false, transform } = options
  const classes = [BASE]

  if (size) classes.push(`${BASE}--size-${size}`)
  if (weight) classes.push(`${BASE}--weight-${weight}`)
  if (align) classes.push(`${BASE}--align-${align}`)
  if (lineHeight) classes.push(`${BASE}--lh-${lineHeight}`)
  if (truncate) classes.push(`${BASE}--truncate`)
  if (italic) classes.push(`${BASE}--italic`)
  if (transform) classes.push(`${BASE}--transform-${transform}`)

  return classes.join(" ")
}

export function textModuleClasses(
  classMap: Record<string, string>,
  options: TextClassesOptions = {},
): string {
  const { size, weight, align, lineHeight, truncate = false, italic = false, transform } = options
  const classes = [classMap["pm-text"]]

  if (size) classes.push(classMap[`pm-text--size-${size}`])
  if (weight) classes.push(classMap[`pm-text--weight-${weight}`])
  if (align) classes.push(classMap[`pm-text--align-${align}`])
  if (lineHeight) classes.push(classMap[`pm-text--lh-${lineHeight}`])
  if (truncate) classes.push(classMap["pm-text--truncate"])
  if (italic) classes.push(classMap["pm-text--italic"])
  if (transform) classes.push(classMap[`pm-text--transform-${transform}`])

  return classes.filter(Boolean).join(" ")
}
