import { describe, it, expect } from "vitest"
import { btnGroupClasses, btnGroupModuleClasses } from "./button-group.classes.js"

describe("btnGroupClasses", () => {
  it("returns default classes (horizontal, not attached)", () => {
    const result = btnGroupClasses()
    expect(result).toBe("pm-btn-group pm-btn-group--horizontal")
  })

  it("applies horizontal orientation", () => {
    expect(btnGroupClasses({ orientation: "horizontal" })).toContain("pm-btn-group--horizontal")
  })

  it("applies vertical orientation", () => {
    expect(btnGroupClasses({ orientation: "vertical" })).toContain("pm-btn-group--vertical")
  })

  it("applies attached modifier", () => {
    expect(btnGroupClasses({ attached: true })).toContain("pm-btn-group--attached")
    expect(btnGroupClasses({ attached: false })).not.toContain("pm-btn-group--attached")
  })

  it("always includes base class", () => {
    expect(btnGroupClasses()).toMatch(/^pm-btn-group\s/)
  })

  it("combines multiple options", () => {
    const result = btnGroupClasses({
      orientation: "vertical",
      attached: true,
    })
    expect(result).toBe("pm-btn-group pm-btn-group--vertical pm-btn-group--attached")
  })
})

describe("btnGroupModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-btn-group": "pm_abc_buttonGroup",
    "pm-btn-group--horizontal": "pm_abc_horizontal",
    "pm-btn-group--vertical": "pm_abc_vertical",
    "pm-btn-group--attached": "pm_abc_attached",
  }

  it("returns mapped default classes", () => {
    const result = btnGroupModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_buttonGroup pm_abc_horizontal")
  })

  it("maps orientation classes correctly", () => {
    const result = btnGroupModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("maps attached class", () => {
    const result = btnGroupModuleClasses(mockClassMap, { attached: true })
    expect(result).toContain("pm_abc_attached")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-btn-group": "pm_abc_buttonGroup",
    }
    const result = btnGroupModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_buttonGroup")
    expect(result).not.toContain("undefined")
  })
})
