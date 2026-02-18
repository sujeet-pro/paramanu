import type { ContextMenuClassesOptions } from "./context-menu.types.js"

const BASE = "pm-context-menu"

export function contextMenuClasses(options: ContextMenuClassesOptions = {}): string {
  const { size = "md", open = false } = options
  const classes = [BASE, `${BASE}--${size}`]
  if (open) classes.push(`${BASE}--open`)
  return classes.join(" ")
}

export function contextMenuModuleClasses(
  classMap: Record<string, string>,
  options: ContextMenuClassesOptions = {},
): string {
  const { size = "md", open = false } = options
  const classes = [classMap["pm-context-menu"], classMap[`pm-context-menu--${size}`]]
  if (open) classes.push(classMap["pm-context-menu--open"])
  return classes.filter(Boolean).join(" ")
}
