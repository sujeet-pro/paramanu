import type { CtxMenuClassesOptions } from "./context-menu.types.js"

const BASE = "pm-ctx-menu"

export function ctxMenuClasses(options: CtxMenuClassesOptions = {}): string {
  const { size = "md", open = false } = options
  const classes = [BASE, `${BASE}--${size}`]
  if (open) classes.push(`${BASE}--open`)
  return classes.join(" ")
}

export function ctxMenuModuleClasses(
  classMap: Record<string, string>,
  options: CtxMenuClassesOptions = {},
): string {
  const { size = "md", open = false } = options
  const classes = [classMap["pm-ctx-menu"], classMap[`pm-ctx-menu--${size}`]]
  if (open) classes.push(classMap["pm-ctx-menu--open"])
  return classes.filter(Boolean).join(" ")
}
