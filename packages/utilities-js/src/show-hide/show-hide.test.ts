import { describe, it, expect } from "vitest"
import { showHideClasses, showHideModuleClasses } from "./show-hide.classes.js"

describe("showHideClasses", () => {
  it("returns pm-show by default", () => {
    expect(showHideClasses()).toBe("pm-show")
  })

  it("returns pm-show for display show", () => {
    expect(showHideClasses({ display: "show" })).toBe("pm-show")
  })

  it("returns pm-hide for display hide", () => {
    expect(showHideClasses({ display: "hide" })).toBe("pm-hide")
  })
})

describe("showHideModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-show": "pm_abc_show",
    "pm-hide": "pm_abc_hide",
  }

  it("returns mapped show class by default", () => {
    expect(showHideModuleClasses(mockClassMap)).toBe("pm_abc_show")
  })

  it("returns mapped hide class", () => {
    expect(showHideModuleClasses(mockClassMap, { display: "hide" })).toBe("pm_abc_hide")
  })

  it("returns empty string for missing entry", () => {
    expect(showHideModuleClasses({})).toBe("")
  })
})
