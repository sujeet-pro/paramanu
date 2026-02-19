import { describe, it, expect } from "vitest"
import {
  inlineDlgClasses,
  inlineDlgModuleClasses,
  inlineDialogBodyClasses,
  inlineDialogBodyModuleClasses,
} from "./inline-dialog.classes.js"

describe("inlineDlgClasses", () => {
  it("returns default classes", () => {
    const result = inlineDlgClasses()
    expect(result).toBe("pm-inline-dlg")
  })

  it("applies visible modifier", () => {
    expect(inlineDlgClasses({ visible: true })).toContain("pm-inline-dlg--visible")
    expect(inlineDlgClasses({ visible: false })).not.toContain("pm-inline-dlg--visible")
  })

  it("always includes base class", () => {
    expect(inlineDlgClasses()).toBe("pm-inline-dlg")
    expect(inlineDlgClasses({ visible: true })).toMatch(/^pm-inline-dlg\s/)
  })

  it("combines options correctly", () => {
    const result = inlineDlgClasses({ visible: true })
    expect(result).toBe("pm-inline-dlg pm-inline-dlg--visible")
  })
})

describe("inlineDlgModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-inline-dlg": "pm_abc_inlineDialog",
    "pm-inline-dlg--visible": "pm_abc_visible",
  }

  it("returns mapped default classes", () => {
    const result = inlineDlgModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_inlineDialog")
  })

  it("maps visible class", () => {
    const result = inlineDlgModuleClasses(mockClassMap, { visible: true })
    expect(result).toContain("pm_abc_visible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-inline-dlg": "pm_abc_inlineDialog",
    }
    const result = inlineDlgModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_inlineDialog")
    expect(result).not.toContain("undefined")
  })
})

describe("inlineDialogBodyClasses", () => {
  it("returns body class", () => {
    expect(inlineDialogBodyClasses()).toBe("pm-inline-dlg__body")
  })
})

describe("inlineDialogBodyModuleClasses", () => {
  it("returns mapped body class", () => {
    const classMap = { "pm-inline-dlg__body": "pm_abc_body" }
    expect(inlineDialogBodyModuleClasses(classMap)).toBe("pm_abc_body")
  })

  it("handles missing class map entry", () => {
    expect(inlineDialogBodyModuleClasses({})).toBe("")
  })
})
