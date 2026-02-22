import { describe, it, expect } from "vitest"
import {
  alertdialogClasses,
  alertdialogModuleClasses,
  alertDialogHeaderClasses,
  alertDialogHeaderModuleClasses,
  alertDialogBodyClasses,
  alertDialogBodyModuleClasses,
  alertDialogFooterClasses,
  alertDialogFooterModuleClasses,
} from "./alert-dialog.classes.js"

describe("alertdialogClasses", () => {
  it("returns default classes (info)", () => {
    const result = alertdialogClasses()
    expect(result).toBe("pm-alertdialog pm-alertdialog--info")
  })

  it("applies variant", () => {
    expect(alertdialogClasses({ variant: "info" })).toContain("pm-alertdialog--info")
    expect(alertdialogClasses({ variant: "danger" })).toContain("pm-alertdialog--danger")
    expect(alertdialogClasses({ variant: "warning" })).toContain("pm-alertdialog--warning")
  })

  it("always includes base class", () => {
    expect(alertdialogClasses()).toMatch(/^pm-alertdialog\s/)
  })
})

describe("alertdialogModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-alertdialog": "pm_abc_alertDialog",
    "pm-alertdialog--info": "pm_abc_info",
    "pm-alertdialog--danger": "pm_abc_danger",
    "pm-alertdialog--warning": "pm_abc_warning",
  }

  it("returns mapped default classes", () => {
    const result = alertdialogModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_alertDialog pm_abc_info")
  })

  it("maps variant classes correctly", () => {
    expect(alertdialogModuleClasses(mockClassMap, { variant: "danger" })).toContain("pm_abc_danger")
    expect(alertdialogModuleClasses(mockClassMap, { variant: "warning" })).toContain(
      "pm_abc_warning",
    )
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-alertdialog": "pm_abc_alertDialog",
    }
    const result = alertdialogModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_alertDialog")
    expect(result).not.toContain("undefined")
  })
})

describe("alertDialogHeaderClasses", () => {
  it("returns header class", () => {
    expect(alertDialogHeaderClasses()).toBe("pm-alertdialog__header")
  })
})

describe("alertDialogHeaderModuleClasses", () => {
  it("returns mapped header class", () => {
    const classMap = { "pm-alertdialog__header": "pm_abc_header" }
    expect(alertDialogHeaderModuleClasses(classMap)).toBe("pm_abc_header")
  })

  it("handles missing class map entry", () => {
    expect(alertDialogHeaderModuleClasses({})).toBe("")
  })
})

describe("alertDialogBodyClasses", () => {
  it("returns body class", () => {
    expect(alertDialogBodyClasses()).toBe("pm-alertdialog__body")
  })
})

describe("alertDialogBodyModuleClasses", () => {
  it("returns mapped body class", () => {
    const classMap = { "pm-alertdialog__body": "pm_abc_body" }
    expect(alertDialogBodyModuleClasses(classMap)).toBe("pm_abc_body")
  })

  it("handles missing class map entry", () => {
    expect(alertDialogBodyModuleClasses({})).toBe("")
  })
})

describe("alertDialogFooterClasses", () => {
  it("returns footer class", () => {
    expect(alertDialogFooterClasses()).toBe("pm-alertdialog__footer")
  })
})

describe("alertDialogFooterModuleClasses", () => {
  it("returns mapped footer class", () => {
    const classMap = { "pm-alertdialog__footer": "pm_abc_footer" }
    expect(alertDialogFooterModuleClasses(classMap)).toBe("pm_abc_footer")
  })

  it("handles missing class map entry", () => {
    expect(alertDialogFooterModuleClasses({})).toBe("")
  })
})
