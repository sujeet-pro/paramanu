import type { ThemeMode } from "./theme-provider.types.js"

const BASE = "pm-theme"

/**
 * Returns BEM class names for the theme provider wrapper element.
 *
 * Used when applying theme modes via CSS classes (as opposed to the
 * `data-pm-theme` attribute approach used by `setTheme()`).
 *
 * @param mode - Optional theme mode to include as a modifier class
 * @returns Space-separated class string
 *
 * @example
 * ```ts
 * themeClasses()
 * // => "pm-theme"
 *
 * themeClasses("dark")
 * // => "pm-theme pm-theme--dark"
 * ```
 */
export function themeClasses(mode?: ThemeMode): string {
  const classes = [BASE]
  if (mode) classes.push(`${BASE}--${mode}`)
  return classes.join(" ")
}

/**
 * Returns CSS module class names for the theme provider wrapper.
 *
 * @param classMap - CSS modules class name mapping object
 * @param mode - Optional theme mode modifier
 * @returns Space-separated mapped class string
 */
export function themeModuleClasses(classMap: Record<string, string>, mode?: ThemeMode): string {
  const classes = [classMap["pm-theme"]]
  if (mode) classes.push(classMap[`pm-theme--${mode}`])
  return classes.filter(Boolean).join(" ")
}
