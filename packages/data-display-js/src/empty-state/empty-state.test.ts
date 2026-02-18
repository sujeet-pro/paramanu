import { describe, it, expect } from "vitest"
import { emptyStateClasses, emptyStateModuleClasses } from "./empty-state.classes.js"

describe("emptyStateClasses", () => {
  it("returns default classes (md, not bordered)", () => {
    const result = emptyStateClasses()
    expect(result.root).toBe("pm-empty-state pm-empty-state--md")
    expect(result.icon).toBe("pm-empty-state__icon")
    expect(result.heading).toBe("pm-empty-state__heading")
    expect(result.description).toBe("pm-empty-state__description")
    expect(result.actions).toBe("pm-empty-state__actions")
  })

  it("applies size", () => {
    expect(emptyStateClasses({ size: "sm" }).root).toContain("pm-empty-state--sm")
    expect(emptyStateClasses({ size: "md" }).root).toContain("pm-empty-state--md")
    expect(emptyStateClasses({ size: "lg" }).root).toContain("pm-empty-state--lg")
  })

  it("applies bordered modifier", () => {
    expect(emptyStateClasses({ bordered: true }).root).toContain("pm-empty-state--bordered")
    expect(emptyStateClasses({ bordered: false }).root).not.toContain("pm-empty-state--bordered")
  })

  it("always includes base class in root", () => {
    expect(emptyStateClasses().root).toMatch(/^pm-empty-state\s/)
  })

  it("combines multiple options", () => {
    const result = emptyStateClasses({ size: "lg", bordered: true })
    expect(result.root).toBe("pm-empty-state pm-empty-state--lg pm-empty-state--bordered")
  })
})

describe("emptyStateModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-empty-state": "pm_abc_empty_state",
    "pm-empty-state--md": "pm_abc_md",
    "pm-empty-state--lg": "pm_abc_lg",
    "pm-empty-state--bordered": "pm_abc_bordered",
    "pm-empty-state__icon": "pm_abc_icon",
    "pm-empty-state__heading": "pm_abc_heading",
    "pm-empty-state__description": "pm_abc_description",
    "pm-empty-state__actions": "pm_abc_actions",
  }

  it("returns mapped default classes", () => {
    const result = emptyStateModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_empty_state pm_abc_md")
    expect(result.icon).toBe("pm_abc_icon")
    expect(result.heading).toBe("pm_abc_heading")
    expect(result.description).toBe("pm_abc_description")
    expect(result.actions).toBe("pm_abc_actions")
  })

  it("maps size classes correctly", () => {
    const result = emptyStateModuleClasses(mockClassMap, { size: "lg" })
    expect(result.root).toContain("pm_abc_lg")
  })

  it("maps bordered class", () => {
    const result = emptyStateModuleClasses(mockClassMap, { bordered: true })
    expect(result.root).toContain("pm_abc_bordered")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-empty-state": "pm_abc_empty_state",
    }
    const result = emptyStateModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_empty_state")
    expect(result.root).not.toContain("undefined")
    expect(result.icon).toBe("")
  })
})
