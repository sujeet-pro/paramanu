import { describe, it, expect } from "vitest"
import { clipboardClasses, clipboardModuleClasses } from "./clipboard.classes.js"

describe("clipboardClasses", () => {
  it("returns default classes (md, not copied)", () => {
    const result = clipboardClasses()
    expect(result).toBe("pm-clipboard pm-clipboard--md")
  })

  it("applies size", () => {
    expect(clipboardClasses({ size: "sm" })).toContain("pm-clipboard--sm")
    expect(clipboardClasses({ size: "md" })).toContain("pm-clipboard--md")
    expect(clipboardClasses({ size: "lg" })).toContain("pm-clipboard--lg")
  })

  it("applies copied modifier", () => {
    expect(clipboardClasses({ copied: true })).toContain("pm-clipboard--copied")
    expect(clipboardClasses({ copied: false })).not.toContain("pm-clipboard--copied")
  })

  it("always includes base class", () => {
    expect(clipboardClasses()).toMatch(/^pm-clipboard\s/)
  })

  it("combines multiple options", () => {
    const result = clipboardClasses({ size: "lg", copied: true })
    expect(result).toBe("pm-clipboard pm-clipboard--lg pm-clipboard--copied")
  })
})

describe("clipboardModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-clipboard": "pm_abc_clipboard",
    "pm-clipboard--md": "pm_abc_md",
    "pm-clipboard--sm": "pm_abc_sm",
    "pm-clipboard--lg": "pm_abc_lg",
    "pm-clipboard--copied": "pm_abc_copied",
  }

  it("returns mapped default classes", () => {
    const result = clipboardModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_clipboard pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = clipboardModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps copied class", () => {
    const result = clipboardModuleClasses(mockClassMap, { copied: true })
    expect(result).toContain("pm_abc_copied")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-clipboard": "pm_abc_clipboard",
    }
    const result = clipboardModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_clipboard")
    expect(result).not.toContain("undefined")
  })
})
