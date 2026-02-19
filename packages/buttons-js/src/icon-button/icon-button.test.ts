import { describe, it, expect } from "vitest"
import { iconBtnClasses, iconBtnModuleClasses } from "./icon-button.classes.js"

describe("iconBtnClasses", () => {
  it("returns default classes (primary, md, square)", () => {
    const result = iconBtnClasses()
    expect(result).toBe(
      "pm-icon-btn pm-icon-btn--primary pm-icon-btn--md pm-icon-btn--square",
    )
  })

  it("applies variant", () => {
    expect(iconBtnClasses({ variant: "primary" })).toContain("pm-icon-btn--primary")
    expect(iconBtnClasses({ variant: "secondary" })).toContain("pm-icon-btn--secondary")
    expect(iconBtnClasses({ variant: "danger" })).toContain("pm-icon-btn--danger")
    expect(iconBtnClasses({ variant: "ghost" })).toContain("pm-icon-btn--ghost")
  })

  it("applies size", () => {
    expect(iconBtnClasses({ size: "sm" })).toContain("pm-icon-btn--sm")
    expect(iconBtnClasses({ size: "md" })).toContain("pm-icon-btn--md")
    expect(iconBtnClasses({ size: "lg" })).toContain("pm-icon-btn--lg")
  })

  it("applies shape", () => {
    expect(iconBtnClasses({ shape: "square" })).toContain("pm-icon-btn--square")
    expect(iconBtnClasses({ shape: "circle" })).toContain("pm-icon-btn--circle")
  })

  it("applies disabled modifier", () => {
    expect(iconBtnClasses({ disabled: true })).toContain("pm-icon-btn--disabled")
    expect(iconBtnClasses({ disabled: false })).not.toContain("pm-icon-btn--disabled")
  })

  it("always includes base class", () => {
    expect(iconBtnClasses()).toMatch(/^pm-icon-btn\s/)
  })

  it("combines multiple options", () => {
    const result = iconBtnClasses({
      variant: "danger",
      size: "lg",
      shape: "circle",
      disabled: true,
    })
    expect(result).toBe(
      "pm-icon-btn pm-icon-btn--danger pm-icon-btn--lg pm-icon-btn--circle pm-icon-btn--disabled",
    )
  })
})

describe("iconBtnModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-icon-btn": "pm_abc_iconBtn",
    "pm-icon-btn--primary": "pm_abc_primary",
    "pm-icon-btn--secondary": "pm_abc_secondary",
    "pm-icon-btn--danger": "pm_abc_danger",
    "pm-icon-btn--ghost": "pm_abc_ghost",
    "pm-icon-btn--sm": "pm_abc_sm",
    "pm-icon-btn--md": "pm_abc_md",
    "pm-icon-btn--lg": "pm_abc_lg",
    "pm-icon-btn--square": "pm_abc_square",
    "pm-icon-btn--circle": "pm_abc_circle",
    "pm-icon-btn--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = iconBtnModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_iconBtn pm_abc_primary pm_abc_md pm_abc_square")
  })

  it("maps variant classes correctly", () => {
    const result = iconBtnModuleClasses(mockClassMap, { variant: "secondary" })
    expect(result).toContain("pm_abc_secondary")
  })

  it("maps size classes correctly", () => {
    const result = iconBtnModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps shape classes correctly", () => {
    const result = iconBtnModuleClasses(mockClassMap, { shape: "circle" })
    expect(result).toContain("pm_abc_circle")
  })

  it("maps disabled class", () => {
    const result = iconBtnModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-icon-btn": "pm_abc_iconBtn",
    }
    const result = iconBtnModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_iconBtn")
    expect(result).not.toContain("undefined")
  })
})
