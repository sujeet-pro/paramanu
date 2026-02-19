import { describe, it, expect } from "vitest"
import { datepickerClasses, datepickerModuleClasses } from "./date-picker.classes.js"

describe("datepickerClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = datepickerClasses()
    expect(result).toBe("pm-datepicker pm-datepicker--outline pm-datepicker--md")
  })

  it("applies variant", () => {
    expect(datepickerClasses({ variant: "outline" })).toContain("pm-datepicker--outline")
    expect(datepickerClasses({ variant: "filled" })).toContain("pm-datepicker--filled")
    expect(datepickerClasses({ variant: "unstyled" })).toContain("pm-datepicker--unstyled")
  })

  it("applies size", () => {
    expect(datepickerClasses({ size: "sm" })).toContain("pm-datepicker--sm")
    expect(datepickerClasses({ size: "md" })).toContain("pm-datepicker--md")
    expect(datepickerClasses({ size: "lg" })).toContain("pm-datepicker--lg")
  })

  it("applies invalid modifier", () => {
    expect(datepickerClasses({ invalid: true })).toContain("pm-datepicker--invalid")
    expect(datepickerClasses({ invalid: false })).not.toContain("pm-datepicker--invalid")
  })

  it("applies disabled modifier", () => {
    expect(datepickerClasses({ disabled: true })).toContain("pm-datepicker--disabled")
    expect(datepickerClasses({ disabled: false })).not.toContain("pm-datepicker--disabled")
  })

  it("applies open modifier", () => {
    expect(datepickerClasses({ open: true })).toContain("pm-datepicker--open")
    expect(datepickerClasses({ open: false })).not.toContain("pm-datepicker--open")
  })

  it("always includes base class", () => {
    expect(datepickerClasses()).toMatch(/^pm-datepicker\s/)
  })

  it("combines multiple options", () => {
    const result = datepickerClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
    })
    expect(result).toBe(
      "pm-datepicker pm-datepicker--filled pm-datepicker--lg pm-datepicker--invalid pm-datepicker--disabled pm-datepicker--open",
    )
  })
})

describe("datepickerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-datepicker": "pm_abc_datePicker",
    "pm-datepicker--outline": "pm_abc_outline",
    "pm-datepicker--filled": "pm_abc_filled",
    "pm-datepicker--md": "pm_abc_md",
    "pm-datepicker--sm": "pm_abc_sm",
    "pm-datepicker--lg": "pm_abc_lg",
    "pm-datepicker--invalid": "pm_abc_invalid",
    "pm-datepicker--disabled": "pm_abc_disabled",
    "pm-datepicker--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = datepickerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_datePicker pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = datepickerModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps open class", () => {
    const result = datepickerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-datepicker": "pm_abc_datePicker",
    }
    const result = datepickerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_datePicker")
    expect(result).not.toContain("undefined")
  })
})
