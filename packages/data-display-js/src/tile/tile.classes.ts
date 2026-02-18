import type { TileClassesOptions } from "./tile.types.js"

const BASE = "pm-tile"

export function tileClasses(options: TileClassesOptions = {}): string {
  const { variant = "outline", size = "md", selected = false, disabled = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (selected) classes.push(`${BASE}--selected`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

export function tileModuleClasses(
  classMap: Record<string, string>,
  options: TileClassesOptions = {},
): string {
  const { variant = "outline", size = "md", selected = false, disabled = false } = options

  const classes = [classMap[BASE], classMap[`${BASE}--${variant}`], classMap[`${BASE}--${size}`]]

  if (selected) classes.push(classMap[`${BASE}--selected`])
  if (disabled) classes.push(classMap[`${BASE}--disabled`])

  return classes.filter(Boolean).join(" ")
}
