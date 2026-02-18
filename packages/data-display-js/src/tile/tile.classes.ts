import type { TileClassesOptions } from "./tile.types.js"

const BASE = "pm-tile"

/**
 * Returns BEM class names for the Tile component.
 *
 * Tiles are interactive, clickable card-like surfaces used for selection or navigation.
 * They are semantically rendered as `<button>` elements.
 *
 * @example
 * ```ts
 * tileClasses({ variant: "filled", selected: true })
 * // => "pm-tile pm-tile--filled pm-tile--md pm-tile--selected"
 * ```
 */
export function tileClasses(options: TileClassesOptions = {}): string {
  const { variant = "outline", size = "md", selected = false, disabled = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (selected) classes.push(`${BASE}--selected`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the Tile component.
 * Used by bundled consumers who import CSS modules.
 */
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
