import { describe, it, expect } from "vitest"
import {
  dropdownMenuClasses,
  dropdownMenuModuleClasses,
  dropdownMenuTriggerClasses,
  dropdownMenuTriggerModuleClasses,
  dropdownMenuContentClasses,
  dropdownMenuContentModuleClasses,
} from "./dropdown-menu.classes.js"

describe("dropdownMenuClasses", () => {
  it("returns default classes (md, closed)", () => {
    const result = dropdownMenuClasses()
    expect(result).toBe("pm-dropdown-menu pm-dropdown-menu--md")
  })

  it("applies size", () => {
    expect(dropdownMenuClasses({ size: "sm" })).toContain("pm-dropdown-menu--sm")
    expect(dropdownMenuClasses({ size: "lg" })).toContain("pm-dropdown-menu--lg")
  })

  it("applies open modifier", () => {
    expect(dropdownMenuClasses({ open: true })).toContain("pm-dropdown-menu--open")
    expect(dropdownMenuClasses({ open: false })).not.toContain("pm-dropdown-menu--open")
  })

  it("always includes base class", () => {
    expect(dropdownMenuClasses()).toMatch(/^pm-dropdown-menu\s/)
  })

  it("combines size and open", () => {
    const result = dropdownMenuClasses({ size: "lg", open: true })
    expect(result).toBe("pm-dropdown-menu pm-dropdown-menu--lg pm-dropdown-menu--open")
  })
})

describe("dropdownMenuModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-dropdown-menu": "pm_abc_dropdown",
    "pm-dropdown-menu--md": "pm_abc_md",
    "pm-dropdown-menu--sm": "pm_abc_sm",
    "pm-dropdown-menu--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = dropdownMenuModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_dropdown pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = dropdownMenuModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps open class", () => {
    const result = dropdownMenuModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-dropdown-menu": "pm_abc_dropdown" }
    const result = dropdownMenuModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_dropdown")
    expect(result).not.toContain("undefined")
  })
})

describe("dropdownMenuTriggerClasses", () => {
  it("returns trigger class", () => {
    expect(dropdownMenuTriggerClasses()).toBe("pm-dropdown-menu__trigger")
  })
})

describe("dropdownMenuTriggerModuleClasses", () => {
  it("returns mapped trigger class", () => {
    const classMap = { "pm-dropdown-menu__trigger": "pm_abc_trigger" }
    expect(dropdownMenuTriggerModuleClasses(classMap)).toBe("pm_abc_trigger")
  })

  it("returns empty string for missing entry", () => {
    expect(dropdownMenuTriggerModuleClasses({})).toBe("")
  })
})

describe("dropdownMenuContentClasses", () => {
  it("returns content class", () => {
    expect(dropdownMenuContentClasses()).toBe("pm-dropdown-menu__content")
  })
})

describe("dropdownMenuContentModuleClasses", () => {
  it("returns mapped content class", () => {
    const classMap = { "pm-dropdown-menu__content": "pm_abc_content" }
    expect(dropdownMenuContentModuleClasses(classMap)).toBe("pm_abc_content")
  })

  it("returns empty string for missing entry", () => {
    expect(dropdownMenuContentModuleClasses({})).toBe("")
  })
})
