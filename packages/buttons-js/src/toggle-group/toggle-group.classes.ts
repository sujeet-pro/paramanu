import type {
  ToggleGroupClassesOptions,
  ToggleGroupItemClassesOptions,
} from "./toggle-group.types.js"

const BASE = "pm-toggle-group"
const ITEM_BASE = "pm-toggle-group__item"

/**
 * Returns BEM class names for the toggle group container (human-readable).
 * Used by CDN and template consumers.
 */
export function toggleGroupClasses(options: ToggleGroupClassesOptions = {}): string {
  const { orientation = "horizontal", size = "md", attached = false } = options
  const classes = [BASE, `${BASE}--${orientation}`, `${BASE}--${size}`]

  if (attached) classes.push(`${BASE}--attached`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the toggle group container (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function toggleGroupModuleClasses(
  classMap: Record<string, string>,
  options: ToggleGroupClassesOptions = {},
): string {
  const { orientation = "horizontal", size = "md", attached = false } = options

  const classes = [
    classMap["pm-toggle-group"],
    classMap[`pm-toggle-group--${orientation}`],
    classMap[`pm-toggle-group--${size}`],
  ]

  if (attached) classes.push(classMap["pm-toggle-group--attached"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a toggle group item (human-readable).
 * Used by CDN and template consumers.
 */
export function toggleGroupItemClasses(options: ToggleGroupItemClassesOptions = {}): string {
  const { size = "md", pressed = false, disabled = false } = options
  const classes = [ITEM_BASE, `${ITEM_BASE}--${size}`]

  if (pressed) classes.push(`${ITEM_BASE}--pressed`)
  if (disabled) classes.push(`${ITEM_BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for a toggle group item (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function toggleGroupItemModuleClasses(
  classMap: Record<string, string>,
  options: ToggleGroupItemClassesOptions = {},
): string {
  const { size = "md", pressed = false, disabled = false } = options

  const classes = [
    classMap["pm-toggle-group__item"],
    classMap[`pm-toggle-group__item--${size}`],
  ]

  if (pressed) classes.push(classMap["pm-toggle-group__item--pressed"])
  if (disabled) classes.push(classMap["pm-toggle-group__item--disabled"])

  return classes.filter(Boolean).join(" ")
}
