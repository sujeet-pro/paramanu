import type { FormatNumberOptions } from "./format-number.types.js"

/**
 * Formats a number according to the specified locale and style
 * using the standard `Intl.NumberFormat` API.
 *
 * Supports decimal, currency, percent, and unit styles with
 * configurable fraction digits and notation (standard, scientific,
 * engineering, compact).
 *
 * @param value - The number to format
 * @param options - Formatting options
 * @returns The locale-formatted string representation
 *
 * @example
 * ```ts
 * formatNumber(1234567.89)
 * // => "1,234,567.89"
 *
 * formatNumber(42.99, { style: "currency", currency: "USD" })
 * // => "$42.99"
 *
 * formatNumber(0.85, { style: "percent" })
 * // => "85%"
 *
 * formatNumber(1500000, { notation: "compact" })
 * // => "1.5M"
 *
 * formatNumber(1234.56, { locale: "de-DE" })
 * // => "1.234,56"
 * ```
 */
export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  const {
    locale = "en-US",
    style = "decimal",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation = "standard",
  } = options

  return new Intl.NumberFormat(locale, {
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
  }).format(value)
}
