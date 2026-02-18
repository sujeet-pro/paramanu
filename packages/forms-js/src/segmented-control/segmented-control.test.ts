import { describe, it, expect } from "vitest"
import {
  segmentedControlClasses,
  segmentedControlModuleClasses,
} from "./segmented-control.classes.js"

describe("segmentedControlClasses", () => {
  it("returns default classes (md)", () => {
    const result = segmentedControlClasses()
    expect(result).toBe("pm-segmented-control pm-segmented-control--md")
  })

  it("applies size sm", () => {
    expect(segmentedControlClasses({ size: "sm" })).toContain("pm-segmented-control--sm")
  })

  it("applies size md", () => {
    expect(segmentedControlClasses({ size: "md" })).toContain("pm-segmented-control--md")
  })

  it("applies size lg", () => {
    expect(segmentedControlClasses({ size: "lg" })).toContain("pm-segmented-control--lg")
  })

  it("applies full-width modifier", () => {
    expect(segmentedControlClasses({ fullWidth: true })).toContain(
      "pm-segmented-control--full-width",
    )
    expect(segmentedControlClasses({ fullWidth: false })).not.toContain(
      "pm-segmented-control--full-width",
    )
  })

  it("always includes base class", () => {
    expect(segmentedControlClasses()).toMatch(/^pm-segmented-control\s/)
  })

  it("combines multiple options", () => {
    const result = segmentedControlClasses({
      size: "lg",
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-segmented-control pm-segmented-control--lg pm-segmented-control--full-width",
    )
  })
})

describe("segmentedControlModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-segmented-control": "pm_abc_sc",
    "pm-segmented-control--sm": "pm_abc_sm",
    "pm-segmented-control--md": "pm_abc_md",
    "pm-segmented-control--lg": "pm_abc_lg",
    "pm-segmented-control--full-width": "pm_abc_fw",
  }

  it("returns mapped default classes", () => {
    const result = segmentedControlModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_sc pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = segmentedControlModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps full-width class", () => {
    const result = segmentedControlModuleClasses(mockClassMap, { fullWidth: true })
    expect(result).toContain("pm_abc_fw")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-segmented-control": "pm_abc_sc",
    }
    const result = segmentedControlModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_sc")
    expect(result).not.toContain("undefined")
  })
})
