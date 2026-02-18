import { describe, it, expect } from "vitest"
import { wrapClasses, wrapModuleClasses } from "./wrap.classes.js"

describe("wrapClasses", () => {
  it("returns base class with no options", () => {
    expect(wrapClasses()).toBe("pm-wrap")
  })

  it("returns base class with empty options", () => {
    expect(wrapClasses({})).toBe("pm-wrap")
  })

  it("does not add direction modifier for row (default)", () => {
    expect(wrapClasses({ direction: "row" })).toBe("pm-wrap")
  })

  it("adds row-reverse direction modifier", () => {
    expect(wrapClasses({ direction: "row-reverse" })).toBe("pm-wrap pm-wrap--row-reverse")
  })

  it("adds align modifier", () => {
    expect(wrapClasses({ align: "center" })).toBe("pm-wrap pm-wrap--align-center")
  })

  it("adds all align variants", () => {
    expect(wrapClasses({ align: "start" })).toContain("pm-wrap--align-start")
    expect(wrapClasses({ align: "end" })).toContain("pm-wrap--align-end")
    expect(wrapClasses({ align: "stretch" })).toContain("pm-wrap--align-stretch")
    expect(wrapClasses({ align: "baseline" })).toContain("pm-wrap--align-baseline")
  })

  it("adds justify modifier", () => {
    expect(wrapClasses({ justify: "between" })).toBe("pm-wrap pm-wrap--justify-between")
  })

  it("adds all justify variants", () => {
    expect(wrapClasses({ justify: "start" })).toContain("pm-wrap--justify-start")
    expect(wrapClasses({ justify: "center" })).toContain("pm-wrap--justify-center")
    expect(wrapClasses({ justify: "end" })).toContain("pm-wrap--justify-end")
    expect(wrapClasses({ justify: "around" })).toContain("pm-wrap--justify-around")
    expect(wrapClasses({ justify: "evenly" })).toContain("pm-wrap--justify-evenly")
  })

  it("adds gap modifier", () => {
    expect(wrapClasses({ gap: "4" })).toBe("pm-wrap pm-wrap--gap-4")
  })

  it("adds gap-0 modifier", () => {
    expect(wrapClasses({ gap: "0" })).toBe("pm-wrap pm-wrap--gap-0")
  })

  it("combines multiple options", () => {
    const result = wrapClasses({
      direction: "row-reverse",
      align: "center",
      justify: "between",
      gap: "4",
    })
    expect(result).toContain("pm-wrap")
    expect(result).toContain("pm-wrap--row-reverse")
    expect(result).toContain("pm-wrap--align-center")
    expect(result).toContain("pm-wrap--justify-between")
    expect(result).toContain("pm-wrap--gap-4")
  })
})

describe("wrapModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-wrap": "pm_abc_wrap",
    "pm-wrap--row-reverse": "pm_abc_row_reverse",
    "pm-wrap--align-center": "pm_abc_align_center",
    "pm-wrap--justify-between": "pm_abc_justify_between",
    "pm-wrap--gap-4": "pm_abc_gap_4",
  }

  it("returns mapped base class", () => {
    expect(wrapModuleClasses(mockClassMap)).toBe("pm_abc_wrap")
  })

  it("returns mapped classes with options", () => {
    const result = wrapModuleClasses(mockClassMap, {
      direction: "row-reverse",
      align: "center",
      justify: "between",
      gap: "4",
    })
    expect(result).toContain("pm_abc_wrap")
    expect(result).toContain("pm_abc_row_reverse")
    expect(result).toContain("pm_abc_align_center")
    expect(result).toContain("pm_abc_justify_between")
    expect(result).toContain("pm_abc_gap_4")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = wrapModuleClasses(sparseMap, { direction: "row-reverse", gap: "4" })
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
