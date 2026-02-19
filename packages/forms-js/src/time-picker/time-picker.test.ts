import { describe, it, expect } from "vitest"
import { timepickerClasses, timepickerModuleClasses } from "./time-picker.classes.js"

describe("timepickerClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = timepickerClasses()
    expect(result).toBe("pm-timepicker pm-timepicker--outline pm-timepicker--md")
  })

  it("applies variant", () => {
    expect(timepickerClasses({ variant: "outline" })).toContain("pm-timepicker--outline")
    expect(timepickerClasses({ variant: "filled" })).toContain("pm-timepicker--filled")
    expect(timepickerClasses({ variant: "unstyled" })).toContain("pm-timepicker--unstyled")
  })

  it("applies size", () => {
    expect(timepickerClasses({ size: "sm" })).toContain("pm-timepicker--sm")
    expect(timepickerClasses({ size: "md" })).toContain("pm-timepicker--md")
    expect(timepickerClasses({ size: "lg" })).toContain("pm-timepicker--lg")
  })

  it("applies invalid modifier", () => {
    expect(timepickerClasses({ invalid: true })).toContain("pm-timepicker--invalid")
    expect(timepickerClasses({ invalid: false })).not.toContain("pm-timepicker--invalid")
  })

  it("applies disabled modifier", () => {
    expect(timepickerClasses({ disabled: true })).toContain("pm-timepicker--disabled")
    expect(timepickerClasses({ disabled: false })).not.toContain("pm-timepicker--disabled")
  })

  it("applies open modifier", () => {
    expect(timepickerClasses({ open: true })).toContain("pm-timepicker--open")
    expect(timepickerClasses({ open: false })).not.toContain("pm-timepicker--open")
  })

  it("always includes base class", () => {
    expect(timepickerClasses()).toMatch(/^pm-timepicker\s/)
  })

  it("combines multiple options", () => {
    const result = timepickerClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
    })
    expect(result).toBe(
      "pm-timepicker pm-timepicker--filled pm-timepicker--lg pm-timepicker--invalid pm-timepicker--disabled pm-timepicker--open",
    )
  })
})

describe("timepickerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-timepicker": "pm_abc_timePicker",
    "pm-timepicker--outline": "pm_abc_outline",
    "pm-timepicker--filled": "pm_abc_filled",
    "pm-timepicker--md": "pm_abc_md",
    "pm-timepicker--sm": "pm_abc_sm",
    "pm-timepicker--lg": "pm_abc_lg",
    "pm-timepicker--invalid": "pm_abc_invalid",
    "pm-timepicker--disabled": "pm_abc_disabled",
    "pm-timepicker--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = timepickerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_timePicker pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = timepickerModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = timepickerModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps open class", () => {
    const result = timepickerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-timepicker": "pm_abc_timePicker",
    }
    const result = timepickerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_timePicker")
    expect(result).not.toContain("undefined")
  })
})
