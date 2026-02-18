/**
 * Options for number formatting using `Intl.NumberFormat`.
 *
 * Provides a simplified interface over the standard `Intl.NumberFormat`
 * options. All formatting is delegated to the browser's internationalization
 * engine, ensuring correct locale-specific output.
 *
 * API inspired by Chakra UI's `FormatNumber` component. For React usage,
 * prefer the `<FormatNumber>` component from `@paramanu/utilities-react`.
 *
 * @example
 * ```ts
 * // Currency formatting
 * formatNumber(1234.56, { style: "currency", currency: "EUR", locale: "de-DE" })
 * // => "1.234,56 €"
 *
 * // Compact notation
 * formatNumber(1500000, { notation: "compact" })
 * // => "1.5M"
 *
 * // Percentage
 * formatNumber(0.85, { style: "percent" })
 * // => "85%"
 * ```
 */
export interface FormatNumberOptions {
  /**
   * A BCP 47 language tag (e.g. `"en-US"`, `"de-DE"`, `"ja-JP"`).
   * Determines grouping separators, decimal symbols, and other
   * locale-specific formatting rules.
   *
   * @default "en-US"
   */
  locale?: string

  /**
   * The formatting style to use.
   *
   * - `"decimal"` — Plain number (default)
   * - `"currency"` — Currency format (requires `currency` option)
   * - `"percent"` — Multiplies by 100 and adds percent sign
   * - `"unit"` — Unit formatting (requires `unit` Intl option)
   *
   * @default "decimal"
   */
  style?: "decimal" | "currency" | "percent" | "unit"

  /**
   * The ISO 4217 currency code (e.g. `"USD"`, `"EUR"`, `"GBP"`).
   * Required when `style` is `"currency"`.
   */
  currency?: string

  /**
   * Minimum number of fraction digits to display.
   * Pads with trailing zeros if necessary.
   *
   * @example
   * ```ts
   * formatNumber(42, { minimumFractionDigits: 2 })
   * // => "42.00"
   * ```
   */
  minimumFractionDigits?: number

  /**
   * Maximum number of fraction digits to display.
   * Rounds the value if it has more digits.
   *
   * @example
   * ```ts
   * formatNumber(3.14159, { maximumFractionDigits: 2 })
   * // => "3.14"
   * ```
   */
  maximumFractionDigits?: number

  /**
   * The notation style for the number.
   *
   * - `"standard"` — Default plain formatting
   * - `"scientific"` — Scientific notation (e.g. `1.23E5`)
   * - `"engineering"` — Engineering notation (exponent is a multiple of 3)
   * - `"compact"` — Abbreviated form (e.g. `1.5M`, `2K`)
   *
   * @default "standard"
   */
  notation?: "standard" | "scientific" | "engineering" | "compact"
}
