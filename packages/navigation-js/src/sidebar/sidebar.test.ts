import { describe, it, expect } from "vitest"
import {
  sidebarClasses,
  sidebarModuleClasses,
  sidebarSectionClasses,
  sidebarSectionModuleClasses,
  sidebarSectionLabelClasses,
  sidebarSectionLabelModuleClasses,
  sidebarItemClasses,
  sidebarItemModuleClasses,
} from "./sidebar.classes.js"

describe("sidebarClasses", () => {
  it("returns default classes", () => {
    const result = sidebarClasses()
    expect(result).toBe("pm-sidebar pm-sidebar--default pm-sidebar--left")
  })

  it("applies width variant", () => {
    expect(sidebarClasses({ width: "narrow" })).toContain("pm-sidebar--narrow")
    expect(sidebarClasses({ width: "wide" })).toContain("pm-sidebar--wide")
    expect(sidebarClasses({ width: "default" })).toContain("pm-sidebar--default")
  })

  it("applies position", () => {
    expect(sidebarClasses({ position: "left" })).toContain("pm-sidebar--left")
    expect(sidebarClasses({ position: "right" })).toContain("pm-sidebar--right")
  })

  it("applies collapsed modifier", () => {
    expect(sidebarClasses({ collapsed: true })).toContain("pm-sidebar--collapsed")
  })

  it("does not apply collapsed when false", () => {
    expect(sidebarClasses({ collapsed: false })).not.toContain("pm-sidebar--collapsed")
  })

  it("always includes base class", () => {
    expect(sidebarClasses()).toMatch(/^pm-sidebar\s/)
  })
})

describe("sidebarModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-sidebar": "pm_abc_sidebar",
    "pm-sidebar--default": "pm_abc_default",
    "pm-sidebar--narrow": "pm_abc_narrow",
    "pm-sidebar--left": "pm_abc_left",
    "pm-sidebar--right": "pm_abc_right",
    "pm-sidebar--collapsed": "pm_abc_collapsed",
  }

  it("returns mapped default classes", () => {
    const result = sidebarModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_sidebar pm_abc_default pm_abc_left")
  })

  it("maps width variant correctly", () => {
    const result = sidebarModuleClasses(mockClassMap, { width: "narrow" })
    expect(result).toContain("pm_abc_narrow")
  })

  it("maps collapsed correctly", () => {
    const result = sidebarModuleClasses(mockClassMap, { collapsed: true })
    expect(result).toContain("pm_abc_collapsed")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-sidebar": "pm_abc_sidebar",
    }
    const result = sidebarModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_sidebar")
    expect(result).not.toContain("undefined")
  })
})

describe("sidebarSectionClasses", () => {
  it("returns section class", () => {
    expect(sidebarSectionClasses()).toBe("pm-sidebar__section")
  })
})

describe("sidebarSectionModuleClasses", () => {
  it("returns mapped section class", () => {
    const classMap = { "pm-sidebar__section": "pm_abc_section" }
    expect(sidebarSectionModuleClasses(classMap)).toBe("pm_abc_section")
  })

  it("handles missing class map entry gracefully", () => {
    expect(sidebarSectionModuleClasses({})).toBe("")
  })
})

describe("sidebarSectionLabelClasses", () => {
  it("returns section label class", () => {
    expect(sidebarSectionLabelClasses()).toBe("pm-sidebar__section-label")
  })
})

describe("sidebarSectionLabelModuleClasses", () => {
  it("returns mapped section label class", () => {
    const classMap = { "pm-sidebar__section-label": "pm_abc_label" }
    expect(sidebarSectionLabelModuleClasses(classMap)).toBe("pm_abc_label")
  })

  it("handles missing class map entry gracefully", () => {
    expect(sidebarSectionLabelModuleClasses({})).toBe("")
  })
})

describe("sidebarItemClasses", () => {
  it("returns default item class", () => {
    expect(sidebarItemClasses()).toBe("pm-sidebar__item")
  })

  it("applies active modifier", () => {
    expect(sidebarItemClasses({ active: true })).toContain("pm-sidebar__item--active")
  })

  it("does not apply active when false", () => {
    expect(sidebarItemClasses({ active: false })).not.toContain("pm-sidebar__item--active")
  })

  it("applies disabled modifier", () => {
    expect(sidebarItemClasses({ disabled: true })).toContain("pm-sidebar__item--disabled")
  })

  it("does not apply disabled when false", () => {
    expect(sidebarItemClasses({ disabled: false })).not.toContain("pm-sidebar__item--disabled")
  })

  it("applies indent levels", () => {
    expect(sidebarItemClasses({ indent: 1 })).toContain("pm-sidebar__item--indent-1")
    expect(sidebarItemClasses({ indent: 2 })).toContain("pm-sidebar__item--indent-2")
    expect(sidebarItemClasses({ indent: 3 })).toContain("pm-sidebar__item--indent-3")
  })

  it("does not apply indent when 0", () => {
    expect(sidebarItemClasses({ indent: 0 })).not.toContain("pm-sidebar__item--indent")
  })
})

describe("sidebarItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-sidebar__item": "pm_abc_item",
    "pm-sidebar__item--active": "pm_abc_active",
    "pm-sidebar__item--disabled": "pm_abc_disabled",
    "pm-sidebar__item--indent-1": "pm_abc_indent1",
    "pm-sidebar__item--indent-2": "pm_abc_indent2",
    "pm-sidebar__item--indent-3": "pm_abc_indent3",
  }

  it("returns mapped item class", () => {
    expect(sidebarItemModuleClasses(mockClassMap)).toBe("pm_abc_item")
  })

  it("maps active class", () => {
    expect(sidebarItemModuleClasses(mockClassMap, { active: true })).toContain("pm_abc_active")
  })

  it("maps disabled class", () => {
    expect(sidebarItemModuleClasses(mockClassMap, { disabled: true })).toContain("pm_abc_disabled")
  })

  it("maps indent class", () => {
    expect(sidebarItemModuleClasses(mockClassMap, { indent: 2 })).toContain("pm_abc_indent2")
  })
})
