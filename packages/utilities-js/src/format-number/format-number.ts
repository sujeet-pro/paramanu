import type { FormatNumberOptions } from "./format-number.types.js"

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
