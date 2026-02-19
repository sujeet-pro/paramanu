import { describe, it, expect } from "vitest"
import { multiSelClasses, multiSelModuleClasses } from "./multi-select.classes.js"

describe("multiSelClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = multiSelClasses()
    expect(result).toBe("pm-multi-sel pm-multi-sel--outline pm-multi-sel--md")
  })

  it("applies variant", () => {
    expect(multiSelClasses({ variant: "outline" })).toContain("pm-multi-sel--outline")
    expect(multiSelClasses({ variant: "filled" })).toContain("pm-multi-sel--filled")
    expect(multiSelClasses({ variant: "unstyled" })).toContain("pm-multi-sel--unstyled")
  })

  it("applies size", () => {
    expect(multiSelClasses({ size: "sm" })).toContain("pm-multi-sel--sm")
    expect(multiSelClasses({ size: "md" })).toContain("pm-multi-sel--md")
    expect(multiSelClasses({ size: "lg" })).toContain("pm-multi-sel--lg")
  })

  it("applies invalid modifier", () => {
    expect(multiSelClasses({ invalid: true })).toContain("pm-multi-sel--invalid")
    expect(multiSelClasses({ invalid: false })).not.toContain("pm-multi-sel--invalid")
  })

  it("applies disabled modifier", () => {
    expect(multiSelClasses({ disabled: true })).toContain("pm-multi-sel--disabled")
    expect(multiSelClasses({ disabled: false })).not.toContain("pm-multi-sel--disabled")
  })

  it("applies open modifier", () => {
    expect(multiSelClasses({ open: true })).toContain("pm-multi-sel--open")
    expect(multiSelClasses({ open: false })).not.toContain("pm-multi-sel--open")
  })

  it("applies full-width modifier", () => {
    expect(multiSelClasses({ fullWidth: true })).toContain("pm-multi-sel--full-width")
    expect(multiSelClasses({ fullWidth: false })).not.toContain("pm-multi-sel--full-width")
  })

  it("always includes base class", () => {
    expect(multiSelClasses()).toMatch(/^pm-multi-sel\s/)
  })

  it("combines multiple options", () => {
    const result = multiSelClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-multi-sel pm-multi-sel--filled pm-multi-sel--lg pm-multi-sel--invalid pm-multi-sel--disabled pm-multi-sel--open pm-multi-sel--full-width",
    )
  })
})

describe("multiSelModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-multi-sel": "pm_abc_multiSelect",
    "pm-multi-sel--outline": "pm_abc_outline",
    "pm-multi-sel--filled": "pm_abc_filled",
    "pm-multi-sel--md": "pm_abc_md",
    "pm-multi-sel--sm": "pm_abc_sm",
    "pm-multi-sel--lg": "pm_abc_lg",
    "pm-multi-sel--invalid": "pm_abc_invalid",
    "pm-multi-sel--disabled": "pm_abc_disabled",
    "pm-multi-sel--open": "pm_abc_open",
    "pm-multi-sel--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = multiSelModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_multiSelect pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = multiSelModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps open class", () => {
    const result = multiSelModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-multi-sel": "pm_abc_multiSelect",
    }
    const result = multiSelModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_multiSelect")
    expect(result).not.toContain("undefined")
  })
})
