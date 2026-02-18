import { describe, it, expect } from "vitest"
import { blockquoteClasses, blockquoteModuleClasses } from "./blockquote.classes.js"

describe("blockquoteClasses", () => {
  it("returns default classes (default variant, md size)", () => {
    expect(blockquoteClasses()).toBe("pm-blockquote pm-blockquote--default pm-blockquote--md")
  })

  it("applies variant", () => {
    expect(blockquoteClasses({ variant: "accent" })).toContain("pm-blockquote--accent")
    expect(blockquoteClasses({ variant: "default" })).toContain("pm-blockquote--default")
  })

  it("applies size", () => {
    expect(blockquoteClasses({ size: "sm" })).toContain("pm-blockquote--sm")
    expect(blockquoteClasses({ size: "lg" })).toContain("pm-blockquote--lg")
  })

  it("always includes base class", () => {
    expect(blockquoteClasses()).toMatch(/^pm-blockquote\s/)
  })

  it("combines multiple options", () => {
    const result = blockquoteClasses({ variant: "accent", size: "lg" })
    expect(result).toBe("pm-blockquote pm-blockquote--accent pm-blockquote--lg")
  })
})

describe("blockquoteModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-blockquote": "pm_abc_blockquote",
    "pm-blockquote--default": "pm_abc_default",
    "pm-blockquote--accent": "pm_abc_accent",
    "pm-blockquote--md": "pm_abc_md",
    "pm-blockquote--lg": "pm_abc_lg",
  }

  it("returns mapped default classes", () => {
    const result = blockquoteModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_blockquote pm_abc_default pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = blockquoteModuleClasses(mockClassMap, { variant: "accent" })
    expect(result).toContain("pm_abc_accent")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-blockquote": "pm_abc_blockquote",
    }
    const result = blockquoteModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_blockquote")
    expect(result).not.toContain("undefined")
  })
})
