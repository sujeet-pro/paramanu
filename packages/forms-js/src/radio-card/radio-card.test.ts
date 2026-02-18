import { describe, it, expect } from "vitest"
import { radioCardClasses, radioCardModuleClasses } from "./radio-card.classes.js"

describe("radioCardClasses", () => {
  it("returns default classes (md)", () => {
    const result = radioCardClasses()
    expect(result).toBe("pm-radio-card pm-radio-card--md")
  })

  it("applies size sm", () => {
    expect(radioCardClasses({ size: "sm" })).toContain("pm-radio-card--sm")
  })

  it("applies size md", () => {
    expect(radioCardClasses({ size: "md" })).toContain("pm-radio-card--md")
  })

  it("applies size lg", () => {
    expect(radioCardClasses({ size: "lg" })).toContain("pm-radio-card--lg")
  })

  it("applies disabled modifier", () => {
    expect(radioCardClasses({ disabled: true })).toContain("pm-radio-card--disabled")
    expect(radioCardClasses({ disabled: false })).not.toContain("pm-radio-card--disabled")
  })

  it("applies checked modifier", () => {
    expect(radioCardClasses({ checked: true })).toContain("pm-radio-card--checked")
    expect(radioCardClasses({ checked: false })).not.toContain("pm-radio-card--checked")
  })

  it("always includes base class", () => {
    expect(radioCardClasses()).toMatch(/^pm-radio-card\s/)
  })

  it("combines multiple options", () => {
    const result = radioCardClasses({
      size: "lg",
      disabled: true,
      checked: true,
    })
    expect(result).toBe(
      "pm-radio-card pm-radio-card--lg pm-radio-card--disabled pm-radio-card--checked",
    )
  })
})

describe("radioCardModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-radio-card": "pm_abc_card",
    "pm-radio-card--sm": "pm_abc_sm",
    "pm-radio-card--md": "pm_abc_md",
    "pm-radio-card--lg": "pm_abc_lg",
    "pm-radio-card--disabled": "pm_abc_disabled",
    "pm-radio-card--checked": "pm_abc_checked",
  }

  it("returns mapped default classes", () => {
    const result = radioCardModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_card pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = radioCardModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = radioCardModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps checked class", () => {
    const result = radioCardModuleClasses(mockClassMap, { checked: true })
    expect(result).toContain("pm_abc_checked")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-radio-card": "pm_abc_card",
    }
    const result = radioCardModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_card")
    expect(result).not.toContain("undefined")
  })
})
