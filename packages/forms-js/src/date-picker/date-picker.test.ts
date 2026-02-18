import { describe, it, expect } from "vitest"
import { datePickerClasses, datePickerModuleClasses } from "./date-picker.classes.js"

describe("datePickerClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = datePickerClasses()
    expect(result).toBe("pm-date-picker pm-date-picker--outline pm-date-picker--md")
  })

  it("applies variant", () => {
    expect(datePickerClasses({ variant: "outline" })).toContain("pm-date-picker--outline")
    expect(datePickerClasses({ variant: "filled" })).toContain("pm-date-picker--filled")
    expect(datePickerClasses({ variant: "unstyled" })).toContain("pm-date-picker--unstyled")
  })

  it("applies size", () => {
    expect(datePickerClasses({ size: "sm" })).toContain("pm-date-picker--sm")
    expect(datePickerClasses({ size: "md" })).toContain("pm-date-picker--md")
    expect(datePickerClasses({ size: "lg" })).toContain("pm-date-picker--lg")
  })

  it("applies invalid modifier", () => {
    expect(datePickerClasses({ invalid: true })).toContain("pm-date-picker--invalid")
    expect(datePickerClasses({ invalid: false })).not.toContain("pm-date-picker--invalid")
  })

  it("applies disabled modifier", () => {
    expect(datePickerClasses({ disabled: true })).toContain("pm-date-picker--disabled")
    expect(datePickerClasses({ disabled: false })).not.toContain("pm-date-picker--disabled")
  })

  it("applies open modifier", () => {
    expect(datePickerClasses({ open: true })).toContain("pm-date-picker--open")
    expect(datePickerClasses({ open: false })).not.toContain("pm-date-picker--open")
  })

  it("always includes base class", () => {
    expect(datePickerClasses()).toMatch(/^pm-date-picker\s/)
  })

  it("combines multiple options", () => {
    const result = datePickerClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
    })
    expect(result).toBe(
      "pm-date-picker pm-date-picker--filled pm-date-picker--lg pm-date-picker--invalid pm-date-picker--disabled pm-date-picker--open",
    )
  })
})

describe("datePickerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-date-picker": "pm_abc_datePicker",
    "pm-date-picker--outline": "pm_abc_outline",
    "pm-date-picker--filled": "pm_abc_filled",
    "pm-date-picker--md": "pm_abc_md",
    "pm-date-picker--sm": "pm_abc_sm",
    "pm-date-picker--lg": "pm_abc_lg",
    "pm-date-picker--invalid": "pm_abc_invalid",
    "pm-date-picker--disabled": "pm_abc_disabled",
    "pm-date-picker--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = datePickerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_datePicker pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = datePickerModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps open class", () => {
    const result = datePickerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-date-picker": "pm_abc_datePicker",
    }
    const result = datePickerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_datePicker")
    expect(result).not.toContain("undefined")
  })
})
