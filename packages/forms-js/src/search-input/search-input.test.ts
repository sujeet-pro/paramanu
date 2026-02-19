import { describe, it, expect } from "vitest"
import { searchClasses, searchModuleClasses } from "./search-input.classes.js"

describe("searchClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = searchClasses()
    expect(result).toBe("pm-search pm-search--outline pm-search--md")
  })

  it("applies variant", () => {
    expect(searchClasses({ variant: "outline" })).toContain("pm-search--outline")
    expect(searchClasses({ variant: "filled" })).toContain("pm-search--filled")
    expect(searchClasses({ variant: "unstyled" })).toContain("pm-search--unstyled")
  })

  it("applies size", () => {
    expect(searchClasses({ size: "sm" })).toContain("pm-search--sm")
    expect(searchClasses({ size: "md" })).toContain("pm-search--md")
    expect(searchClasses({ size: "lg" })).toContain("pm-search--lg")
  })

  it("applies invalid modifier", () => {
    expect(searchClasses({ invalid: true })).toContain("pm-search--invalid")
    expect(searchClasses({ invalid: false })).not.toContain("pm-search--invalid")
  })

  it("applies disabled modifier", () => {
    expect(searchClasses({ disabled: true })).toContain("pm-search--disabled")
    expect(searchClasses({ disabled: false })).not.toContain("pm-search--disabled")
  })

  it("applies full-width modifier", () => {
    expect(searchClasses({ fullWidth: true })).toContain("pm-search--full-width")
    expect(searchClasses({ fullWidth: false })).not.toContain("pm-search--full-width")
  })

  it("always includes base class", () => {
    expect(searchClasses()).toMatch(/^pm-search\s/)
  })

  it("combines multiple options", () => {
    const result = searchClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-search pm-search--filled pm-search--lg pm-search--invalid pm-search--disabled pm-search--full-width",
    )
  })
})

describe("searchModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-search": "pm_abc_searchInput",
    "pm-search--outline": "pm_abc_outline",
    "pm-search--filled": "pm_abc_filled",
    "pm-search--md": "pm_abc_md",
    "pm-search--sm": "pm_abc_sm",
    "pm-search--lg": "pm_abc_lg",
    "pm-search--invalid": "pm_abc_invalid",
    "pm-search--disabled": "pm_abc_disabled",
    "pm-search--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = searchModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_searchInput pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = searchModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps invalid class", () => {
    const result = searchModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = searchModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps full-width class", () => {
    const result = searchModuleClasses(mockClassMap, { fullWidth: true })
    expect(result).toContain("pm_abc_fullWidth")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-search": "pm_abc_searchInput",
    }
    const result = searchModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_searchInput")
    expect(result).not.toContain("undefined")
  })
})
