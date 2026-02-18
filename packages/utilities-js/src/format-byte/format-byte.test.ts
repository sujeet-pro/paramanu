import { describe, it, expect } from "vitest"
import { formatByte } from "./format-byte.js"

describe("formatByte", () => {
  it("formats 0 bytes", () => {
    expect(formatByte(0)).toBe("0 B")
  })

  it("formats bytes", () => {
    expect(formatByte(500)).toBe("500 B")
  })

  it("formats kilobytes", () => {
    expect(formatByte(1000)).toBe("1 KB")
    expect(formatByte(1500)).toBe("1.5 KB")
  })

  it("formats megabytes", () => {
    expect(formatByte(1000000)).toBe("1 MB")
    expect(formatByte(1500000)).toBe("1.5 MB")
  })

  it("formats gigabytes", () => {
    expect(formatByte(1000000000)).toBe("1 GB")
  })

  it("formats terabytes", () => {
    expect(formatByte(1000000000000)).toBe("1 TB")
  })

  it("formats petabytes", () => {
    expect(formatByte(1000000000000000)).toBe("1 PB")
  })

  it("respects custom decimals", () => {
    expect(formatByte(1234567, { decimals: 3 })).toBe("1.235 MB")
    expect(formatByte(1234567, { decimals: 0 })).toBe("1 MB")
  })

  it("formats as bits", () => {
    expect(formatByte(0, { unit: "bit" })).toBe("0 b")
    expect(formatByte(125, { unit: "bit" })).toBe("1 Kb")
  })

  it("handles negative values", () => {
    const result = formatByte(-1500)
    expect(result).toBe("-1.5 KB")
  })

  it("uses custom locale", () => {
    const result = formatByte(1500, { locale: "de-DE" })
    expect(result).toBe("1,5 KB")
  })
})
