import type { BoxClassesOptions } from "./box.types.js"

const BASE = "pm-box"

/**
 * Returns BEM class names for the box component (human-readable).
 * Used by CDN and template consumers.
 */
export function boxClasses(options: BoxClassesOptions = {}): string {
  const { display, p, px, py, m, mx, my, overflow, position } = options
  const classes = [BASE]

  if (display) classes.push(`${BASE}--d-${display}`)
  if (p !== undefined) classes.push(`${BASE}--p-${p}`)
  if (px !== undefined) classes.push(`${BASE}--px-${px}`)
  if (py !== undefined) classes.push(`${BASE}--py-${py}`)
  if (m !== undefined) classes.push(`${BASE}--m-${m}`)
  if (mx !== undefined) classes.push(`${BASE}--mx-${mx}`)
  if (my !== undefined) classes.push(`${BASE}--my-${my}`)
  if (overflow) classes.push(`${BASE}--overflow-${overflow}`)
  if (position) classes.push(`${BASE}--pos-${position}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the box component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function boxModuleClasses(
  classMap: Record<string, string>,
  options: BoxClassesOptions = {},
): string {
  const { display, p, px, py, m, mx, my, overflow, position } = options
  const classes = [classMap["pm-box"]]

  if (display) classes.push(classMap[`pm-box--d-${display}`])
  if (p !== undefined) classes.push(classMap[`pm-box--p-${p}`])
  if (px !== undefined) classes.push(classMap[`pm-box--px-${px}`])
  if (py !== undefined) classes.push(classMap[`pm-box--py-${py}`])
  if (m !== undefined) classes.push(classMap[`pm-box--m-${m}`])
  if (mx !== undefined) classes.push(classMap[`pm-box--mx-${mx}`])
  if (my !== undefined) classes.push(classMap[`pm-box--my-${my}`])
  if (overflow) classes.push(classMap[`pm-box--overflow-${overflow}`])
  if (position) classes.push(classMap[`pm-box--pos-${position}`])

  return classes.filter(Boolean).join(" ")
}
