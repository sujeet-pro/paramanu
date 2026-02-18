import { describe, it, expect } from "vitest"
import { numberInputClasses, numberInputModuleClasses } from "./number-input.classes.js"

describe("numberInputClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = numberInputClasses()
    expect(result).toBe("pm-number-input pm-number-input--outline pm-number-input--md")
  })

  it("applies variant", () => {
    expect(numberInputClasses({ variant: "outline" })).toContain("pm-number-input--outline")
    expect(numberInputClasses({ variant: "filled" })).toContain("pm-number-input--filled")
    expect(numberInputClasses({ variant: "unstyled" })).toContain("pm-number-input--unstyled")
  })

  it("applies size", () => {
    expect(numberInputClasses({ size: "sm" })).toContain("pm-number-input--sm")
    expect(numberInputClasses({ size: "md" })).toContain("pm-number-input--md")
    expect(numberInputClasses({ size: "lg" })).toContain("pm-number-input--lg")
  })

  it("applies invalid modifier", () => {
    expect(numberInputClasses({ invalid: true })).toContain("pm-number-input--invalid")
    expect(numberInputClasses({ invalid: false })).not.toContain("pm-number-input--invalid")
  })

  it("applies disabled modifier", () => {
    expect(numberInputClasses({ disabled: true })).toContain("pm-number-input--disabled")
    expect(numberInputClasses({ disabled: false })).not.toContain("pm-number-input--disabled")
  })

  it("always includes base class", () => {
    expect(numberInputClasses()).toMatch(/^pm-number-input\s/)
  })

  it("combines multiple options", () => {
    const result = numberInputClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-number-input pm-number-input--filled pm-number-input--lg pm-number-input--invalid pm-number-input--disabled",
    )
  })
})

describe("numberInputModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-number-input": "pm_abc_numberInput",
    "pm-number-input--outline": "pm_abc_outline",
    "pm-number-input--filled": "pm_abc_filled",
    "pm-number-input--md": "pm_abc_md",
    "pm-number-input--sm": "pm_abc_sm",
    "pm-number-input--lg": "pm_abc_lg",
    "pm-number-input--invalid": "pm_abc_invalid",
    "pm-number-input--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = numberInputModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_numberInput pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = numberInputModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps invalid class", () => {
    const result = numberInputModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = numberInputModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-number-input": "pm_abc_numberInput",
    }
    const result = numberInputModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_numberInput")
    expect(result).not.toContain("undefined")
  })
})
