import type { BleedClassesOptions } from "./bleed.types.js"

const BASE = "pm-bleed"

/**
 * Returns BEM class names for the bleed component (human-readable).
 * Used by CDN and template consumers.
 */
export function bleedClasses(options: BleedClassesOptions = {}): string {
  const { inline, block, inlineStart, inlineEnd, blockStart, blockEnd } = options
  const classes = [BASE]

  if (inline !== undefined) classes.push(`${BASE}--inline-${inline}`)
  if (block !== undefined) classes.push(`${BASE}--block-${block}`)
  if (inlineStart !== undefined) classes.push(`${BASE}--inline-start-${inlineStart}`)
  if (inlineEnd !== undefined) classes.push(`${BASE}--inline-end-${inlineEnd}`)
  if (blockStart !== undefined) classes.push(`${BASE}--block-start-${blockStart}`)
  if (blockEnd !== undefined) classes.push(`${BASE}--block-end-${blockEnd}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the bleed component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function bleedModuleClasses(
  classMap: Record<string, string>,
  options: BleedClassesOptions = {},
): string {
  const { inline, block, inlineStart, inlineEnd, blockStart, blockEnd } = options

  const classes = [classMap["pm-bleed"]]

  if (inline !== undefined) classes.push(classMap[`pm-bleed--inline-${inline}`])
  if (block !== undefined) classes.push(classMap[`pm-bleed--block-${block}`])
  if (inlineStart !== undefined) classes.push(classMap[`pm-bleed--inline-start-${inlineStart}`])
  if (inlineEnd !== undefined) classes.push(classMap[`pm-bleed--inline-end-${inlineEnd}`])
  if (blockStart !== undefined) classes.push(classMap[`pm-bleed--block-start-${blockStart}`])
  if (blockEnd !== undefined) classes.push(classMap[`pm-bleed--block-end-${blockEnd}`])

  return classes.filter(Boolean).join(" ")
}
