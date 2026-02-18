export interface FormatNumberOptions {
  locale?: string
  style?: "decimal" | "currency" | "percent" | "unit"
  currency?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  notation?: "standard" | "scientific" | "engineering" | "compact"
}
