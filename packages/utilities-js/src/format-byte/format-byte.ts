import type { FormatByteOptions } from "./format-byte.types.js"

const BYTE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB"]
const BIT_UNITS = ["b", "Kb", "Mb", "Gb", "Tb", "Pb"]

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
