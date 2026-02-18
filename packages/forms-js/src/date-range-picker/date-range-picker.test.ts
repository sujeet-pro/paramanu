import { describe, it, expect } from "vitest"
import {
  dateRangePickerClasses,
  dateRangePickerModuleClasses,
} from "./date-range-picker.classes.js"

describe("dateRangePickerClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = dateRangePickerClasses()
    expect(result).toBe(
      "pm-date-range-picker pm-date-range-picker--outline pm-date-range-picker--md",
    )
  })

  it("applies variant", () => {
    expect(dateRangePickerClasses({ variant: "outline" })).toContain(
      "pm-date-range-picker--outline",
    )
    expect(dateRangePickerClasses({ variant: "filled" })).toContain(
      "pm-date-range-picker--filled",
    )
    expect(dateRangePickerClasses({ variant: "unstyled" })).toContain(
      "pm-date-range-picker--unstyled",
    )
  })

  it("applies size", () => {
    expect(dateRangePickerClasses({ size: "sm" })).toContain("pm-date-range-picker--sm")
    expect(dateRangePickerClasses({ size: "md" })).toContain("pm-date-range-picker--md")
    expect(dateRangePickerClasses({ size: "lg" })).toContain("pm-date-range-picker--lg")
  })

  it("applies invalid modifier", () => {
    expect(dateRangePickerClasses({ invalid: true })).toContain("pm-date-range-picker--invalid")
    expect(dateRangePickerClasses({ invalid: false })).not.toContain(
      "pm-date-range-picker--invalid",
    )
  })

  it("applies disabled modifier", () => {
    expect(dateRangePickerClasses({ disabled: true })).toContain("pm-date-range-picker--disabled")
    expect(dateRangePickerClasses({ disabled: false })).not.toContain(
      "pm-date-range-picker--disabled",
    )
  })

  it("applies open modifier", () => {
    expect(dateRangePickerClasses({ open: true })).toContain("pm-date-range-picker--open")
    expect(dateRangePickerClasses({ open: false })).not.toContain("pm-date-range-picker--open")
  })

  it("always includes base class", () => {
    expect(dateRangePickerClasses()).toMatch(/^pm-date-range-picker\s/)
  })

  it("combines multiple options", () => {
    const result = dateRangePickerClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
    })
    expect(result).toBe(
      "pm-date-range-picker pm-date-range-picker--filled pm-date-range-picker--lg pm-date-range-picker--invalid pm-date-range-picker--disabled pm-date-range-picker--open",
    )
  })
})

describe("dateRangePickerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-date-range-picker": "pm_abc_dateRangePicker",
    "pm-date-range-picker--outline": "pm_abc_outline",
    "pm-date-range-picker--filled": "pm_abc_filled",
    "pm-date-range-picker--md": "pm_abc_md",
    "pm-date-range-picker--lg": "pm_abc_lg",
    "pm-date-range-picker--invalid": "pm_abc_invalid",
    "pm-date-range-picker--disabled": "pm_abc_disabled",
    "pm-date-range-picker--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = dateRangePickerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_dateRangePicker pm_abc_outline pm_abc_md")
  })

  it("maps open class", () => {
    const result = dateRangePickerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-date-range-picker": "pm_abc_dateRangePicker",
    }
    const result = dateRangePickerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_dateRangePicker")
    expect(result).not.toContain("undefined")
  })
})
