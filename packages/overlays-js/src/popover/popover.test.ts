import { describe, it, expect } from "vitest"
import {
  popoverClasses,
  popoverModuleClasses,
  popoverArrowClasses,
  popoverArrowModuleClasses,
} from "./popover.classes.js"

describe("popoverClasses", () => {
  it("returns default classes", () => {
    const result = popoverClasses()
    expect(result).toBe("pm-popover pm-popover--bottom")
  })

  it("applies placement modifier", () => {
    expect(popoverClasses({ placement: "top" })).toContain("pm-popover--top")
    expect(popoverClasses({ placement: "left" })).toContain("pm-popover--left")
    expect(popoverClasses({ placement: "right" })).toContain("pm-popover--right")
    expect(popoverClasses({ placement: "bottom-start" })).toContain("pm-popover--bottom-start")
    expect(popoverClasses({ placement: "top-end" })).toContain("pm-popover--top-end")
  })

  it("applies hasArrow modifier", () => {
    expect(popoverClasses({ hasArrow: true })).toContain("pm-popover--has-arrow")
    expect(popoverClasses({ hasArrow: false })).not.toContain("pm-popover--has-arrow")
  })

  it("always includes base class", () => {
    expect(popoverClasses()).toMatch(/^pm-popover\s/)
  })

  it("combines multiple options", () => {
    const result = popoverClasses({ placement: "top-start", hasArrow: true })
    expect(result).toBe("pm-popover pm-popover--top-start pm-popover--has-arrow")
  })
})

describe("popoverModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-popover": "pm_abc_popover",
    "pm-popover--bottom": "pm_abc_bottom",
    "pm-popover--top": "pm_abc_top",
    "pm-popover--top-start": "pm_abc_top_start",
    "pm-popover--has-arrow": "pm_abc_has_arrow",
  }

  it("returns mapped default classes", () => {
    const result = popoverModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_popover pm_abc_bottom")
  })

  it("maps placement classes correctly", () => {
    const result = popoverModuleClasses(mockClassMap, { placement: "top" })
    expect(result).toContain("pm_abc_top")
  })

  it("maps hasArrow class", () => {
    const result = popoverModuleClasses(mockClassMap, { hasArrow: true })
    expect(result).toContain("pm_abc_has_arrow")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-popover": "pm_abc_popover",
    }
    const result = popoverModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_popover")
    expect(result).not.toContain("undefined")
  })
})

describe("popoverArrowClasses", () => {
  it("returns arrow class", () => {
    expect(popoverArrowClasses()).toBe("pm-popover__arrow")
  })
})

describe("popoverArrowModuleClasses", () => {
  it("returns mapped arrow class", () => {
    const classMap = { "pm-popover__arrow": "pm_abc_arrow" }
    expect(popoverArrowModuleClasses(classMap)).toBe("pm_abc_arrow")
  })

  it("returns empty string for missing entry", () => {
    expect(popoverArrowModuleClasses({})).toBe("")
  })
})
