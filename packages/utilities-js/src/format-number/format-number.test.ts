import { describe, it, expect } from "vitest"
import { formatNumber } from "./format-number.js"

describe("formatNumber", () => {
  it("formats decimal numbers with default locale", () => {
    expect(formatNumber(1234567.89)).toBe("1,234,567.89")
  })

  it("formats with custom locale", () => {
    expect(formatNumber(1234.56, { locale: "de-DE" })).toBe("1.234,56")
  })

  it("formats as currency", () => {
    const result = formatNumber(1234.56, { style: "currency", currency: "USD" })
    expect(result).toContain("1,234.56")
    expect(result).toContain("$")
  })

  it("formats as percent", () => {
    expect(formatNumber(0.85, { style: "percent" })).toBe("85%")
  })

  it("applies minimumFractionDigits", () => {
    expect(formatNumber(42, { minimumFractionDigits: 2 })).toBe("42.00")
  })

  it("applies maximumFractionDigits", () => {
    expect(formatNumber(3.14159, { maximumFractionDigits: 2 })).toBe("3.14")
  })

  it("formats with compact notation", () => {
    const result = formatNumber(1500000, { notation: "compact" })
    expect(result).toContain("1.5M")
  })

  it("formats with scientific notation", () => {
    const result = formatNumber(123456, { notation: "scientific" })
    expect(result).toContain("E")
  })

  it("handles zero", () => {
    expect(formatNumber(0)).toBe("0")
  })

  it("handles negative numbers", () => {
    const result = formatNumber(-1234.56)
    expect(result).toContain("1,234.56")
    expect(result).toContain("-")
  })
})
