import { describe, it, expect } from "vitest"
import { toggleButtonClasses, toggleButtonModuleClasses } from "./toggle-button.classes.js"

describe("toggleButtonClasses", () => {
  it("returns default classes (default, md)", () => {
    const result = toggleButtonClasses()
    expect(result).toBe("pm-toggle-button pm-toggle-button--default pm-toggle-button--md")
  })

  it("applies variant", () => {
    expect(toggleButtonClasses({ variant: "default" })).toContain("pm-toggle-button--default")
    expect(toggleButtonClasses({ variant: "outline" })).toContain("pm-toggle-button--outline")
  })

  it("applies size", () => {
    expect(toggleButtonClasses({ size: "sm" })).toContain("pm-toggle-button--sm")
    expect(toggleButtonClasses({ size: "md" })).toContain("pm-toggle-button--md")
    expect(toggleButtonClasses({ size: "lg" })).toContain("pm-toggle-button--lg")
  })

  it("applies pressed modifier", () => {
    expect(toggleButtonClasses({ pressed: true })).toContain("pm-toggle-button--pressed")
    expect(toggleButtonClasses({ pressed: false })).not.toContain("pm-toggle-button--pressed")
  })

  it("applies disabled modifier", () => {
    expect(toggleButtonClasses({ disabled: true })).toContain("pm-toggle-button--disabled")
    expect(toggleButtonClasses({ disabled: false })).not.toContain("pm-toggle-button--disabled")
  })

  it("always includes base class", () => {
    expect(toggleButtonClasses()).toMatch(/^pm-toggle-button\s/)
  })

  it("combines multiple options", () => {
    const result = toggleButtonClasses({
      variant: "outline",
      size: "lg",
      pressed: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-toggle-button pm-toggle-button--outline pm-toggle-button--lg pm-toggle-button--pressed pm-toggle-button--disabled",
    )
  })

  it("does not include pressed modifier by default", () => {
    const result = toggleButtonClasses()
    expect(result).not.toContain("pm-toggle-button--pressed")
  })
})

describe("toggleButtonModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-toggle-button": "pm_abc_toggleButton",
    "pm-toggle-button--default": "pm_abc_default",
    "pm-toggle-button--outline": "pm_abc_outline",
    "pm-toggle-button--sm": "pm_abc_sm",
    "pm-toggle-button--md": "pm_abc_md",
    "pm-toggle-button--lg": "pm_abc_lg",
    "pm-toggle-button--pressed": "pm_abc_pressed",
    "pm-toggle-button--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = toggleButtonModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_toggleButton pm_abc_default pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = toggleButtonModuleClasses(mockClassMap, { variant: "outline" })
    expect(result).toContain("pm_abc_outline")
  })

  it("maps pressed class", () => {
    const result = toggleButtonModuleClasses(mockClassMap, { pressed: true })
    expect(result).toContain("pm_abc_pressed")
  })

  it("maps disabled class", () => {
    const result = toggleButtonModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-toggle-button": "pm_abc_toggleButton",
    }
    const result = toggleButtonModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_toggleButton")
    expect(result).not.toContain("undefined")
  })
})
