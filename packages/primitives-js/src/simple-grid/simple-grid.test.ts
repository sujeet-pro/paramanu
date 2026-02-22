import { describe, it, expect } from "vitest"
import { sgridClasses, sgridModuleClasses } from "./simple-grid.classes.js"

describe("sgridClasses", () => {
  it("returns base class with no options", () => {
    expect(sgridClasses()).toBe("pm-sgrid")
  })

  it("returns base class with empty options", () => {
    expect(sgridClasses({})).toBe("pm-sgrid")
  })

  it("adds minChildWidth modifier", () => {
    expect(sgridClasses({ minChildWidth: "sm" })).toBe("pm-sgrid pm-sgrid--min-sm")
  })

  it("adds all minChildWidth variants", () => {
    expect(sgridClasses({ minChildWidth: "2xs" })).toContain("pm-sgrid--min-2xs")
    expect(sgridClasses({ minChildWidth: "xs" })).toContain("pm-sgrid--min-xs")
    expect(sgridClasses({ minChildWidth: "md" })).toContain("pm-sgrid--min-md")
    expect(sgridClasses({ minChildWidth: "lg" })).toContain("pm-sgrid--min-lg")
    expect(sgridClasses({ minChildWidth: "xl" })).toContain("pm-sgrid--min-xl")
  })

  it("adds columns modifier", () => {
    expect(sgridClasses({ columns: 3 })).toBe("pm-sgrid pm-sgrid--cols-3")
  })

  it("adds all column variants", () => {
    expect(sgridClasses({ columns: 1 })).toContain("pm-sgrid--cols-1")
    expect(sgridClasses({ columns: 2 })).toContain("pm-sgrid--cols-2")
    expect(sgridClasses({ columns: 4 })).toContain("pm-sgrid--cols-4")
    expect(sgridClasses({ columns: 5 })).toContain("pm-sgrid--cols-5")
    expect(sgridClasses({ columns: 6 })).toContain("pm-sgrid--cols-6")
  })

  it("minChildWidth takes priority over columns", () => {
    const result = sgridClasses({ minChildWidth: "md", columns: 3 })
    expect(result).toContain("pm-sgrid--min-md")
    expect(result).not.toContain("pm-sgrid--cols-3")
  })

  it("adds gap modifier", () => {
    expect(sgridClasses({ gap: "4" })).toBe("pm-sgrid pm-sgrid--gap-4")
  })

  it("adds gap-0 modifier", () => {
    expect(sgridClasses({ gap: "0" })).toBe("pm-sgrid pm-sgrid--gap-0")
  })

  it("combines minChildWidth and gap", () => {
    const result = sgridClasses({ minChildWidth: "sm", gap: "4" })
    expect(result).toContain("pm-sgrid")
    expect(result).toContain("pm-sgrid--min-sm")
    expect(result).toContain("pm-sgrid--gap-4")
  })

  it("combines columns and gap", () => {
    const result = sgridClasses({ columns: 3, gap: "6" })
    expect(result).toContain("pm-sgrid")
    expect(result).toContain("pm-sgrid--cols-3")
    expect(result).toContain("pm-sgrid--gap-6")
  })
})

describe("sgridModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-sgrid": "pm_abc_simple_grid",
    "pm-sgrid--min-sm": "pm_abc_min_sm",
    "pm-sgrid--min-md": "pm_abc_min_md",
    "pm-sgrid--cols-3": "pm_abc_cols_3",
    "pm-sgrid--gap-4": "pm_abc_gap_4",
  }

  it("returns mapped base class", () => {
    expect(sgridModuleClasses(mockClassMap)).toBe("pm_abc_simple_grid")
  })

  it("returns mapped minChildWidth class", () => {
    const result = sgridModuleClasses(mockClassMap, { minChildWidth: "sm" })
    expect(result).toContain("pm_abc_simple_grid")
    expect(result).toContain("pm_abc_min_sm")
  })

  it("returns mapped columns class", () => {
    const result = sgridModuleClasses(mockClassMap, { columns: 3 })
    expect(result).toContain("pm_abc_simple_grid")
    expect(result).toContain("pm_abc_cols_3")
  })

  it("minChildWidth takes priority over columns in module classes", () => {
    const result = sgridModuleClasses(mockClassMap, { minChildWidth: "md", columns: 3 })
    expect(result).toContain("pm_abc_min_md")
    expect(result).not.toContain("pm_abc_cols_3")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = sgridModuleClasses(sparseMap, { minChildWidth: "sm", gap: "4" })
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
