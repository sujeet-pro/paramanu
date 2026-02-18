import { describe, it, expect } from "vitest"
import { iconClasses, iconModuleClasses } from "./icon.classes.js"

describe("iconClasses", () => {
  it("returns default classes (md, inherit)", () => {
    const result = iconClasses()
    expect(result).toBe("pm-icon pm-icon--md pm-icon--inherit")
  })

  it("applies size", () => {
    expect(iconClasses({ size: "xs" })).toContain("pm-icon--xs")
    expect(iconClasses({ size: "sm" })).toContain("pm-icon--sm")
    expect(iconClasses({ size: "lg" })).toContain("pm-icon--lg")
    expect(iconClasses({ size: "xl" })).toContain("pm-icon--xl")
  })

  it("applies color", () => {
    expect(iconClasses({ color: "primary" })).toContain("pm-icon--primary")
    expect(iconClasses({ color: "neutral" })).toContain("pm-icon--neutral")
    expect(iconClasses({ color: "danger" })).toContain("pm-icon--danger")
    expect(iconClasses({ color: "success" })).toContain("pm-icon--success")
  })

  it("applies spin modifier", () => {
    expect(iconClasses({ spin: true })).toContain("pm-icon--spin")
    expect(iconClasses({ spin: false })).not.toContain("pm-icon--spin")
  })

  it("always includes base class", () => {
    expect(iconClasses()).toMatch(/^pm-icon\s/)
  })

  it("combines multiple options", () => {
    const result = iconClasses({ size: "xl", color: "danger", spin: true })
    expect(result).toBe("pm-icon pm-icon--xl pm-icon--danger pm-icon--spin")
  })
})

describe("iconModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-icon": "pm_abc_icon",
    "pm-icon--md": "pm_abc_md",
    "pm-icon--lg": "pm_abc_lg",
    "pm-icon--inherit": "pm_abc_inherit",
    "pm-icon--primary": "pm_abc_primary",
    "pm-icon--spin": "pm_abc_spin",
  }

  it("returns mapped default classes", () => {
    const result = iconModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_icon pm_abc_md pm_abc_inherit")
  })

  it("maps size classes correctly", () => {
    const result = iconModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps color classes correctly", () => {
    const result = iconModuleClasses(mockClassMap, { color: "primary" })
    expect(result).toContain("pm_abc_primary")
  })

  it("maps spin class", () => {
    const result = iconModuleClasses(mockClassMap, { spin: true })
    expect(result).toContain("pm_abc_spin")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-icon": "pm_abc_icon",
    }
    const result = iconModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_icon")
    expect(result).not.toContain("undefined")
  })
})
