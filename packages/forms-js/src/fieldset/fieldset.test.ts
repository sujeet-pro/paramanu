import { describe, it, expect } from "vitest"
import { fieldsetClasses, fieldsetModuleClasses } from "./fieldset.classes.js"

describe("fieldsetClasses", () => {
  it("returns default classes (default variant)", () => {
    const result = fieldsetClasses()
    expect(result).toBe("pm-fieldset pm-fieldset--default")
  })

  it("applies default variant", () => {
    expect(fieldsetClasses({ variant: "default" })).toContain("pm-fieldset--default")
  })

  it("applies card variant", () => {
    expect(fieldsetClasses({ variant: "card" })).toContain("pm-fieldset--card")
  })

  it("applies disabled modifier", () => {
    expect(fieldsetClasses({ disabled: true })).toContain("pm-fieldset--disabled")
    expect(fieldsetClasses({ disabled: false })).not.toContain("pm-fieldset--disabled")
  })

  it("always includes base class", () => {
    expect(fieldsetClasses()).toMatch(/^pm-fieldset\s/)
  })

  it("combines multiple options", () => {
    const result = fieldsetClasses({
      variant: "card",
      disabled: true,
    })
    expect(result).toBe("pm-fieldset pm-fieldset--card pm-fieldset--disabled")
  })
})

describe("fieldsetModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-fieldset": "pm_abc_fieldset",
    "pm-fieldset--default": "pm_abc_default",
    "pm-fieldset--card": "pm_abc_card",
    "pm-fieldset--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = fieldsetModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_fieldset pm_abc_default")
  })

  it("maps variant classes correctly", () => {
    const result = fieldsetModuleClasses(mockClassMap, { variant: "card" })
    expect(result).toContain("pm_abc_card")
  })

  it("maps disabled class", () => {
    const result = fieldsetModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-fieldset": "pm_abc_fieldset",
    }
    const result = fieldsetModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_fieldset")
    expect(result).not.toContain("undefined")
  })
})
