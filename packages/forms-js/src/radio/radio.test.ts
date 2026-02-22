import { describe, it, expect } from "vitest"
import {
  radioClasses,
  radioModuleClasses,
  radioGroupClasses,
  radioGroupModuleClasses,
} from "./radio.classes.js"

describe("radioClasses", () => {
  it("returns default classes (md)", () => {
    const result = radioClasses()
    expect(result).toBe("pm-radio pm-radio--md")
  })

  it("applies size sm", () => {
    expect(radioClasses({ size: "sm" })).toContain("pm-radio--sm")
  })

  it("applies size md", () => {
    expect(radioClasses({ size: "md" })).toContain("pm-radio--md")
  })

  it("applies size lg", () => {
    expect(radioClasses({ size: "lg" })).toContain("pm-radio--lg")
  })

  it("applies disabled modifier", () => {
    expect(radioClasses({ disabled: true })).toContain("pm-radio--disabled")
    expect(radioClasses({ disabled: false })).not.toContain("pm-radio--disabled")
  })

  it("applies invalid modifier", () => {
    expect(radioClasses({ invalid: true })).toContain("pm-radio--invalid")
    expect(radioClasses({ invalid: false })).not.toContain("pm-radio--invalid")
  })

  it("applies checked modifier", () => {
    expect(radioClasses({ checked: true })).toContain("pm-radio--checked")
    expect(radioClasses({ checked: false })).not.toContain("pm-radio--checked")
  })

  it("always includes base class", () => {
    expect(radioClasses()).toMatch(/^pm-radio\s/)
  })

  it("combines multiple options", () => {
    const result = radioClasses({
      size: "lg",
      disabled: true,
      invalid: true,
      checked: true,
    })
    expect(result).toBe(
      "pm-radio pm-radio--lg pm-radio--disabled pm-radio--invalid pm-radio--checked",
    )
  })
})

describe("radioModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-radio": "pm_abc_radio",
    "pm-radio--sm": "pm_abc_sm",
    "pm-radio--md": "pm_abc_md",
    "pm-radio--lg": "pm_abc_lg",
    "pm-radio--disabled": "pm_abc_disabled",
    "pm-radio--invalid": "pm_abc_invalid",
    "pm-radio--checked": "pm_abc_checked",
  }

  it("returns mapped default classes", () => {
    const result = radioModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_radio pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = radioModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = radioModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps invalid class", () => {
    const result = radioModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps checked class", () => {
    const result = radioModuleClasses(mockClassMap, { checked: true })
    expect(result).toContain("pm_abc_checked")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-radio": "pm_abc_radio",
    }
    const result = radioModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_radio")
    expect(result).not.toContain("undefined")
  })
})

describe("radioGroupClasses", () => {
  it("returns default classes (vertical, md)", () => {
    const result = radioGroupClasses()
    expect(result).toBe("pm-radio-group pm-radio-group--vertical pm-radio-group--md")
  })

  it("applies horizontal orientation", () => {
    expect(radioGroupClasses({ orientation: "horizontal" })).toContain("pm-radio-group--horizontal")
  })

  it("applies vertical orientation", () => {
    expect(radioGroupClasses({ orientation: "vertical" })).toContain("pm-radio-group--vertical")
  })

  it("applies size sm", () => {
    expect(radioGroupClasses({ size: "sm" })).toContain("pm-radio-group--sm")
  })

  it("applies size lg", () => {
    expect(radioGroupClasses({ size: "lg" })).toContain("pm-radio-group--lg")
  })

  it("always includes base class", () => {
    expect(radioGroupClasses()).toMatch(/^pm-radio-group\s/)
  })

  it("combines multiple options", () => {
    const result = radioGroupClasses({ orientation: "horizontal", size: "lg" })
    expect(result).toBe("pm-radio-group pm-radio-group--horizontal pm-radio-group--lg")
  })
})

describe("radioGroupModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-radio-group": "pm_abc_group",
    "pm-radio-group--vertical": "pm_abc_vertical",
    "pm-radio-group--horizontal": "pm_abc_horizontal",
    "pm-radio-group--sm": "pm_abc_sm",
    "pm-radio-group--md": "pm_abc_md",
    "pm-radio-group--lg": "pm_abc_lg",
  }

  it("returns mapped default classes", () => {
    const result = radioGroupModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_group pm_abc_vertical pm_abc_md")
  })

  it("maps horizontal orientation", () => {
    const result = radioGroupModuleClasses(mockClassMap, { orientation: "horizontal" })
    expect(result).toContain("pm_abc_horizontal")
  })

  it("maps size classes correctly", () => {
    const result = radioGroupModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-radio-group": "pm_abc_group",
    }
    const result = radioGroupModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_group")
    expect(result).not.toContain("undefined")
  })
})
