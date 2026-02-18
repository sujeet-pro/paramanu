import type { LocaleOptions } from "./locale-provider.types.js"

export function setLocale(locale: string, options: LocaleOptions = {}): void {
  const el = options.target ?? document.documentElement
  el.setAttribute("lang", locale)
}

export function getLocale(options: LocaleOptions = {}): string {
  const el = options.target ?? document.documentElement
  return el.getAttribute("lang") ?? "en"
}
