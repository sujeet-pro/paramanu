import { describe, it, expect } from "vitest"
import { fabClasses, fabModuleClasses } from "./fab.classes.js"

describe("fabClasses", () => {
  it("returns default classes (md, bottom-right)", () => {
    const result = fabClasses()
    expect(result).toBe("pm-fab pm-fab--md pm-fab--bottom-right")
  })

  it("applies size", () => {
    expect(fabClasses({ size: "sm" })).toContain("pm-fab--sm")
    expect(fabClasses({ size: "md" })).toContain("pm-fab--md")
    expect(fabClasses({ size: "lg" })).toContain("pm-fab--lg")
  })

  it("applies position", () => {
    expect(fabClasses({ position: "bottom-right" })).toContain("pm-fab--bottom-right")
    expect(fabClasses({ position: "bottom-left" })).toContain("pm-fab--bottom-left")
    expect(fabClasses({ position: "bottom-center" })).toContain("pm-fab--bottom-center")
  })

  it("applies extended modifier", () => {
    expect(fabClasses({ extended: true })).toContain("pm-fab--extended")
    expect(fabClasses({ extended: false })).not.toContain("pm-fab--extended")
  })

  it("applies disabled modifier", () => {
    expect(fabClasses({ disabled: true })).toContain("pm-fab--disabled")
    expect(fabClasses({ disabled: false })).not.toContain("pm-fab--disabled")
  })

  it("always includes base class", () => {
    expect(fabClasses()).toMatch(/^pm-fab\s/)
  })

  it("combines multiple options", () => {
    const result = fabClasses({
      size: "lg",
      position: "bottom-left",
      extended: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-fab pm-fab--lg pm-fab--bottom-left pm-fab--extended pm-fab--disabled",
    )
  })
})

describe("fabModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-fab": "pm_abc_fab",
    "pm-fab--sm": "pm_abc_sm",
    "pm-fab--md": "pm_abc_md",
    "pm-fab--lg": "pm_abc_lg",
    "pm-fab--bottom-right": "pm_abc_bottomRight",
    "pm-fab--bottom-left": "pm_abc_bottomLeft",
    "pm-fab--bottom-center": "pm_abc_bottomCenter",
    "pm-fab--extended": "pm_abc_extended",
    "pm-fab--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = fabModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_fab pm_abc_md pm_abc_bottomRight")
  })

  it("maps size classes correctly", () => {
    const result = fabModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps position classes correctly", () => {
    const result = fabModuleClasses(mockClassMap, { position: "bottom-left" })
    expect(result).toContain("pm_abc_bottomLeft")
  })

  it("maps extended class", () => {
    const result = fabModuleClasses(mockClassMap, { extended: true })
    expect(result).toContain("pm_abc_extended")
  })

  it("maps disabled class", () => {
    const result = fabModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-fab": "pm_abc_fab",
    }
    const result = fabModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_fab")
    expect(result).not.toContain("undefined")
  })
})
