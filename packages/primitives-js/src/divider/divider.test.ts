import { describe, it, expect } from "vitest"
import { dividerClasses, dividerModuleClasses } from "./divider.classes.js"

describe("dividerClasses", () => {
  it("returns default classes (horizontal, solid)", () => {
    const result = dividerClasses()
    expect(result).toBe("pm-divider pm-divider--horizontal pm-divider--solid")
  })

  it("applies orientation", () => {
    expect(dividerClasses({ orientation: "vertical" })).toContain("pm-divider--vertical")
    expect(dividerClasses({ orientation: "horizontal" })).toContain("pm-divider--horizontal")
  })

  it("applies variant", () => {
    expect(dividerClasses({ variant: "dashed" })).toContain("pm-divider--dashed")
    expect(dividerClasses({ variant: "dotted" })).toContain("pm-divider--dotted")
    expect(dividerClasses({ variant: "solid" })).toContain("pm-divider--solid")
  })

  it("always includes base class", () => {
    expect(dividerClasses()).toMatch(/^pm-divider\s/)
  })

  it("combines multiple options", () => {
    const result = dividerClasses({ orientation: "vertical", variant: "dashed" })
    expect(result).toBe("pm-divider pm-divider--vertical pm-divider--dashed")
  })
})

describe("dividerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-divider": "pm_abc_divider",
    "pm-divider--horizontal": "pm_abc_horizontal",
    "pm-divider--vertical": "pm_abc_vertical",
    "pm-divider--solid": "pm_abc_solid",
    "pm-divider--dashed": "pm_abc_dashed",
    "pm-divider--dotted": "pm_abc_dotted",
  }

  it("returns mapped default classes", () => {
    const result = dividerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_divider pm_abc_horizontal pm_abc_solid")
  })

  it("maps orientation classes correctly", () => {
    const result = dividerModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("maps variant classes correctly", () => {
    const result = dividerModuleClasses(mockClassMap, { variant: "dashed" })
    expect(result).toContain("pm_abc_dashed")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-divider": "pm_abc_divider",
    }
    const result = dividerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_divider")
    expect(result).not.toContain("undefined")
  })
})
