import { describe, it, expect } from "vitest"
import { closeButtonClasses, closeButtonModuleClasses } from "./close-button.classes.js"

describe("closeButtonClasses", () => {
  it("returns default classes (md)", () => {
    const result = closeButtonClasses()
    expect(result).toBe("pm-close-button pm-close-button--md")
  })

  it("applies size", () => {
    expect(closeButtonClasses({ size: "sm" })).toContain("pm-close-button--sm")
    expect(closeButtonClasses({ size: "md" })).toContain("pm-close-button--md")
    expect(closeButtonClasses({ size: "lg" })).toContain("pm-close-button--lg")
  })

  it("applies disabled modifier", () => {
    expect(closeButtonClasses({ disabled: true })).toContain("pm-close-button--disabled")
    expect(closeButtonClasses({ disabled: false })).not.toContain("pm-close-button--disabled")
  })

  it("always includes base class", () => {
    expect(closeButtonClasses()).toMatch(/^pm-close-button\s/)
  })

  it("combines multiple options", () => {
    const result = closeButtonClasses({
      size: "lg",
      disabled: true,
    })
    expect(result).toBe("pm-close-button pm-close-button--lg pm-close-button--disabled")
  })
})

describe("closeButtonModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-close-button": "pm_abc_closeButton",
    "pm-close-button--sm": "pm_abc_sm",
    "pm-close-button--md": "pm_abc_md",
    "pm-close-button--lg": "pm_abc_lg",
    "pm-close-button--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = closeButtonModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_closeButton pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = closeButtonModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps disabled class", () => {
    const result = closeButtonModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-close-button": "pm_abc_closeButton",
    }
    const result = closeButtonModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_closeButton")
    expect(result).not.toContain("undefined")
  })
})
