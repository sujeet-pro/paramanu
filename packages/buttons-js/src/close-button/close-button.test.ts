import { describe, it, expect } from "vitest"
import { closeBtnClasses, closeBtnModuleClasses } from "./close-button.classes.js"

describe("closeBtnClasses", () => {
  it("returns default classes (md)", () => {
    const result = closeBtnClasses()
    expect(result).toBe("pm-close-btn pm-close-btn--md")
  })

  it("applies size", () => {
    expect(closeBtnClasses({ size: "sm" })).toContain("pm-close-btn--sm")
    expect(closeBtnClasses({ size: "md" })).toContain("pm-close-btn--md")
    expect(closeBtnClasses({ size: "lg" })).toContain("pm-close-btn--lg")
  })

  it("applies disabled modifier", () => {
    expect(closeBtnClasses({ disabled: true })).toContain("pm-close-btn--disabled")
    expect(closeBtnClasses({ disabled: false })).not.toContain("pm-close-btn--disabled")
  })

  it("always includes base class", () => {
    expect(closeBtnClasses()).toMatch(/^pm-close-btn\s/)
  })

  it("combines multiple options", () => {
    const result = closeBtnClasses({
      size: "lg",
      disabled: true,
    })
    expect(result).toBe("pm-close-btn pm-close-btn--lg pm-close-btn--disabled")
  })
})

describe("closeBtnModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-close-btn": "pm_abc_closeBtn",
    "pm-close-btn--sm": "pm_abc_sm",
    "pm-close-btn--md": "pm_abc_md",
    "pm-close-btn--lg": "pm_abc_lg",
    "pm-close-btn--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = closeBtnModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_closeBtn pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = closeBtnModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps disabled class", () => {
    const result = closeBtnModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-close-btn": "pm_abc_closeBtn",
    }
    const result = closeBtnModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_closeBtn")
    expect(result).not.toContain("undefined")
  })
})
