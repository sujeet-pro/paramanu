import type { ThemeMode, ThemeProviderOptions } from "./theme-provider.types.js"

export function setTheme(mode: ThemeMode, options: ThemeProviderOptions = {}): void {
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

export function getTheme(
  options: Pick<ThemeProviderOptions, "storageKey"> = {},
): ThemeMode {
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

export function clearTheme(options: ThemeProviderOptions = {}): void {
  const { storageKey = "pm-theme", target = document.documentElement } = options

  target.removeAttribute("data-pm-theme")
  target.style.removeProperty("color-scheme")

  try {
    localStorage.removeItem(storageKey)
  } catch {
    // localStorage may not be available
  }
}
