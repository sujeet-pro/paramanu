import { describe, it, expect } from "vitest"
import { flexClasses, flexModuleClasses } from "./flex.classes.js"

describe("flexClasses", () => {
  it("returns base class with no options", () => {
    expect(flexClasses()).toBe("pm-flex")
  })

  it("returns base class with empty options", () => {
    expect(flexClasses({})).toBe("pm-flex")
  })

  it("does not add direction modifier for row (default)", () => {
    expect(flexClasses({ direction: "row" })).toBe("pm-flex")
  })

  it("adds column direction modifier", () => {
    expect(flexClasses({ direction: "column" })).toBe("pm-flex pm-flex--col")
  })

  it("adds row-reverse direction modifier", () => {
    expect(flexClasses({ direction: "row-reverse" })).toBe("pm-flex pm-flex--row-reverse")
  })

  it("adds column-reverse direction modifier", () => {
    expect(flexClasses({ direction: "column-reverse" })).toBe("pm-flex pm-flex--col-reverse")
  })

  it("adds align modifier", () => {
    expect(flexClasses({ align: "center" })).toBe("pm-flex pm-flex--align-center")
  })

  it("adds all align variants", () => {
    expect(flexClasses({ align: "start" })).toContain("pm-flex--align-start")
    expect(flexClasses({ align: "end" })).toContain("pm-flex--align-end")
    expect(flexClasses({ align: "stretch" })).toContain("pm-flex--align-stretch")
    expect(flexClasses({ align: "baseline" })).toContain("pm-flex--align-baseline")
  })

  it("adds justify modifier", () => {
    expect(flexClasses({ justify: "between" })).toBe("pm-flex pm-flex--justify-between")
  })

  it("adds all justify variants", () => {
    expect(flexClasses({ justify: "start" })).toContain("pm-flex--justify-start")
    expect(flexClasses({ justify: "center" })).toContain("pm-flex--justify-center")
    expect(flexClasses({ justify: "end" })).toContain("pm-flex--justify-end")
    expect(flexClasses({ justify: "around" })).toContain("pm-flex--justify-around")
    expect(flexClasses({ justify: "evenly" })).toContain("pm-flex--justify-evenly")
  })

  it("adds wrap modifier", () => {
    expect(flexClasses({ wrap: "wrap" })).toBe("pm-flex pm-flex--wrap")
  })

  it("adds nowrap modifier", () => {
    expect(flexClasses({ wrap: "nowrap" })).toBe("pm-flex pm-flex--nowrap")
  })

  it("adds wrap-reverse modifier", () => {
    expect(flexClasses({ wrap: "wrap-reverse" })).toBe("pm-flex pm-flex--wrap-reverse")
  })

  it("adds gap modifier", () => {
    expect(flexClasses({ gap: "4" })).toBe("pm-flex pm-flex--gap-4")
  })

  it("adds gap-0 modifier", () => {
    expect(flexClasses({ gap: "0" })).toBe("pm-flex pm-flex--gap-0")
  })

  it("adds inline modifier", () => {
    expect(flexClasses({ inline: true })).toBe("pm-flex pm-flex--inline")
  })

  it("does not add inline modifier when false", () => {
    expect(flexClasses({ inline: false })).toBe("pm-flex")
  })

  it("combines multiple options", () => {
    const result = flexClasses({
      direction: "column",
      align: "center",
      justify: "between",
      wrap: "wrap",
      gap: "4",
      inline: true,
    })
    expect(result).toContain("pm-flex")
    expect(result).toContain("pm-flex--inline")
    expect(result).toContain("pm-flex--col")
    expect(result).toContain("pm-flex--align-center")
    expect(result).toContain("pm-flex--justify-between")
    expect(result).toContain("pm-flex--wrap")
    expect(result).toContain("pm-flex--gap-4")
  })
})

describe("flexModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-flex": "pm_abc_flex",
    "pm-flex--inline": "pm_abc_inline",
    "pm-flex--col": "pm_abc_col",
    "pm-flex--row-reverse": "pm_abc_row_reverse",
    "pm-flex--col-reverse": "pm_abc_col_reverse",
    "pm-flex--align-center": "pm_abc_align_center",
    "pm-flex--justify-between": "pm_abc_justify_between",
    "pm-flex--wrap": "pm_abc_wrap",
    "pm-flex--gap-4": "pm_abc_gap_4",
  }

  it("returns mapped base class", () => {
    expect(flexModuleClasses(mockClassMap)).toBe("pm_abc_flex")
  })

  it("returns mapped classes with options", () => {
    const result = flexModuleClasses(mockClassMap, {
      direction: "column",
      align: "center",
      justify: "between",
      wrap: "wrap",
      gap: "4",
      inline: true,
    })
    expect(result).toContain("pm_abc_flex")
    expect(result).toContain("pm_abc_inline")
    expect(result).toContain("pm_abc_col")
    expect(result).toContain("pm_abc_align_center")
    expect(result).toContain("pm_abc_justify_between")
    expect(result).toContain("pm_abc_wrap")
    expect(result).toContain("pm_abc_gap_4")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = flexModuleClasses(sparseMap, { direction: "column", gap: "4" })
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
