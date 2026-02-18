import { describe, it, expect } from "vitest"
import { buttonClasses, buttonModuleClasses } from "./button.classes.js"

describe("buttonClasses", () => {
  it("returns default classes (primary, md)", () => {
    const result = buttonClasses()
    expect(result).toBe("pm-button pm-button--primary pm-button--md")
  })

  it("applies variant", () => {
    expect(buttonClasses({ variant: "danger" })).toContain("pm-button--danger")
    expect(buttonClasses({ variant: "secondary" })).toContain("pm-button--secondary")
    expect(buttonClasses({ variant: "ghost" })).toContain("pm-button--ghost")
  })

  it("applies size", () => {
    expect(buttonClasses({ size: "sm" })).toContain("pm-button--sm")
    expect(buttonClasses({ size: "lg" })).toContain("pm-button--lg")
  })

  it("applies disabled modifier", () => {
    expect(buttonClasses({ disabled: true })).toContain("pm-button--disabled")
    expect(buttonClasses({ disabled: false })).not.toContain("pm-button--disabled")
  })

  it("applies full-width modifier", () => {
    expect(buttonClasses({ fullWidth: true })).toContain("pm-button--full-width")
    expect(buttonClasses({ fullWidth: false })).not.toContain("pm-button--full-width")
  })

  it("always includes base class", () => {
    expect(buttonClasses()).toMatch(/^pm-button\s/)
  })

  it("combines multiple options", () => {
    const result = buttonClasses({
      variant: "danger",
      size: "lg",
      disabled: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-button pm-button--danger pm-button--lg pm-button--disabled pm-button--full-width",
    )
  })
})

describe("buttonModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-button": "pm_abc_button",
    "pm-button--primary": "pm_abc_primary",
    "pm-button--secondary": "pm_abc_secondary",
    "pm-button--md": "pm_abc_md",
    "pm-button--sm": "pm_abc_sm",
    "pm-button--disabled": "pm_abc_disabled",
    "pm-button--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = buttonModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_button pm_abc_primary pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = buttonModuleClasses(mockClassMap, { variant: "secondary" })
    expect(result).toContain("pm_abc_secondary")
  })

  it("maps disabled class", () => {
    const result = buttonModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-button": "pm_abc_button",
    }
    const result = buttonModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_button")
    expect(result).not.toContain("undefined")
  })
})
