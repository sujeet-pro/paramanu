import type { HeadingClassesOptions, HeadingLevel, HeadingSize } from "./heading.types.js"

const BASE = "pm-heading"

const LEVEL_SIZE_MAP: Record<HeadingLevel, HeadingSize> = {
  1: "3xl",
  2: "2xl",
  3: "xl",
  4: "lg",
  5: "md",
  6: "sm",
}

export function headingClasses(options: HeadingClassesOptions = {}): string {
  const { level = 2, size, weight = "bold", align, truncate = false } = options
  const resolvedSize = size ?? LEVEL_SIZE_MAP[level]
  const classes = [BASE, `${BASE}--size-${resolvedSize}`, `${BASE}--weight-${weight}`]

  if (align) classes.push(`${BASE}--align-${align}`)
  if (truncate) classes.push(`${BASE}--truncate`)

  return classes.join(" ")
}

export function headingModuleClasses(
  classMap: Record<string, string>,
  options: HeadingClassesOptions = {},
): string {
  const { level = 2, size, weight = "bold", align, truncate = false } = options
  const resolvedSize = size ?? LEVEL_SIZE_MAP[level]
  const classes = [
    classMap["pm-heading"],
    classMap[`pm-heading--size-${resolvedSize}`],
    classMap[`pm-heading--weight-${weight}`],
  ]

  if (align) classes.push(classMap[`pm-heading--align-${align}`])
  if (truncate) classes.push(classMap["pm-heading--truncate"])

  return classes.filter(Boolean).join(" ")
}
