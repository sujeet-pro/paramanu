import type { TextClassesOptions } from "./text.types.js"

const BASE = "pm-text"

export function textClasses(options: TextClassesOptions = {}): string {
  const {
    size,
    weight,
    align,
    lineHeight,
    truncate = false,
    lineClamp,
    italic = false,
    transform,
    decoration,
    color,
    inherit = false,
    inline = false,
  } = options
  const classes = [BASE]

  if (size) classes.push(`${BASE}--size-${size}`)
  if (weight) classes.push(`${BASE}--weight-${weight}`)
  if (align) classes.push(`${BASE}--align-${align}`)
  if (lineHeight) classes.push(`${BASE}--lh-${lineHeight}`)
  if (truncate && !lineClamp) classes.push(`${BASE}--truncate`)
  if (lineClamp) classes.push(`${BASE}--line-clamp-${lineClamp}`)
  if (italic) classes.push(`${BASE}--italic`)
  if (transform) classes.push(`${BASE}--transform-${transform}`)
  if (decoration) classes.push(`${BASE}--decoration-${decoration}`)
  if (color) classes.push(`${BASE}--color-${color}`)
  if (inherit) classes.push(`${BASE}--inherit`)
  if (inline) classes.push(`${BASE}--inline`)

  return classes.join(" ")
}

export function textModuleClasses(
  classMap: Record<string, string>,
  options: TextClassesOptions = {},
): string {
  const {
    size,
    weight,
    align,
    lineHeight,
    truncate = false,
    lineClamp,
    italic = false,
    transform,
    decoration,
    color,
    inherit = false,
    inline = false,
  } = options
  const classes = [classMap["pm-text"]]

  if (size) classes.push(classMap[`pm-text--size-${size}`])
  if (weight) classes.push(classMap[`pm-text--weight-${weight}`])
  if (align) classes.push(classMap[`pm-text--align-${align}`])
  if (lineHeight) classes.push(classMap[`pm-text--lh-${lineHeight}`])
  if (truncate && !lineClamp) classes.push(classMap["pm-text--truncate"])
  if (lineClamp) classes.push(classMap[`pm-text--line-clamp-${lineClamp}`])
  if (italic) classes.push(classMap["pm-text--italic"])
  if (transform) classes.push(classMap[`pm-text--transform-${transform}`])
  if (decoration) classes.push(classMap[`pm-text--decoration-${decoration}`])
  if (color) classes.push(classMap[`pm-text--color-${color}`])
  if (inherit) classes.push(classMap["pm-text--inherit"])
  if (inline) classes.push(classMap["pm-text--inline"])

  return classes.filter(Boolean).join(" ")
}
