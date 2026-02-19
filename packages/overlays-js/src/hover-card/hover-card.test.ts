import { describe, it, expect } from "vitest"
import {
  hovercardClasses,
  hovercardModuleClasses,
  hoverCardArrowClasses,
  hoverCardArrowModuleClasses,
} from "./hover-card.classes.js"

describe("hovercardClasses", () => {
  it("returns default classes", () => {
    const result = hovercardClasses()
    expect(result).toBe("pm-hovercard pm-hovercard--bottom")
  })

  it("applies placement modifier", () => {
    expect(hovercardClasses({ placement: "top" })).toContain("pm-hovercard--top")
    expect(hovercardClasses({ placement: "left" })).toContain("pm-hovercard--left")
    expect(hovercardClasses({ placement: "right" })).toContain("pm-hovercard--right")
    expect(hovercardClasses({ placement: "bottom-start" })).toContain("pm-hovercard--bottom-start")
    expect(hovercardClasses({ placement: "top-end" })).toContain("pm-hovercard--top-end")
  })

  it("always includes base class", () => {
    expect(hovercardClasses()).toMatch(/^pm-hovercard\s/)
  })

  it("applies all 12 placement values", () => {
    const placements = [
      "top", "top-start", "top-end",
      "bottom", "bottom-start", "bottom-end",
      "left", "left-start", "left-end",
      "right", "right-start", "right-end",
    ] as const

    for (const placement of placements) {
      expect(hovercardClasses({ placement })).toContain(`pm-hovercard--${placement}`)
    }
  })
})

describe("hovercardModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-hovercard": "pm_abc_hover_card",
    "pm-hovercard--bottom": "pm_abc_bottom",
    "pm-hovercard--top": "pm_abc_top",
    "pm-hovercard--left-start": "pm_abc_left_start",
  }

  it("returns mapped default classes", () => {
    const result = hovercardModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_hover_card pm_abc_bottom")
  })

  it("maps placement classes correctly", () => {
    const result = hovercardModuleClasses(mockClassMap, { placement: "top" })
    expect(result).toContain("pm_abc_top")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-hovercard": "pm_abc_hover_card",
    }
    const result = hovercardModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_hover_card")
    expect(result).not.toContain("undefined")
  })
})

describe("hoverCardArrowClasses", () => {
  it("returns arrow class", () => {
    expect(hoverCardArrowClasses()).toBe("pm-hovercard__arrow")
  })
})

describe("hoverCardArrowModuleClasses", () => {
  it("returns mapped arrow class", () => {
    const classMap = { "pm-hovercard__arrow": "pm_abc_arrow" }
    expect(hoverCardArrowModuleClasses(classMap)).toBe("pm_abc_arrow")
  })

  it("returns empty string for missing entry", () => {
    expect(hoverCardArrowModuleClasses({})).toBe("")
  })
})
