/**
 * Options for locale management functions.
 *
 * The locale provider manages the `lang` HTML attribute which affects
 * browser behavior for hyphenation, spell-checking, and `Intl` API
 * defaults. It is also used by `FormatNumber` and `FormatByte`
 * components to determine the number formatting locale.
 *
 * The locale string should be a valid BCP 47 language tag (e.g.
 * `"en"`, `"en-US"`, `"de-DE"`, `"ja"`, `"ar-SA"`).
 *
 * @example
 * ```ts
 * setLocale("fr-FR")
 * // <html lang="fr-FR">
 *
 * getLocale()
 * // => "fr-FR"
 * ```
 */
export interface LocaleOptions {
  /**
   * The DOM element to set the `lang` attribute on.
   * Defaults to `document.documentElement` for whole-page locale.
   *
   * @default document.documentElement
   */
  target?: HTMLElement
}
