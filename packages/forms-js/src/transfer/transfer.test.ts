import { describe, it, expect } from "vitest"
import { transferClasses, transferModuleClasses } from "./transfer.classes.js"

describe("transferClasses", () => {
  it("returns default classes (md)", () => {
    const result = transferClasses()
    expect(result).toBe("pm-transfer pm-transfer--md")
  })

  it("applies size", () => {
    expect(transferClasses({ size: "sm" })).toContain("pm-transfer--sm")
    expect(transferClasses({ size: "md" })).toContain("pm-transfer--md")
    expect(transferClasses({ size: "lg" })).toContain("pm-transfer--lg")
  })

  it("applies disabled modifier", () => {
    expect(transferClasses({ disabled: true })).toContain("pm-transfer--disabled")
    expect(transferClasses({ disabled: false })).not.toContain("pm-transfer--disabled")
  })

  it("always includes base class", () => {
    expect(transferClasses()).toMatch(/^pm-transfer\s/)
  })

  it("combines multiple options", () => {
    const result = transferClasses({
      size: "lg",
      disabled: true,
    })
    expect(result).toBe("pm-transfer pm-transfer--lg pm-transfer--disabled")
  })
})

describe("transferModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-transfer": "pm_abc_transfer",
    "pm-transfer--md": "pm_abc_md",
    "pm-transfer--sm": "pm_abc_sm",
    "pm-transfer--lg": "pm_abc_lg",
    "pm-transfer--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = transferModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_transfer pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = transferModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = transferModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-transfer": "pm_abc_transfer",
    }
    const result = transferModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_transfer")
    expect(result).not.toContain("undefined")
  })
})
