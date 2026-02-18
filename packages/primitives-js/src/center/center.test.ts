import { describe, it, expect } from "vitest"
import { centerClasses, centerModuleClasses } from "./center.classes.js"

describe("centerClasses", () => {
  it("returns default classes", () => {
    const result = centerClasses()
    expect(result).toBe("pm-center")
  })

  it("applies inline modifier", () => {
    const result = centerClasses({ inline: true })
    expect(result).toBe("pm-center pm-center--inline")
  })

  it("does not apply inline modifier when false", () => {
    const result = centerClasses({ inline: false })
    expect(result).toBe("pm-center")
    expect(result).not.toContain("pm-center--inline")
  })

  it("always includes base class", () => {
    expect(centerClasses()).toContain("pm-center")
    expect(centerClasses({ inline: true })).toContain("pm-center")
  })
})

describe("centerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-center": "pm_abc_center",
    "pm-center--inline": "pm_abc_inline",
  }

  it("returns mapped default classes", () => {
    const result = centerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_center")
  })

  it("maps inline class correctly", () => {
    const result = centerModuleClasses(mockClassMap, { inline: true })
    expect(result).toBe("pm_abc_center pm_abc_inline")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-center": "pm_abc_center",
    }
    const result = centerModuleClasses(sparseMap, { inline: true })
    expect(result).toContain("pm_abc_center")
    expect(result).not.toContain("undefined")
  })
})
