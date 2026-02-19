import { describe, it, expect } from "vitest"
import { numInputClasses, numInputModuleClasses } from "./number-input.classes.js"

describe("numInputClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = numInputClasses()
    expect(result).toBe("pm-num-input pm-num-input--outline pm-num-input--md")
  })

  it("applies variant", () => {
    expect(numInputClasses({ variant: "outline" })).toContain("pm-num-input--outline")
    expect(numInputClasses({ variant: "filled" })).toContain("pm-num-input--filled")
    expect(numInputClasses({ variant: "unstyled" })).toContain("pm-num-input--unstyled")
  })

  it("applies size", () => {
    expect(numInputClasses({ size: "sm" })).toContain("pm-num-input--sm")
    expect(numInputClasses({ size: "md" })).toContain("pm-num-input--md")
    expect(numInputClasses({ size: "lg" })).toContain("pm-num-input--lg")
  })

  it("applies invalid modifier", () => {
    expect(numInputClasses({ invalid: true })).toContain("pm-num-input--invalid")
    expect(numInputClasses({ invalid: false })).not.toContain("pm-num-input--invalid")
  })

  it("applies disabled modifier", () => {
    expect(numInputClasses({ disabled: true })).toContain("pm-num-input--disabled")
    expect(numInputClasses({ disabled: false })).not.toContain("pm-num-input--disabled")
  })

  it("always includes base class", () => {
    expect(numInputClasses()).toMatch(/^pm-num-input\s/)
  })

  it("combines multiple options", () => {
    const result = numInputClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-num-input pm-num-input--filled pm-num-input--lg pm-num-input--invalid pm-num-input--disabled",
    )
  })
})

describe("numInputModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-num-input": "pm_abc_numberInput",
    "pm-num-input--outline": "pm_abc_outline",
    "pm-num-input--filled": "pm_abc_filled",
    "pm-num-input--md": "pm_abc_md",
    "pm-num-input--sm": "pm_abc_sm",
    "pm-num-input--lg": "pm_abc_lg",
    "pm-num-input--invalid": "pm_abc_invalid",
    "pm-num-input--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = numInputModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_numberInput pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = numInputModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps invalid class", () => {
    const result = numInputModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = numInputModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-num-input": "pm_abc_numberInput",
    }
    const result = numInputModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_numberInput")
    expect(result).not.toContain("undefined")
  })
})
