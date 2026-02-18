import { describe, it, expect } from "vitest"
import { mentionsClasses, mentionsModuleClasses } from "./mentions.classes.js"

describe("mentionsClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = mentionsClasses()
    expect(result).toBe("pm-mentions pm-mentions--outline pm-mentions--md")
  })

  it("applies variant", () => {
    expect(mentionsClasses({ variant: "outline" })).toContain("pm-mentions--outline")
    expect(mentionsClasses({ variant: "filled" })).toContain("pm-mentions--filled")
    expect(mentionsClasses({ variant: "unstyled" })).toContain("pm-mentions--unstyled")
  })

  it("applies size", () => {
    expect(mentionsClasses({ size: "sm" })).toContain("pm-mentions--sm")
    expect(mentionsClasses({ size: "md" })).toContain("pm-mentions--md")
    expect(mentionsClasses({ size: "lg" })).toContain("pm-mentions--lg")
  })

  it("applies invalid modifier", () => {
    expect(mentionsClasses({ invalid: true })).toContain("pm-mentions--invalid")
    expect(mentionsClasses({ invalid: false })).not.toContain("pm-mentions--invalid")
  })

  it("applies disabled modifier", () => {
    expect(mentionsClasses({ disabled: true })).toContain("pm-mentions--disabled")
    expect(mentionsClasses({ disabled: false })).not.toContain("pm-mentions--disabled")
  })

  it("always includes base class", () => {
    expect(mentionsClasses()).toMatch(/^pm-mentions\s/)
  })

  it("combines multiple options", () => {
    const result = mentionsClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-mentions pm-mentions--filled pm-mentions--lg pm-mentions--invalid pm-mentions--disabled",
    )
  })
})

describe("mentionsModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-mentions": "pm_abc_mentions",
    "pm-mentions--outline": "pm_abc_outline",
    "pm-mentions--filled": "pm_abc_filled",
    "pm-mentions--md": "pm_abc_md",
    "pm-mentions--sm": "pm_abc_sm",
    "pm-mentions--lg": "pm_abc_lg",
    "pm-mentions--invalid": "pm_abc_invalid",
    "pm-mentions--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = mentionsModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_mentions pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = mentionsModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = mentionsModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps invalid class", () => {
    const result = mentionsModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = mentionsModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-mentions": "pm_abc_mentions",
    }
    const result = mentionsModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_mentions")
    expect(result).not.toContain("undefined")
  })
})
