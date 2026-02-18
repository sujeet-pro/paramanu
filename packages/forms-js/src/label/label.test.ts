import { describe, it, expect } from "vitest"
import { labelClasses, labelModuleClasses } from "./label.classes.js"

describe("labelClasses", () => {
  it("returns default classes (md)", () => {
    const result = labelClasses()
    expect(result).toBe("pm-label pm-label--md")
  })

  it("applies size sm", () => {
    expect(labelClasses({ size: "sm" })).toContain("pm-label--sm")
  })

  it("applies size md", () => {
    expect(labelClasses({ size: "md" })).toContain("pm-label--md")
  })

  it("applies size lg", () => {
    expect(labelClasses({ size: "lg" })).toContain("pm-label--lg")
  })

  it("applies disabled modifier", () => {
    expect(labelClasses({ disabled: true })).toContain("pm-label--disabled")
    expect(labelClasses({ disabled: false })).not.toContain("pm-label--disabled")
  })

  it("applies required modifier", () => {
    expect(labelClasses({ required: true })).toContain("pm-label--required")
    expect(labelClasses({ required: false })).not.toContain("pm-label--required")
  })

  it("always includes base class", () => {
    expect(labelClasses()).toMatch(/^pm-label\s/)
  })

  it("combines multiple options", () => {
    const result = labelClasses({
      size: "lg",
      disabled: true,
      required: true,
    })
    expect(result).toBe("pm-label pm-label--lg pm-label--disabled pm-label--required")
  })
})

describe("labelModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-label": "pm_abc_label",
    "pm-label--sm": "pm_abc_sm",
    "pm-label--md": "pm_abc_md",
    "pm-label--lg": "pm_abc_lg",
    "pm-label--disabled": "pm_abc_disabled",
    "pm-label--required": "pm_abc_required",
  }

  it("returns mapped default classes", () => {
    const result = labelModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_label pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = labelModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = labelModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps required class", () => {
    const result = labelModuleClasses(mockClassMap, { required: true })
    expect(result).toContain("pm_abc_required")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-label": "pm_abc_label",
    }
    const result = labelModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_label")
    expect(result).not.toContain("undefined")
  })
})
