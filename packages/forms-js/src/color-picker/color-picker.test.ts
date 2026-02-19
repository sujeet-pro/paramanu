import { describe, it, expect } from "vitest"
import { colorpickerClasses, colorpickerModuleClasses } from "./color-picker.classes.js"

describe("colorpickerClasses", () => {
  it("returns default classes (md)", () => {
    const result = colorpickerClasses()
    expect(result).toBe("pm-colorpicker pm-colorpicker--md")
  })

  it("applies size", () => {
    expect(colorpickerClasses({ size: "sm" })).toContain("pm-colorpicker--sm")
    expect(colorpickerClasses({ size: "md" })).toContain("pm-colorpicker--md")
    expect(colorpickerClasses({ size: "lg" })).toContain("pm-colorpicker--lg")
  })

  it("applies disabled modifier", () => {
    expect(colorpickerClasses({ disabled: true })).toContain("pm-colorpicker--disabled")
    expect(colorpickerClasses({ disabled: false })).not.toContain("pm-colorpicker--disabled")
  })

  it("applies open modifier", () => {
    expect(colorpickerClasses({ open: true })).toContain("pm-colorpicker--open")
    expect(colorpickerClasses({ open: false })).not.toContain("pm-colorpicker--open")
  })

  it("always includes base class", () => {
    expect(colorpickerClasses()).toMatch(/^pm-colorpicker\s/)
  })

  it("combines multiple options", () => {
    const result = colorpickerClasses({
      size: "lg",
      disabled: true,
      open: true,
    })
    expect(result).toBe(
      "pm-colorpicker pm-colorpicker--lg pm-colorpicker--disabled pm-colorpicker--open",
    )
  })
})

describe("colorpickerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-colorpicker": "pm_abc_colorPicker",
    "pm-colorpicker--md": "pm_abc_md",
    "pm-colorpicker--sm": "pm_abc_sm",
    "pm-colorpicker--lg": "pm_abc_lg",
    "pm-colorpicker--disabled": "pm_abc_disabled",
    "pm-colorpicker--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = colorpickerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_colorPicker pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = colorpickerModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = colorpickerModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps open class", () => {
    const result = colorpickerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-colorpicker": "pm_abc_colorPicker",
    }
    const result = colorpickerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_colorPicker")
    expect(result).not.toContain("undefined")
  })
})
