import { describe, it, expect } from "vitest"
import { btnClasses, btnModuleClasses } from "./button.classes.js"

describe("btnClasses", () => {
  it("returns default classes (primary, md)", () => {
    const result = btnClasses()
    expect(result).toBe("pm-btn pm-btn--primary pm-btn--md")
  })

  it("applies variant", () => {
    expect(btnClasses({ variant: "danger" })).toContain("pm-btn--danger")
    expect(btnClasses({ variant: "secondary" })).toContain("pm-btn--secondary")
    expect(btnClasses({ variant: "ghost" })).toContain("pm-btn--ghost")
  })

  it("applies size", () => {
    expect(btnClasses({ size: "sm" })).toContain("pm-btn--sm")
    expect(btnClasses({ size: "lg" })).toContain("pm-btn--lg")
  })

  it("applies disabled modifier", () => {
    expect(btnClasses({ disabled: true })).toContain("pm-btn--disabled")
    expect(btnClasses({ disabled: false })).not.toContain("pm-btn--disabled")
  })

  it("applies full-width modifier", () => {
    expect(btnClasses({ fullWidth: true })).toContain("pm-btn--full-width")
    expect(btnClasses({ fullWidth: false })).not.toContain("pm-btn--full-width")
  })

  it("always includes base class", () => {
    expect(btnClasses()).toMatch(/^pm-btn\s/)
  })

  it("combines multiple options", () => {
    const result = btnClasses({
      variant: "danger",
      size: "lg",
      disabled: true,
      fullWidth: true,
    })
    expect(result).toBe("pm-btn pm-btn--danger pm-btn--lg pm-btn--disabled pm-btn--full-width")
  })
})

describe("btnModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-btn": "pm_abc_button",
    "pm-btn--primary": "pm_abc_primary",
    "pm-btn--secondary": "pm_abc_secondary",
    "pm-btn--md": "pm_abc_md",
    "pm-btn--sm": "pm_abc_sm",
    "pm-btn--disabled": "pm_abc_disabled",
    "pm-btn--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = btnModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_button pm_abc_primary pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = btnModuleClasses(mockClassMap, { variant: "secondary" })
    expect(result).toContain("pm_abc_secondary")
  })

  it("maps disabled class", () => {
    const result = btnModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-btn": "pm_abc_button",
    }
    const result = btnModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_button")
    expect(result).not.toContain("undefined")
  })
})
