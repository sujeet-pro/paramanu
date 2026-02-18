import type { LocaleOptions } from "./locale-provider.types.js"

/**
 * Sets the locale on the target element via the `lang` attribute.
 *
 * The `lang` attribute is used by browsers for hyphenation, spell-checking,
 * and as the default locale for `Intl` APIs. It also informs assistive
 * technologies about the language of the content.
 *
 * @param locale - A BCP 47 language tag (e.g. `"en"`, `"de-DE"`, `"ja"`)
 * @param options - Configuration options
 *
 * @example
 * ```ts
 * setLocale("de-DE")
 * // <html lang="de-DE">
 *
 * setLocale("ja", { target: document.getElementById("content")! })
 * ```
 */
export function setLocale(locale: string, options: LocaleOptions = {}): void {
  const el = options.target ?? document.documentElement
  el.setAttribute("lang", locale)
}

/**
 * Reads the current locale from the target element's `lang` attribute.
 *
 * If no `lang` attribute is set, defaults to `"en"`.
 *
 * @param options - Configuration options
 * @returns The current BCP 47 language tag, or `"en"` as fallback
 *
 * @example
 * ```ts
 * getLocale()
 * // => "en"
 *
 * document.documentElement.setAttribute("lang", "ja")
 * getLocale()
 * // => "ja"
 * ```
 */
export function getLocale(options: LocaleOptions = {}): string {
  const el = options.target ?? document.documentElement
  return el.getAttribute("lang") ?? "en"
}
