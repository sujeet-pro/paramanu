import { describe, it, expect } from "vitest"
import {
  hoverCardClasses,
  hoverCardModuleClasses,
  hoverCardArrowClasses,
  hoverCardArrowModuleClasses,
} from "./hover-card.classes.js"

describe("hoverCardClasses", () => {
  it("returns default classes", () => {
    const result = hoverCardClasses()
    expect(result).toBe("pm-hover-card pm-hover-card--bottom")
  })

  it("applies placement modifier", () => {
    expect(hoverCardClasses({ placement: "top" })).toContain("pm-hover-card--top")
    expect(hoverCardClasses({ placement: "left" })).toContain("pm-hover-card--left")
    expect(hoverCardClasses({ placement: "right" })).toContain("pm-hover-card--right")
    expect(hoverCardClasses({ placement: "bottom-start" })).toContain("pm-hover-card--bottom-start")
    expect(hoverCardClasses({ placement: "top-end" })).toContain("pm-hover-card--top-end")
  })

  it("always includes base class", () => {
    expect(hoverCardClasses()).toMatch(/^pm-hover-card\s/)
  })

  it("applies all 12 placement values", () => {
    const placements = [
      "top", "top-start", "top-end",
      "bottom", "bottom-start", "bottom-end",
      "left", "left-start", "left-end",
      "right", "right-start", "right-end",
    ] as const

    for (const placement of placements) {
      expect(hoverCardClasses({ placement })).toContain(`pm-hover-card--${placement}`)
    }
  })
})

describe("hoverCardModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-hover-card": "pm_abc_hover_card",
    "pm-hover-card--bottom": "pm_abc_bottom",
    "pm-hover-card--top": "pm_abc_top",
    "pm-hover-card--left-start": "pm_abc_left_start",
  }

  it("returns mapped default classes", () => {
    const result = hoverCardModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_hover_card pm_abc_bottom")
  })

  it("maps placement classes correctly", () => {
    const result = hoverCardModuleClasses(mockClassMap, { placement: "top" })
    expect(result).toContain("pm_abc_top")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-hover-card": "pm_abc_hover_card",
    }
    const result = hoverCardModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_hover_card")
    expect(result).not.toContain("undefined")
  })
})

describe("hoverCardArrowClasses", () => {
  it("returns arrow class", () => {
    expect(hoverCardArrowClasses()).toBe("pm-hover-card__arrow")
  })
})

describe("hoverCardArrowModuleClasses", () => {
  it("returns mapped arrow class", () => {
    const classMap = { "pm-hover-card__arrow": "pm_abc_arrow" }
    expect(hoverCardArrowModuleClasses(classMap)).toBe("pm_abc_arrow")
  })

  it("returns empty string for missing entry", () => {
    expect(hoverCardArrowModuleClasses({})).toBe("")
  })
})
