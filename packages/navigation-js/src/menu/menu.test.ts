import { describe, it, expect } from "vitest"
import {
  menuClasses,
  menuModuleClasses,
  menuItemClasses,
  menuItemModuleClasses,
  menuGroupClasses,
  menuGroupModuleClasses,
  menuGroupLabelClasses,
  menuGroupLabelModuleClasses,
  menuSeparatorClasses,
  menuSeparatorModuleClasses,
} from "./menu.classes.js"

describe("menuClasses", () => {
  it("returns default classes (md)", () => {
    const result = menuClasses()
    expect(result).toBe("pm-menu pm-menu--md")
  })

  it("applies size", () => {
    expect(menuClasses({ size: "sm" })).toContain("pm-menu--sm")
    expect(menuClasses({ size: "lg" })).toContain("pm-menu--lg")
  })

  it("always includes base class", () => {
    expect(menuClasses()).toMatch(/^pm-menu\s/)
  })
})

describe("menuModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-menu": "pm_abc_menu",
    "pm-menu--md": "pm_abc_md",
    "pm-menu--sm": "pm_abc_sm",
  }

  it("returns mapped default classes", () => {
    const result = menuModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_menu pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = menuModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-menu": "pm_abc_menu" }
    const result = menuModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_menu")
    expect(result).not.toContain("undefined")
  })
})

describe("menuItemClasses", () => {
  it("returns default item class", () => {
    expect(menuItemClasses()).toBe("pm-menu__item")
  })

  it("applies active modifier", () => {
    expect(menuItemClasses({ active: true })).toContain("pm-menu__item--active")
    expect(menuItemClasses({ active: false })).not.toContain("pm-menu__item--active")
  })

  it("applies disabled modifier", () => {
    expect(menuItemClasses({ disabled: true })).toContain("pm-menu__item--disabled")
    expect(menuItemClasses({ disabled: false })).not.toContain("pm-menu__item--disabled")
  })

  it("applies destructive modifier", () => {
    expect(menuItemClasses({ destructive: true })).toContain("pm-menu__item--destructive")
    expect(menuItemClasses({ destructive: false })).not.toContain("pm-menu__item--destructive")
  })

  it("combines multiple modifiers", () => {
    const result = menuItemClasses({ active: true, destructive: true })
    expect(result).toContain("pm-menu__item--active")
    expect(result).toContain("pm-menu__item--destructive")
  })
})

describe("menuItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-menu__item": "pm_abc_item",
    "pm-menu__item--active": "pm_abc_active",
    "pm-menu__item--disabled": "pm_abc_disabled",
    "pm-menu__item--destructive": "pm_abc_destructive",
  }

  it("returns mapped default item class", () => {
    expect(menuItemModuleClasses(mockClassMap)).toBe("pm_abc_item")
  })

  it("maps active class", () => {
    expect(menuItemModuleClasses(mockClassMap, { active: true })).toContain("pm_abc_active")
  })

  it("maps disabled class", () => {
    expect(menuItemModuleClasses(mockClassMap, { disabled: true })).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-menu__item": "pm_abc_item" }
    const result = menuItemModuleClasses(sparseMap, { active: true })
    expect(result).toContain("pm_abc_item")
    expect(result).not.toContain("undefined")
  })
})

describe("menuGroupClasses", () => {
  it("returns group class", () => {
    expect(menuGroupClasses()).toBe("pm-menu__group")
  })
})

describe("menuGroupModuleClasses", () => {
  it("returns mapped group class", () => {
    const classMap = { "pm-menu__group": "pm_abc_group" }
    expect(menuGroupModuleClasses(classMap)).toBe("pm_abc_group")
  })

  it("returns empty string for missing entry", () => {
    expect(menuGroupModuleClasses({})).toBe("")
  })
})

describe("menuGroupLabelClasses", () => {
  it("returns group label class", () => {
    expect(menuGroupLabelClasses()).toBe("pm-menu__group-label")
  })
})

describe("menuGroupLabelModuleClasses", () => {
  it("returns mapped group label class", () => {
    const classMap = { "pm-menu__group-label": "pm_abc_label" }
    expect(menuGroupLabelModuleClasses(classMap)).toBe("pm_abc_label")
  })

  it("returns empty string for missing entry", () => {
    expect(menuGroupLabelModuleClasses({})).toBe("")
  })
})

describe("menuSeparatorClasses", () => {
  it("returns separator class", () => {
    expect(menuSeparatorClasses()).toBe("pm-menu__separator")
  })
})

describe("menuSeparatorModuleClasses", () => {
  it("returns mapped separator class", () => {
    const classMap = { "pm-menu__separator": "pm_abc_separator" }
    expect(menuSeparatorModuleClasses(classMap)).toBe("pm_abc_separator")
  })

  it("returns empty string for missing entry", () => {
    expect(menuSeparatorModuleClasses({})).toBe("")
  })
})
