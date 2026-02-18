import { describe, it, expect } from "vitest"
import { proseClasses, proseModuleClasses } from "./prose.classes.js"

describe("proseClasses", () => {
  it("returns default classes (md size)", () => {
    expect(proseClasses()).toBe("pm-prose pm-prose--md")
  })

  it("applies size", () => {
    expect(proseClasses({ size: "sm" })).toContain("pm-prose--sm")
    expect(proseClasses({ size: "lg" })).toContain("pm-prose--lg")
  })

  it("always includes base class", () => {
    expect(proseClasses()).toMatch(/^pm-prose\s/)
  })
})

describe("proseModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-prose": "pm_abc_prose",
    "pm-prose--md": "pm_abc_md",
    "pm-prose--sm": "pm_abc_sm",
  }

  it("returns mapped default classes", () => {
    const result = proseModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_prose pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = proseModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-prose": "pm_abc_prose",
    }
    const result = proseModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_prose")
    expect(result).not.toContain("undefined")
  })
})
