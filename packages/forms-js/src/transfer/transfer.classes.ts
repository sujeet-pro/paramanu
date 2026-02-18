import type { TransferClassesOptions } from "./transfer.types.js"

const BASE = "pm-transfer"

/**
 * Returns BEM class names for the transfer component (human-readable).
 */
export function transferClasses(options: TransferClassesOptions = {}): string {
  const { size = "md", disabled = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the transfer component (hashed).
 */
export function transferModuleClasses(
  classMap: Record<string, string>,
  options: TransferClassesOptions = {},
): string {
  const { size = "md", disabled = false } = options

  const classes = [classMap["pm-transfer"], classMap[`pm-transfer--${size}`]]

  if (disabled) classes.push(classMap["pm-transfer--disabled"])

  return classes.filter(Boolean).join(" ")
}
