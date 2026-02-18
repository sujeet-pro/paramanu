import { describe, it, expect } from "vitest"
import { boxClasses, boxModuleClasses } from "./box.classes.js"

describe("boxClasses", () => {
  it("returns base class", () => {
    const result = boxClasses()
    expect(result).toBe("pm-box")
  })

  it("returns base class with empty options", () => {
    const result = boxClasses({})
    expect(result).toBe("pm-box")
  })
})

describe("boxModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-box": "pm_abc_box",
  }

  it("returns mapped base class", () => {
    const result = boxModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_box")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = boxModuleClasses(sparseMap)
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
