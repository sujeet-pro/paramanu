export type ThemeMode = "light" | "dark" | "system"

export interface ThemeProviderOptions {
  defaultMode?: ThemeMode
  storageKey?: string
  target?: HTMLElement
}
