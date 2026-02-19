import { describe, it, expect } from "vitest"
import { toggleBtnClasses, toggleBtnModuleClasses } from "./toggle-button.classes.js"

describe("toggleBtnClasses", () => {
  it("returns default classes (default, md)", () => {
    const result = toggleBtnClasses()
    expect(result).toBe("pm-toggle-btn pm-toggle-btn--default pm-toggle-btn--md")
  })

  it("applies variant", () => {
    expect(toggleBtnClasses({ variant: "default" })).toContain("pm-toggle-btn--default")
    expect(toggleBtnClasses({ variant: "outline" })).toContain("pm-toggle-btn--outline")
  })

  it("applies size", () => {
    expect(toggleBtnClasses({ size: "sm" })).toContain("pm-toggle-btn--sm")
    expect(toggleBtnClasses({ size: "md" })).toContain("pm-toggle-btn--md")
    expect(toggleBtnClasses({ size: "lg" })).toContain("pm-toggle-btn--lg")
  })

  it("applies pressed modifier", () => {
    expect(toggleBtnClasses({ pressed: true })).toContain("pm-toggle-btn--pressed")
    expect(toggleBtnClasses({ pressed: false })).not.toContain("pm-toggle-btn--pressed")
  })

  it("applies disabled modifier", () => {
    expect(toggleBtnClasses({ disabled: true })).toContain("pm-toggle-btn--disabled")
    expect(toggleBtnClasses({ disabled: false })).not.toContain("pm-toggle-btn--disabled")
  })

  it("always includes base class", () => {
    expect(toggleBtnClasses()).toMatch(/^pm-toggle-btn\s/)
  })

  it("combines multiple options", () => {
    const result = toggleBtnClasses({
      variant: "outline",
      size: "lg",
      pressed: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-toggle-btn pm-toggle-btn--outline pm-toggle-btn--lg pm-toggle-btn--pressed pm-toggle-btn--disabled",
    )
  })

  it("does not include pressed modifier by default", () => {
    const result = toggleBtnClasses()
    expect(result).not.toContain("pm-toggle-btn--pressed")
  })
})

describe("toggleBtnModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-toggle-btn": "pm_abc_toggleBtn",
    "pm-toggle-btn--default": "pm_abc_default",
    "pm-toggle-btn--outline": "pm_abc_outline",
    "pm-toggle-btn--sm": "pm_abc_sm",
    "pm-toggle-btn--md": "pm_abc_md",
    "pm-toggle-btn--lg": "pm_abc_lg",
    "pm-toggle-btn--pressed": "pm_abc_pressed",
    "pm-toggle-btn--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = toggleBtnModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_toggleBtn pm_abc_default pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = toggleBtnModuleClasses(mockClassMap, { variant: "outline" })
    expect(result).toContain("pm_abc_outline")
  })

  it("maps pressed class", () => {
    const result = toggleBtnModuleClasses(mockClassMap, { pressed: true })
    expect(result).toContain("pm_abc_pressed")
  })

  it("maps disabled class", () => {
    const result = toggleBtnModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-toggle-btn": "pm_abc_toggleBtn",
    }
    const result = toggleBtnModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_toggleBtn")
    expect(result).not.toContain("undefined")
  })
})
