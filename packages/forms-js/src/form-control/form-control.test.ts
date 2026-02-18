import { describe, it, expect } from "vitest"
import { formControlClasses, formControlModuleClasses } from "./form-control.classes.js"

describe("formControlClasses", () => {
  it("returns default classes (vertical)", () => {
    const result = formControlClasses()
    expect(result).toBe("pm-form-control pm-form-control--vertical")
  })

  it("applies vertical orientation", () => {
    expect(formControlClasses({ orientation: "vertical" })).toContain(
      "pm-form-control--vertical",
    )
  })

  it("applies horizontal orientation", () => {
    expect(formControlClasses({ orientation: "horizontal" })).toContain(
      "pm-form-control--horizontal",
    )
  })

  it("applies invalid modifier", () => {
    expect(formControlClasses({ invalid: true })).toContain("pm-form-control--invalid")
    expect(formControlClasses({ invalid: false })).not.toContain("pm-form-control--invalid")
  })

  it("applies disabled modifier", () => {
    expect(formControlClasses({ disabled: true })).toContain("pm-form-control--disabled")
    expect(formControlClasses({ disabled: false })).not.toContain("pm-form-control--disabled")
  })

  it("applies required modifier", () => {
    expect(formControlClasses({ required: true })).toContain("pm-form-control--required")
    expect(formControlClasses({ required: false })).not.toContain("pm-form-control--required")
  })

  it("always includes base class", () => {
    expect(formControlClasses()).toMatch(/^pm-form-control\s/)
  })

  it("combines multiple options", () => {
    const result = formControlClasses({
      orientation: "horizontal",
      invalid: true,
      disabled: true,
      required: true,
    })
    expect(result).toBe(
      "pm-form-control pm-form-control--horizontal pm-form-control--invalid pm-form-control--disabled pm-form-control--required",
    )
  })
})

describe("formControlModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-form-control": "pm_abc_formControl",
    "pm-form-control--vertical": "pm_abc_vertical",
    "pm-form-control--horizontal": "pm_abc_horizontal",
    "pm-form-control--invalid": "pm_abc_invalid",
    "pm-form-control--disabled": "pm_abc_disabled",
    "pm-form-control--required": "pm_abc_required",
  }

  it("returns mapped default classes", () => {
    const result = formControlModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_formControl pm_abc_vertical")
  })

  it("maps orientation classes correctly", () => {
    const result = formControlModuleClasses(mockClassMap, { orientation: "horizontal" })
    expect(result).toContain("pm_abc_horizontal")
  })

  it("maps invalid class", () => {
    const result = formControlModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = formControlModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-form-control": "pm_abc_formControl",
    }
    const result = formControlModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_formControl")
    expect(result).not.toContain("undefined")
  })
})
