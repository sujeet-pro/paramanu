import { describe, it, expect } from "vitest"
import {
  inlineDialogClasses,
  inlineDialogModuleClasses,
  inlineDialogBodyClasses,
  inlineDialogBodyModuleClasses,
} from "./inline-dialog.classes.js"

describe("inlineDialogClasses", () => {
  it("returns default classes", () => {
    const result = inlineDialogClasses()
    expect(result).toBe("pm-inline-dialog")
  })

  it("applies visible modifier", () => {
    expect(inlineDialogClasses({ visible: true })).toContain("pm-inline-dialog--visible")
    expect(inlineDialogClasses({ visible: false })).not.toContain("pm-inline-dialog--visible")
  })

  it("always includes base class", () => {
    expect(inlineDialogClasses()).toBe("pm-inline-dialog")
    expect(inlineDialogClasses({ visible: true })).toMatch(/^pm-inline-dialog\s/)
  })

  it("combines options correctly", () => {
    const result = inlineDialogClasses({ visible: true })
    expect(result).toBe("pm-inline-dialog pm-inline-dialog--visible")
  })
})

describe("inlineDialogModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-inline-dialog": "pm_abc_inlineDialog",
    "pm-inline-dialog--visible": "pm_abc_visible",
  }

  it("returns mapped default classes", () => {
    const result = inlineDialogModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_inlineDialog")
  })

  it("maps visible class", () => {
    const result = inlineDialogModuleClasses(mockClassMap, { visible: true })
    expect(result).toContain("pm_abc_visible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-inline-dialog": "pm_abc_inlineDialog",
    }
    const result = inlineDialogModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_inlineDialog")
    expect(result).not.toContain("undefined")
  })
})

describe("inlineDialogBodyClasses", () => {
  it("returns body class", () => {
    expect(inlineDialogBodyClasses()).toBe("pm-inline-dialog__body")
  })
})

describe("inlineDialogBodyModuleClasses", () => {
  it("returns mapped body class", () => {
    const classMap = { "pm-inline-dialog__body": "pm_abc_body" }
    expect(inlineDialogBodyModuleClasses(classMap)).toBe("pm_abc_body")
  })

  it("handles missing class map entry", () => {
    expect(inlineDialogBodyModuleClasses({})).toBe("")
  })
})
