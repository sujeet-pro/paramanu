import { describe, it, expect } from "vitest"
import { comboboxClasses, comboboxModuleClasses } from "./combobox.classes.js"

describe("comboboxClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = comboboxClasses()
    expect(result).toBe("pm-combobox pm-combobox--outline pm-combobox--md")
  })

  it("applies variant", () => {
    expect(comboboxClasses({ variant: "outline" })).toContain("pm-combobox--outline")
    expect(comboboxClasses({ variant: "filled" })).toContain("pm-combobox--filled")
    expect(comboboxClasses({ variant: "unstyled" })).toContain("pm-combobox--unstyled")
  })

  it("applies size", () => {
    expect(comboboxClasses({ size: "sm" })).toContain("pm-combobox--sm")
    expect(comboboxClasses({ size: "md" })).toContain("pm-combobox--md")
    expect(comboboxClasses({ size: "lg" })).toContain("pm-combobox--lg")
  })

  it("applies invalid modifier", () => {
    expect(comboboxClasses({ invalid: true })).toContain("pm-combobox--invalid")
    expect(comboboxClasses({ invalid: false })).not.toContain("pm-combobox--invalid")
  })

  it("applies disabled modifier", () => {
    expect(comboboxClasses({ disabled: true })).toContain("pm-combobox--disabled")
    expect(comboboxClasses({ disabled: false })).not.toContain("pm-combobox--disabled")
  })

  it("applies open modifier", () => {
    expect(comboboxClasses({ open: true })).toContain("pm-combobox--open")
    expect(comboboxClasses({ open: false })).not.toContain("pm-combobox--open")
  })

  it("applies full-width modifier", () => {
    expect(comboboxClasses({ fullWidth: true })).toContain("pm-combobox--full-width")
    expect(comboboxClasses({ fullWidth: false })).not.toContain("pm-combobox--full-width")
  })

  it("always includes base class", () => {
    expect(comboboxClasses()).toMatch(/^pm-combobox\s/)
  })

  it("combines multiple options", () => {
    const result = comboboxClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-combobox pm-combobox--filled pm-combobox--lg pm-combobox--invalid pm-combobox--disabled pm-combobox--open pm-combobox--full-width",
    )
  })
})

describe("comboboxModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-combobox": "pm_abc_combobox",
    "pm-combobox--outline": "pm_abc_outline",
    "pm-combobox--filled": "pm_abc_filled",
    "pm-combobox--md": "pm_abc_md",
    "pm-combobox--sm": "pm_abc_sm",
    "pm-combobox--lg": "pm_abc_lg",
    "pm-combobox--invalid": "pm_abc_invalid",
    "pm-combobox--disabled": "pm_abc_disabled",
    "pm-combobox--open": "pm_abc_open",
    "pm-combobox--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = comboboxModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_combobox pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = comboboxModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps open class", () => {
    const result = comboboxModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-combobox": "pm_abc_combobox",
    }
    const result = comboboxModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_combobox")
    expect(result).not.toContain("undefined")
  })
})
