import { describe, it, expect } from "vitest"
import { pinInputClasses, pinInputModuleClasses } from "./pin-input.classes.js"

describe("pinInputClasses", () => {
  it("returns default classes (md)", () => {
    const result = pinInputClasses()
    expect(result).toBe("pm-pin-input pm-pin-input--md")
  })

  it("applies size", () => {
    expect(pinInputClasses({ size: "sm" })).toContain("pm-pin-input--sm")
    expect(pinInputClasses({ size: "md" })).toContain("pm-pin-input--md")
    expect(pinInputClasses({ size: "lg" })).toContain("pm-pin-input--lg")
  })

  it("applies disabled modifier", () => {
    expect(pinInputClasses({ disabled: true })).toContain("pm-pin-input--disabled")
    expect(pinInputClasses({ disabled: false })).not.toContain("pm-pin-input--disabled")
  })

  it("applies invalid modifier", () => {
    expect(pinInputClasses({ invalid: true })).toContain("pm-pin-input--invalid")
    expect(pinInputClasses({ invalid: false })).not.toContain("pm-pin-input--invalid")
  })

  it("always includes base class", () => {
    expect(pinInputClasses()).toMatch(/^pm-pin-input\s/)
  })

  it("combines multiple options", () => {
    const result = pinInputClasses({
      size: "lg",
      disabled: true,
      invalid: true,
    })
    expect(result).toBe(
      "pm-pin-input pm-pin-input--lg pm-pin-input--disabled pm-pin-input--invalid",
    )
  })
})

describe("pinInputModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-pin-input": "pm_abc_pinInput",
    "pm-pin-input--md": "pm_abc_md",
    "pm-pin-input--sm": "pm_abc_sm",
    "pm-pin-input--lg": "pm_abc_lg",
    "pm-pin-input--disabled": "pm_abc_disabled",
    "pm-pin-input--invalid": "pm_abc_invalid",
  }

  it("returns mapped default classes", () => {
    const result = pinInputModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_pinInput pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = pinInputModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = pinInputModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps invalid class", () => {
    const result = pinInputModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-pin-input": "pm_abc_pinInput",
    }
    const result = pinInputModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_pinInput")
    expect(result).not.toContain("undefined")
  })
})
