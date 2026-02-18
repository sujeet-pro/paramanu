import { describe, it, expect } from "vitest"
import { switchClasses, switchModuleClasses } from "./switch.classes.js"

describe("switchClasses", () => {
  it("returns default classes (md, label-end)", () => {
    const result = switchClasses()
    expect(result).toBe("pm-switch pm-switch--md pm-switch--label-end")
  })

  it("applies size sm", () => {
    expect(switchClasses({ size: "sm" })).toContain("pm-switch--sm")
  })

  it("applies size md", () => {
    expect(switchClasses({ size: "md" })).toContain("pm-switch--md")
  })

  it("applies size lg", () => {
    expect(switchClasses({ size: "lg" })).toContain("pm-switch--lg")
  })

  it("applies disabled modifier", () => {
    expect(switchClasses({ disabled: true })).toContain("pm-switch--disabled")
    expect(switchClasses({ disabled: false })).not.toContain("pm-switch--disabled")
  })

  it("applies checked modifier", () => {
    expect(switchClasses({ checked: true })).toContain("pm-switch--checked")
    expect(switchClasses({ checked: false })).not.toContain("pm-switch--checked")
  })

  it("applies label-start placement", () => {
    expect(switchClasses({ labelPlacement: "start" })).toContain("pm-switch--label-start")
  })

  it("applies label-end placement", () => {
    expect(switchClasses({ labelPlacement: "end" })).toContain("pm-switch--label-end")
  })

  it("always includes base class", () => {
    expect(switchClasses()).toMatch(/^pm-switch\s/)
  })

  it("combines multiple options", () => {
    const result = switchClasses({
      size: "lg",
      disabled: true,
      checked: true,
      labelPlacement: "start",
    })
    expect(result).toBe(
      "pm-switch pm-switch--lg pm-switch--label-start pm-switch--disabled pm-switch--checked",
    )
  })
})

describe("switchModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-switch": "pm_abc_switch",
    "pm-switch--sm": "pm_abc_sm",
    "pm-switch--md": "pm_abc_md",
    "pm-switch--lg": "pm_abc_lg",
    "pm-switch--disabled": "pm_abc_disabled",
    "pm-switch--checked": "pm_abc_checked",
    "pm-switch--label-start": "pm_abc_label_start",
    "pm-switch--label-end": "pm_abc_label_end",
  }

  it("returns mapped default classes", () => {
    const result = switchModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_switch pm_abc_md pm_abc_label_end")
  })

  it("maps size classes correctly", () => {
    const result = switchModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = switchModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps checked class", () => {
    const result = switchModuleClasses(mockClassMap, { checked: true })
    expect(result).toContain("pm_abc_checked")
  })

  it("maps label placement class", () => {
    const result = switchModuleClasses(mockClassMap, { labelPlacement: "start" })
    expect(result).toContain("pm_abc_label_start")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-switch": "pm_abc_switch",
    }
    const result = switchModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_switch")
    expect(result).not.toContain("undefined")
  })
})
