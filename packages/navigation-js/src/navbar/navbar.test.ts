import { describe, it, expect } from "vitest"
import {
  navbarClasses,
  navbarModuleClasses,
  navbarInnerClasses,
  navbarInnerModuleClasses,
  navbarSectionClasses,
  navbarSectionModuleClasses,
  navbarBrandClasses,
  navbarBrandModuleClasses,
  navbarToggleClasses,
  navbarToggleModuleClasses,
} from "./navbar.classes.js"

describe("navbarClasses", () => {
  it("returns default classes", () => {
    const result = navbarClasses()
    expect(result).toBe("pm-navbar pm-navbar--default pm-navbar--static")
  })

  it("applies variant", () => {
    expect(navbarClasses({ variant: "floating" })).toContain("pm-navbar--floating")
    expect(navbarClasses({ variant: "bordered" })).toContain("pm-navbar--bordered")
    expect(navbarClasses({ variant: "default" })).toContain("pm-navbar--default")
  })

  it("applies position", () => {
    expect(navbarClasses({ position: "sticky" })).toContain("pm-navbar--sticky")
    expect(navbarClasses({ position: "fixed" })).toContain("pm-navbar--fixed")
    expect(navbarClasses({ position: "static" })).toContain("pm-navbar--static")
  })

  it("always includes base class", () => {
    expect(navbarClasses()).toMatch(/^pm-navbar\s/)
  })
})

describe("navbarModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-navbar": "pm_abc_navbar",
    "pm-navbar--default": "pm_abc_default",
    "pm-navbar--floating": "pm_abc_floating",
    "pm-navbar--static": "pm_abc_static",
    "pm-navbar--sticky": "pm_abc_sticky",
  }

  it("returns mapped default classes", () => {
    const result = navbarModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_navbar pm_abc_default pm_abc_static")
  })

  it("maps variant correctly", () => {
    const result = navbarModuleClasses(mockClassMap, { variant: "floating" })
    expect(result).toContain("pm_abc_floating")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-navbar": "pm_abc_navbar",
    }
    const result = navbarModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_navbar")
    expect(result).not.toContain("undefined")
  })
})

describe("navbarInnerClasses", () => {
  it("returns inner class", () => {
    expect(navbarInnerClasses()).toBe("pm-navbar__inner")
  })
})

describe("navbarInnerModuleClasses", () => {
  it("returns mapped inner class", () => {
    const classMap = { "pm-navbar__inner": "pm_abc_inner" }
    expect(navbarInnerModuleClasses(classMap)).toBe("pm_abc_inner")
  })

  it("handles missing class map entry gracefully", () => {
    expect(navbarInnerModuleClasses({})).toBe("")
  })
})

describe("navbarSectionClasses", () => {
  it("returns default section classes (start)", () => {
    expect(navbarSectionClasses()).toBe("pm-navbar__section pm-navbar__section--start")
  })

  it("applies align", () => {
    expect(navbarSectionClasses({ align: "center" })).toContain("pm-navbar__section--center")
    expect(navbarSectionClasses({ align: "end" })).toContain("pm-navbar__section--end")
    expect(navbarSectionClasses({ align: "start" })).toContain("pm-navbar__section--start")
  })
})

describe("navbarSectionModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-navbar__section": "pm_abc_section",
    "pm-navbar__section--start": "pm_abc_start",
    "pm-navbar__section--center": "pm_abc_center",
    "pm-navbar__section--end": "pm_abc_end",
  }

  it("returns mapped section classes", () => {
    const result = navbarSectionModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_section pm_abc_start")
  })

  it("maps align correctly", () => {
    const result = navbarSectionModuleClasses(mockClassMap, { align: "center" })
    expect(result).toContain("pm_abc_center")
  })
})

describe("navbarBrandClasses", () => {
  it("returns brand class", () => {
    expect(navbarBrandClasses()).toBe("pm-navbar__brand")
  })
})

describe("navbarBrandModuleClasses", () => {
  it("returns mapped brand class", () => {
    const classMap = { "pm-navbar__brand": "pm_abc_brand" }
    expect(navbarBrandModuleClasses(classMap)).toBe("pm_abc_brand")
  })

  it("handles missing class map entry gracefully", () => {
    expect(navbarBrandModuleClasses({})).toBe("")
  })
})

describe("navbarToggleClasses", () => {
  it("returns toggle class", () => {
    expect(navbarToggleClasses()).toBe("pm-navbar__toggle")
  })
})

describe("navbarToggleModuleClasses", () => {
  it("returns mapped toggle class", () => {
    const classMap = { "pm-navbar__toggle": "pm_abc_toggle" }
    expect(navbarToggleModuleClasses(classMap)).toBe("pm_abc_toggle")
  })

  it("handles missing class map entry gracefully", () => {
    expect(navbarToggleModuleClasses({})).toBe("")
  })
})
