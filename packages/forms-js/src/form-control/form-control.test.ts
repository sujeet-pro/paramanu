import { describe, it, expect } from "vitest"
import { formCtrlClasses, formCtrlModuleClasses } from "./form-control.classes.js"

describe("formCtrlClasses", () => {
  it("returns default classes (vertical)", () => {
    const result = formCtrlClasses()
    expect(result).toBe("pm-form-ctrl pm-form-ctrl--vertical")
  })

  it("applies vertical orientation", () => {
    expect(formCtrlClasses({ orientation: "vertical" })).toContain(
      "pm-form-ctrl--vertical",
    )
  })

  it("applies horizontal orientation", () => {
    expect(formCtrlClasses({ orientation: "horizontal" })).toContain(
      "pm-form-ctrl--horizontal",
    )
  })

  it("applies invalid modifier", () => {
    expect(formCtrlClasses({ invalid: true })).toContain("pm-form-ctrl--invalid")
    expect(formCtrlClasses({ invalid: false })).not.toContain("pm-form-ctrl--invalid")
  })

  it("applies disabled modifier", () => {
    expect(formCtrlClasses({ disabled: true })).toContain("pm-form-ctrl--disabled")
    expect(formCtrlClasses({ disabled: false })).not.toContain("pm-form-ctrl--disabled")
  })

  it("applies required modifier", () => {
    expect(formCtrlClasses({ required: true })).toContain("pm-form-ctrl--required")
    expect(formCtrlClasses({ required: false })).not.toContain("pm-form-ctrl--required")
  })

  it("always includes base class", () => {
    expect(formCtrlClasses()).toMatch(/^pm-form-ctrl\s/)
  })

  it("combines multiple options", () => {
    const result = formCtrlClasses({
      orientation: "horizontal",
      invalid: true,
      disabled: true,
      required: true,
    })
    expect(result).toBe(
      "pm-form-ctrl pm-form-ctrl--horizontal pm-form-ctrl--invalid pm-form-ctrl--disabled pm-form-ctrl--required",
    )
  })
})

describe("formCtrlModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-form-ctrl": "pm_abc_formControl",
    "pm-form-ctrl--vertical": "pm_abc_vertical",
    "pm-form-ctrl--horizontal": "pm_abc_horizontal",
    "pm-form-ctrl--invalid": "pm_abc_invalid",
    "pm-form-ctrl--disabled": "pm_abc_disabled",
    "pm-form-ctrl--required": "pm_abc_required",
  }

  it("returns mapped default classes", () => {
    const result = formCtrlModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_formControl pm_abc_vertical")
  })

  it("maps orientation classes correctly", () => {
    const result = formCtrlModuleClasses(mockClassMap, { orientation: "horizontal" })
    expect(result).toContain("pm_abc_horizontal")
  })

  it("maps invalid class", () => {
    const result = formCtrlModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = formCtrlModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-form-ctrl": "pm_abc_formControl",
    }
    const result = formCtrlModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_formControl")
    expect(result).not.toContain("undefined")
  })
})
