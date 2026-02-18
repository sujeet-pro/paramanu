import { describe, it, expect } from "vitest"
import {
  visuallyHiddenClasses,
  visuallyHiddenModuleClasses,
} from "./visually-hidden.classes.js"

describe("visuallyHiddenClasses", () => {
  it("returns default classes", () => {
    expect(visuallyHiddenClasses()).toBe("pm-visually-hidden")
  })

  it("applies focusable modifier", () => {
    expect(visuallyHiddenClasses({ focusable: true })).toBe(
      "pm-visually-hidden pm-visually-hidden--focusable",
    )
  })

  it("does not apply focusable when false", () => {
    expect(visuallyHiddenClasses({ focusable: false })).not.toContain("--focusable")
  })
})

describe("visuallyHiddenModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-visually-hidden": "pm_abc_vh",
    "pm-visually-hidden--focusable": "pm_abc_vh_focusable",
  }

  it("returns mapped default classes", () => {
    expect(visuallyHiddenModuleClasses(mockClassMap)).toBe("pm_abc_vh")
  })

  it("maps focusable class correctly", () => {
    expect(visuallyHiddenModuleClasses(mockClassMap, { focusable: true })).toBe(
      "pm_abc_vh pm_abc_vh_focusable",
    )
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = visuallyHiddenModuleClasses(sparseMap)
    expect(result).not.toContain("undefined")
  })
})
