import { describe, it, expect } from "vitest"
import { listClasses, listModuleClasses } from "./list.classes.js"

describe("listClasses", () => {
  it("returns default classes (unordered, md spacing)", () => {
    expect(listClasses()).toBe("pm-list pm-list--unordered pm-list--spacing-md")
  })

  it("applies type", () => {
    expect(listClasses({ type: "ordered" })).toContain("pm-list--ordered")
    expect(listClasses({ type: "unordered" })).toContain("pm-list--unordered")
  })

  it("applies styleType", () => {
    expect(listClasses({ styleType: "circle" })).toContain("pm-list--style-circle")
    expect(listClasses({ styleType: "lower-roman" })).toContain("pm-list--style-lower-roman")
    expect(listClasses({ styleType: "upper-alpha" })).toContain("pm-list--style-upper-alpha")
  })

  it("applies spacing", () => {
    expect(listClasses({ spacing: "sm" })).toContain("pm-list--spacing-sm")
    expect(listClasses({ spacing: "lg" })).toContain("pm-list--spacing-lg")
  })

  it("applies unstyled modifier", () => {
    expect(listClasses({ unstyled: true })).toContain("pm-list--unstyled")
    expect(listClasses({ unstyled: false })).not.toContain("pm-list--unstyled")
  })

  it("does not add styleType when not specified", () => {
    const result = listClasses()
    expect(result).not.toContain("--style-")
  })

  it("always includes base class", () => {
    expect(listClasses()).toMatch(/^pm-list\s/)
  })

  it("combines multiple options", () => {
    const result = listClasses({
      type: "ordered",
      styleType: "lower-roman",
      spacing: "lg",
      unstyled: true,
    })
    expect(result).toBe(
      "pm-list pm-list--ordered pm-list--spacing-lg pm-list--style-lower-roman pm-list--unstyled",
    )
  })
})

describe("listModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-list": "pm_abc_list",
    "pm-list--unordered": "pm_abc_unordered",
    "pm-list--ordered": "pm_abc_ordered",
    "pm-list--spacing-md": "pm_abc_spacingMd",
    "pm-list--spacing-lg": "pm_abc_spacingLg",
    "pm-list--style-circle": "pm_abc_styleCircle",
    "pm-list--unstyled": "pm_abc_unstyled",
  }

  it("returns mapped default classes", () => {
    const result = listModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_list pm_abc_unordered pm_abc_spacingMd")
  })

  it("maps type classes correctly", () => {
    const result = listModuleClasses(mockClassMap, { type: "ordered" })
    expect(result).toContain("pm_abc_ordered")
  })

  it("maps styleType classes correctly", () => {
    const result = listModuleClasses(mockClassMap, { styleType: "circle" })
    expect(result).toContain("pm_abc_styleCircle")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-list": "pm_abc_list",
    }
    const result = listModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_list")
    expect(result).not.toContain("undefined")
  })
})
