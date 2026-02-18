import { describe, it, expect } from "vitest"
import {
  menubarClasses,
  menubarModuleClasses,
  menubarItemClasses,
  menubarItemModuleClasses,
} from "./menubar.classes.js"

describe("menubarClasses", () => {
  it("returns base class", () => {
    expect(menubarClasses()).toBe("pm-menubar")
  })
})

describe("menubarModuleClasses", () => {
  it("returns mapped base class", () => {
    const classMap = { "pm-menubar": "pm_abc_menubar" }
    expect(menubarModuleClasses(classMap)).toBe("pm_abc_menubar")
  })

  it("returns empty string for missing entry", () => {
    expect(menubarModuleClasses({})).toBe("")
  })
})

describe("menubarItemClasses", () => {
  it("returns default item class", () => {
    expect(menubarItemClasses()).toBe("pm-menubar__item")
  })

  it("applies active modifier", () => {
    expect(menubarItemClasses({ active: true })).toContain("pm-menubar__item--active")
    expect(menubarItemClasses({ active: false })).not.toContain("pm-menubar__item--active")
  })

  it("applies disabled modifier", () => {
    expect(menubarItemClasses({ disabled: true })).toContain("pm-menubar__item--disabled")
    expect(menubarItemClasses({ disabled: false })).not.toContain("pm-menubar__item--disabled")
  })

  it("combines active and disabled", () => {
    const result = menubarItemClasses({ active: true, disabled: true })
    expect(result).toContain("pm-menubar__item--active")
    expect(result).toContain("pm-menubar__item--disabled")
  })
})

describe("menubarItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-menubar__item": "pm_abc_item",
    "pm-menubar__item--active": "pm_abc_active",
    "pm-menubar__item--disabled": "pm_abc_disabled",
  }

  it("returns mapped default item class", () => {
    expect(menubarItemModuleClasses(mockClassMap)).toBe("pm_abc_item")
  })

  it("maps active class", () => {
    expect(menubarItemModuleClasses(mockClassMap, { active: true })).toContain("pm_abc_active")
  })

  it("maps disabled class", () => {
    expect(menubarItemModuleClasses(mockClassMap, { disabled: true })).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-menubar__item": "pm_abc_item" }
    const result = menubarItemModuleClasses(sparseMap, { active: true })
    expect(result).toContain("pm_abc_item")
    expect(result).not.toContain("undefined")
  })
})
