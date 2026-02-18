import type { ClipboardClassesOptions } from "./clipboard.types.js"

const BASE = "pm-clipboard"

/**
 * Returns BEM class names for the Clipboard component.
 *
 * A button that copies text to the clipboard. Shows a success state
 * (green border + color) after copying. The actual clipboard API call
 * is handled by the React wrapper or consumer.
 *
 * @example
 * ```ts
 * clipboardClasses({ size: "sm", copied: true })
 * // => "pm-clipboard pm-clipboard--sm pm-clipboard--copied"
 * ```
 */
export function clipboardClasses(options: ClipboardClassesOptions = {}): string {
  const { size = "md", copied = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (copied) classes.push(`${BASE}--copied`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the Clipboard component.
 * Used by bundled consumers who import CSS modules.
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
