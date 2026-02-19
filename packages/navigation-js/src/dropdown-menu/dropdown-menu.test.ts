import { describe, it, expect } from "vitest"
import {
  dropdownClasses,
  dropdownModuleClasses,
  dropdownMenuTriggerClasses,
  dropdownMenuTriggerModuleClasses,
  dropdownMenuContentClasses,
  dropdownMenuContentModuleClasses,
} from "./dropdown-menu.classes.js"

describe("dropdownClasses", () => {
  it("returns default classes (md, closed)", () => {
    const result = dropdownClasses()
    expect(result).toBe("pm-dropdown pm-dropdown--md")
  })

  it("applies size", () => {
    expect(dropdownClasses({ size: "sm" })).toContain("pm-dropdown--sm")
    expect(dropdownClasses({ size: "lg" })).toContain("pm-dropdown--lg")
  })

  it("applies open modifier", () => {
    expect(dropdownClasses({ open: true })).toContain("pm-dropdown--open")
    expect(dropdownClasses({ open: false })).not.toContain("pm-dropdown--open")
  })

  it("always includes base class", () => {
    expect(dropdownClasses()).toMatch(/^pm-dropdown\s/)
  })

  it("combines size and open", () => {
    const result = dropdownClasses({ size: "lg", open: true })
    expect(result).toBe("pm-dropdown pm-dropdown--lg pm-dropdown--open")
  })
})

describe("dropdownModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-dropdown": "pm_abc_dropdown",
    "pm-dropdown--md": "pm_abc_md",
    "pm-dropdown--sm": "pm_abc_sm",
    "pm-dropdown--open": "pm_abc_open",
  }

  it("returns mapped default classes", () => {
    const result = dropdownModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_dropdown pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = dropdownModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("maps open class", () => {
    const result = dropdownModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-dropdown": "pm_abc_dropdown" }
    const result = dropdownModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_dropdown")
    expect(result).not.toContain("undefined")
  })
})

describe("dropdownMenuTriggerClasses", () => {
  it("returns trigger class", () => {
    expect(dropdownMenuTriggerClasses()).toBe("pm-dropdown__trigger")
  })
})

describe("dropdownMenuTriggerModuleClasses", () => {
  it("returns mapped trigger class", () => {
    const classMap = { "pm-dropdown__trigger": "pm_abc_trigger" }
    expect(dropdownMenuTriggerModuleClasses(classMap)).toBe("pm_abc_trigger")
  })

  it("returns empty string for missing entry", () => {
    expect(dropdownMenuTriggerModuleClasses({})).toBe("")
  })
})

describe("dropdownMenuContentClasses", () => {
  it("returns content class", () => {
    expect(dropdownMenuContentClasses()).toBe("pm-dropdown__content")
  })
})

describe("dropdownMenuContentModuleClasses", () => {
  it("returns mapped content class", () => {
    const classMap = { "pm-dropdown__content": "pm_abc_content" }
    expect(dropdownMenuContentModuleClasses(classMap)).toBe("pm_abc_content")
  })

  it("returns empty string for missing entry", () => {
    expect(dropdownMenuContentModuleClasses({})).toBe("")
  })
})
