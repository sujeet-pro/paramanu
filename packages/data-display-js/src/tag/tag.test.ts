import { describe, it, expect } from "vitest"
import { tagClasses, tagModuleClasses } from "./tag.classes.js"

describe("tagClasses", () => {
  it("returns default classes (filled, md, primary)", () => {
    const result = tagClasses()
    expect(result.root).toBe("pm-tag pm-tag--filled pm-tag--md pm-tag--primary")
    expect(result.remove).toBe("pm-tag__remove")
  })

  it("applies variant", () => {
    expect(tagClasses({ variant: "outline" }).root).toContain("pm-tag--outline")
    expect(tagClasses({ variant: "subtle" }).root).toContain("pm-tag--subtle")
  })

  it("applies size", () => {
    expect(tagClasses({ size: "sm" }).root).toContain("pm-tag--sm")
    expect(tagClasses({ size: "lg" }).root).toContain("pm-tag--lg")
  })

  it("applies color", () => {
    expect(tagClasses({ color: "danger" }).root).toContain("pm-tag--danger")
    expect(tagClasses({ color: "success" }).root).toContain("pm-tag--success")
    expect(tagClasses({ color: "neutral" }).root).toContain("pm-tag--neutral")
  })

  it("applies removable modifier", () => {
    expect(tagClasses({ removable: true }).root).toContain("pm-tag--removable")
    expect(tagClasses({ removable: false }).root).not.toContain("pm-tag--removable")
  })

  it("applies interactive modifier", () => {
    expect(tagClasses({ interactive: true }).root).toContain("pm-tag--interactive")
    expect(tagClasses({ interactive: false }).root).not.toContain("pm-tag--interactive")
  })

  it("applies disabled modifier", () => {
    expect(tagClasses({ disabled: true }).root).toContain("pm-tag--disabled")
    expect(tagClasses({ disabled: false }).root).not.toContain("pm-tag--disabled")
  })

  it("combines multiple options", () => {
    const result = tagClasses({
      variant: "outline",
      size: "lg",
      color: "danger",
      removable: true,
      interactive: true,
      disabled: true,
    })
    expect(result.root).toBe(
      "pm-tag pm-tag--outline pm-tag--lg pm-tag--danger pm-tag--removable pm-tag--interactive pm-tag--disabled",
    )
  })
})

describe("tagModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tag": "pm_abc_tag",
    "pm-tag--filled": "pm_abc_filled",
    "pm-tag--md": "pm_abc_md",
    "pm-tag--primary": "pm_abc_primary",
    "pm-tag--outline": "pm_abc_outline",
    "pm-tag--removable": "pm_abc_removable",
    "pm-tag--disabled": "pm_abc_disabled",
    "pm-tag__remove": "pm_abc_remove",
  }

  it("returns mapped default classes", () => {
    const result = tagModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_tag pm_abc_filled pm_abc_md pm_abc_primary")
  })

  it("maps variant classes correctly", () => {
    const result = tagModuleClasses(mockClassMap, { variant: "outline" })
    expect(result.root).toContain("pm_abc_outline")
  })

  it("maps remove sub-part", () => {
    const result = tagModuleClasses(mockClassMap)
    expect(result.remove).toBe("pm_abc_remove")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-tag": "pm_abc_tag",
    }
    const result = tagModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_tag")
    expect(result.root).not.toContain("undefined")
  })
})
