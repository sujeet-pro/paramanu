import { describe, it, expect } from "vitest"
import { tileClasses, tileModuleClasses } from "./tile.classes.js"

describe("tileClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = tileClasses()
    expect(result).toBe("pm-tile pm-tile--outline pm-tile--md")
  })

  it("applies variant", () => {
    expect(tileClasses({ variant: "filled" })).toContain("pm-tile--filled")
    expect(tileClasses({ variant: "ghost" })).toContain("pm-tile--ghost")
  })

  it("applies size", () => {
    expect(tileClasses({ size: "sm" })).toContain("pm-tile--sm")
    expect(tileClasses({ size: "lg" })).toContain("pm-tile--lg")
  })

  it("applies selected modifier", () => {
    expect(tileClasses({ selected: true })).toContain("pm-tile--selected")
    expect(tileClasses({ selected: false })).not.toContain("pm-tile--selected")
  })

  it("applies disabled modifier", () => {
    expect(tileClasses({ disabled: true })).toContain("pm-tile--disabled")
    expect(tileClasses({ disabled: false })).not.toContain("pm-tile--disabled")
  })

  it("combines multiple options", () => {
    const result = tileClasses({
      variant: "filled",
      size: "lg",
      selected: true,
      disabled: true,
    })
    expect(result).toBe("pm-tile pm-tile--filled pm-tile--lg pm-tile--selected pm-tile--disabled")
  })
})

describe("tileModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tile": "pm_abc_tile",
    "pm-tile--outline": "pm_abc_outline",
    "pm-tile--md": "pm_abc_md",
    "pm-tile--selected": "pm_abc_selected",
    "pm-tile--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = tileModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_tile pm_abc_outline pm_abc_md")
  })

  it("maps selected class", () => {
    const result = tileModuleClasses(mockClassMap, { selected: true })
    expect(result).toContain("pm_abc_selected")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-tile": "pm_abc_tile",
    }
    const result = tileModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_tile")
    expect(result).not.toContain("undefined")
  })
})
