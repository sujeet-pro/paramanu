import { describe, it, expect } from "vitest"
import { skipLinkClasses, skipLinkModuleClasses } from "./skip-nav-link.classes.js"

describe("skipLinkClasses", () => {
  it("returns the base class", () => {
    expect(skipLinkClasses()).toBe("pm-skip-link")
  })
})

describe("skipLinkModuleClasses", () => {
  it("returns mapped class", () => {
    const mockClassMap = { "pm-skip-link": "pm_abc_skipNavLink" }
    expect(skipLinkModuleClasses(mockClassMap)).toBe("pm_abc_skipNavLink")
  })

  it("handles missing class map entry gracefully", () => {
    const result = skipLinkModuleClasses({})
    expect(result).toBe("")
  })
})
