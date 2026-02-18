import { describe, it, expect } from "vitest"
import { buttonGroupClasses, buttonGroupModuleClasses } from "./button-group.classes.js"

describe("buttonGroupClasses", () => {
  it("returns default classes (horizontal, not attached)", () => {
    const result = buttonGroupClasses()
    expect(result).toBe("pm-button-group pm-button-group--horizontal")
  })

  it("applies horizontal orientation", () => {
    expect(buttonGroupClasses({ orientation: "horizontal" })).toContain(
      "pm-button-group--horizontal",
    )
  })

  it("applies vertical orientation", () => {
    expect(buttonGroupClasses({ orientation: "vertical" })).toContain(
      "pm-button-group--vertical",
    )
  })

  it("applies attached modifier", () => {
    expect(buttonGroupClasses({ attached: true })).toContain("pm-button-group--attached")
    expect(buttonGroupClasses({ attached: false })).not.toContain("pm-button-group--attached")
  })

  it("always includes base class", () => {
    expect(buttonGroupClasses()).toMatch(/^pm-button-group\s/)
  })

  it("combines multiple options", () => {
    const result = buttonGroupClasses({
      orientation: "vertical",
      attached: true,
    })
    expect(result).toBe("pm-button-group pm-button-group--vertical pm-button-group--attached")
  })
})

describe("buttonGroupModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-button-group": "pm_abc_buttonGroup",
    "pm-button-group--horizontal": "pm_abc_horizontal",
    "pm-button-group--vertical": "pm_abc_vertical",
    "pm-button-group--attached": "pm_abc_attached",
  }

  it("returns mapped default classes", () => {
    const result = buttonGroupModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_buttonGroup pm_abc_horizontal")
  })

  it("maps orientation classes correctly", () => {
    const result = buttonGroupModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("maps attached class", () => {
    const result = buttonGroupModuleClasses(mockClassMap, { attached: true })
    expect(result).toContain("pm_abc_attached")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-button-group": "pm_abc_buttonGroup",
    }
    const result = buttonGroupModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_buttonGroup")
    expect(result).not.toContain("undefined")
  })
})
