import { describe, it, expect } from "vitest"
import { textClasses, textModuleClasses } from "./text.classes.js"

describe("textClasses", () => {
  it("returns base class only with no options", () => {
    expect(textClasses()).toBe("pm-text")
  })

  it("applies size", () => {
    expect(textClasses({ size: "xs" })).toBe("pm-text pm-text--size-xs")
    expect(textClasses({ size: "lg" })).toBe("pm-text pm-text--size-lg")
    expect(textClasses({ size: "3xl" })).toBe("pm-text pm-text--size-3xl")
  })

  it("applies weight", () => {
    expect(textClasses({ weight: "bold" })).toContain("pm-text--weight-bold")
    expect(textClasses({ weight: "medium" })).toContain("pm-text--weight-medium")
  })

  it("applies align", () => {
    expect(textClasses({ align: "center" })).toContain("pm-text--align-center")
    expect(textClasses({ align: "right" })).toContain("pm-text--align-right")
  })

  it("applies lineHeight", () => {
    expect(textClasses({ lineHeight: "tight" })).toContain("pm-text--lh-tight")
    expect(textClasses({ lineHeight: "relaxed" })).toContain("pm-text--lh-relaxed")
  })

  it("applies truncate modifier", () => {
    expect(textClasses({ truncate: true })).toContain("pm-text--truncate")
    expect(textClasses({ truncate: false })).not.toContain("pm-text--truncate")
  })

  it("applies italic modifier", () => {
    expect(textClasses({ italic: true })).toContain("pm-text--italic")
    expect(textClasses({ italic: false })).not.toContain("pm-text--italic")
  })

  it("applies transform", () => {
    expect(textClasses({ transform: "uppercase" })).toContain("pm-text--transform-uppercase")
    expect(textClasses({ transform: "capitalize" })).toContain("pm-text--transform-capitalize")
  })

  it("does not add optional classes when not specified", () => {
    const result = textClasses()
    expect(result).toBe("pm-text")
    expect(result).not.toContain("--size")
    expect(result).not.toContain("--weight")
  })

  it("combines multiple options", () => {
    const result = textClasses({
      size: "lg",
      weight: "bold",
      align: "center",
      italic: true,
      transform: "uppercase",
    })
    expect(result).toBe(
      "pm-text pm-text--size-lg pm-text--weight-bold pm-text--align-center pm-text--italic pm-text--transform-uppercase",
    )
  })
})

describe("textModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-text": "pm_abc_text",
    "pm-text--size-lg": "pm_abc_sizeLg",
    "pm-text--weight-bold": "pm_abc_weightBold",
    "pm-text--align-center": "pm_abc_alignCenter",
    "pm-text--lh-tight": "pm_abc_lhTight",
    "pm-text--truncate": "pm_abc_truncate",
    "pm-text--italic": "pm_abc_italic",
    "pm-text--transform-uppercase": "pm_abc_transformUppercase",
  }

  it("returns mapped base class only with no options", () => {
    expect(textModuleClasses(mockClassMap)).toBe("pm_abc_text")
  })

  it("maps size classes correctly", () => {
    const result = textModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_sizeLg")
  })

  it("maps weight classes correctly", () => {
    const result = textModuleClasses(mockClassMap, { weight: "bold" })
    expect(result).toContain("pm_abc_weightBold")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-text": "pm_abc_text",
    }
    const result = textModuleClasses(sparseMap, { size: "lg" })
    expect(result).toContain("pm_abc_text")
    expect(result).not.toContain("undefined")
  })
})
