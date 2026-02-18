import { describe, it, expect } from "vitest"
import { editableTextClasses, editableTextModuleClasses } from "./editable-text.classes.js"

describe("editableTextClasses", () => {
  it("returns default classes (md)", () => {
    const result = editableTextClasses()
    expect(result).toBe("pm-editable-text pm-editable-text--md")
  })

  it("applies size", () => {
    expect(editableTextClasses({ size: "sm" })).toContain("pm-editable-text--sm")
    expect(editableTextClasses({ size: "md" })).toContain("pm-editable-text--md")
    expect(editableTextClasses({ size: "lg" })).toContain("pm-editable-text--lg")
  })

  it("applies disabled modifier", () => {
    expect(editableTextClasses({ disabled: true })).toContain("pm-editable-text--disabled")
    expect(editableTextClasses({ disabled: false })).not.toContain("pm-editable-text--disabled")
  })

  it("applies editing modifier", () => {
    expect(editableTextClasses({ editing: true })).toContain("pm-editable-text--editing")
    expect(editableTextClasses({ editing: false })).not.toContain("pm-editable-text--editing")
  })

  it("always includes base class", () => {
    expect(editableTextClasses()).toMatch(/^pm-editable-text\s/)
  })

  it("combines multiple options", () => {
    const result = editableTextClasses({
      size: "lg",
      disabled: true,
      editing: true,
    })
    expect(result).toBe(
      "pm-editable-text pm-editable-text--lg pm-editable-text--disabled pm-editable-text--editing",
    )
  })
})

describe("editableTextModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-editable-text": "pm_abc_editableText",
    "pm-editable-text--md": "pm_abc_md",
    "pm-editable-text--sm": "pm_abc_sm",
    "pm-editable-text--lg": "pm_abc_lg",
    "pm-editable-text--disabled": "pm_abc_disabled",
    "pm-editable-text--editing": "pm_abc_editing",
  }

  it("returns mapped default classes", () => {
    const result = editableTextModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_editableText pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = editableTextModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = editableTextModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps editing class", () => {
    const result = editableTextModuleClasses(mockClassMap, { editing: true })
    expect(result).toContain("pm_abc_editing")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-editable-text": "pm_abc_editableText",
    }
    const result = editableTextModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_editableText")
    expect(result).not.toContain("undefined")
  })
})
