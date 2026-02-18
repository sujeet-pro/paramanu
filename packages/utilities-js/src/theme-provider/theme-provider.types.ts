/**
 * The color scheme mode for the application.
 *
 * - `"light"` — Forces light mode via `color-scheme: light`
 * - `"dark"` — Forces dark mode via `color-scheme: dark`
 * - `"system"` — Follows the user's OS preference via `prefers-color-scheme`
 */
export type ThemeMode = "light" | "dark" | "system"

/**
 * Options for theme management functions.
 *
 * The theme provider sets `data-pm-theme` on the target element and
 * persists the user's preference in `localStorage`. All Paramanu
 * components use `light-dark()` CSS function for automatic color
 * adaptation, making this the primary mechanism for theme switching.
 *
 * @example
 * ```ts
 * // Set dark mode on <html> with default storage key
 * setTheme("dark")
 *
 * // Set on a scoped container with a custom key
 * setTheme("light", {
 *   target: document.getElementById("app-shell")!,
 *   storageKey: "my-app-theme",
 * })
 * ```
 */
export interface ThemeProviderOptions {
  /**
   * The initial theme mode to use when no stored preference exists.
   *
   * @default "system"
   */
  defaultMode?: ThemeMode

  /**
   * The `localStorage` key used to persist the theme preference.
   * Change this if your app has a different storage namespace.
   *
   * @default "pm-theme"
   */
  storageKey?: string

  /**
   * The DOM element to set the `data-pm-theme` attribute and
   * `color-scheme` style on. Defaults to `document.documentElement`
   * for whole-page theming.
   *
   * @default document.documentElement
   */
  target?: HTMLElement
}
