import { describe, it, expect } from "vitest"
import { affixClasses, affixModuleClasses } from "./affix.classes.js"

describe("affixClasses", () => {
  it("returns default classes (top)", () => {
    expect(affixClasses()).toBe("pm-affix pm-affix--top")
  })

  it("applies bottom position", () => {
    expect(affixClasses({ position: "bottom" })).toBe("pm-affix pm-affix--bottom")
  })

  it("applies offset", () => {
    expect(affixClasses({ offset: "4" })).toBe("pm-affix pm-affix--top pm-affix--offset-4")
  })

  it("combines position and offset", () => {
    expect(affixClasses({ position: "bottom", offset: "8" })).toBe(
      "pm-affix pm-affix--bottom pm-affix--offset-8",
    )
  })

  it("does not include offset when not provided", () => {
    expect(affixClasses()).not.toContain("offset")
  })
})

describe("affixModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-affix": "pm_abc_affix",
    "pm-affix--top": "pm_abc_top",
    "pm-affix--bottom": "pm_abc_bottom",
    "pm-affix--offset-4": "pm_abc_offset4",
  }

  it("returns mapped default classes", () => {
    expect(affixModuleClasses(mockClassMap)).toBe("pm_abc_affix pm_abc_top")
  })

  it("maps bottom class correctly", () => {
    expect(affixModuleClasses(mockClassMap, { position: "bottom" })).toBe(
      "pm_abc_affix pm_abc_bottom",
    )
  })

  it("maps offset class correctly", () => {
    expect(affixModuleClasses(mockClassMap, { offset: "4" })).toBe(
      "pm_abc_affix pm_abc_top pm_abc_offset4",
    )
  })

  it("handles missing class map entries gracefully", () => {
    const result = affixModuleClasses({})
    expect(result).not.toContain("undefined")
  })
})
