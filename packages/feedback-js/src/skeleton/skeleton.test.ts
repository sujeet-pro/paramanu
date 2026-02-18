import { describe, it, expect } from "vitest"
import { skeletonClasses, skeletonModuleClasses } from "./skeleton.classes.js"

describe("skeletonClasses", () => {
  it("returns default classes (text)", () => {
    const result = skeletonClasses()
    expect(result).toBe("pm-skeleton pm-skeleton--text")
  })

  it("applies variant", () => {
    expect(skeletonClasses({ variant: "text" })).toContain("pm-skeleton--text")
    expect(skeletonClasses({ variant: "circular" })).toContain("pm-skeleton--circular")
    expect(skeletonClasses({ variant: "rectangular" })).toContain("pm-skeleton--rectangular")
  })

  it("applies size only for circular variant", () => {
    expect(skeletonClasses({ variant: "circular", size: "sm" })).toContain("pm-skeleton--sm")
    expect(skeletonClasses({ variant: "circular", size: "lg" })).toContain("pm-skeleton--lg")
  })

  it("does not apply size for text variant", () => {
    const result = skeletonClasses({ variant: "text", size: "sm" })
    expect(result).not.toContain("pm-skeleton--sm")
  })

  it("does not apply size for rectangular variant", () => {
    const result = skeletonClasses({ variant: "rectangular", size: "lg" })
    expect(result).not.toContain("pm-skeleton--lg")
  })

  it("always includes base class", () => {
    expect(skeletonClasses()).toMatch(/^pm-skeleton\s/)
  })

  it("combines circular variant with size", () => {
    const result = skeletonClasses({ variant: "circular", size: "lg" })
    expect(result).toBe("pm-skeleton pm-skeleton--circular pm-skeleton--lg")
  })
})

describe("skeletonModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-skeleton": "pm_abc_skeleton",
    "pm-skeleton--text": "pm_abc_text",
    "pm-skeleton--circular": "pm_abc_circular",
    "pm-skeleton--rectangular": "pm_abc_rectangular",
    "pm-skeleton--sm": "pm_abc_sm",
    "pm-skeleton--md": "pm_abc_md",
    "pm-skeleton--lg": "pm_abc_lg",
  }

  it("returns mapped default classes", () => {
    const result = skeletonModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_skeleton pm_abc_text")
  })

  it("maps variant classes correctly", () => {
    const result = skeletonModuleClasses(mockClassMap, { variant: "circular" })
    expect(result).toContain("pm_abc_circular")
  })

  it("includes size for circular variant", () => {
    const result = skeletonModuleClasses(mockClassMap, { variant: "circular", size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-skeleton": "pm_abc_skeleton",
    }
    const result = skeletonModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_skeleton")
    expect(result).not.toContain("undefined")
  })
})
