import { describe, it, expect } from "vitest"
import {
  statClasses,
  statHelpTextClasses,
  statArrowClasses,
  statModuleClasses,
} from "./stat.classes.js"

describe("statClasses", () => {
  it("returns default classes (md, start)", () => {
    const result = statClasses()
    expect(result.root).toBe("pm-stat pm-stat--md pm-stat--align-start")
    expect(result.label).toBe("pm-stat__label")
    expect(result.value).toBe("pm-stat__value")
    expect(result.helpText).toBe("pm-stat__help-text")
    expect(result.arrow).toBe("pm-stat__arrow")
  })

  it("applies size", () => {
    expect(statClasses({ size: "sm" }).root).toContain("pm-stat--sm")
    expect(statClasses({ size: "lg" }).root).toContain("pm-stat--lg")
  })

  it("applies alignment", () => {
    expect(statClasses({ align: "center" }).root).toContain("pm-stat--align-center")
    expect(statClasses({ align: "end" }).root).toContain("pm-stat--align-end")
  })
})

describe("statHelpTextClasses", () => {
  it("returns base class without trend", () => {
    expect(statHelpTextClasses()).toBe("pm-stat__help-text")
  })

  it("applies up trend", () => {
    expect(statHelpTextClasses({ trend: "up" })).toBe("pm-stat__help-text pm-stat__help-text--up")
  })

  it("applies down trend", () => {
    expect(statHelpTextClasses({ trend: "down" })).toBe(
      "pm-stat__help-text pm-stat__help-text--down",
    )
  })
})

describe("statArrowClasses", () => {
  it("returns base class without trend", () => {
    expect(statArrowClasses()).toBe("pm-stat__arrow")
  })

  it("applies up trend", () => {
    expect(statArrowClasses({ trend: "up" })).toBe("pm-stat__arrow pm-stat__arrow--up")
  })

  it("applies down trend", () => {
    expect(statArrowClasses({ trend: "down" })).toBe("pm-stat__arrow pm-stat__arrow--down")
  })
})

describe("statModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-stat": "pm_abc_stat",
    "pm-stat--md": "pm_abc_md",
    "pm-stat--align-start": "pm_abc_alignStart",
    "pm-stat__label": "pm_abc_label",
    "pm-stat__value": "pm_abc_value",
    "pm-stat__help-text": "pm_abc_helpText",
    "pm-stat__arrow": "pm_abc_arrow",
  }

  it("returns mapped default classes", () => {
    const result = statModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_stat pm_abc_md pm_abc_alignStart")
    expect(result.label).toBe("pm_abc_label")
    expect(result.value).toBe("pm_abc_value")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-stat": "pm_abc_stat",
    }
    const result = statModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_stat")
    expect(result.root).not.toContain("undefined")
  })
})
