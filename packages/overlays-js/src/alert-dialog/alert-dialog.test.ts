import { describe, it, expect } from "vitest"
import {
  alertDialogClasses,
  alertDialogModuleClasses,
  alertDialogHeaderClasses,
  alertDialogHeaderModuleClasses,
  alertDialogBodyClasses,
  alertDialogBodyModuleClasses,
  alertDialogFooterClasses,
  alertDialogFooterModuleClasses,
} from "./alert-dialog.classes.js"

describe("alertDialogClasses", () => {
  it("returns default classes (info)", () => {
    const result = alertDialogClasses()
    expect(result).toBe("pm-alert-dialog pm-alert-dialog--info")
  })

  it("applies variant", () => {
    expect(alertDialogClasses({ variant: "info" })).toContain("pm-alert-dialog--info")
    expect(alertDialogClasses({ variant: "danger" })).toContain("pm-alert-dialog--danger")
    expect(alertDialogClasses({ variant: "warning" })).toContain("pm-alert-dialog--warning")
  })

  it("always includes base class", () => {
    expect(alertDialogClasses()).toMatch(/^pm-alert-dialog\s/)
  })
})

describe("alertDialogModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-alert-dialog": "pm_abc_alertDialog",
    "pm-alert-dialog--info": "pm_abc_info",
    "pm-alert-dialog--danger": "pm_abc_danger",
    "pm-alert-dialog--warning": "pm_abc_warning",
  }

  it("returns mapped default classes", () => {
    const result = alertDialogModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_alertDialog pm_abc_info")
  })

  it("maps variant classes correctly", () => {
    expect(alertDialogModuleClasses(mockClassMap, { variant: "danger" })).toContain(
      "pm_abc_danger",
    )
    expect(alertDialogModuleClasses(mockClassMap, { variant: "warning" })).toContain(
      "pm_abc_warning",
    )
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-alert-dialog": "pm_abc_alertDialog",
    }
    const result = alertDialogModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_alertDialog")
    expect(result).not.toContain("undefined")
  })
})

describe("alertDialogHeaderClasses", () => {
  it("returns header class", () => {
    expect(alertDialogHeaderClasses()).toBe("pm-alert-dialog__header")
  })
})

describe("alertDialogHeaderModuleClasses", () => {
  it("returns mapped header class", () => {
    const classMap = { "pm-alert-dialog__header": "pm_abc_header" }
    expect(alertDialogHeaderModuleClasses(classMap)).toBe("pm_abc_header")
  })

  it("handles missing class map entry", () => {
    expect(alertDialogHeaderModuleClasses({})).toBe("")
  })
})

describe("alertDialogBodyClasses", () => {
  it("returns body class", () => {
    expect(alertDialogBodyClasses()).toBe("pm-alert-dialog__body")
  })
})

describe("alertDialogBodyModuleClasses", () => {
  it("returns mapped body class", () => {
    const classMap = { "pm-alert-dialog__body": "pm_abc_body" }
    expect(alertDialogBodyModuleClasses(classMap)).toBe("pm_abc_body")
  })

  it("handles missing class map entry", () => {
    expect(alertDialogBodyModuleClasses({})).toBe("")
  })
})

describe("alertDialogFooterClasses", () => {
  it("returns footer class", () => {
    expect(alertDialogFooterClasses()).toBe("pm-alert-dialog__footer")
  })
})

describe("alertDialogFooterModuleClasses", () => {
  it("returns mapped footer class", () => {
    const classMap = { "pm-alert-dialog__footer": "pm_abc_footer" }
    expect(alertDialogFooterModuleClasses(classMap)).toBe("pm_abc_footer")
  })

  it("handles missing class map entry", () => {
    expect(alertDialogFooterModuleClasses({})).toBe("")
  })
})
