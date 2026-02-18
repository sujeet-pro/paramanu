import type { FormatByteOptions } from "./format-byte.types.js"

/** SI decimal byte unit labels (powers of 1000). */
const BYTE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB"]

/** SI decimal bit unit labels (powers of 1000). */
const BIT_UNITS = ["b", "Kb", "Mb", "Gb", "Tb", "Pb"]

/**
 * Formats a byte value into a human-readable string with the
 * appropriate unit suffix.
 *
 * Uses SI decimal prefixes (powers of 1000): B, KB, MB, GB, TB, PB.
 * Automatically selects the best unit based on the magnitude of the value.
 * Number formatting is delegated to `Intl.NumberFormat` for locale support.
 *
 * @param bytes - The raw byte count to format (non-negative recommended)
 * @param options - Formatting options
 * @returns A formatted string like `"1.5 MB"` or `"8 Kb"`
 *
 * @example
 * ```ts
 * formatByte(0)
 * // => "0 B"
 *
 * formatByte(1500)
 * // => "1.5 KB"
 *
 * formatByte(1500000000)
 * // => "1.5 GB"
 *
 * formatByte(1000, { unit: "bit" })
 * // => "8 Kb"
 *
 * formatByte(1234567, { decimals: 3 })
 * // => "1.235 MB"
 *
 * formatByte(1500, { locale: "de-DE" })
 * // => "1,5 KB"
 * ```
 */
export function formatByte(bytes: number, options: FormatByteOptions = {}): string {
  const { locale = "en-US", decimals = 2, unit = "byte" } = options

  const units = unit === "bit" ? BIT_UNITS : BYTE_UNITS
  const value = unit === "bit" ? bytes * 8 : bytes

  if (value === 0) return `0 ${units[0]}`

  const absValue = Math.abs(value)
  const exponent = Math.min(Math.floor(Math.log10(absValue) / 3), units.length - 1)
  const scaled = value / Math.pow(1000, exponent)

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(scaled)

  return `${formatted} ${units[exponent]}`
}
