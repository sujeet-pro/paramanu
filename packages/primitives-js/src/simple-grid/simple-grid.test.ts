import { describe, it, expect } from "vitest"
import { simpleGridClasses, simpleGridModuleClasses } from "./simple-grid.classes.js"

describe("simpleGridClasses", () => {
  it("returns base class with no options", () => {
    expect(simpleGridClasses()).toBe("pm-simple-grid")
  })

  it("returns base class with empty options", () => {
    expect(simpleGridClasses({})).toBe("pm-simple-grid")
  })

  it("adds minChildWidth modifier", () => {
    expect(simpleGridClasses({ minChildWidth: "sm" })).toBe(
      "pm-simple-grid pm-simple-grid--min-sm",
    )
  })

  it("adds all minChildWidth variants", () => {
    expect(simpleGridClasses({ minChildWidth: "2xs" })).toContain("pm-simple-grid--min-2xs")
    expect(simpleGridClasses({ minChildWidth: "xs" })).toContain("pm-simple-grid--min-xs")
    expect(simpleGridClasses({ minChildWidth: "md" })).toContain("pm-simple-grid--min-md")
    expect(simpleGridClasses({ minChildWidth: "lg" })).toContain("pm-simple-grid--min-lg")
    expect(simpleGridClasses({ minChildWidth: "xl" })).toContain("pm-simple-grid--min-xl")
  })

  it("adds columns modifier", () => {
    expect(simpleGridClasses({ columns: 3 })).toBe("pm-simple-grid pm-simple-grid--cols-3")
  })

  it("adds all column variants", () => {
    expect(simpleGridClasses({ columns: 1 })).toContain("pm-simple-grid--cols-1")
    expect(simpleGridClasses({ columns: 2 })).toContain("pm-simple-grid--cols-2")
    expect(simpleGridClasses({ columns: 4 })).toContain("pm-simple-grid--cols-4")
    expect(simpleGridClasses({ columns: 5 })).toContain("pm-simple-grid--cols-5")
    expect(simpleGridClasses({ columns: 6 })).toContain("pm-simple-grid--cols-6")
  })

  it("minChildWidth takes priority over columns", () => {
    const result = simpleGridClasses({ minChildWidth: "md", columns: 3 })
    expect(result).toContain("pm-simple-grid--min-md")
    expect(result).not.toContain("pm-simple-grid--cols-3")
  })

  it("adds gap modifier", () => {
    expect(simpleGridClasses({ gap: "4" })).toBe("pm-simple-grid pm-simple-grid--gap-4")
  })

  it("adds gap-0 modifier", () => {
    expect(simpleGridClasses({ gap: "0" })).toBe("pm-simple-grid pm-simple-grid--gap-0")
  })

  it("combines minChildWidth and gap", () => {
    const result = simpleGridClasses({ minChildWidth: "sm", gap: "4" })
    expect(result).toContain("pm-simple-grid")
    expect(result).toContain("pm-simple-grid--min-sm")
    expect(result).toContain("pm-simple-grid--gap-4")
  })

  it("combines columns and gap", () => {
    const result = simpleGridClasses({ columns: 3, gap: "6" })
    expect(result).toContain("pm-simple-grid")
    expect(result).toContain("pm-simple-grid--cols-3")
    expect(result).toContain("pm-simple-grid--gap-6")
  })
})

describe("simpleGridModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-simple-grid": "pm_abc_simple_grid",
    "pm-simple-grid--min-sm": "pm_abc_min_sm",
    "pm-simple-grid--min-md": "pm_abc_min_md",
    "pm-simple-grid--cols-3": "pm_abc_cols_3",
    "pm-simple-grid--gap-4": "pm_abc_gap_4",
  }

  it("returns mapped base class", () => {
    expect(simpleGridModuleClasses(mockClassMap)).toBe("pm_abc_simple_grid")
  })

  it("returns mapped minChildWidth class", () => {
    const result = simpleGridModuleClasses(mockClassMap, { minChildWidth: "sm" })
    expect(result).toContain("pm_abc_simple_grid")
    expect(result).toContain("pm_abc_min_sm")
  })

  it("returns mapped columns class", () => {
    const result = simpleGridModuleClasses(mockClassMap, { columns: 3 })
    expect(result).toContain("pm_abc_simple_grid")
    expect(result).toContain("pm_abc_cols_3")
  })

  it("minChildWidth takes priority over columns in module classes", () => {
    const result = simpleGridModuleClasses(mockClassMap, { minChildWidth: "md", columns: 3 })
    expect(result).toContain("pm_abc_min_md")
    expect(result).not.toContain("pm_abc_cols_3")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = simpleGridModuleClasses(sparseMap, { minChildWidth: "sm", gap: "4" })
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
