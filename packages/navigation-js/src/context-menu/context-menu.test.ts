import { describe, it, expect } from "vitest"
import { contextMenuClasses, contextMenuModuleClasses } from "./context-menu.classes.js"

describe("contextMenuClasses", () => {
  it("returns default classes (md, closed)", () => {
    const result = contextMenuClasses()
    expect(result).toBe("pm-context-menu pm-context-menu--md")
  })

  it("applies size", () => {
    expect(contextMenuClasses({ size: "sm" })).toContain("pm-context-menu--sm")
    expect(contextMenuClasses({ size: "lg" })).toContain("pm-context-menu--lg")
  })

  it("applies open modifier", () => {
    expect(contextMenuClasses({ open: true })).toContain("pm-context-menu--open")
    expect(contextMenuClasses({ open: false })).not.toContain("pm-context-menu--open")
  })

  it("always includes base class", () => {
    expect(contextMenuClasses()).toMatch(/^pm-context-menu\s/)
  })

  it("combines size and open", () => {
    const result = contextMenuClasses({ size: "lg", open: true })
    expect(result).toBe("pm-context-menu pm-context-menu--lg pm-context-menu--open")
  })
})

describe("contextMenuModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-context-menu": "pm_abc_context",
    "pm-context-menu--md": "pm_abc_md",
    "pm-context-menu--sm": "pm_abc_sm",
    "pm-context-menu--lg": "pm_abc_lg",
    "pm-context-menu--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = contextMenuModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_context pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = contextMenuModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps open class", () => {
    const result = contextMenuModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-context-menu": "pm_abc_context" }
    const result = contextMenuModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_context")
    expect(result).not.toContain("undefined")
  })
})
