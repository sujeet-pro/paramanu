import { describe, it, expect } from "vitest"
import {
  drawerClasses,
  drawerModuleClasses,
  drawerHeaderClasses,
  drawerHeaderModuleClasses,
  drawerBodyClasses,
  drawerBodyModuleClasses,
  drawerFooterClasses,
  drawerFooterModuleClasses,
} from "./drawer.classes.js"

describe("drawerClasses", () => {
  it("returns default classes (end, md)", () => {
    const result = drawerClasses()
    expect(result).toBe("pm-drawer pm-drawer--end pm-drawer--md")
  })

  it("applies placement", () => {
    expect(drawerClasses({ placement: "start" })).toContain("pm-drawer--start")
    expect(drawerClasses({ placement: "end" })).toContain("pm-drawer--end")
    expect(drawerClasses({ placement: "top" })).toContain("pm-drawer--top")
    expect(drawerClasses({ placement: "bottom" })).toContain("pm-drawer--bottom")
  })

  it("applies size", () => {
    expect(drawerClasses({ size: "sm" })).toContain("pm-drawer--sm")
    expect(drawerClasses({ size: "md" })).toContain("pm-drawer--md")
    expect(drawerClasses({ size: "lg" })).toContain("pm-drawer--lg")
    expect(drawerClasses({ size: "xl" })).toContain("pm-drawer--xl")
    expect(drawerClasses({ size: "full" })).toContain("pm-drawer--full")
  })

  it("always includes base class", () => {
    expect(drawerClasses()).toMatch(/^pm-drawer\s/)
  })

  it("combines placement and size", () => {
    const result = drawerClasses({ placement: "start", size: "lg" })
    expect(result).toBe("pm-drawer pm-drawer--start pm-drawer--lg")
  })
})

describe("drawerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-drawer": "pm_abc_drawer",
    "pm-drawer--start": "pm_abc_start",
    "pm-drawer--end": "pm_abc_end",
    "pm-drawer--top": "pm_abc_top",
    "pm-drawer--bottom": "pm_abc_bottom",
    "pm-drawer--sm": "pm_abc_sm",
    "pm-drawer--md": "pm_abc_md",
    "pm-drawer--lg": "pm_abc_lg",
    "pm-drawer--xl": "pm_abc_xl",
    "pm-drawer--full": "pm_abc_full",
  }

  it("returns mapped default classes", () => {
    const result = drawerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_drawer pm_abc_end pm_abc_md")
  })

  it("maps placement classes correctly", () => {
    const result = drawerModuleClasses(mockClassMap, { placement: "start" })
    expect(result).toContain("pm_abc_start")
  })

  it("maps size classes correctly", () => {
    const result = drawerModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-drawer": "pm_abc_drawer",
    }
    const result = drawerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_drawer")
    expect(result).not.toContain("undefined")
  })
})

describe("drawerHeaderClasses", () => {
  it("returns header class", () => {
    expect(drawerHeaderClasses()).toBe("pm-drawer__header")
  })
})

describe("drawerHeaderModuleClasses", () => {
  it("returns mapped header class", () => {
    const classMap = { "pm-drawer__header": "pm_abc_header" }
    expect(drawerHeaderModuleClasses(classMap)).toBe("pm_abc_header")
  })

  it("returns empty string for missing entry", () => {
    expect(drawerHeaderModuleClasses({})).toBe("")
  })
})

describe("drawerBodyClasses", () => {
  it("returns body class", () => {
    expect(drawerBodyClasses()).toBe("pm-drawer__body")
  })
})

describe("drawerBodyModuleClasses", () => {
  it("returns mapped body class", () => {
    const classMap = { "pm-drawer__body": "pm_abc_body" }
    expect(drawerBodyModuleClasses(classMap)).toBe("pm_abc_body")
  })

  it("returns empty string for missing entry", () => {
    expect(drawerBodyModuleClasses({})).toBe("")
  })
})

describe("drawerFooterClasses", () => {
  it("returns footer class", () => {
    expect(drawerFooterClasses()).toBe("pm-drawer__footer")
  })
})

describe("drawerFooterModuleClasses", () => {
  it("returns mapped footer class", () => {
    const classMap = { "pm-drawer__footer": "pm_abc_footer" }
    expect(drawerFooterModuleClasses(classMap)).toBe("pm_abc_footer")
  })

  it("returns empty string for missing entry", () => {
    expect(drawerFooterModuleClasses({})).toBe("")
  })
})
