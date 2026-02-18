import { describe, it, expect } from "vitest"
import { gridClasses, gridModuleClasses } from "./grid.classes.js"

describe("gridClasses", () => {
  it("returns base class with no options", () => {
    expect(gridClasses()).toBe("pm-grid")
  })

  it("returns base class with empty options", () => {
    expect(gridClasses({})).toBe("pm-grid")
  })

  it("adds columns modifier", () => {
    expect(gridClasses({ columns: 3 })).toBe("pm-grid pm-grid--cols-3")
  })

  it("adds columns-12 modifier", () => {
    expect(gridClasses({ columns: 12 })).toBe("pm-grid pm-grid--cols-12")
  })

  it("adds columns-none modifier", () => {
    expect(gridClasses({ columns: "none" })).toBe("pm-grid pm-grid--cols-none")
  })

  it("adds rows modifier", () => {
    expect(gridClasses({ rows: 2 })).toBe("pm-grid pm-grid--rows-2")
  })

  it("adds rows-none modifier", () => {
    expect(gridClasses({ rows: "none" })).toBe("pm-grid pm-grid--rows-none")
  })

  it("adds gap modifier", () => {
    expect(gridClasses({ gap: "4" })).toBe("pm-grid pm-grid--gap-4")
  })

  it("adds rowGap modifier", () => {
    expect(gridClasses({ rowGap: "2" })).toBe("pm-grid pm-grid--row-gap-2")
  })

  it("adds columnGap modifier", () => {
    expect(gridClasses({ columnGap: "6" })).toBe("pm-grid pm-grid--col-gap-6")
  })

  it("adds align modifier", () => {
    expect(gridClasses({ align: "center" })).toBe("pm-grid pm-grid--align-center")
  })

  it("adds justify modifier", () => {
    expect(gridClasses({ justify: "between" })).toBe("pm-grid pm-grid--justify-between")
  })

  it("adds inline modifier", () => {
    expect(gridClasses({ inline: true })).toBe("pm-grid pm-grid--inline")
  })

  it("does not add inline modifier when false", () => {
    expect(gridClasses({ inline: false })).toBe("pm-grid")
  })

  it("combines multiple options", () => {
    const result = gridClasses({
      columns: 3,
      rows: 2,
      gap: "4",
      rowGap: "2",
      columnGap: "6",
      align: "center",
      justify: "between",
      inline: true,
    })
    expect(result).toContain("pm-grid")
    expect(result).toContain("pm-grid--inline")
    expect(result).toContain("pm-grid--cols-3")
    expect(result).toContain("pm-grid--rows-2")
    expect(result).toContain("pm-grid--gap-4")
    expect(result).toContain("pm-grid--row-gap-2")
    expect(result).toContain("pm-grid--col-gap-6")
    expect(result).toContain("pm-grid--align-center")
    expect(result).toContain("pm-grid--justify-between")
  })
})

describe("gridModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-grid": "pm_abc_grid",
    "pm-grid--inline": "pm_abc_inline",
    "pm-grid--cols-3": "pm_abc_cols_3",
    "pm-grid--rows-2": "pm_abc_rows_2",
    "pm-grid--gap-4": "pm_abc_gap_4",
    "pm-grid--row-gap-2": "pm_abc_row_gap_2",
    "pm-grid--col-gap-6": "pm_abc_col_gap_6",
    "pm-grid--align-center": "pm_abc_align_center",
    "pm-grid--justify-between": "pm_abc_justify_between",
  }

  it("returns mapped base class", () => {
    expect(gridModuleClasses(mockClassMap)).toBe("pm_abc_grid")
  })

  it("returns mapped classes with all options", () => {
    const result = gridModuleClasses(mockClassMap, {
      columns: 3,
      rows: 2,
      gap: "4",
      rowGap: "2",
      columnGap: "6",
      align: "center",
      justify: "between",
      inline: true,
    })
    expect(result).toContain("pm_abc_grid")
    expect(result).toContain("pm_abc_inline")
    expect(result).toContain("pm_abc_cols_3")
    expect(result).toContain("pm_abc_rows_2")
    expect(result).toContain("pm_abc_gap_4")
    expect(result).toContain("pm_abc_row_gap_2")
    expect(result).toContain("pm_abc_col_gap_6")
    expect(result).toContain("pm_abc_align_center")
    expect(result).toContain("pm_abc_justify_between")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = gridModuleClasses(sparseMap, { columns: 3, gap: "4" })
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
