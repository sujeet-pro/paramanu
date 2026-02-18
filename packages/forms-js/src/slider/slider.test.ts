import { describe, it, expect } from "vitest"
import { sliderClasses, sliderModuleClasses } from "./slider.classes.js"

describe("sliderClasses", () => {
  it("returns default classes (md, horizontal)", () => {
    const result = sliderClasses()
    expect(result).toBe("pm-slider pm-slider--md pm-slider--horizontal")
  })

  it("applies size", () => {
    expect(sliderClasses({ size: "sm" })).toContain("pm-slider--sm")
    expect(sliderClasses({ size: "md" })).toContain("pm-slider--md")
    expect(sliderClasses({ size: "lg" })).toContain("pm-slider--lg")
  })

  it("applies orientation", () => {
    expect(sliderClasses({ orientation: "horizontal" })).toContain("pm-slider--horizontal")
    expect(sliderClasses({ orientation: "vertical" })).toContain("pm-slider--vertical")
  })

  it("applies disabled modifier", () => {
    expect(sliderClasses({ disabled: true })).toContain("pm-slider--disabled")
    expect(sliderClasses({ disabled: false })).not.toContain("pm-slider--disabled")
  })

  it("applies show-marks modifier", () => {
    expect(sliderClasses({ showMarks: true })).toContain("pm-slider--show-marks")
    expect(sliderClasses({ showMarks: false })).not.toContain("pm-slider--show-marks")
  })

  it("always includes base class", () => {
    expect(sliderClasses()).toMatch(/^pm-slider\s/)
  })

  it("combines multiple options", () => {
    const result = sliderClasses({
      size: "lg",
      disabled: true,
      orientation: "vertical",
      showMarks: true,
    })
    expect(result).toBe(
      "pm-slider pm-slider--lg pm-slider--vertical pm-slider--disabled pm-slider--show-marks",
    )
  })
})

describe("sliderModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-slider": "pm_abc_slider",
    "pm-slider--md": "pm_abc_md",
    "pm-slider--sm": "pm_abc_sm",
    "pm-slider--lg": "pm_abc_lg",
    "pm-slider--horizontal": "pm_abc_horizontal",
    "pm-slider--vertical": "pm_abc_vertical",
    "pm-slider--disabled": "pm_abc_disabled",
    "pm-slider--show-marks": "pm_abc_showMarks",
  }

  it("returns mapped default classes", () => {
    const result = sliderModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_slider pm_abc_md pm_abc_horizontal")
  })

  it("maps size classes correctly", () => {
    const result = sliderModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps orientation classes correctly", () => {
    const result = sliderModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("maps disabled class", () => {
    const result = sliderModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps show-marks class", () => {
    const result = sliderModuleClasses(mockClassMap, { showMarks: true })
    expect(result).toContain("pm_abc_showMarks")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-slider": "pm_abc_slider",
    }
    const result = sliderModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_slider")
    expect(result).not.toContain("undefined")
  })
})
