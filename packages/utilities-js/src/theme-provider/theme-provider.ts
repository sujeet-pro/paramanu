import type { ThemeMode, ThemeOptions } from "./theme-provider.types.js"

/**
 * Applies a theme mode to the target element.
 *
 * Sets the `data-pm-theme` attribute and `color-scheme` CSS property,
 * and persists the choice to `localStorage`. All Paramanu CSS uses
 * `light-dark()` which responds to these signals.
 *
 * @param mode - The theme mode to apply
 * @param options - Configuration options
 *
 * @example
 * ```ts
 * setTheme("dark")
 * // <html data-pm-theme="dark" style="color-scheme: dark">
 *
 * setTheme("system")
 * // <html data-pm-theme="system"> (color-scheme removed, OS preference applies)
 * ```
 */
export function setTheme(mode: ThemeMode, options: ThemeOptions = {}): void {
  const { storageKey = "pm-theme", target = document.documentElement } = options

  target.setAttribute("data-pm-theme", mode)

  if (mode === "system") {
    target.style.removeProperty("color-scheme")
  } else {
    target.style.setProperty("color-scheme", mode)
  }

  try {
    localStorage.setItem(storageKey, mode)
  } catch {
    // localStorage may not be available (SSR, privacy mode)
  }
}

/**
 * Reads the stored theme preference from `localStorage`.
 *
 * Returns the stored value if it is a valid `ThemeMode`, otherwise
 * falls back to `"system"`.
 *
 * @param options - Configuration with optional custom storage key
 * @returns The stored theme mode or `"system"` as default
 *
 * @example
 * ```ts
 * const theme = getTheme()
 * // => "dark" | "light" | "system"
 * ```
 */
export function getTheme(options: Pick<ThemeOptions, "storageKey"> = {}): ThemeMode {
  const { storageKey = "pm-theme" } = options

  try {
    const stored = localStorage.getItem(storageKey)
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored
    }
  } catch {
    // localStorage may not be available
  }

  return "system"
}

/**
 * Removes all theme-related attributes, styles, and storage.
 *
 * Resets the target element to its unthemed state by removing
 * `data-pm-theme`, `color-scheme`, and the `localStorage` entry.
 *
 * @param options - Configuration options
 *
 * @example
 * ```ts
 * clearTheme()
 * // <html> (no data-pm-theme, no color-scheme)
 * ```
 */
export function clearTheme(options: ThemeOptions = {}): void {
  const { storageKey = "pm-theme", target = document.documentElement } = options

  target.removeAttribute("data-pm-theme")
  target.style.removeProperty("color-scheme")

  try {
    localStorage.removeItem(storageKey)
  } catch {
    // localStorage may not be available
  }
}
