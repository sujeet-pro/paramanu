import { describe, it, expect } from "vitest"
import { spacerClasses, spacerModuleClasses } from "./spacer.classes.js"

describe("spacerClasses", () => {
  it("returns base class", () => {
    const result = spacerClasses()
    expect(result).toBe("pm-spacer")
  })

  it("returns base class with empty options", () => {
    const result = spacerClasses({})
    expect(result).toBe("pm-spacer")
  })
})

describe("spacerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-spacer": "pm_abc_spacer",
  }

  it("returns mapped base class", () => {
    const result = spacerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_spacer")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = spacerModuleClasses(sparseMap)
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
