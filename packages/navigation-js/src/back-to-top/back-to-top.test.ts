import { describe, it, expect } from "vitest"
import { backToTopClasses, backToTopModuleClasses } from "./back-to-top.classes.js"

describe("backToTopClasses", () => {
  it("returns default classes (md, bottom-right, visible)", () => {
    const result = backToTopClasses()
    expect(result).toBe("pm-back-to-top pm-back-to-top--md pm-back-to-top--bottom-right pm-back-to-top--visible")
  })

  it("applies size", () => {
    expect(backToTopClasses({ size: "sm" })).toContain("pm-back-to-top--sm")
    expect(backToTopClasses({ size: "lg" })).toContain("pm-back-to-top--lg")
  })

  it("applies position", () => {
    expect(backToTopClasses({ position: "bottom-left" })).toContain("pm-back-to-top--bottom-left")
    expect(backToTopClasses({ position: "bottom-center" })).toContain(
      "pm-back-to-top--bottom-center",
    )
  })

  it("applies visible modifier", () => {
    expect(backToTopClasses({ visible: true })).toContain("pm-back-to-top--visible")
    expect(backToTopClasses({ visible: false })).not.toContain("pm-back-to-top--visible")
  })

  it("always includes base class", () => {
    expect(backToTopClasses()).toMatch(/^pm-back-to-top\s/)
  })

  it("combines multiple options", () => {
    const result = backToTopClasses({
      size: "lg",
      position: "bottom-left",
      visible: false,
    })
    expect(result).toBe("pm-back-to-top pm-back-to-top--lg pm-back-to-top--bottom-left")
  })
})

describe("backToTopModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-back-to-top": "pm_abc_backToTop",
    "pm-back-to-top--md": "pm_abc_md",
    "pm-back-to-top--sm": "pm_abc_sm",
    "pm-back-to-top--bottom-right": "pm_abc_bottomRight",
    "pm-back-to-top--bottom-left": "pm_abc_bottomLeft",
    "pm-back-to-top--visible": "pm_abc_visible",
  }

  it("returns mapped default classes", () => {
    const result = backToTopModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_backToTop pm_abc_md pm_abc_bottomRight pm_abc_visible")
  })

  it("maps size classes correctly", () => {
    const result = backToTopModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps visible class", () => {
    const result = backToTopModuleClasses(mockClassMap, { visible: false })
    expect(result).not.toContain("pm_abc_visible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-back-to-top": "pm_abc_backToTop",
    }
    const result = backToTopModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_backToTop")
    expect(result).not.toContain("undefined")
  })
})
