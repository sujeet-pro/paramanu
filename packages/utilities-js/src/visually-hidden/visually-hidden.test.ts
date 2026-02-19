import { describe, it, expect } from "vitest"
import {
  srOnlyClasses,
  srOnlyModuleClasses,
} from "./visually-hidden.classes.js"

describe("srOnlyClasses", () => {
  it("returns default classes", () => {
    expect(srOnlyClasses()).toBe("pm-sr-only")
  })

  it("applies focusable modifier", () => {
    expect(srOnlyClasses({ focusable: true })).toBe(
      "pm-sr-only pm-sr-only--focusable",
    )
  })

  it("does not apply focusable when false", () => {
    expect(srOnlyClasses({ focusable: false })).not.toContain("--focusable")
  })
})

describe("srOnlyModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-sr-only": "pm_abc_vh",
    "pm-sr-only--focusable": "pm_abc_vh_focusable",
  }

  it("returns mapped default classes", () => {
    expect(srOnlyModuleClasses(mockClassMap)).toBe("pm_abc_vh")
  })

  it("maps focusable class correctly", () => {
    expect(srOnlyModuleClasses(mockClassMap, { focusable: true })).toBe(
      "pm_abc_vh pm_abc_vh_focusable",
    )
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = srOnlyModuleClasses(sparseMap)
    expect(result).not.toContain("undefined")
  })
})
