import { describe, it, expect } from "vitest"
import { spinnerClasses, spinnerModuleClasses } from "./spinner.classes.js"

describe("spinnerClasses", () => {
  it("returns default classes (primary, md)", () => {
    const result = spinnerClasses()
    expect(result).toBe("pm-spinner pm-spinner--md pm-spinner--primary")
  })

  it("applies size", () => {
    expect(spinnerClasses({ size: "xs" })).toContain("pm-spinner--xs")
    expect(spinnerClasses({ size: "sm" })).toContain("pm-spinner--sm")
    expect(spinnerClasses({ size: "lg" })).toContain("pm-spinner--lg")
    expect(spinnerClasses({ size: "xl" })).toContain("pm-spinner--xl")
  })

  it("applies variant", () => {
    expect(spinnerClasses({ variant: "primary" })).toContain("pm-spinner--primary")
    expect(spinnerClasses({ variant: "neutral" })).toContain("pm-spinner--neutral")
  })

  it("always includes base class", () => {
    expect(spinnerClasses()).toMatch(/^pm-spinner\s/)
  })

  it("combines multiple options", () => {
    const result = spinnerClasses({ size: "xl", variant: "neutral" })
    expect(result).toBe("pm-spinner pm-spinner--xl pm-spinner--neutral")
  })
})

describe("spinnerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-spinner": "pm_abc_spinner",
    "pm-spinner--primary": "pm_abc_primary",
    "pm-spinner--neutral": "pm_abc_neutral",
    "pm-spinner--md": "pm_abc_md",
    "pm-spinner--xs": "pm_abc_xs",
  }

  it("returns mapped default classes", () => {
    const result = spinnerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_spinner pm_abc_md pm_abc_primary")
  })

  it("maps variant classes correctly", () => {
    const result = spinnerModuleClasses(mockClassMap, { variant: "neutral" })
    expect(result).toContain("pm_abc_neutral")
  })

  it("maps size classes correctly", () => {
    const result = spinnerModuleClasses(mockClassMap, { size: "xs" })
    expect(result).toContain("pm_abc_xs")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-spinner": "pm_abc_spinner",
    }
    const result = spinnerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_spinner")
    expect(result).not.toContain("undefined")
  })
})
