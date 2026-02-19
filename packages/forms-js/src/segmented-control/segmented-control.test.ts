import { describe, it, expect } from "vitest"
import {
  segCtrlClasses,
  segCtrlModuleClasses,
} from "./segmented-control.classes.js"

describe("segCtrlClasses", () => {
  it("returns default classes (md)", () => {
    const result = segCtrlClasses()
    expect(result).toBe("pm-seg-ctrl pm-seg-ctrl--md")
  })

  it("applies size sm", () => {
    expect(segCtrlClasses({ size: "sm" })).toContain("pm-seg-ctrl--sm")
  })

  it("applies size md", () => {
    expect(segCtrlClasses({ size: "md" })).toContain("pm-seg-ctrl--md")
  })

  it("applies size lg", () => {
    expect(segCtrlClasses({ size: "lg" })).toContain("pm-seg-ctrl--lg")
  })

  it("applies full-width modifier", () => {
    expect(segCtrlClasses({ fullWidth: true })).toContain(
      "pm-seg-ctrl--full-width",
    )
    expect(segCtrlClasses({ fullWidth: false })).not.toContain(
      "pm-seg-ctrl--full-width",
    )
  })

  it("always includes base class", () => {
    expect(segCtrlClasses()).toMatch(/^pm-seg-ctrl\s/)
  })

  it("combines multiple options", () => {
    const result = segCtrlClasses({
      size: "lg",
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-seg-ctrl pm-seg-ctrl--lg pm-seg-ctrl--full-width",
    )
  })
})

describe("segCtrlModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-seg-ctrl": "pm_abc_sc",
    "pm-seg-ctrl--sm": "pm_abc_sm",
    "pm-seg-ctrl--md": "pm_abc_md",
    "pm-seg-ctrl--lg": "pm_abc_lg",
    "pm-seg-ctrl--full-width": "pm_abc_fw",
  }

  it("returns mapped default classes", () => {
    const result = segCtrlModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_sc pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = segCtrlModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps full-width class", () => {
    const result = segCtrlModuleClasses(mockClassMap, { fullWidth: true })
    expect(result).toContain("pm_abc_fw")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-seg-ctrl": "pm_abc_sc",
    }
    const result = segCtrlModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_sc")
    expect(result).not.toContain("undefined")
  })
})
