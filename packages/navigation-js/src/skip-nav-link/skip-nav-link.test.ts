import { describe, it, expect } from "vitest"
import { skipNavLinkClasses, skipNavLinkModuleClasses } from "./skip-nav-link.classes.js"

describe("skipNavLinkClasses", () => {
  it("returns the base class", () => {
    expect(skipNavLinkClasses()).toBe("pm-skip-nav-link")
  })
})

describe("skipNavLinkModuleClasses", () => {
  it("returns mapped class", () => {
    const mockClassMap = { "pm-skip-nav-link": "pm_abc_skipNavLink" }
    expect(skipNavLinkModuleClasses(mockClassMap)).toBe("pm_abc_skipNavLink")
  })

  it("handles missing class map entry gracefully", () => {
    const result = skipNavLinkModuleClasses({})
    expect(result).toBe("")
  })
})
