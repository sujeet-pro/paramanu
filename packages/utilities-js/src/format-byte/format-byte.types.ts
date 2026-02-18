/**
 * Options for byte formatting.
 *
 * Converts raw byte values into human-readable strings with
 * appropriate unit suffixes (B, KB, MB, GB, TB, PB).
 *
 * Uses SI decimal prefixes (powers of 1000) by default.
 * For bit representation, set `unit: "bit"` which multiplies
 * the byte value by 8 and uses bit unit suffixes (b, Kb, Mb, etc.).
 *
 * API inspired by Chakra UI's `FormatByte` component.
 *
 * @example
 * ```ts
 * formatByte(1500)
 * // => "1.5 KB"
 *
 * formatByte(1500000000)
 * // => "1.5 GB"
 *
 * formatByte(1000, { unit: "bit" })
 * // => "8 Kb"
 *
 * formatByte(1500, { locale: "de-DE" })
 * // => "1,5 KB"
 * ```
 */
export interface FormatByteOptions {
  /**
   * A BCP 47 language tag for locale-specific number formatting.
   * Affects decimal separators and grouping.
   *
   * @default "en-US"
   */
  locale?: string

  /**
   * Maximum number of decimal places to display.
   *
   * @default 2
   */
  decimals?: number

  /**
   * The unit system to use for the output.
   *
   * - `"byte"` — Display in bytes (B, KB, MB, etc.)
   * - `"bit"` — Display in bits (b, Kb, Mb, etc.); input value is multiplied by 8
   *
   * @default "byte"
   */
  unit?: "byte" | "bit"
}
