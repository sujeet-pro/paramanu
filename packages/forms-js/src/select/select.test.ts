import { describe, it, expect } from "vitest"
import { selectClasses, selectModuleClasses } from "./select.classes.js"

describe("selectClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = selectClasses()
    expect(result).toBe("pm-select pm-select--outline pm-select--md")
  })

  it("applies variant", () => {
    expect(selectClasses({ variant: "outline" })).toContain("pm-select--outline")
    expect(selectClasses({ variant: "filled" })).toContain("pm-select--filled")
    expect(selectClasses({ variant: "unstyled" })).toContain("pm-select--unstyled")
  })

  it("applies size", () => {
    expect(selectClasses({ size: "sm" })).toContain("pm-select--sm")
    expect(selectClasses({ size: "md" })).toContain("pm-select--md")
    expect(selectClasses({ size: "lg" })).toContain("pm-select--lg")
  })

  it("applies invalid modifier", () => {
    expect(selectClasses({ invalid: true })).toContain("pm-select--invalid")
    expect(selectClasses({ invalid: false })).not.toContain("pm-select--invalid")
  })

  it("applies disabled modifier", () => {
    expect(selectClasses({ disabled: true })).toContain("pm-select--disabled")
    expect(selectClasses({ disabled: false })).not.toContain("pm-select--disabled")
  })

  it("applies open modifier", () => {
    expect(selectClasses({ open: true })).toContain("pm-select--open")
    expect(selectClasses({ open: false })).not.toContain("pm-select--open")
  })

  it("applies full-width modifier", () => {
    expect(selectClasses({ fullWidth: true })).toContain("pm-select--full-width")
    expect(selectClasses({ fullWidth: false })).not.toContain("pm-select--full-width")
  })

  it("always includes base class", () => {
    expect(selectClasses()).toMatch(/^pm-select\s/)
  })

  it("combines multiple options", () => {
    const result = selectClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-select pm-select--filled pm-select--lg pm-select--invalid pm-select--disabled pm-select--open pm-select--full-width",
    )
  })
})

describe("selectModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-select": "pm_abc_select",
    "pm-select--outline": "pm_abc_outline",
    "pm-select--filled": "pm_abc_filled",
    "pm-select--md": "pm_abc_md",
    "pm-select--sm": "pm_abc_sm",
    "pm-select--lg": "pm_abc_lg",
    "pm-select--invalid": "pm_abc_invalid",
    "pm-select--disabled": "pm_abc_disabled",
    "pm-select--open": "pm_abc_open",
    "pm-select--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = selectModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_select pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = selectModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = selectModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps open class", () => {
    const result = selectModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-select": "pm_abc_select",
    }
    const result = selectModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_select")
    expect(result).not.toContain("undefined")
  })
})
