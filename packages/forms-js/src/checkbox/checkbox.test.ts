import { describe, it, expect } from "vitest"
import { checkboxClasses, checkboxModuleClasses } from "./checkbox.classes.js"

describe("checkboxClasses", () => {
  it("returns default classes (md)", () => {
    const result = checkboxClasses()
    expect(result).toBe("pm-checkbox pm-checkbox--md")
  })

  it("applies size sm", () => {
    expect(checkboxClasses({ size: "sm" })).toContain("pm-checkbox--sm")
  })

  it("applies size md", () => {
    expect(checkboxClasses({ size: "md" })).toContain("pm-checkbox--md")
  })

  it("applies size lg", () => {
    expect(checkboxClasses({ size: "lg" })).toContain("pm-checkbox--lg")
  })

  it("applies disabled modifier", () => {
    expect(checkboxClasses({ disabled: true })).toContain("pm-checkbox--disabled")
    expect(checkboxClasses({ disabled: false })).not.toContain("pm-checkbox--disabled")
  })

  it("applies invalid modifier", () => {
    expect(checkboxClasses({ invalid: true })).toContain("pm-checkbox--invalid")
    expect(checkboxClasses({ invalid: false })).not.toContain("pm-checkbox--invalid")
  })

  it("applies checked modifier", () => {
    expect(checkboxClasses({ checked: true })).toContain("pm-checkbox--checked")
    expect(checkboxClasses({ checked: false })).not.toContain("pm-checkbox--checked")
  })

  it("applies indeterminate modifier", () => {
    expect(checkboxClasses({ indeterminate: true })).toContain("pm-checkbox--indeterminate")
    expect(checkboxClasses({ indeterminate: false })).not.toContain("pm-checkbox--indeterminate")
  })

  it("always includes base class", () => {
    expect(checkboxClasses()).toMatch(/^pm-checkbox\s/)
  })

  it("combines multiple options", () => {
    const result = checkboxClasses({
      size: "lg",
      disabled: true,
      invalid: true,
      checked: true,
      indeterminate: true,
    })
    expect(result).toBe(
      "pm-checkbox pm-checkbox--lg pm-checkbox--disabled pm-checkbox--invalid pm-checkbox--checked pm-checkbox--indeterminate",
    )
  })
})

describe("checkboxModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-checkbox": "pm_abc_checkbox",
    "pm-checkbox--sm": "pm_abc_sm",
    "pm-checkbox--md": "pm_abc_md",
    "pm-checkbox--lg": "pm_abc_lg",
    "pm-checkbox--disabled": "pm_abc_disabled",
    "pm-checkbox--invalid": "pm_abc_invalid",
    "pm-checkbox--checked": "pm_abc_checked",
    "pm-checkbox--indeterminate": "pm_abc_indeterminate",
  }

  it("returns mapped default classes", () => {
    const result = checkboxModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_checkbox pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = checkboxModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = checkboxModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps invalid class", () => {
    const result = checkboxModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps checked class", () => {
    const result = checkboxModuleClasses(mockClassMap, { checked: true })
    expect(result).toContain("pm_abc_checked")
  })

  it("maps indeterminate class", () => {
    const result = checkboxModuleClasses(mockClassMap, { indeterminate: true })
    expect(result).toContain("pm_abc_indeterminate")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-checkbox": "pm_abc_checkbox",
    }
    const result = checkboxModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_checkbox")
    expect(result).not.toContain("undefined")
  })
})
