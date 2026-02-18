import { describe, it, expect } from "vitest"
import { multiSelectClasses, multiSelectModuleClasses } from "./multi-select.classes.js"

describe("multiSelectClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = multiSelectClasses()
    expect(result).toBe("pm-multi-select pm-multi-select--outline pm-multi-select--md")
  })

  it("applies variant", () => {
    expect(multiSelectClasses({ variant: "outline" })).toContain("pm-multi-select--outline")
    expect(multiSelectClasses({ variant: "filled" })).toContain("pm-multi-select--filled")
    expect(multiSelectClasses({ variant: "unstyled" })).toContain("pm-multi-select--unstyled")
  })

  it("applies size", () => {
    expect(multiSelectClasses({ size: "sm" })).toContain("pm-multi-select--sm")
    expect(multiSelectClasses({ size: "md" })).toContain("pm-multi-select--md")
    expect(multiSelectClasses({ size: "lg" })).toContain("pm-multi-select--lg")
  })

  it("applies invalid modifier", () => {
    expect(multiSelectClasses({ invalid: true })).toContain("pm-multi-select--invalid")
    expect(multiSelectClasses({ invalid: false })).not.toContain("pm-multi-select--invalid")
  })

  it("applies disabled modifier", () => {
    expect(multiSelectClasses({ disabled: true })).toContain("pm-multi-select--disabled")
    expect(multiSelectClasses({ disabled: false })).not.toContain("pm-multi-select--disabled")
  })

  it("applies open modifier", () => {
    expect(multiSelectClasses({ open: true })).toContain("pm-multi-select--open")
    expect(multiSelectClasses({ open: false })).not.toContain("pm-multi-select--open")
  })

  it("applies full-width modifier", () => {
    expect(multiSelectClasses({ fullWidth: true })).toContain("pm-multi-select--full-width")
    expect(multiSelectClasses({ fullWidth: false })).not.toContain("pm-multi-select--full-width")
  })

  it("always includes base class", () => {
    expect(multiSelectClasses()).toMatch(/^pm-multi-select\s/)
  })

  it("combines multiple options", () => {
    const result = multiSelectClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-multi-select pm-multi-select--filled pm-multi-select--lg pm-multi-select--invalid pm-multi-select--disabled pm-multi-select--open pm-multi-select--full-width",
    )
  })
})

describe("multiSelectModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-multi-select": "pm_abc_multiSelect",
    "pm-multi-select--outline": "pm_abc_outline",
    "pm-multi-select--filled": "pm_abc_filled",
    "pm-multi-select--md": "pm_abc_md",
    "pm-multi-select--sm": "pm_abc_sm",
    "pm-multi-select--lg": "pm_abc_lg",
    "pm-multi-select--invalid": "pm_abc_invalid",
    "pm-multi-select--disabled": "pm_abc_disabled",
    "pm-multi-select--open": "pm_abc_open",
    "pm-multi-select--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = multiSelectModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_multiSelect pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = multiSelectModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps open class", () => {
    const result = multiSelectModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-multi-select": "pm_abc_multiSelect",
    }
    const result = multiSelectModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_multiSelect")
    expect(result).not.toContain("undefined")
  })
})
