import { describe, it, expect } from "vitest"
import {
  toggleGrpClasses,
  toggleGrpModuleClasses,
  toggleGrpItemClasses,
  toggleGrpItemModuleClasses,
} from "./toggle-group.classes.js"

describe("toggleGrpClasses", () => {
  it("returns default classes (horizontal, md)", () => {
    const result = toggleGrpClasses()
    expect(result).toBe("pm-toggle-grp pm-toggle-grp--horizontal pm-toggle-grp--md")
  })

  it("applies horizontal orientation", () => {
    expect(toggleGrpClasses({ orientation: "horizontal" })).toContain(
      "pm-toggle-grp--horizontal",
    )
  })

  it("applies vertical orientation", () => {
    expect(toggleGrpClasses({ orientation: "vertical" })).toContain(
      "pm-toggle-grp--vertical",
    )
  })

  it("applies size", () => {
    expect(toggleGrpClasses({ size: "sm" })).toContain("pm-toggle-grp--sm")
    expect(toggleGrpClasses({ size: "md" })).toContain("pm-toggle-grp--md")
    expect(toggleGrpClasses({ size: "lg" })).toContain("pm-toggle-grp--lg")
  })

  it("applies attached modifier", () => {
    expect(toggleGrpClasses({ attached: true })).toContain("pm-toggle-grp--attached")
    expect(toggleGrpClasses({ attached: false })).not.toContain("pm-toggle-grp--attached")
  })

  it("always includes base class", () => {
    expect(toggleGrpClasses()).toMatch(/^pm-toggle-grp\s/)
  })

  it("combines multiple options", () => {
    const result = toggleGrpClasses({
      orientation: "vertical",
      size: "lg",
      attached: true,
    })
    expect(result).toBe(
      "pm-toggle-grp pm-toggle-grp--vertical pm-toggle-grp--lg pm-toggle-grp--attached",
    )
  })
})

describe("toggleGrpModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-toggle-grp": "pm_abc_toggleGroup",
    "pm-toggle-grp--horizontal": "pm_abc_horizontal",
    "pm-toggle-grp--vertical": "pm_abc_vertical",
    "pm-toggle-grp--sm": "pm_abc_sm",
    "pm-toggle-grp--md": "pm_abc_md",
    "pm-toggle-grp--lg": "pm_abc_lg",
    "pm-toggle-grp--attached": "pm_abc_attached",
  }

  it("returns mapped default classes", () => {
    const result = toggleGrpModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_toggleGroup pm_abc_horizontal pm_abc_md")
  })

  it("maps orientation classes correctly", () => {
    const result = toggleGrpModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("maps size classes correctly", () => {
    const result = toggleGrpModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps attached class", () => {
    const result = toggleGrpModuleClasses(mockClassMap, { attached: true })
    expect(result).toContain("pm_abc_attached")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-toggle-grp": "pm_abc_toggleGroup",
    }
    const result = toggleGrpModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_toggleGroup")
    expect(result).not.toContain("undefined")
  })
})

describe("toggleGrpItemClasses", () => {
  it("returns default classes (md)", () => {
    const result = toggleGrpItemClasses()
    expect(result).toBe("pm-toggle-grp__item pm-toggle-grp__item--default pm-toggle-grp__item--md")
  })

  it("applies size", () => {
    expect(toggleGrpItemClasses({ size: "sm" })).toContain("pm-toggle-grp__item--sm")
    expect(toggleGrpItemClasses({ size: "md" })).toContain("pm-toggle-grp__item--md")
    expect(toggleGrpItemClasses({ size: "lg" })).toContain("pm-toggle-grp__item--lg")
  })

  it("applies pressed modifier", () => {
    expect(toggleGrpItemClasses({ pressed: true })).toContain("pm-toggle-grp__item--pressed")
    expect(toggleGrpItemClasses({ pressed: false })).not.toContain(
      "pm-toggle-grp__item--pressed",
    )
  })

  it("applies disabled modifier", () => {
    expect(toggleGrpItemClasses({ disabled: true })).toContain("pm-toggle-grp__item--disabled")
    expect(toggleGrpItemClasses({ disabled: false })).not.toContain(
      "pm-toggle-grp__item--disabled",
    )
  })

  it("always includes base class", () => {
    expect(toggleGrpItemClasses()).toMatch(/^pm-toggle-grp__item\s/)
  })

  it("combines multiple options", () => {
    const result = toggleGrpItemClasses({
      size: "lg",
      pressed: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-toggle-grp__item pm-toggle-grp__item--default pm-toggle-grp__item--lg pm-toggle-grp__item--pressed pm-toggle-grp__item--disabled",
    )
  })
})

describe("toggleGrpItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-toggle-grp__item": "pm_abc_item",
    "pm-toggle-grp__item--sm": "pm_abc_itemSm",
    "pm-toggle-grp__item--md": "pm_abc_itemMd",
    "pm-toggle-grp__item--lg": "pm_abc_itemLg",
    "pm-toggle-grp__item--pressed": "pm_abc_itemPressed",
    "pm-toggle-grp__item--disabled": "pm_abc_itemDisabled",
  }

  it("returns mapped default classes", () => {
    const result = toggleGrpItemModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_item pm_abc_itemMd")
  })

  it("maps size classes correctly", () => {
    const result = toggleGrpItemModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_itemSm")
  })

  it("maps pressed class", () => {
    const result = toggleGrpItemModuleClasses(mockClassMap, { pressed: true })
    expect(result).toContain("pm_abc_itemPressed")
  })

  it("maps disabled class", () => {
    const result = toggleGrpItemModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_itemDisabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-toggle-grp__item": "pm_abc_item",
    }
    const result = toggleGrpItemModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_item")
    expect(result).not.toContain("undefined")
  })
})
