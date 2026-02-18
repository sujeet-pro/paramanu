import { describe, it, expect } from "vitest"
import { backdropClasses, backdropModuleClasses } from "./backdrop.classes.js"

describe("backdropClasses", () => {
  it("returns default classes", () => {
    const result = backdropClasses()
    expect(result).toBe("pm-backdrop pm-backdrop--default")
  })

  it("applies variant", () => {
    expect(backdropClasses({ variant: "transparent" })).toContain("pm-backdrop--transparent")
    expect(backdropClasses({ variant: "default" })).toContain("pm-backdrop--default")
  })

  it("applies visible modifier", () => {
    expect(backdropClasses({ visible: true })).toContain("pm-backdrop--visible")
    expect(backdropClasses({ visible: false })).not.toContain("pm-backdrop--visible")
  })

  it("always includes base class", () => {
    expect(backdropClasses()).toMatch(/^pm-backdrop\s/)
  })

  it("combines multiple options", () => {
    const result = backdropClasses({ variant: "transparent", visible: true })
    expect(result).toBe("pm-backdrop pm-backdrop--transparent pm-backdrop--visible")
  })
})

describe("backdropModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-backdrop": "pm_abc_backdrop",
    "pm-backdrop--default": "pm_abc_default",
    "pm-backdrop--transparent": "pm_abc_transparent",
    "pm-backdrop--visible": "pm_abc_visible",
  }

  it("returns mapped default classes", () => {
    const result = backdropModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_backdrop pm_abc_default")
  })

  it("maps variant classes correctly", () => {
    const result = backdropModuleClasses(mockClassMap, { variant: "transparent" })
    expect(result).toContain("pm_abc_transparent")
  })

  it("maps visible class", () => {
    const result = backdropModuleClasses(mockClassMap, { visible: true })
    expect(result).toContain("pm_abc_visible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-backdrop": "pm_abc_backdrop",
    }
    const result = backdropModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_backdrop")
    expect(result).not.toContain("undefined")
  })
})
