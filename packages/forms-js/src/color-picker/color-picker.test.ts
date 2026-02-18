import { describe, it, expect } from "vitest"
import { colorPickerClasses, colorPickerModuleClasses } from "./color-picker.classes.js"

describe("colorPickerClasses", () => {
  it("returns default classes (md)", () => {
    const result = colorPickerClasses()
    expect(result).toBe("pm-color-picker pm-color-picker--md")
  })

  it("applies size", () => {
    expect(colorPickerClasses({ size: "sm" })).toContain("pm-color-picker--sm")
    expect(colorPickerClasses({ size: "md" })).toContain("pm-color-picker--md")
    expect(colorPickerClasses({ size: "lg" })).toContain("pm-color-picker--lg")
  })

  it("applies disabled modifier", () => {
    expect(colorPickerClasses({ disabled: true })).toContain("pm-color-picker--disabled")
    expect(colorPickerClasses({ disabled: false })).not.toContain("pm-color-picker--disabled")
  })

  it("applies open modifier", () => {
    expect(colorPickerClasses({ open: true })).toContain("pm-color-picker--open")
    expect(colorPickerClasses({ open: false })).not.toContain("pm-color-picker--open")
  })

  it("always includes base class", () => {
    expect(colorPickerClasses()).toMatch(/^pm-color-picker\s/)
  })

  it("combines multiple options", () => {
    const result = colorPickerClasses({
      size: "lg",
      disabled: true,
      open: true,
    })
    expect(result).toBe(
      "pm-color-picker pm-color-picker--lg pm-color-picker--disabled pm-color-picker--open",
    )
  })
})

describe("colorPickerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-color-picker": "pm_abc_colorPicker",
    "pm-color-picker--md": "pm_abc_md",
    "pm-color-picker--sm": "pm_abc_sm",
    "pm-color-picker--lg": "pm_abc_lg",
    "pm-color-picker--disabled": "pm_abc_disabled",
    "pm-color-picker--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = colorPickerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_colorPicker pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = colorPickerModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = colorPickerModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps open class", () => {
    const result = colorPickerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-color-picker": "pm_abc_colorPicker",
    }
    const result = colorPickerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_colorPicker")
    expect(result).not.toContain("undefined")
  })
})
