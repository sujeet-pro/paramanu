import { describe, it, expect } from "vitest"
import {
  sheetClasses,
  sheetModuleClasses,
  sheetHeaderClasses,
  sheetHeaderModuleClasses,
  sheetBodyClasses,
  sheetBodyModuleClasses,
  sheetHandleClasses,
  sheetHandleModuleClasses,
} from "./sheet.classes.js"

describe("sheetClasses", () => {
  it("returns default classes (md)", () => {
    const result = sheetClasses()
    expect(result).toBe("pm-sheet pm-sheet--md")
  })

  it("applies size", () => {
    expect(sheetClasses({ size: "sm" })).toContain("pm-sheet--sm")
    expect(sheetClasses({ size: "md" })).toContain("pm-sheet--md")
    expect(sheetClasses({ size: "lg" })).toContain("pm-sheet--lg")
    expect(sheetClasses({ size: "full" })).toContain("pm-sheet--full")
  })

  it("always includes base class", () => {
    expect(sheetClasses()).toMatch(/^pm-sheet\s/)
  })

  it("combines base and size", () => {
    const result = sheetClasses({ size: "lg" })
    expect(result).toBe("pm-sheet pm-sheet--lg")
  })
})

describe("sheetModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-sheet": "pm_abc_sheet",
    "pm-sheet--sm": "pm_abc_sm",
    "pm-sheet--md": "pm_abc_md",
    "pm-sheet--lg": "pm_abc_lg",
    "pm-sheet--full": "pm_abc_full",
  }

  it("returns mapped default classes", () => {
    const result = sheetModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_sheet pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = sheetModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-sheet": "pm_abc_sheet",
    }
    const result = sheetModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_sheet")
    expect(result).not.toContain("undefined")
  })
})

describe("sheetHeaderClasses", () => {
  it("returns header class", () => {
    expect(sheetHeaderClasses()).toBe("pm-sheet__header")
  })
})

describe("sheetHeaderModuleClasses", () => {
  it("returns mapped header class", () => {
    const classMap = { "pm-sheet__header": "pm_abc_header" }
    expect(sheetHeaderModuleClasses(classMap)).toBe("pm_abc_header")
  })

  it("returns empty string for missing entry", () => {
    expect(sheetHeaderModuleClasses({})).toBe("")
  })
})

describe("sheetBodyClasses", () => {
  it("returns body class", () => {
    expect(sheetBodyClasses()).toBe("pm-sheet__body")
  })
})

describe("sheetBodyModuleClasses", () => {
  it("returns mapped body class", () => {
    const classMap = { "pm-sheet__body": "pm_abc_body" }
    expect(sheetBodyModuleClasses(classMap)).toBe("pm_abc_body")
  })

  it("returns empty string for missing entry", () => {
    expect(sheetBodyModuleClasses({})).toBe("")
  })
})

describe("sheetHandleClasses", () => {
  it("returns handle class", () => {
    expect(sheetHandleClasses()).toBe("pm-sheet__handle")
  })
})

describe("sheetHandleModuleClasses", () => {
  it("returns mapped handle class", () => {
    const classMap = { "pm-sheet__handle": "pm_abc_handle" }
    expect(sheetHandleModuleClasses(classMap)).toBe("pm_abc_handle")
  })

  it("returns empty string for missing entry", () => {
    expect(sheetHandleModuleClasses({})).toBe("")
  })
})
