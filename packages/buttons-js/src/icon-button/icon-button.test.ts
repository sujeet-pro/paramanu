import { describe, it, expect } from "vitest"
import { iconButtonClasses, iconButtonModuleClasses } from "./icon-button.classes.js"

describe("iconButtonClasses", () => {
  it("returns default classes (primary, md, square)", () => {
    const result = iconButtonClasses()
    expect(result).toBe(
      "pm-icon-button pm-icon-button--primary pm-icon-button--md pm-icon-button--square",
    )
  })

  it("applies variant", () => {
    expect(iconButtonClasses({ variant: "primary" })).toContain("pm-icon-button--primary")
    expect(iconButtonClasses({ variant: "secondary" })).toContain("pm-icon-button--secondary")
    expect(iconButtonClasses({ variant: "danger" })).toContain("pm-icon-button--danger")
    expect(iconButtonClasses({ variant: "ghost" })).toContain("pm-icon-button--ghost")
  })

  it("applies size", () => {
    expect(iconButtonClasses({ size: "sm" })).toContain("pm-icon-button--sm")
    expect(iconButtonClasses({ size: "md" })).toContain("pm-icon-button--md")
    expect(iconButtonClasses({ size: "lg" })).toContain("pm-icon-button--lg")
  })

  it("applies shape", () => {
    expect(iconButtonClasses({ shape: "square" })).toContain("pm-icon-button--square")
    expect(iconButtonClasses({ shape: "circle" })).toContain("pm-icon-button--circle")
  })

  it("applies disabled modifier", () => {
    expect(iconButtonClasses({ disabled: true })).toContain("pm-icon-button--disabled")
    expect(iconButtonClasses({ disabled: false })).not.toContain("pm-icon-button--disabled")
  })

  it("always includes base class", () => {
    expect(iconButtonClasses()).toMatch(/^pm-icon-button\s/)
  })

  it("combines multiple options", () => {
    const result = iconButtonClasses({
      variant: "danger",
      size: "lg",
      shape: "circle",
      disabled: true,
    })
    expect(result).toBe(
      "pm-icon-button pm-icon-button--danger pm-icon-button--lg pm-icon-button--circle pm-icon-button--disabled",
    )
  })
})

describe("iconButtonModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-icon-button": "pm_abc_iconButton",
    "pm-icon-button--primary": "pm_abc_primary",
    "pm-icon-button--secondary": "pm_abc_secondary",
    "pm-icon-button--danger": "pm_abc_danger",
    "pm-icon-button--ghost": "pm_abc_ghost",
    "pm-icon-button--sm": "pm_abc_sm",
    "pm-icon-button--md": "pm_abc_md",
    "pm-icon-button--lg": "pm_abc_lg",
    "pm-icon-button--square": "pm_abc_square",
    "pm-icon-button--circle": "pm_abc_circle",
    "pm-icon-button--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = iconButtonModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_iconButton pm_abc_primary pm_abc_md pm_abc_square")
  })

  it("maps variant classes correctly", () => {
    const result = iconButtonModuleClasses(mockClassMap, { variant: "secondary" })
    expect(result).toContain("pm_abc_secondary")
  })

  it("maps size classes correctly", () => {
    const result = iconButtonModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps shape classes correctly", () => {
    const result = iconButtonModuleClasses(mockClassMap, { shape: "circle" })
    expect(result).toContain("pm_abc_circle")
  })

  it("maps disabled class", () => {
    const result = iconButtonModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-icon-button": "pm_abc_iconButton",
    }
    const result = iconButtonModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_iconButton")
    expect(result).not.toContain("undefined")
  })
})
