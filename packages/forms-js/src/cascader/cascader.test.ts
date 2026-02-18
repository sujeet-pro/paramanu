import { describe, it, expect } from "vitest"
import { cascaderClasses, cascaderModuleClasses } from "./cascader.classes.js"

describe("cascaderClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = cascaderClasses()
    expect(result).toBe("pm-cascader pm-cascader--outline pm-cascader--md")
  })

  it("applies variant", () => {
    expect(cascaderClasses({ variant: "outline" })).toContain("pm-cascader--outline")
    expect(cascaderClasses({ variant: "filled" })).toContain("pm-cascader--filled")
    expect(cascaderClasses({ variant: "unstyled" })).toContain("pm-cascader--unstyled")
  })

  it("applies size", () => {
    expect(cascaderClasses({ size: "sm" })).toContain("pm-cascader--sm")
    expect(cascaderClasses({ size: "md" })).toContain("pm-cascader--md")
    expect(cascaderClasses({ size: "lg" })).toContain("pm-cascader--lg")
  })

  it("applies invalid modifier", () => {
    expect(cascaderClasses({ invalid: true })).toContain("pm-cascader--invalid")
    expect(cascaderClasses({ invalid: false })).not.toContain("pm-cascader--invalid")
  })

  it("applies disabled modifier", () => {
    expect(cascaderClasses({ disabled: true })).toContain("pm-cascader--disabled")
    expect(cascaderClasses({ disabled: false })).not.toContain("pm-cascader--disabled")
  })

  it("applies open modifier", () => {
    expect(cascaderClasses({ open: true })).toContain("pm-cascader--open")
    expect(cascaderClasses({ open: false })).not.toContain("pm-cascader--open")
  })

  it("applies full-width modifier", () => {
    expect(cascaderClasses({ fullWidth: true })).toContain("pm-cascader--full-width")
    expect(cascaderClasses({ fullWidth: false })).not.toContain("pm-cascader--full-width")
  })

  it("always includes base class", () => {
    expect(cascaderClasses()).toMatch(/^pm-cascader\s/)
  })

  it("combines multiple options", () => {
    const result = cascaderClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      open: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-cascader pm-cascader--filled pm-cascader--lg pm-cascader--invalid pm-cascader--disabled pm-cascader--open pm-cascader--full-width",
    )
  })
})

describe("cascaderModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-cascader": "pm_abc_cascader",
    "pm-cascader--outline": "pm_abc_outline",
    "pm-cascader--filled": "pm_abc_filled",
    "pm-cascader--md": "pm_abc_md",
    "pm-cascader--sm": "pm_abc_sm",
    "pm-cascader--lg": "pm_abc_lg",
    "pm-cascader--invalid": "pm_abc_invalid",
    "pm-cascader--disabled": "pm_abc_disabled",
    "pm-cascader--open": "pm_abc_open",
    "pm-cascader--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = cascaderModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_cascader pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = cascaderModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = cascaderModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps open class", () => {
    const result = cascaderModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("maps full-width class", () => {
    const result = cascaderModuleClasses(mockClassMap, { fullWidth: true })
    expect(result).toContain("pm_abc_fullWidth")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-cascader": "pm_abc_cascader",
    }
    const result = cascaderModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_cascader")
    expect(result).not.toContain("undefined")
  })
})
