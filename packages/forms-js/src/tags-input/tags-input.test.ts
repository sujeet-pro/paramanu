import { describe, it, expect } from "vitest"
import { tagsInputClasses, tagsInputModuleClasses } from "./tags-input.classes.js"

describe("tagsInputClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = tagsInputClasses()
    expect(result).toBe("pm-tags-input pm-tags-input--outline pm-tags-input--md")
  })

  it("applies variant", () => {
    expect(tagsInputClasses({ variant: "outline" })).toContain("pm-tags-input--outline")
    expect(tagsInputClasses({ variant: "filled" })).toContain("pm-tags-input--filled")
    expect(tagsInputClasses({ variant: "unstyled" })).toContain("pm-tags-input--unstyled")
  })

  it("applies size", () => {
    expect(tagsInputClasses({ size: "sm" })).toContain("pm-tags-input--sm")
    expect(tagsInputClasses({ size: "md" })).toContain("pm-tags-input--md")
    expect(tagsInputClasses({ size: "lg" })).toContain("pm-tags-input--lg")
  })

  it("applies disabled modifier", () => {
    expect(tagsInputClasses({ disabled: true })).toContain("pm-tags-input--disabled")
    expect(tagsInputClasses({ disabled: false })).not.toContain("pm-tags-input--disabled")
  })

  it("applies invalid modifier", () => {
    expect(tagsInputClasses({ invalid: true })).toContain("pm-tags-input--invalid")
    expect(tagsInputClasses({ invalid: false })).not.toContain("pm-tags-input--invalid")
  })

  it("always includes base class", () => {
    expect(tagsInputClasses()).toMatch(/^pm-tags-input\s/)
  })

  it("combines multiple options", () => {
    const result = tagsInputClasses({
      variant: "filled",
      size: "lg",
      disabled: true,
      invalid: true,
    })
    expect(result).toBe(
      "pm-tags-input pm-tags-input--filled pm-tags-input--lg pm-tags-input--disabled pm-tags-input--invalid",
    )
  })
})

describe("tagsInputModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tags-input": "pm_abc_tagsInput",
    "pm-tags-input--outline": "pm_abc_outline",
    "pm-tags-input--filled": "pm_abc_filled",
    "pm-tags-input--md": "pm_abc_md",
    "pm-tags-input--sm": "pm_abc_sm",
    "pm-tags-input--lg": "pm_abc_lg",
    "pm-tags-input--disabled": "pm_abc_disabled",
    "pm-tags-input--invalid": "pm_abc_invalid",
  }

  it("returns mapped default classes", () => {
    const result = tagsInputModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_tagsInput pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = tagsInputModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = tagsInputModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = tagsInputModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps invalid class", () => {
    const result = tagsInputModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-tags-input": "pm_abc_tagsInput",
    }
    const result = tagsInputModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_tagsInput")
    expect(result).not.toContain("undefined")
  })
})
