import { describe, it, expect } from "vitest"
import {
  tabsClasses,
  tabsModuleClasses,
  tabListClasses,
  tabListModuleClasses,
  tabClasses,
  tabModuleClasses,
  tabPanelClasses,
  tabPanelModuleClasses,
} from "./tabs.classes.js"

describe("tabsClasses", () => {
  it("returns default classes (line, md, horizontal)", () => {
    const result = tabsClasses()
    expect(result).toBe("pm-tabs pm-tabs--line pm-tabs--md pm-tabs--horizontal")
  })

  it("applies variant", () => {
    expect(tabsClasses({ variant: "enclosed" })).toContain("pm-tabs--enclosed")
    expect(tabsClasses({ variant: "pill" })).toContain("pm-tabs--pill")
    expect(tabsClasses({ variant: "line" })).toContain("pm-tabs--line")
  })

  it("applies size", () => {
    expect(tabsClasses({ size: "sm" })).toContain("pm-tabs--sm")
    expect(tabsClasses({ size: "lg" })).toContain("pm-tabs--lg")
  })

  it("applies orientation", () => {
    expect(tabsClasses({ orientation: "vertical" })).toContain("pm-tabs--vertical")
    expect(tabsClasses({ orientation: "horizontal" })).toContain("pm-tabs--horizontal")
  })

  it("applies fitted modifier", () => {
    expect(tabsClasses({ fitted: true })).toContain("pm-tabs--fitted")
    expect(tabsClasses({ fitted: false })).not.toContain("pm-tabs--fitted")
  })

  it("always includes base class", () => {
    expect(tabsClasses()).toMatch(/^pm-tabs\s/)
  })

  it("combines multiple options", () => {
    const result = tabsClasses({
      variant: "pill",
      size: "lg",
      orientation: "vertical",
      fitted: true,
    })
    expect(result).toBe("pm-tabs pm-tabs--pill pm-tabs--lg pm-tabs--vertical pm-tabs--fitted")
  })
})

describe("tabsModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tabs": "pm_abc_tabs",
    "pm-tabs--line": "pm_abc_line",
    "pm-tabs--md": "pm_abc_md",
    "pm-tabs--horizontal": "pm_abc_horizontal",
    "pm-tabs--fitted": "pm_abc_fitted",
  }

  it("returns mapped default classes", () => {
    const result = tabsModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_tabs pm_abc_line pm_abc_md pm_abc_horizontal")
  })

  it("maps fitted modifier", () => {
    const result = tabsModuleClasses(mockClassMap, { fitted: true })
    expect(result).toContain("pm_abc_fitted")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-tabs": "pm_abc_tabs",
    }
    const result = tabsModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_tabs")
    expect(result).not.toContain("undefined")
  })
})

describe("tabListClasses", () => {
  it("returns list class", () => {
    expect(tabListClasses()).toBe("pm-tabs__list")
  })
})

describe("tabListModuleClasses", () => {
  it("returns mapped list class", () => {
    const mockClassMap = { "pm-tabs__list": "pm_abc_list" }
    expect(tabListModuleClasses(mockClassMap)).toBe("pm_abc_list")
  })

  it("handles missing class map entry gracefully", () => {
    expect(tabListModuleClasses({})).toBe("")
  })
})

describe("tabClasses", () => {
  it("returns default tab class", () => {
    expect(tabClasses()).toBe("pm-tabs__tab")
  })

  it("applies active modifier", () => {
    expect(tabClasses({ active: true })).toContain("pm-tabs__tab--active")
  })

  it("does not apply active modifier when false", () => {
    expect(tabClasses({ active: false })).not.toContain("pm-tabs__tab--active")
  })

  it("applies disabled modifier", () => {
    expect(tabClasses({ disabled: true })).toContain("pm-tabs__tab--disabled")
  })

  it("combines active and disabled", () => {
    const result = tabClasses({ active: true, disabled: true })
    expect(result).toContain("pm-tabs__tab--active")
    expect(result).toContain("pm-tabs__tab--disabled")
  })
})

describe("tabModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tabs__tab": "pm_abc_tab",
    "pm-tabs__tab--active": "pm_abc_active",
    "pm-tabs__tab--disabled": "pm_abc_disabled",
  }

  it("returns mapped tab class", () => {
    expect(tabModuleClasses(mockClassMap)).toBe("pm_abc_tab")
  })

  it("maps active class", () => {
    expect(tabModuleClasses(mockClassMap, { active: true })).toContain("pm_abc_active")
  })

  it("maps disabled class", () => {
    expect(tabModuleClasses(mockClassMap, { disabled: true })).toContain("pm_abc_disabled")
  })
})

describe("tabPanelClasses", () => {
  it("returns panel class", () => {
    expect(tabPanelClasses()).toBe("pm-tabs__panel")
  })
})

describe("tabPanelModuleClasses", () => {
  it("returns mapped panel class", () => {
    const mockClassMap = { "pm-tabs__panel": "pm_abc_panel" }
    expect(tabPanelModuleClasses(mockClassMap)).toBe("pm_abc_panel")
  })

  it("handles missing class map entry gracefully", () => {
    expect(tabPanelModuleClasses({})).toBe("")
  })
})
