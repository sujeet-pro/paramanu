import { describe, it, expect } from "vitest"
import { kbdClasses, kbdModuleClasses } from "./kbd.classes.js"

describe("kbdClasses", () => {
  it("returns default classes (md size)", () => {
    expect(kbdClasses()).toBe("pm-kbd pm-kbd--md")
  })

  it("applies size", () => {
    expect(kbdClasses({ size: "sm" })).toContain("pm-kbd--sm")
    expect(kbdClasses({ size: "lg" })).toContain("pm-kbd--lg")
  })

  it("always includes base class", () => {
    expect(kbdClasses()).toMatch(/^pm-kbd\s/)
  })
})

describe("kbdModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-kbd": "pm_abc_kbd",
    "pm-kbd--md": "pm_abc_md",
    "pm-kbd--sm": "pm_abc_sm",
    "pm-kbd--lg": "pm_abc_lg",
  }

  it("returns mapped default classes", () => {
    const result = kbdModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_kbd pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = kbdModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-kbd": "pm_abc_kbd",
    }
    const result = kbdModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_kbd")
    expect(result).not.toContain("undefined")
  })
})
