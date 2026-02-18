import { describe, it, expect } from "vitest"
import { masonryClasses, masonryModuleClasses } from "./masonry.classes.js"

describe("masonryClasses", () => {
  it("returns default classes (3 columns)", () => {
    const result = masonryClasses()
    expect(result).toBe("pm-masonry pm-masonry--cols-3")
  })

  it("returns default classes with empty options", () => {
    const result = masonryClasses({})
    expect(result).toBe("pm-masonry pm-masonry--cols-3")
  })

  it("applies 2 columns", () => {
    const result = masonryClasses({ columns: 2 })
    expect(result).toBe("pm-masonry pm-masonry--cols-2")
  })

  it("applies 3 columns", () => {
    const result = masonryClasses({ columns: 3 })
    expect(result).toBe("pm-masonry pm-masonry--cols-3")
  })

  it("applies 4 columns", () => {
    const result = masonryClasses({ columns: 4 })
    expect(result).toBe("pm-masonry pm-masonry--cols-4")
  })

  it("applies 5 columns", () => {
    const result = masonryClasses({ columns: 5 })
    expect(result).toBe("pm-masonry pm-masonry--cols-5")
  })

  it("applies 6 columns", () => {
    const result = masonryClasses({ columns: 6 })
    expect(result).toBe("pm-masonry pm-masonry--cols-6")
  })

  it("applies gap modifier", () => {
    const result = masonryClasses({ gap: "4" })
    expect(result).toBe("pm-masonry pm-masonry--cols-3 pm-masonry--gap-4")
  })

  it("does not include gap modifier when not provided", () => {
    const result = masonryClasses({ columns: 4 })
    expect(result).not.toContain("gap")
  })

  it("combines columns and gap", () => {
    const result = masonryClasses({ columns: 5, gap: "6" })
    expect(result).toBe("pm-masonry pm-masonry--cols-5 pm-masonry--gap-6")
  })

  it("supports zero gap", () => {
    const result = masonryClasses({ gap: "0" })
    expect(result).toContain("pm-masonry--gap-0")
  })

  it("always includes base class", () => {
    expect(masonryClasses({ columns: 2 })).toMatch(/^pm-masonry\s/)
  })
})

describe("masonryModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-masonry": "pm_abc_masonry",
    "pm-masonry--cols-2": "pm_abc_cols-2",
    "pm-masonry--cols-3": "pm_abc_cols-3",
    "pm-masonry--cols-4": "pm_abc_cols-4",
    "pm-masonry--cols-5": "pm_abc_cols-5",
    "pm-masonry--cols-6": "pm_abc_cols-6",
    "pm-masonry--gap-4": "pm_abc_gap-4",
    "pm-masonry--gap-6": "pm_abc_gap-6",
    "pm-masonry--gap-0": "pm_abc_gap-0",
  }

  it("returns mapped default classes", () => {
    const result = masonryModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_masonry pm_abc_cols-3")
  })

  it("maps column classes correctly", () => {
    const result = masonryModuleClasses(mockClassMap, { columns: 4 })
    expect(result).toBe("pm_abc_masonry pm_abc_cols-4")
  })

  it("maps gap classes correctly", () => {
    const result = masonryModuleClasses(mockClassMap, { gap: "4" })
    expect(result).toBe("pm_abc_masonry pm_abc_cols-3 pm_abc_gap-4")
  })

  it("maps combined columns and gap correctly", () => {
    const result = masonryModuleClasses(mockClassMap, { columns: 5, gap: "6" })
    expect(result).toBe("pm_abc_masonry pm_abc_cols-5 pm_abc_gap-6")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-masonry": "pm_abc_masonry",
    }
    const result = masonryModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_masonry")
    expect(result).not.toContain("undefined")
  })
})
