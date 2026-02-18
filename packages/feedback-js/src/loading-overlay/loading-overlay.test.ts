import { describe, it, expect } from "vitest"
import {
  loadingOverlayClasses,
  loadingOverlayModuleClasses,
} from "./loading-overlay.classes.js"

describe("loadingOverlayClasses", () => {
  it("returns default classes (hidden, no blur)", () => {
    const result = loadingOverlayClasses()
    expect(result.root).toBe("pm-loading-overlay")
    expect(result.backdrop).toBe("pm-loading-overlay__backdrop")
    expect(result.content).toBe("pm-loading-overlay__content")
  })

  it("applies visible modifier", () => {
    expect(loadingOverlayClasses({ visible: true }).root).toContain(
      "pm-loading-overlay--visible",
    )
    expect(loadingOverlayClasses({ visible: false }).root).not.toContain(
      "pm-loading-overlay--visible",
    )
  })

  it("applies blur modifier", () => {
    expect(loadingOverlayClasses({ blur: true }).root).toContain("pm-loading-overlay--blur")
    expect(loadingOverlayClasses({ blur: false }).root).not.toContain("pm-loading-overlay--blur")
  })

  it("always includes base class in root", () => {
    expect(loadingOverlayClasses().root).toMatch(/^pm-loading-overlay/)
  })

  it("combines visible and blur", () => {
    const result = loadingOverlayClasses({ visible: true, blur: true })
    expect(result.root).toBe(
      "pm-loading-overlay pm-loading-overlay--visible pm-loading-overlay--blur",
    )
  })

  it("sub-element classes are always the same", () => {
    const result1 = loadingOverlayClasses()
    const result2 = loadingOverlayClasses({ visible: true, blur: true })
    expect(result1.backdrop).toBe(result2.backdrop)
    expect(result1.content).toBe(result2.content)
  })
})

describe("loadingOverlayModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-loading-overlay": "pm_abc_overlay",
    "pm-loading-overlay--visible": "pm_abc_visible",
    "pm-loading-overlay--blur": "pm_abc_blur",
    "pm-loading-overlay__backdrop": "pm_abc_backdrop",
    "pm-loading-overlay__content": "pm_abc_content",
  }

  it("returns mapped default classes", () => {
    const result = loadingOverlayModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_overlay")
    expect(result.backdrop).toBe("pm_abc_backdrop")
    expect(result.content).toBe("pm_abc_content")
  })

  it("maps visible modifier correctly", () => {
    const result = loadingOverlayModuleClasses(mockClassMap, { visible: true })
    expect(result.root).toContain("pm_abc_visible")
  })

  it("maps blur modifier correctly", () => {
    const result = loadingOverlayModuleClasses(mockClassMap, { blur: true })
    expect(result.root).toContain("pm_abc_blur")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-loading-overlay": "pm_abc_overlay",
    }
    const result = loadingOverlayModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_overlay")
    expect(result.root).not.toContain("undefined")
    expect(result.backdrop).toBe("")
    expect(result.content).toBe("")
  })
})
