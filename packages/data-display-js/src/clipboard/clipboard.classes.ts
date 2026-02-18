import type { ClipboardClassesOptions } from "./clipboard.types.js"

const BASE = "pm-clipboard"

/**
 * Returns BEM class names for the clipboard component (human-readable).
 * Used by CDN and template consumers.
 */
export function clipboardClasses(options: ClipboardClassesOptions = {}): string {
  const { size = "md", copied = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (copied) classes.push(`${BASE}--copied`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the clipboard component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function clipboardModuleClasses(
  classMap: Record<string, string>,
  options: ClipboardClassesOptions = {},
): string {
  const { size = "md", copied = false } = options

  const classes = [classMap[BASE], classMap[`${BASE}--${size}`]]

  if (copied) classes.push(classMap[`${BASE}--copied`])

  return classes.filter(Boolean).join(" ")
}
