import { describe, it, expect } from "vitest"
import { linkClasses, linkModuleClasses } from "./link.classes.js"

describe("linkClasses", () => {
  it("returns default classes", () => {
    const result = linkClasses()
    expect(result).toBe("pm-link pm-link--default")
  })

  it("applies variant", () => {
    expect(linkClasses({ variant: "subtle" })).toContain("pm-link--subtle")
    expect(linkClasses({ variant: "nav" })).toContain("pm-link--nav")
  })

  it("applies active modifier", () => {
    expect(linkClasses({ active: true })).toContain("pm-link--active")
    expect(linkClasses({ active: false })).not.toContain("pm-link--active")
  })

  it("applies disabled modifier", () => {
    expect(linkClasses({ disabled: true })).toContain("pm-link--disabled")
    expect(linkClasses({ disabled: false })).not.toContain("pm-link--disabled")
  })

  it("applies external modifier", () => {
    expect(linkClasses({ external: true })).toContain("pm-link--external")
    expect(linkClasses({ external: false })).not.toContain("pm-link--external")
  })

  it("always includes base class", () => {
    expect(linkClasses()).toMatch(/^pm-link\s/)
  })

  it("combines multiple options", () => {
    const result = linkClasses({
      variant: "nav",
      active: true,
      external: true,
    })
    expect(result).toBe("pm-link pm-link--nav pm-link--active pm-link--external")
  })
})

describe("linkModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-link": "pm_abc_link",
    "pm-link--default": "pm_abc_default",
    "pm-link--subtle": "pm_abc_subtle",
    "pm-link--nav": "pm_abc_nav",
    "pm-link--active": "pm_abc_active",
    "pm-link--disabled": "pm_abc_disabled",
    "pm-link--external": "pm_abc_external",
  }

  it("returns mapped default classes", () => {
    const result = linkModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_link pm_abc_default")
  })

  it("maps variant classes correctly", () => {
    const result = linkModuleClasses(mockClassMap, { variant: "subtle" })
    expect(result).toContain("pm_abc_subtle")
  })

  it("maps active class", () => {
    const result = linkModuleClasses(mockClassMap, { active: true })
    expect(result).toContain("pm_abc_active")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-link": "pm_abc_link",
    }
    const result = linkModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_link")
    expect(result).not.toContain("undefined")
  })
})
