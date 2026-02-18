import { describe, it, expect } from "vitest"
import { formClasses, formModuleClasses } from "./form.classes.js"

describe("formClasses", () => {
  it("returns default classes (vertical, gap-md)", () => {
    const result = formClasses()
    expect(result).toBe("pm-form pm-form--vertical pm-form--gap-md")
  })

  it("applies vertical layout", () => {
    expect(formClasses({ layout: "vertical" })).toContain("pm-form--vertical")
  })

  it("applies horizontal layout", () => {
    expect(formClasses({ layout: "horizontal" })).toContain("pm-form--horizontal")
  })

  it("applies inline layout", () => {
    expect(formClasses({ layout: "inline" })).toContain("pm-form--inline")
  })

  it("applies gap-sm", () => {
    expect(formClasses({ gap: "sm" })).toContain("pm-form--gap-sm")
  })

  it("applies gap-md", () => {
    expect(formClasses({ gap: "md" })).toContain("pm-form--gap-md")
  })

  it("applies gap-lg", () => {
    expect(formClasses({ gap: "lg" })).toContain("pm-form--gap-lg")
  })

  it("always includes base class", () => {
    expect(formClasses()).toMatch(/^pm-form\s/)
  })

  it("combines multiple options", () => {
    const result = formClasses({
      layout: "inline",
      gap: "lg",
    })
    expect(result).toBe("pm-form pm-form--inline pm-form--gap-lg")
  })
})

describe("formModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-form": "pm_abc_form",
    "pm-form--vertical": "pm_abc_vertical",
    "pm-form--horizontal": "pm_abc_horizontal",
    "pm-form--inline": "pm_abc_inline",
    "pm-form--gap-sm": "pm_abc_gapSm",
    "pm-form--gap-md": "pm_abc_gapMd",
    "pm-form--gap-lg": "pm_abc_gapLg",
  }

  it("returns mapped default classes", () => {
    const result = formModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_form pm_abc_vertical pm_abc_gapMd")
  })

  it("maps layout classes correctly", () => {
    const result = formModuleClasses(mockClassMap, { layout: "inline" })
    expect(result).toContain("pm_abc_inline")
  })

  it("maps gap classes correctly", () => {
    const result = formModuleClasses(mockClassMap, { gap: "lg" })
    expect(result).toContain("pm_abc_gapLg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-form": "pm_abc_form",
    }
    const result = formModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_form")
    expect(result).not.toContain("undefined")
  })
})
