import { describe, it, expect } from "vitest"
import { checkboxCardClasses, checkboxCardModuleClasses } from "./checkbox-card.classes.js"

describe("checkboxCardClasses", () => {
  it("returns default classes (md)", () => {
    const result = checkboxCardClasses()
    expect(result).toBe("pm-checkbox-card pm-checkbox-card--md")
  })

  it("applies size sm", () => {
    expect(checkboxCardClasses({ size: "sm" })).toContain("pm-checkbox-card--sm")
  })

  it("applies size md", () => {
    expect(checkboxCardClasses({ size: "md" })).toContain("pm-checkbox-card--md")
  })

  it("applies size lg", () => {
    expect(checkboxCardClasses({ size: "lg" })).toContain("pm-checkbox-card--lg")
  })

  it("applies disabled modifier", () => {
    expect(checkboxCardClasses({ disabled: true })).toContain("pm-checkbox-card--disabled")
    expect(checkboxCardClasses({ disabled: false })).not.toContain("pm-checkbox-card--disabled")
  })

  it("applies checked modifier", () => {
    expect(checkboxCardClasses({ checked: true })).toContain("pm-checkbox-card--checked")
    expect(checkboxCardClasses({ checked: false })).not.toContain("pm-checkbox-card--checked")
  })

  it("always includes base class", () => {
    expect(checkboxCardClasses()).toMatch(/^pm-checkbox-card\s/)
  })

  it("combines multiple options", () => {
    const result = checkboxCardClasses({
      size: "lg",
      disabled: true,
      checked: true,
    })
    expect(result).toBe(
      "pm-checkbox-card pm-checkbox-card--lg pm-checkbox-card--disabled pm-checkbox-card--checked",
    )
  })
})

describe("checkboxCardModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-checkbox-card": "pm_abc_card",
    "pm-checkbox-card--sm": "pm_abc_sm",
    "pm-checkbox-card--md": "pm_abc_md",
    "pm-checkbox-card--lg": "pm_abc_lg",
    "pm-checkbox-card--disabled": "pm_abc_disabled",
    "pm-checkbox-card--checked": "pm_abc_checked",
  }

  it("returns mapped default classes", () => {
    const result = checkboxCardModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_card pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = checkboxCardModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = checkboxCardModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps checked class", () => {
    const result = checkboxCardModuleClasses(mockClassMap, { checked: true })
    expect(result).toContain("pm_abc_checked")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-checkbox-card": "pm_abc_card",
    }
    const result = checkboxCardModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_card")
    expect(result).not.toContain("undefined")
  })
})
