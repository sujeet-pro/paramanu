import { describe, it, expect } from "vitest"
import { bttClasses, bttModuleClasses } from "./back-to-top.classes.js"

describe("bttClasses", () => {
  it("returns default classes (md, bottom-right, visible)", () => {
    const result = bttClasses()
    expect(result).toBe("pm-btt pm-btt--md pm-btt--bottom-right pm-btt--visible")
  })

  it("applies size", () => {
    expect(bttClasses({ size: "sm" })).toContain("pm-btt--sm")
    expect(bttClasses({ size: "lg" })).toContain("pm-btt--lg")
  })

  it("applies position", () => {
    expect(bttClasses({ position: "bottom-left" })).toContain("pm-btt--bottom-left")
    expect(bttClasses({ position: "bottom-center" })).toContain("pm-btt--bottom-center")
  })

  it("applies visible modifier", () => {
    expect(bttClasses({ visible: true })).toContain("pm-btt--visible")
    expect(bttClasses({ visible: false })).not.toContain("pm-btt--visible")
  })

  it("always includes base class", () => {
    expect(bttClasses()).toMatch(/^pm-btt\s/)
  })

  it("combines multiple options", () => {
    const result = bttClasses({
      size: "lg",
      position: "bottom-left",
      visible: false,
    })
    expect(result).toBe("pm-btt pm-btt--lg pm-btt--bottom-left")
  })
})

describe("bttModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-btt": "pm_abc_backToTop",
    "pm-btt--md": "pm_abc_md",
    "pm-btt--sm": "pm_abc_sm",
    "pm-btt--bottom-right": "pm_abc_bottomRight",
    "pm-btt--bottom-left": "pm_abc_bottomLeft",
    "pm-btt--visible": "pm_abc_visible",
  }

  it("returns mapped default classes", () => {
    const result = bttModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_backToTop pm_abc_md pm_abc_bottomRight pm_abc_visible")
  })

  it("maps size classes correctly", () => {
    const result = bttModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps visible class", () => {
    const result = bttModuleClasses(mockClassMap, { visible: false })
    expect(result).not.toContain("pm_abc_visible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-btt": "pm_abc_backToTop",
    }
    const result = bttModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_backToTop")
    expect(result).not.toContain("undefined")
  })
})
