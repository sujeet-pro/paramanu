import { describe, it, expect } from "vitest"
import { textareaClasses, textareaModuleClasses } from "./textarea.classes.js"

describe("textareaClasses", () => {
  it("returns default classes (outline, md, resize-vertical)", () => {
    const result = textareaClasses()
    expect(result).toBe("pm-textarea pm-textarea--outline pm-textarea--md pm-textarea--resize-vertical")
  })

  it("applies variant", () => {
    expect(textareaClasses({ variant: "outline" })).toContain("pm-textarea--outline")
    expect(textareaClasses({ variant: "filled" })).toContain("pm-textarea--filled")
    expect(textareaClasses({ variant: "unstyled" })).toContain("pm-textarea--unstyled")
  })

  it("applies size", () => {
    expect(textareaClasses({ size: "sm" })).toContain("pm-textarea--sm")
    expect(textareaClasses({ size: "md" })).toContain("pm-textarea--md")
    expect(textareaClasses({ size: "lg" })).toContain("pm-textarea--lg")
  })

  it("applies resize modifier", () => {
    expect(textareaClasses({ resize: "none" })).toContain("pm-textarea--resize-none")
    expect(textareaClasses({ resize: "vertical" })).toContain("pm-textarea--resize-vertical")
    expect(textareaClasses({ resize: "horizontal" })).toContain("pm-textarea--resize-horizontal")
    expect(textareaClasses({ resize: "both" })).toContain("pm-textarea--resize-both")
  })

  it("applies invalid modifier", () => {
    expect(textareaClasses({ invalid: true })).toContain("pm-textarea--invalid")
    expect(textareaClasses({ invalid: false })).not.toContain("pm-textarea--invalid")
  })

  it("applies disabled modifier", () => {
    expect(textareaClasses({ disabled: true })).toContain("pm-textarea--disabled")
    expect(textareaClasses({ disabled: false })).not.toContain("pm-textarea--disabled")
  })

  it("applies read-only modifier", () => {
    expect(textareaClasses({ readOnly: true })).toContain("pm-textarea--read-only")
    expect(textareaClasses({ readOnly: false })).not.toContain("pm-textarea--read-only")
  })

  it("applies full-width modifier", () => {
    expect(textareaClasses({ fullWidth: true })).toContain("pm-textarea--full-width")
    expect(textareaClasses({ fullWidth: false })).not.toContain("pm-textarea--full-width")
  })

  it("always includes base class", () => {
    expect(textareaClasses()).toMatch(/^pm-textarea\s/)
  })

  it("combines multiple options", () => {
    const result = textareaClasses({
      variant: "filled",
      size: "lg",
      resize: "both",
      invalid: true,
      disabled: true,
      readOnly: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-textarea pm-textarea--filled pm-textarea--lg pm-textarea--resize-both pm-textarea--invalid pm-textarea--disabled pm-textarea--read-only pm-textarea--full-width",
    )
  })
})

describe("textareaModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-textarea": "pm_abc_textarea",
    "pm-textarea--outline": "pm_abc_outline",
    "pm-textarea--filled": "pm_abc_filled",
    "pm-textarea--md": "pm_abc_md",
    "pm-textarea--sm": "pm_abc_sm",
    "pm-textarea--lg": "pm_abc_lg",
    "pm-textarea--resize-vertical": "pm_abc_resizeVertical",
    "pm-textarea--resize-none": "pm_abc_resizeNone",
    "pm-textarea--resize-both": "pm_abc_resizeBoth",
    "pm-textarea--invalid": "pm_abc_invalid",
    "pm-textarea--disabled": "pm_abc_disabled",
    "pm-textarea--read-only": "pm_abc_readOnly",
    "pm-textarea--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = textareaModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_textarea pm_abc_outline pm_abc_md pm_abc_resizeVertical")
  })

  it("maps variant classes correctly", () => {
    const result = textareaModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps resize classes correctly", () => {
    const result = textareaModuleClasses(mockClassMap, { resize: "none" })
    expect(result).toContain("pm_abc_resizeNone")
  })

  it("maps disabled class", () => {
    const result = textareaModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-textarea": "pm_abc_textarea",
    }
    const result = textareaModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_textarea")
    expect(result).not.toContain("undefined")
  })
})
