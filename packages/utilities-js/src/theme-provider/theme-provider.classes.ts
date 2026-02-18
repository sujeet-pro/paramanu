import type { ThemeMode } from "./theme-provider.types.js"

const BASE = "pm-theme-provider"

export function themeProviderClasses(mode?: ThemeMode): string {
  const classes = [BASE]
  if (mode) classes.push(`${BASE}--${mode}`)
  return classes.join(" ")
}

export function themeProviderModuleClasses(
  classMap: Record<string, string>,
  mode?: ThemeMode,
): string {
  const classes = [classMap["pm-theme-provider"]]
  if (mode) classes.push(classMap[`pm-theme-provider--${mode}`])
  return classes.filter(Boolean).join(" ")
}
