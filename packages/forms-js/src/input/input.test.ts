import { describe, it, expect } from "vitest"
import { inputClasses, inputModuleClasses } from "./input.classes.js"

describe("inputClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = inputClasses()
    expect(result).toBe("pm-input pm-input--outline pm-input--md")
  })

  it("applies variant", () => {
    expect(inputClasses({ variant: "outline" })).toContain("pm-input--outline")
    expect(inputClasses({ variant: "filled" })).toContain("pm-input--filled")
    expect(inputClasses({ variant: "unstyled" })).toContain("pm-input--unstyled")
  })

  it("applies size", () => {
    expect(inputClasses({ size: "sm" })).toContain("pm-input--sm")
    expect(inputClasses({ size: "md" })).toContain("pm-input--md")
    expect(inputClasses({ size: "lg" })).toContain("pm-input--lg")
  })

  it("applies invalid modifier", () => {
    expect(inputClasses({ invalid: true })).toContain("pm-input--invalid")
    expect(inputClasses({ invalid: false })).not.toContain("pm-input--invalid")
  })

  it("applies disabled modifier", () => {
    expect(inputClasses({ disabled: true })).toContain("pm-input--disabled")
    expect(inputClasses({ disabled: false })).not.toContain("pm-input--disabled")
  })

  it("applies read-only modifier", () => {
    expect(inputClasses({ readOnly: true })).toContain("pm-input--read-only")
    expect(inputClasses({ readOnly: false })).not.toContain("pm-input--read-only")
  })

  it("applies full-width modifier", () => {
    expect(inputClasses({ fullWidth: true })).toContain("pm-input--full-width")
    expect(inputClasses({ fullWidth: false })).not.toContain("pm-input--full-width")
  })

  it("always includes base class", () => {
    expect(inputClasses()).toMatch(/^pm-input\s/)
  })

  it("combines multiple options", () => {
    const result = inputClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      readOnly: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-input pm-input--filled pm-input--lg pm-input--invalid pm-input--disabled pm-input--read-only pm-input--full-width",
    )
  })
})

describe("inputModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-input": "pm_abc_input",
    "pm-input--outline": "pm_abc_outline",
    "pm-input--filled": "pm_abc_filled",
    "pm-input--md": "pm_abc_md",
    "pm-input--sm": "pm_abc_sm",
    "pm-input--lg": "pm_abc_lg",
    "pm-input--invalid": "pm_abc_invalid",
    "pm-input--disabled": "pm_abc_disabled",
    "pm-input--read-only": "pm_abc_readOnly",
    "pm-input--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = inputModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_input pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = inputModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = inputModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps invalid class", () => {
    const result = inputModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = inputModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-input": "pm_abc_input",
    }
    const result = inputModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_input")
    expect(result).not.toContain("undefined")
  })
})
