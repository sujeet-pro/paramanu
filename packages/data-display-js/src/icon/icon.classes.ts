import type { IconClassesOptions } from "./icon.types.js"

const BASE = "pm-icon"

/**
 * Returns BEM class names for the Icon component.
 *
 * Icon is an inline SVG wrapper that standardizes sizing, color, and
 * optional spin animation. Child `<svg>` elements inherit `fill: currentColor`.
 *
 * @example
 * ```ts
 * iconClasses({ size: "lg", color: "danger", spin: true })
 * // => "pm-icon pm-icon--lg pm-icon--danger pm-icon--spin"
 * ```
 */
export function iconClasses(options: IconClassesOptions = {}): string {
  const { size = "md", color = "inherit", spin = false } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--${color}`]

  if (spin) classes.push(`${BASE}--spin`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the Icon component.
 * Used by bundled consumers who import CSS modules.
 */
export function iconModuleClasses(
  classMap: Record<string, string>,
  options: IconClassesOptions = {},
): string {
  const { size = "md", color = "inherit", spin = false } = options

  const classes = [
    classMap["pm-icon"],
    classMap[`pm-icon--${size}`],
    classMap[`pm-icon--${color}`],
  ]

  if (spin) classes.push(classMap["pm-icon--spin"])

  return classes.filter(Boolean).join(" ")
}
