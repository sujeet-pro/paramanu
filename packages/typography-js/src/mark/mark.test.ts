import { describe, it, expect } from "vitest"
import { markClasses, markModuleClasses } from "./mark.classes.js"

describe("markClasses", () => {
  it("returns default classes (default variant)", () => {
    expect(markClasses()).toBe("pm-mark pm-mark--default")
  })

  it("applies variant", () => {
    expect(markClasses({ variant: "underline" })).toContain("pm-mark--underline")
    expect(markClasses({ variant: "circle" })).toContain("pm-mark--circle")
  })

  it("always includes base class", () => {
    expect(markClasses()).toMatch(/^pm-mark\s/)
  })
})

describe("markModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-mark": "pm_abc_mark",
    "pm-mark--default": "pm_abc_default",
    "pm-mark--underline": "pm_abc_underline",
    "pm-mark--circle": "pm_abc_circle",
  }

  it("returns mapped default classes", () => {
    const result = markModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_mark pm_abc_default")
  })

  it("maps variant classes correctly", () => {
    const result = markModuleClasses(mockClassMap, { variant: "underline" })
    expect(result).toContain("pm_abc_underline")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-mark": "pm_abc_mark",
    }
    const result = markModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_mark")
    expect(result).not.toContain("undefined")
  })
})
