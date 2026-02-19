import { describe, it, expect } from "vitest"
import { chkCardClasses, chkCardModuleClasses } from "./checkbox-card.classes.js"

describe("chkCardClasses", () => {
  it("returns default classes (md)", () => {
    const result = chkCardClasses()
    expect(result).toBe("pm-chk-card pm-chk-card--md")
  })

  it("applies size sm", () => {
    expect(chkCardClasses({ size: "sm" })).toContain("pm-chk-card--sm")
  })

  it("applies size md", () => {
    expect(chkCardClasses({ size: "md" })).toContain("pm-chk-card--md")
  })

  it("applies size lg", () => {
    expect(chkCardClasses({ size: "lg" })).toContain("pm-chk-card--lg")
  })

  it("applies disabled modifier", () => {
    expect(chkCardClasses({ disabled: true })).toContain("pm-chk-card--disabled")
    expect(chkCardClasses({ disabled: false })).not.toContain("pm-chk-card--disabled")
  })

  it("applies checked modifier", () => {
    expect(chkCardClasses({ checked: true })).toContain("pm-chk-card--checked")
    expect(chkCardClasses({ checked: false })).not.toContain("pm-chk-card--checked")
  })

  it("always includes base class", () => {
    expect(chkCardClasses()).toMatch(/^pm-chk-card\s/)
  })

  it("combines multiple options", () => {
    const result = chkCardClasses({
      size: "lg",
      disabled: true,
      checked: true,
    })
    expect(result).toBe(
      "pm-chk-card pm-chk-card--lg pm-chk-card--disabled pm-chk-card--checked",
    )
  })
})

describe("chkCardModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-chk-card": "pm_abc_card",
    "pm-chk-card--sm": "pm_abc_sm",
    "pm-chk-card--md": "pm_abc_md",
    "pm-chk-card--lg": "pm_abc_lg",
    "pm-chk-card--disabled": "pm_abc_disabled",
    "pm-chk-card--checked": "pm_abc_checked",
  }

  it("returns mapped default classes", () => {
    const result = chkCardModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_card pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = chkCardModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = chkCardModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps checked class", () => {
    const result = chkCardModuleClasses(mockClassMap, { checked: true })
    expect(result).toContain("pm_abc_checked")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-chk-card": "pm_abc_card",
    }
    const result = chkCardModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_card")
    expect(result).not.toContain("undefined")
  })
})
