import { describe, it, expect } from "vitest"
import {
  breadcrumbClasses,
  breadcrumbModuleClasses,
  breadcrumbItemClasses,
  breadcrumbItemModuleClasses,
  breadcrumbsLinkClasses,
  breadcrumbsLinkModuleClasses,
} from "./breadcrumbs.classes.js"

describe("breadcrumbClasses", () => {
  it("returns default classes (slash separator)", () => {
    const result = breadcrumbClasses()
    expect(result).toBe("pm-breadcrumb pm-breadcrumb--slash")
  })

  it("applies separator variant", () => {
    expect(breadcrumbClasses({ separator: "chevron" })).toContain("pm-breadcrumb--chevron")
    expect(breadcrumbClasses({ separator: "dot" })).toContain("pm-breadcrumb--dot")
    expect(breadcrumbClasses({ separator: "slash" })).toContain("pm-breadcrumb--slash")
  })

  it("always includes base class", () => {
    expect(breadcrumbClasses()).toMatch(/^pm-breadcrumb\s/)
  })
})

describe("breadcrumbModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-breadcrumb": "pm_abc_breadcrumbs",
    "pm-breadcrumb--slash": "pm_abc_slash",
    "pm-breadcrumb--chevron": "pm_abc_chevron",
    "pm-breadcrumb--dot": "pm_abc_dot",
  }

  it("returns mapped default classes", () => {
    const result = breadcrumbModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_breadcrumbs pm_abc_slash")
  })

  it("maps separator variant correctly", () => {
    const result = breadcrumbModuleClasses(mockClassMap, { separator: "chevron" })
    expect(result).toContain("pm_abc_chevron")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-breadcrumb": "pm_abc_breadcrumbs",
    }
    const result = breadcrumbModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_breadcrumbs")
    expect(result).not.toContain("undefined")
  })
})

describe("breadcrumbItemClasses", () => {
  it("returns default item class", () => {
    expect(breadcrumbItemClasses()).toBe("pm-breadcrumb__item")
  })

  it("applies active modifier", () => {
    expect(breadcrumbItemClasses({ active: true })).toContain("pm-breadcrumb__item--active")
  })

  it("does not apply active modifier when false", () => {
    expect(breadcrumbItemClasses({ active: false })).not.toContain("pm-breadcrumb__item--active")
  })
})

describe("breadcrumbItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-breadcrumb__item": "pm_abc_item",
    "pm-breadcrumb__item--active": "pm_abc_active",
  }

  it("returns mapped item class", () => {
    expect(breadcrumbItemModuleClasses(mockClassMap)).toBe("pm_abc_item")
  })

  it("maps active class", () => {
    expect(breadcrumbItemModuleClasses(mockClassMap, { active: true })).toContain("pm_abc_active")
  })
})

describe("breadcrumbsLinkClasses", () => {
  it("returns link class", () => {
    expect(breadcrumbsLinkClasses()).toBe("pm-breadcrumb__link")
  })
})

describe("breadcrumbsLinkModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-breadcrumb__link": "pm_abc_link",
  }

  it("returns mapped link class", () => {
    expect(breadcrumbsLinkModuleClasses(mockClassMap)).toBe("pm_abc_link")
  })

  it("handles missing class map entry gracefully", () => {
    expect(breadcrumbsLinkModuleClasses({})).toBe("")
  })
})
