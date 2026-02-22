import { describe, it, expect } from "vitest"
import { badgeClasses, badgeModuleClasses } from "./badge.classes.js"

describe("badgeClasses", () => {
  it("returns default classes (filled, md, primary)", () => {
    const result = badgeClasses()
    expect(result).toBe("pm-badge pm-badge--filled pm-badge--md pm-badge--primary")
  })

  it("applies variant", () => {
    expect(badgeClasses({ variant: "outline" })).toContain("pm-badge--outline")
    expect(badgeClasses({ variant: "subtle" })).toContain("pm-badge--subtle")
    expect(badgeClasses({ variant: "filled" })).toContain("pm-badge--filled")
  })

  it("applies size", () => {
    expect(badgeClasses({ size: "sm" })).toContain("pm-badge--sm")
    expect(badgeClasses({ size: "lg" })).toContain("pm-badge--lg")
  })

  it("applies color", () => {
    expect(badgeClasses({ color: "neutral" })).toContain("pm-badge--neutral")
    expect(badgeClasses({ color: "danger" })).toContain("pm-badge--danger")
    expect(badgeClasses({ color: "success" })).toContain("pm-badge--success")
  })

  it("applies pill modifier", () => {
    expect(badgeClasses({ pill: true })).toContain("pm-badge--pill")
    expect(badgeClasses({ pill: false })).not.toContain("pm-badge--pill")
  })

  it("always includes base class", () => {
    expect(badgeClasses()).toMatch(/^pm-badge\s/)
  })

  it("combines multiple options", () => {
    const result = badgeClasses({
      variant: "outline",
      size: "lg",
      color: "danger",
      pill: true,
    })
    expect(result).toBe("pm-badge pm-badge--outline pm-badge--lg pm-badge--danger pm-badge--pill")
  })
})

describe("badgeModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-badge": "pm_abc_badge",
    "pm-badge--filled": "pm_abc_filled",
    "pm-badge--outline": "pm_abc_outline",
    "pm-badge--md": "pm_abc_md",
    "pm-badge--sm": "pm_abc_sm",
    "pm-badge--primary": "pm_abc_primary",
    "pm-badge--neutral": "pm_abc_neutral",
    "pm-badge--pill": "pm_abc_pill",
  }

  it("returns mapped default classes", () => {
    const result = badgeModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_badge pm_abc_filled pm_abc_md pm_abc_primary")
  })

  it("maps variant classes correctly", () => {
    const result = badgeModuleClasses(mockClassMap, { variant: "outline" })
    expect(result).toContain("pm_abc_outline")
  })

  it("maps pill class", () => {
    const result = badgeModuleClasses(mockClassMap, { pill: true })
    expect(result).toContain("pm_abc_pill")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-badge": "pm_abc_badge",
    }
    const result = badgeModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_badge")
    expect(result).not.toContain("undefined")
  })
})
