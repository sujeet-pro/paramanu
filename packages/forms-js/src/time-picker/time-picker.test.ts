import { describe, it, expect } from "vitest"
import { timePickerClasses, timePickerModuleClasses } from "./time-picker.classes.js"

describe("timePickerClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = timePickerClasses()
    expect(result).toBe("pm-time-picker pm-time-picker--outline pm-time-picker--md")
  })

  it("applies variant", () => {
    expect(timePickerClasses({ variant: "outline" })).toContain("pm-time-picker--outline")
    expect(timePickerClasses({ variant: "filled" })).toContain("pm-time-picker--filled")
    expect(timePickerClasses({ variant: "unstyled" })).toContain("pm-time-picker--unstyled")
  })

  it("applies size", () => {
    expect(timePickerClasses({ size: "sm" })).toContain("pm-time-picker--sm")
    expect(timePickerClasses({ size: "md" })).toContain("pm-time-picker--md")
    expect(timePickerClasses({ size: "lg" })).toContain("pm-time-picker--lg")
  })

  it("applies invalid modifier", () => {
    expect(timePickerClasses({ invalid: true })).toContain("pm-time-picker--invalid")
    expect(timePickerClasses({ invalid: false })).not.toContain("pm-time-picker--invalid")
  })

  it("applies disabled modifier", () => {
    expect(timePickerClasses({ disabled: true })).toContain("pm-time-picker--disabled")
    expect(timePickerClasses({ disabled: false })).not.toContain("pm-time-picker--disabled")
  })

  it("applies open modifier", () => {
    expect(timePickerClasses({ open: true })).toContain("pm-time-picker--open")
    expect(timePickerClasses({ open: false })).not.toContain("pm-time-picker--open")
  })

  it("always includes base class", () => {
    expect(timePickerClasses()).toMatch(/^pm-time-picker\s/)
  })

  it("combines multiple options", () => {
    const result = timePickerClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
    })
    expect(result).toBe(
      "pm-time-picker pm-time-picker--filled pm-time-picker--lg pm-time-picker--invalid pm-time-picker--disabled pm-time-picker--open",
    )
  })
})

describe("timePickerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-time-picker": "pm_abc_timePicker",
    "pm-time-picker--outline": "pm_abc_outline",
    "pm-time-picker--filled": "pm_abc_filled",
    "pm-time-picker--md": "pm_abc_md",
    "pm-time-picker--sm": "pm_abc_sm",
    "pm-time-picker--lg": "pm_abc_lg",
    "pm-time-picker--invalid": "pm_abc_invalid",
    "pm-time-picker--disabled": "pm_abc_disabled",
    "pm-time-picker--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = timePickerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_timePicker pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = timePickerModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = timePickerModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps open class", () => {
    const result = timePickerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-time-picker": "pm_abc_timePicker",
    }
    const result = timePickerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_timePicker")
    expect(result).not.toContain("undefined")
  })
})
