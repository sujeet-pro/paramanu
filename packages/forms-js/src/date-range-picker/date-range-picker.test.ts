import { describe, it, expect } from "vitest"
import {
  daterangeClasses,
  daterangeModuleClasses,
} from "./date-range-picker.classes.js"

describe("daterangeClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = daterangeClasses()
    expect(result).toBe(
      "pm-daterange pm-daterange--outline pm-daterange--md",
    )
  })

  it("applies variant", () => {
    expect(daterangeClasses({ variant: "outline" })).toContain(
      "pm-daterange--outline",
    )
    expect(daterangeClasses({ variant: "filled" })).toContain(
      "pm-daterange--filled",
    )
    expect(daterangeClasses({ variant: "unstyled" })).toContain(
      "pm-daterange--unstyled",
    )
  })

  it("applies size", () => {
    expect(daterangeClasses({ size: "sm" })).toContain("pm-daterange--sm")
    expect(daterangeClasses({ size: "md" })).toContain("pm-daterange--md")
    expect(daterangeClasses({ size: "lg" })).toContain("pm-daterange--lg")
  })

  it("applies invalid modifier", () => {
    expect(daterangeClasses({ invalid: true })).toContain("pm-daterange--invalid")
    expect(daterangeClasses({ invalid: false })).not.toContain(
      "pm-daterange--invalid",
    )
  })

  it("applies disabled modifier", () => {
    expect(daterangeClasses({ disabled: true })).toContain("pm-daterange--disabled")
    expect(daterangeClasses({ disabled: false })).not.toContain(
      "pm-daterange--disabled",
    )
  })

  it("applies open modifier", () => {
    expect(daterangeClasses({ open: true })).toContain("pm-daterange--open")
    expect(daterangeClasses({ open: false })).not.toContain("pm-daterange--open")
  })

  it("always includes base class", () => {
    expect(daterangeClasses()).toMatch(/^pm-daterange\s/)
  })

  it("combines multiple options", () => {
    const result = daterangeClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
    })
    expect(result).toBe(
      "pm-daterange pm-daterange--filled pm-daterange--lg pm-daterange--invalid pm-daterange--disabled pm-daterange--open",
    )
  })
})

describe("daterangeModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-daterange": "pm_abc_dateRangePicker",
    "pm-daterange--outline": "pm_abc_outline",
    "pm-daterange--filled": "pm_abc_filled",
    "pm-daterange--md": "pm_abc_md",
    "pm-daterange--lg": "pm_abc_lg",
    "pm-daterange--invalid": "pm_abc_invalid",
    "pm-daterange--disabled": "pm_abc_disabled",
    "pm-daterange--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = daterangeModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_dateRangePicker pm_abc_outline pm_abc_md")
  })

  it("maps open class", () => {
    const result = daterangeModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-daterange": "pm_abc_dateRangePicker",
    }
    const result = daterangeModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_dateRangePicker")
    expect(result).not.toContain("undefined")
  })
})
