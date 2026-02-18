import { describe, it, expect } from "vitest"
import {
  dialogClasses,
  dialogModuleClasses,
  dialogHeaderClasses,
  dialogHeaderModuleClasses,
  dialogBodyClasses,
  dialogBodyModuleClasses,
  dialogFooterClasses,
  dialogFooterModuleClasses,
} from "./dialog.classes.js"

describe("dialogClasses", () => {
  it("returns default classes (md)", () => {
    const result = dialogClasses()
    expect(result).toBe("pm-dialog pm-dialog--md")
  })

  it("applies size", () => {
    expect(dialogClasses({ size: "sm" })).toContain("pm-dialog--sm")
    expect(dialogClasses({ size: "lg" })).toContain("pm-dialog--lg")
    expect(dialogClasses({ size: "xl" })).toContain("pm-dialog--xl")
    expect(dialogClasses({ size: "full" })).toContain("pm-dialog--full")
  })

  it("applies centered modifier", () => {
    expect(dialogClasses({ centered: true })).toContain("pm-dialog--centered")
    expect(dialogClasses({ centered: false })).not.toContain("pm-dialog--centered")
  })

  it("always includes base class", () => {
    expect(dialogClasses()).toMatch(/^pm-dialog\s/)
  })

  it("combines multiple options", () => {
    const result = dialogClasses({ size: "lg", centered: true })
    expect(result).toBe("pm-dialog pm-dialog--lg pm-dialog--centered")
  })
})

describe("dialogModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-dialog": "pm_abc_dialog",
    "pm-dialog--sm": "pm_abc_sm",
    "pm-dialog--md": "pm_abc_md",
    "pm-dialog--lg": "pm_abc_lg",
    "pm-dialog--centered": "pm_abc_centered",
  }

  it("returns mapped default classes", () => {
    const result = dialogModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_dialog pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = dialogModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps centered class", () => {
    const result = dialogModuleClasses(mockClassMap, { centered: true })
    expect(result).toContain("pm_abc_centered")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-dialog": "pm_abc_dialog",
    }
    const result = dialogModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_dialog")
    expect(result).not.toContain("undefined")
  })
})

describe("dialogHeaderClasses", () => {
  it("returns header class", () => {
    expect(dialogHeaderClasses()).toBe("pm-dialog__header")
  })
})

describe("dialogHeaderModuleClasses", () => {
  it("returns mapped header class", () => {
    const classMap = { "pm-dialog__header": "pm_abc_header" }
    expect(dialogHeaderModuleClasses(classMap)).toBe("pm_abc_header")
  })

  it("handles missing class map entry", () => {
    expect(dialogHeaderModuleClasses({})).toBe("")
  })
})

describe("dialogBodyClasses", () => {
  it("returns body class without scroll behavior", () => {
    expect(dialogBodyClasses()).toBe("pm-dialog__body")
  })

  it("applies scroll-inside modifier", () => {
    const result = dialogBodyClasses({ scrollBehavior: "inside" })
    expect(result).toBe("pm-dialog__body pm-dialog__body--scroll-inside")
  })

  it("applies scroll-outside modifier", () => {
    const result = dialogBodyClasses({ scrollBehavior: "outside" })
    expect(result).toBe("pm-dialog__body pm-dialog__body--scroll-outside")
  })
})

describe("dialogBodyModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-dialog__body": "pm_abc_body",
    "pm-dialog__body--scroll-inside": "pm_abc_scrollInside",
    "pm-dialog__body--scroll-outside": "pm_abc_scrollOutside",
  }

  it("returns mapped body class", () => {
    expect(dialogBodyModuleClasses(mockClassMap)).toBe("pm_abc_body")
  })

  it("maps scroll-inside class", () => {
    const result = dialogBodyModuleClasses(mockClassMap, { scrollBehavior: "inside" })
    expect(result).toContain("pm_abc_scrollInside")
  })

  it("handles missing entries", () => {
    expect(dialogBodyModuleClasses({})).toBe("")
  })
})

describe("dialogFooterClasses", () => {
  it("returns footer class", () => {
    expect(dialogFooterClasses()).toBe("pm-dialog__footer")
  })
})

describe("dialogFooterModuleClasses", () => {
  it("returns mapped footer class", () => {
    const classMap = { "pm-dialog__footer": "pm_abc_footer" }
    expect(dialogFooterModuleClasses(classMap)).toBe("pm_abc_footer")
  })

  it("handles missing class map entry", () => {
    expect(dialogFooterModuleClasses({})).toBe("")
  })
})
