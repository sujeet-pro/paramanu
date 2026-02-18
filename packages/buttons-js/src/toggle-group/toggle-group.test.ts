import { describe, it, expect } from "vitest"
import {
  toggleGroupClasses,
  toggleGroupModuleClasses,
  toggleGroupItemClasses,
  toggleGroupItemModuleClasses,
} from "./toggle-group.classes.js"

describe("toggleGroupClasses", () => {
  it("returns default classes (horizontal, md)", () => {
    const result = toggleGroupClasses()
    expect(result).toBe("pm-toggle-group pm-toggle-group--horizontal pm-toggle-group--md")
  })

  it("applies horizontal orientation", () => {
    expect(toggleGroupClasses({ orientation: "horizontal" })).toContain(
      "pm-toggle-group--horizontal",
    )
  })

  it("applies vertical orientation", () => {
    expect(toggleGroupClasses({ orientation: "vertical" })).toContain(
      "pm-toggle-group--vertical",
    )
  })

  it("applies size", () => {
    expect(toggleGroupClasses({ size: "sm" })).toContain("pm-toggle-group--sm")
    expect(toggleGroupClasses({ size: "md" })).toContain("pm-toggle-group--md")
    expect(toggleGroupClasses({ size: "lg" })).toContain("pm-toggle-group--lg")
  })

  it("applies attached modifier", () => {
    expect(toggleGroupClasses({ attached: true })).toContain("pm-toggle-group--attached")
    expect(toggleGroupClasses({ attached: false })).not.toContain("pm-toggle-group--attached")
  })

  it("always includes base class", () => {
    expect(toggleGroupClasses()).toMatch(/^pm-toggle-group\s/)
  })

  it("combines multiple options", () => {
    const result = toggleGroupClasses({
      orientation: "vertical",
      size: "lg",
      attached: true,
    })
    expect(result).toBe(
      "pm-toggle-group pm-toggle-group--vertical pm-toggle-group--lg pm-toggle-group--attached",
    )
  })
})

describe("toggleGroupModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-toggle-group": "pm_abc_toggleGroup",
    "pm-toggle-group--horizontal": "pm_abc_horizontal",
    "pm-toggle-group--vertical": "pm_abc_vertical",
    "pm-toggle-group--sm": "pm_abc_sm",
    "pm-toggle-group--md": "pm_abc_md",
    "pm-toggle-group--lg": "pm_abc_lg",
    "pm-toggle-group--attached": "pm_abc_attached",
  }

  it("returns mapped default classes", () => {
    const result = toggleGroupModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_toggleGroup pm_abc_horizontal pm_abc_md")
  })

  it("maps orientation classes correctly", () => {
    const result = toggleGroupModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("maps size classes correctly", () => {
    const result = toggleGroupModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps attached class", () => {
    const result = toggleGroupModuleClasses(mockClassMap, { attached: true })
    expect(result).toContain("pm_abc_attached")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-toggle-group": "pm_abc_toggleGroup",
    }
    const result = toggleGroupModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_toggleGroup")
    expect(result).not.toContain("undefined")
  })
})

describe("toggleGroupItemClasses", () => {
  it("returns default classes (md)", () => {
    const result = toggleGroupItemClasses()
    expect(result).toBe("pm-toggle-group__item pm-toggle-group__item--md")
  })

  it("applies size", () => {
    expect(toggleGroupItemClasses({ size: "sm" })).toContain("pm-toggle-group__item--sm")
    expect(toggleGroupItemClasses({ size: "md" })).toContain("pm-toggle-group__item--md")
    expect(toggleGroupItemClasses({ size: "lg" })).toContain("pm-toggle-group__item--lg")
  })

  it("applies pressed modifier", () => {
    expect(toggleGroupItemClasses({ pressed: true })).toContain("pm-toggle-group__item--pressed")
    expect(toggleGroupItemClasses({ pressed: false })).not.toContain(
      "pm-toggle-group__item--pressed",
    )
  })

  it("applies disabled modifier", () => {
    expect(toggleGroupItemClasses({ disabled: true })).toContain("pm-toggle-group__item--disabled")
    expect(toggleGroupItemClasses({ disabled: false })).not.toContain(
      "pm-toggle-group__item--disabled",
    )
  })

  it("always includes base class", () => {
    expect(toggleGroupItemClasses()).toMatch(/^pm-toggle-group__item\s/)
  })

  it("combines multiple options", () => {
    const result = toggleGroupItemClasses({
      size: "lg",
      pressed: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-toggle-group__item pm-toggle-group__item--lg pm-toggle-group__item--pressed pm-toggle-group__item--disabled",
    )
  })
})

describe("toggleGroupItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-toggle-group__item": "pm_abc_item",
    "pm-toggle-group__item--sm": "pm_abc_itemSm",
    "pm-toggle-group__item--md": "pm_abc_itemMd",
    "pm-toggle-group__item--lg": "pm_abc_itemLg",
    "pm-toggle-group__item--pressed": "pm_abc_itemPressed",
    "pm-toggle-group__item--disabled": "pm_abc_itemDisabled",
  }

  it("returns mapped default classes", () => {
    const result = toggleGroupItemModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_item pm_abc_itemMd")
  })

  it("maps size classes correctly", () => {
    const result = toggleGroupItemModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_itemSm")
  })

  it("maps pressed class", () => {
    const result = toggleGroupItemModuleClasses(mockClassMap, { pressed: true })
    expect(result).toContain("pm_abc_itemPressed")
  })

  it("maps disabled class", () => {
    const result = toggleGroupItemModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_itemDisabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-toggle-group__item": "pm_abc_item",
    }
    const result = toggleGroupItemModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_item")
    expect(result).not.toContain("undefined")
  })
})
