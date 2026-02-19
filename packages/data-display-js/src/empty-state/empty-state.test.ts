import { describe, it, expect } from "vitest"
import { emptyClasses, emptyModuleClasses } from "./empty-state.classes.js"

describe("emptyClasses", () => {
  it("returns default classes (md, not bordered)", () => {
    const result = emptyClasses()
    expect(result.root).toBe("pm-empty pm-empty--md")
    expect(result.icon).toBe("pm-empty__icon")
    expect(result.heading).toBe("pm-empty__heading")
    expect(result.description).toBe("pm-empty__description")
    expect(result.actions).toBe("pm-empty__actions")
  })

  it("applies size", () => {
    expect(emptyClasses({ size: "sm" }).root).toContain("pm-empty--sm")
    expect(emptyClasses({ size: "md" }).root).toContain("pm-empty--md")
    expect(emptyClasses({ size: "lg" }).root).toContain("pm-empty--lg")
  })

  it("applies bordered modifier", () => {
    expect(emptyClasses({ bordered: true }).root).toContain("pm-empty--bordered")
    expect(emptyClasses({ bordered: false }).root).not.toContain("pm-empty--bordered")
  })

  it("always includes base class in root", () => {
    expect(emptyClasses().root).toMatch(/^pm-empty\s/)
  })

  it("combines multiple options", () => {
    const result = emptyClasses({ size: "lg", bordered: true })
    expect(result.root).toBe("pm-empty pm-empty--lg pm-empty--bordered")
  })
})

describe("emptyModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-empty": "pm_abc_empty_state",
    "pm-empty--md": "pm_abc_md",
    "pm-empty--lg": "pm_abc_lg",
    "pm-empty--bordered": "pm_abc_bordered",
    "pm-empty__icon": "pm_abc_icon",
    "pm-empty__heading": "pm_abc_heading",
    "pm-empty__description": "pm_abc_description",
    "pm-empty__actions": "pm_abc_actions",
  }

  it("returns mapped default classes", () => {
    const result = emptyModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_empty_state pm_abc_md")
    expect(result.icon).toBe("pm_abc_icon")
    expect(result.heading).toBe("pm_abc_heading")
    expect(result.description).toBe("pm_abc_description")
    expect(result.actions).toBe("pm_abc_actions")
  })

  it("maps size classes correctly", () => {
    const result = emptyModuleClasses(mockClassMap, { size: "lg" })
    expect(result.root).toContain("pm_abc_lg")
  })

  it("maps bordered class", () => {
    const result = emptyModuleClasses(mockClassMap, { bordered: true })
    expect(result.root).toContain("pm_abc_bordered")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-empty": "pm_abc_empty_state",
    }
    const result = emptyModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_empty_state")
    expect(result.root).not.toContain("undefined")
    expect(result.icon).toBe("")
  })
})
