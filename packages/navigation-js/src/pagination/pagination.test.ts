import { describe, it, expect } from "vitest"
import {
  paginationClasses,
  paginationModuleClasses,
  paginationItemClasses,
  paginationItemModuleClasses,
} from "./pagination.classes.js"

describe("paginationClasses", () => {
  it("returns default classes (default, md)", () => {
    const result = paginationClasses()
    expect(result).toBe("pm-pagination pm-pagination--default pm-pagination--md")
  })

  it("applies variant", () => {
    expect(paginationClasses({ variant: "minimal" })).toContain("pm-pagination--minimal")
    expect(paginationClasses({ variant: "default" })).toContain("pm-pagination--default")
  })

  it("applies size", () => {
    expect(paginationClasses({ size: "sm" })).toContain("pm-pagination--sm")
    expect(paginationClasses({ size: "lg" })).toContain("pm-pagination--lg")
  })

  it("always includes base class", () => {
    expect(paginationClasses()).toMatch(/^pm-pagination\s/)
  })

  it("combines multiple options", () => {
    const result = paginationClasses({ variant: "minimal", size: "lg" })
    expect(result).toBe("pm-pagination pm-pagination--minimal pm-pagination--lg")
  })
})

describe("paginationModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-pagination": "pm_abc_pagination",
    "pm-pagination--default": "pm_abc_default",
    "pm-pagination--md": "pm_abc_md",
    "pm-pagination--minimal": "pm_abc_minimal",
  }

  it("returns mapped default classes", () => {
    const result = paginationModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_pagination pm_abc_default pm_abc_md")
  })

  it("maps variant correctly", () => {
    const result = paginationModuleClasses(mockClassMap, { variant: "minimal" })
    expect(result).toContain("pm_abc_minimal")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-pagination": "pm_abc_pagination",
    }
    const result = paginationModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_pagination")
    expect(result).not.toContain("undefined")
  })
})

describe("paginationItemClasses", () => {
  it("returns default item classes (page)", () => {
    const result = paginationItemClasses()
    expect(result).toBe("pm-pagination__item pm-pagination__item--page")
  })

  it("applies item type", () => {
    expect(paginationItemClasses({ type: "prev" })).toContain("pm-pagination__item--prev")
    expect(paginationItemClasses({ type: "next" })).toContain("pm-pagination__item--next")
    expect(paginationItemClasses({ type: "ellipsis" })).toContain(
      "pm-pagination__item--ellipsis",
    )
  })

  it("applies active modifier", () => {
    expect(paginationItemClasses({ active: true })).toContain("pm-pagination__item--active")
    expect(paginationItemClasses({ active: false })).not.toContain(
      "pm-pagination__item--active",
    )
  })

  it("applies disabled modifier", () => {
    expect(paginationItemClasses({ disabled: true })).toContain(
      "pm-pagination__item--disabled",
    )
    expect(paginationItemClasses({ disabled: false })).not.toContain(
      "pm-pagination__item--disabled",
    )
  })

  it("combines multiple options", () => {
    const result = paginationItemClasses({ type: "page", active: true, disabled: false })
    expect(result).toBe("pm-pagination__item pm-pagination__item--page pm-pagination__item--active")
  })
})

describe("paginationItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-pagination__item": "pm_abc_item",
    "pm-pagination__item--page": "pm_abc_page",
    "pm-pagination__item--prev": "pm_abc_prev",
    "pm-pagination__item--next": "pm_abc_next",
    "pm-pagination__item--ellipsis": "pm_abc_ellipsis",
    "pm-pagination__item--active": "pm_abc_active",
    "pm-pagination__item--disabled": "pm_abc_disabled",
  }

  it("returns mapped default item classes", () => {
    const result = paginationItemModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_item pm_abc_page")
  })

  it("maps type correctly", () => {
    expect(paginationItemModuleClasses(mockClassMap, { type: "prev" })).toContain("pm_abc_prev")
  })

  it("maps active class", () => {
    expect(paginationItemModuleClasses(mockClassMap, { active: true })).toContain("pm_abc_active")
  })

  it("maps disabled class", () => {
    expect(paginationItemModuleClasses(mockClassMap, { disabled: true })).toContain(
      "pm_abc_disabled",
    )
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-pagination__item": "pm_abc_item",
    }
    const result = paginationItemModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_item")
    expect(result).not.toContain("undefined")
  })
})
