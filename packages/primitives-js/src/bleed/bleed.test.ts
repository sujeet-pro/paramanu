import { describe, it, expect } from "vitest"
import { bleedClasses, bleedModuleClasses } from "./bleed.classes.js"

describe("bleedClasses", () => {
  it("returns base class with no options", () => {
    const result = bleedClasses()
    expect(result).toBe("pm-bleed")
  })

  it("returns base class with empty options", () => {
    const result = bleedClasses({})
    expect(result).toBe("pm-bleed")
  })

  it("applies inline modifier", () => {
    const result = bleedClasses({ inline: "4" })
    expect(result).toBe("pm-bleed pm-bleed--inline-4")
  })

  it("applies block modifier", () => {
    const result = bleedClasses({ block: "6" })
    expect(result).toBe("pm-bleed pm-bleed--block-6")
  })

  it("applies inlineStart modifier", () => {
    const result = bleedClasses({ inlineStart: "2" })
    expect(result).toBe("pm-bleed pm-bleed--inline-start-2")
  })

  it("applies inlineEnd modifier", () => {
    const result = bleedClasses({ inlineEnd: "3" })
    expect(result).toBe("pm-bleed pm-bleed--inline-end-3")
  })

  it("applies blockStart modifier", () => {
    const result = bleedClasses({ blockStart: "5" })
    expect(result).toBe("pm-bleed pm-bleed--block-start-5")
  })

  it("applies blockEnd modifier", () => {
    const result = bleedClasses({ blockEnd: "8" })
    expect(result).toBe("pm-bleed pm-bleed--block-end-8")
  })

  it("combines multiple options", () => {
    const result = bleedClasses({ inline: "4", block: "2" })
    expect(result).toBe("pm-bleed pm-bleed--inline-4 pm-bleed--block-2")
  })

  it("combines individual side options", () => {
    const result = bleedClasses({ inlineStart: "4", blockEnd: "6" })
    expect(result).toBe("pm-bleed pm-bleed--inline-start-4 pm-bleed--block-end-6")
  })

  it("supports zero spacing", () => {
    const result = bleedClasses({ inline: "0" })
    expect(result).toBe("pm-bleed pm-bleed--inline-0")
  })

  it("always includes base class", () => {
    expect(bleedClasses({ inline: "4" })).toMatch(/^pm-bleed\s/)
  })
})

describe("bleedModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-bleed": "pm_abc_bleed",
    "pm-bleed--inline-4": "pm_abc_inline-4",
    "pm-bleed--block-2": "pm_abc_block-2",
    "pm-bleed--inline-start-3": "pm_abc_inline-start-3",
    "pm-bleed--inline-end-5": "pm_abc_inline-end-5",
    "pm-bleed--block-start-6": "pm_abc_block-start-6",
    "pm-bleed--block-end-8": "pm_abc_block-end-8",
  }

  it("returns mapped base class with no options", () => {
    const result = bleedModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_bleed")
  })

  it("maps inline modifier correctly", () => {
    const result = bleedModuleClasses(mockClassMap, { inline: "4" })
    expect(result).toBe("pm_abc_bleed pm_abc_inline-4")
  })

  it("maps block modifier correctly", () => {
    const result = bleedModuleClasses(mockClassMap, { block: "2" })
    expect(result).toBe("pm_abc_bleed pm_abc_block-2")
  })

  it("maps individual side modifiers correctly", () => {
    const result = bleedModuleClasses(mockClassMap, { inlineStart: "3", blockEnd: "8" })
    expect(result).toBe("pm_abc_bleed pm_abc_inline-start-3 pm_abc_block-end-8")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-bleed": "pm_abc_bleed",
    }
    const result = bleedModuleClasses(sparseMap, { inline: "4" })
    expect(result).toContain("pm_abc_bleed")
    expect(result).not.toContain("undefined")
  })
})
