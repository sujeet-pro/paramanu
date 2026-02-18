import { describe, it, expect } from "vitest"
import {
  tooltipClasses,
  tooltipModuleClasses,
  tooltipArrowClasses,
  tooltipArrowModuleClasses,
} from "./tooltip.classes.js"

describe("tooltipClasses", () => {
  it("returns default classes", () => {
    const result = tooltipClasses()
    expect(result).toBe("pm-tooltip pm-tooltip--top")
  })

  it("applies placement modifier", () => {
    expect(tooltipClasses({ placement: "bottom" })).toContain("pm-tooltip--bottom")
    expect(tooltipClasses({ placement: "left" })).toContain("pm-tooltip--left")
    expect(tooltipClasses({ placement: "right" })).toContain("pm-tooltip--right")
    expect(tooltipClasses({ placement: "top-start" })).toContain("pm-tooltip--top-start")
    expect(tooltipClasses({ placement: "bottom-end" })).toContain("pm-tooltip--bottom-end")
  })

  it("always includes base class", () => {
    expect(tooltipClasses()).toMatch(/^pm-tooltip\s/)
  })

  it("applies all 12 placement values", () => {
    const placements = [
      "top", "top-start", "top-end",
      "bottom", "bottom-start", "bottom-end",
      "left", "left-start", "left-end",
      "right", "right-start", "right-end",
    ] as const

    for (const placement of placements) {
      expect(tooltipClasses({ placement })).toContain(`pm-tooltip--${placement}`)
    }
  })
})

describe("tooltipModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tooltip": "pm_abc_tooltip",
    "pm-tooltip--top": "pm_abc_top",
    "pm-tooltip--bottom": "pm_abc_bottom",
    "pm-tooltip--left": "pm_abc_left",
  }

  it("returns mapped default classes", () => {
    const result = tooltipModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_tooltip pm_abc_top")
  })

  it("maps placement classes correctly", () => {
    const result = tooltipModuleClasses(mockClassMap, { placement: "bottom" })
    expect(result).toContain("pm_abc_bottom")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-tooltip": "pm_abc_tooltip",
    }
    const result = tooltipModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_tooltip")
    expect(result).not.toContain("undefined")
  })
})

describe("tooltipArrowClasses", () => {
  it("returns arrow class", () => {
    expect(tooltipArrowClasses()).toBe("pm-tooltip__arrow")
  })
})

describe("tooltipArrowModuleClasses", () => {
  it("returns mapped arrow class", () => {
    const classMap = { "pm-tooltip__arrow": "pm_abc_arrow" }
    expect(tooltipArrowModuleClasses(classMap)).toBe("pm_abc_arrow")
  })

  it("returns empty string for missing entry", () => {
    expect(tooltipArrowModuleClasses({})).toBe("")
  })
})
