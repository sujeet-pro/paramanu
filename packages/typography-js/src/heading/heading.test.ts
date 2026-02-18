import { describe, it, expect } from "vitest"
import { headingClasses, headingModuleClasses } from "./heading.classes.js"

describe("headingClasses", () => {
  it("returns default classes (level 2 -> size 2xl, weight bold)", () => {
    expect(headingClasses()).toBe("pm-heading pm-heading--size-2xl pm-heading--weight-bold")
  })

  it("maps level to size correctly", () => {
    expect(headingClasses({ level: 1 })).toContain("pm-heading--size-3xl")
    expect(headingClasses({ level: 2 })).toContain("pm-heading--size-2xl")
    expect(headingClasses({ level: 3 })).toContain("pm-heading--size-xl")
    expect(headingClasses({ level: 4 })).toContain("pm-heading--size-lg")
    expect(headingClasses({ level: 5 })).toContain("pm-heading--size-md")
    expect(headingClasses({ level: 6 })).toContain("pm-heading--size-sm")
  })

  it("allows explicit size to override level-based size", () => {
    const result = headingClasses({ level: 1, size: "sm" })
    expect(result).toContain("pm-heading--size-sm")
    expect(result).not.toContain("pm-heading--size-3xl")
  })

  it("applies weight", () => {
    expect(headingClasses({ weight: "normal" })).toContain("pm-heading--weight-normal")
    expect(headingClasses({ weight: "semibold" })).toContain("pm-heading--weight-semibold")
  })

  it("applies align", () => {
    expect(headingClasses({ align: "center" })).toContain("pm-heading--align-center")
    expect(headingClasses({ align: "right" })).toContain("pm-heading--align-right")
  })

  it("applies truncate modifier", () => {
    expect(headingClasses({ truncate: true })).toContain("pm-heading--truncate")
    expect(headingClasses({ truncate: false })).not.toContain("pm-heading--truncate")
  })

  it("always includes base class", () => {
    expect(headingClasses()).toMatch(/^pm-heading\s/)
  })

  it("combines multiple options", () => {
    const result = headingClasses({
      level: 3,
      weight: "semibold",
      align: "center",
      truncate: true,
    })
    expect(result).toBe(
      "pm-heading pm-heading--size-xl pm-heading--weight-semibold pm-heading--align-center pm-heading--truncate",
    )
  })
})

describe("headingModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-heading": "pm_abc_heading",
    "pm-heading--size-2xl": "pm_abc_size2xl",
    "pm-heading--size-xl": "pm_abc_sizeXl",
    "pm-heading--weight-bold": "pm_abc_weightBold",
    "pm-heading--weight-semibold": "pm_abc_weightSemibold",
    "pm-heading--align-center": "pm_abc_alignCenter",
    "pm-heading--truncate": "pm_abc_truncate",
  }

  it("returns mapped default classes", () => {
    const result = headingModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_heading pm_abc_size2xl pm_abc_weightBold")
  })

  it("maps level-based size correctly", () => {
    const result = headingModuleClasses(mockClassMap, { level: 3 })
    expect(result).toContain("pm_abc_sizeXl")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-heading": "pm_abc_heading",
    }
    const result = headingModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_heading")
    expect(result).not.toContain("undefined")
  })
})
