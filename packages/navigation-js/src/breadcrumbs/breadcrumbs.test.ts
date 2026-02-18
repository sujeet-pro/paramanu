import { describe, it, expect } from "vitest"
import {
  breadcrumbsClasses,
  breadcrumbsModuleClasses,
  breadcrumbsItemClasses,
  breadcrumbsItemModuleClasses,
  breadcrumbsLinkClasses,
  breadcrumbsLinkModuleClasses,
} from "./breadcrumbs.classes.js"

describe("breadcrumbsClasses", () => {
  it("returns default classes (slash separator)", () => {
    const result = breadcrumbsClasses()
    expect(result).toBe("pm-breadcrumbs pm-breadcrumbs--slash")
  })

  it("applies separator variant", () => {
    expect(breadcrumbsClasses({ separator: "chevron" })).toContain("pm-breadcrumbs--chevron")
    expect(breadcrumbsClasses({ separator: "dot" })).toContain("pm-breadcrumbs--dot")
    expect(breadcrumbsClasses({ separator: "slash" })).toContain("pm-breadcrumbs--slash")
  })

  it("always includes base class", () => {
    expect(breadcrumbsClasses()).toMatch(/^pm-breadcrumbs\s/)
  })
})

describe("breadcrumbsModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-breadcrumbs": "pm_abc_breadcrumbs",
    "pm-breadcrumbs--slash": "pm_abc_slash",
    "pm-breadcrumbs--chevron": "pm_abc_chevron",
    "pm-breadcrumbs--dot": "pm_abc_dot",
  }

  it("returns mapped default classes", () => {
    const result = breadcrumbsModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_breadcrumbs pm_abc_slash")
  })

  it("maps separator variant correctly", () => {
    const result = breadcrumbsModuleClasses(mockClassMap, { separator: "chevron" })
    expect(result).toContain("pm_abc_chevron")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-breadcrumbs": "pm_abc_breadcrumbs",
    }
    const result = breadcrumbsModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_breadcrumbs")
    expect(result).not.toContain("undefined")
  })
})

describe("breadcrumbsItemClasses", () => {
  it("returns default item class", () => {
    expect(breadcrumbsItemClasses()).toBe("pm-breadcrumbs__item")
  })

  it("applies active modifier", () => {
    expect(breadcrumbsItemClasses({ active: true })).toContain(
      "pm-breadcrumbs__item--active",
    )
  })

  it("does not apply active modifier when false", () => {
    expect(breadcrumbsItemClasses({ active: false })).not.toContain(
      "pm-breadcrumbs__item--active",
    )
  })
})

describe("breadcrumbsItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-breadcrumbs__item": "pm_abc_item",
    "pm-breadcrumbs__item--active": "pm_abc_active",
  }

  it("returns mapped item class", () => {
    expect(breadcrumbsItemModuleClasses(mockClassMap)).toBe("pm_abc_item")
  })

  it("maps active class", () => {
    expect(breadcrumbsItemModuleClasses(mockClassMap, { active: true })).toContain(
      "pm_abc_active",
    )
  })
})

describe("breadcrumbsLinkClasses", () => {
  it("returns link class", () => {
    expect(breadcrumbsLinkClasses()).toBe("pm-breadcrumbs__link")
  })
})

describe("breadcrumbsLinkModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-breadcrumbs__link": "pm_abc_link",
  }

  it("returns mapped link class", () => {
    expect(breadcrumbsLinkModuleClasses(mockClassMap)).toBe("pm_abc_link")
  })

  it("handles missing class map entry gracefully", () => {
    expect(breadcrumbsLinkModuleClasses({})).toBe("")
  })
})
