import { describe, it, expect } from "vitest"
import { highlightClasses, highlightModuleClasses } from "./highlight.classes.js"

describe("highlightClasses", () => {
  it("returns default classes (primary color)", () => {
    expect(highlightClasses()).toBe("pm-highlight pm-highlight--primary")
  })

  it("applies color", () => {
    expect(highlightClasses({ color: "danger" })).toContain("pm-highlight--danger")
    expect(highlightClasses({ color: "success" })).toContain("pm-highlight--success")
    expect(highlightClasses({ color: "neutral" })).toContain("pm-highlight--neutral")
  })

  it("always includes base class", () => {
    expect(highlightClasses()).toMatch(/^pm-highlight\s/)
  })
})

describe("highlightModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-highlight": "pm_abc_highlight",
    "pm-highlight--primary": "pm_abc_primary",
    "pm-highlight--danger": "pm_abc_danger",
    "pm-highlight--success": "pm_abc_success",
    "pm-highlight--neutral": "pm_abc_neutral",
  }

  it("returns mapped default classes", () => {
    const result = highlightModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_highlight pm_abc_primary")
  })

  it("maps color classes correctly", () => {
    const result = highlightModuleClasses(mockClassMap, { color: "danger" })
    expect(result).toContain("pm_abc_danger")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-highlight": "pm_abc_highlight",
    }
    const result = highlightModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_highlight")
    expect(result).not.toContain("undefined")
  })
})
