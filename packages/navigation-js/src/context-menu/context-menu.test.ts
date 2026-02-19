import { describe, it, expect } from "vitest"
import { ctxMenuClasses, ctxMenuModuleClasses } from "./context-menu.classes.js"

describe("ctxMenuClasses", () => {
  it("returns default classes (md, closed)", () => {
    const result = ctxMenuClasses()
    expect(result).toBe("pm-ctx-menu pm-ctx-menu--md")
  })

  it("applies size", () => {
    expect(ctxMenuClasses({ size: "sm" })).toContain("pm-ctx-menu--sm")
    expect(ctxMenuClasses({ size: "lg" })).toContain("pm-ctx-menu--lg")
  })

  it("applies open modifier", () => {
    expect(ctxMenuClasses({ open: true })).toContain("pm-ctx-menu--open")
    expect(ctxMenuClasses({ open: false })).not.toContain("pm-ctx-menu--open")
  })

  it("always includes base class", () => {
    expect(ctxMenuClasses()).toMatch(/^pm-ctx-menu\s/)
  })

  it("combines size and open", () => {
    const result = ctxMenuClasses({ size: "lg", open: true })
    expect(result).toBe("pm-ctx-menu pm-ctx-menu--lg pm-ctx-menu--open")
  })
})

describe("ctxMenuModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-ctx-menu": "pm_abc_context",
    "pm-ctx-menu--md": "pm_abc_md",
    "pm-ctx-menu--sm": "pm_abc_sm",
    "pm-ctx-menu--lg": "pm_abc_lg",
    "pm-ctx-menu--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = ctxMenuModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_context pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = ctxMenuModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps open class", () => {
    const result = ctxMenuModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-ctx-menu": "pm_abc_context" }
    const result = ctxMenuModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_context")
    expect(result).not.toContain("undefined")
  })
})
