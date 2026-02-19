import { describe, it, expect } from "vitest"
import {
  loadingClasses,
  loadingModuleClasses,
} from "./loading-overlay.classes.js"

describe("loadingClasses", () => {
  it("returns default classes (hidden, no blur)", () => {
    const result = loadingClasses()
    expect(result.root).toBe("pm-loading")
    expect(result.backdrop).toBe("pm-loading__backdrop")
    expect(result.content).toBe("pm-loading__content")
  })

  it("applies visible modifier", () => {
    expect(loadingClasses({ visible: true }).root).toContain(
      "pm-loading--visible",
    )
    expect(loadingClasses({ visible: false }).root).not.toContain(
      "pm-loading--visible",
    )
  })

  it("applies blur modifier", () => {
    expect(loadingClasses({ blur: true }).root).toContain("pm-loading--blur")
    expect(loadingClasses({ blur: false }).root).not.toContain("pm-loading--blur")
  })

  it("always includes base class in root", () => {
    expect(loadingClasses().root).toMatch(/^pm-loading/)
  })

  it("combines visible and blur", () => {
    const result = loadingClasses({ visible: true, blur: true })
    expect(result.root).toBe(
      "pm-loading pm-loading--visible pm-loading--blur",
    )
  })

  it("sub-element classes are always the same", () => {
    const result1 = loadingClasses()
    const result2 = loadingClasses({ visible: true, blur: true })
    expect(result1.backdrop).toBe(result2.backdrop)
    expect(result1.content).toBe(result2.content)
  })
})

describe("loadingModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-loading": "pm_abc_overlay",
    "pm-loading--visible": "pm_abc_visible",
    "pm-loading--blur": "pm_abc_blur",
    "pm-loading__backdrop": "pm_abc_backdrop",
    "pm-loading__content": "pm_abc_content",
  }

  it("returns mapped default classes", () => {
    const result = loadingModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_overlay")
    expect(result.backdrop).toBe("pm_abc_backdrop")
    expect(result.content).toBe("pm_abc_content")
  })

  it("maps visible modifier correctly", () => {
    const result = loadingModuleClasses(mockClassMap, { visible: true })
    expect(result.root).toContain("pm_abc_visible")
  })

  it("maps blur modifier correctly", () => {
    const result = loadingModuleClasses(mockClassMap, { blur: true })
    expect(result.root).toContain("pm_abc_blur")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-loading": "pm_abc_overlay",
    }
    const result = loadingModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_overlay")
    expect(result.root).not.toContain("undefined")
    expect(result.backdrop).toBe("")
    expect(result.content).toBe("")
  })
})
