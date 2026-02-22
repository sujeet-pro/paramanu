import { describe, it, expect } from "vitest"
import { containerClasses, containerModuleClasses } from "./container.classes.js"

describe("containerClasses", () => {
  it("returns default classes (lg)", () => {
    const result = containerClasses()
    expect(result).toBe("pm-container pm-container--lg")
  })

  it("applies size", () => {
    expect(containerClasses({ size: "sm" })).toContain("pm-container--sm")
    expect(containerClasses({ size: "lg" })).toContain("pm-container--lg")
    expect(containerClasses({ size: "xl" })).toContain("pm-container--xl")
    expect(containerClasses({ size: "full" })).toContain("pm-container--full")
  })

  it("always includes base class", () => {
    expect(containerClasses()).toMatch(/^pm-container\s/)
  })

  it("combines base class with size", () => {
    const result = containerClasses({ size: "lg" })
    expect(result).toBe("pm-container pm-container--lg")
  })
})

describe("containerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-container": "pm_abc_container",
    "pm-container--sm": "pm_abc_sm",
    "pm-container--md": "pm_abc_md",
    "pm-container--lg": "pm_abc_lg",
    "pm-container--xl": "pm_abc_xl",
    "pm-container--full": "pm_abc_full",
  }

  it("returns mapped default classes", () => {
    const result = containerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_container pm_abc_lg")
  })

  it("maps size classes correctly", () => {
    const result = containerModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-container": "pm_abc_container",
    }
    const result = containerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_container")
    expect(result).not.toContain("undefined")
  })
})
