import { describe, it, expect } from "vitest"
import { searchInputClasses, searchInputModuleClasses } from "./search-input.classes.js"

describe("searchInputClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = searchInputClasses()
    expect(result).toBe("pm-search-input pm-search-input--outline pm-search-input--md")
  })

  it("applies variant", () => {
    expect(searchInputClasses({ variant: "outline" })).toContain("pm-search-input--outline")
    expect(searchInputClasses({ variant: "filled" })).toContain("pm-search-input--filled")
    expect(searchInputClasses({ variant: "unstyled" })).toContain("pm-search-input--unstyled")
  })

  it("applies size", () => {
    expect(searchInputClasses({ size: "sm" })).toContain("pm-search-input--sm")
    expect(searchInputClasses({ size: "md" })).toContain("pm-search-input--md")
    expect(searchInputClasses({ size: "lg" })).toContain("pm-search-input--lg")
  })

  it("applies invalid modifier", () => {
    expect(searchInputClasses({ invalid: true })).toContain("pm-search-input--invalid")
    expect(searchInputClasses({ invalid: false })).not.toContain("pm-search-input--invalid")
  })

  it("applies disabled modifier", () => {
    expect(searchInputClasses({ disabled: true })).toContain("pm-search-input--disabled")
    expect(searchInputClasses({ disabled: false })).not.toContain("pm-search-input--disabled")
  })

  it("applies full-width modifier", () => {
    expect(searchInputClasses({ fullWidth: true })).toContain("pm-search-input--full-width")
    expect(searchInputClasses({ fullWidth: false })).not.toContain("pm-search-input--full-width")
  })

  it("always includes base class", () => {
    expect(searchInputClasses()).toMatch(/^pm-search-input\s/)
  })

  it("combines multiple options", () => {
    const result = searchInputClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-search-input pm-search-input--filled pm-search-input--lg pm-search-input--invalid pm-search-input--disabled pm-search-input--full-width",
    )
  })
})

describe("searchInputModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-search-input": "pm_abc_searchInput",
    "pm-search-input--outline": "pm_abc_outline",
    "pm-search-input--filled": "pm_abc_filled",
    "pm-search-input--md": "pm_abc_md",
    "pm-search-input--sm": "pm_abc_sm",
    "pm-search-input--lg": "pm_abc_lg",
    "pm-search-input--invalid": "pm_abc_invalid",
    "pm-search-input--disabled": "pm_abc_disabled",
    "pm-search-input--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = searchInputModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_searchInput pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = searchInputModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps invalid class", () => {
    const result = searchInputModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = searchInputModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps full-width class", () => {
    const result = searchInputModuleClasses(mockClassMap, { fullWidth: true })
    expect(result).toContain("pm_abc_fullWidth")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-search-input": "pm_abc_searchInput",
    }
    const result = searchInputModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_searchInput")
    expect(result).not.toContain("undefined")
  })
})
