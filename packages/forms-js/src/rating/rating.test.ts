import { describe, it, expect } from "vitest"
import { ratingClasses, ratingModuleClasses } from "./rating.classes.js"

describe("ratingClasses", () => {
  it("returns default classes (md)", () => {
    const result = ratingClasses()
    expect(result).toBe("pm-rating pm-rating--md")
  })

  it("applies size", () => {
    expect(ratingClasses({ size: "sm" })).toContain("pm-rating--sm")
    expect(ratingClasses({ size: "md" })).toContain("pm-rating--md")
    expect(ratingClasses({ size: "lg" })).toContain("pm-rating--lg")
  })

  it("applies disabled modifier", () => {
    expect(ratingClasses({ disabled: true })).toContain("pm-rating--disabled")
    expect(ratingClasses({ disabled: false })).not.toContain("pm-rating--disabled")
  })

  it("applies read-only modifier", () => {
    expect(ratingClasses({ readOnly: true })).toContain("pm-rating--read-only")
    expect(ratingClasses({ readOnly: false })).not.toContain("pm-rating--read-only")
  })

  it("always includes base class", () => {
    expect(ratingClasses()).toMatch(/^pm-rating\s/)
  })

  it("combines multiple options", () => {
    const result = ratingClasses({
      size: "lg",
      disabled: true,
      readOnly: true,
    })
    expect(result).toBe("pm-rating pm-rating--lg pm-rating--disabled pm-rating--read-only")
  })
})

describe("ratingModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-rating": "pm_abc_rating",
    "pm-rating--md": "pm_abc_md",
    "pm-rating--sm": "pm_abc_sm",
    "pm-rating--lg": "pm_abc_lg",
    "pm-rating--disabled": "pm_abc_disabled",
    "pm-rating--read-only": "pm_abc_readOnly",
  }

  it("returns mapped default classes", () => {
    const result = ratingModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_rating pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = ratingModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = ratingModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps read-only class", () => {
    const result = ratingModuleClasses(mockClassMap, { readOnly: true })
    expect(result).toContain("pm_abc_readOnly")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-rating": "pm_abc_rating",
    }
    const result = ratingModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_rating")
    expect(result).not.toContain("undefined")
  })
})
