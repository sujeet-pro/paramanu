import { describe, it, expect } from "vitest"
import { editableClasses, editableModuleClasses } from "./editable-text.classes.js"

describe("editableClasses", () => {
  it("returns default classes (md)", () => {
    const result = editableClasses()
    expect(result).toBe("pm-editable pm-editable--md")
  })

  it("applies size", () => {
    expect(editableClasses({ size: "sm" })).toContain("pm-editable--sm")
    expect(editableClasses({ size: "md" })).toContain("pm-editable--md")
    expect(editableClasses({ size: "lg" })).toContain("pm-editable--lg")
  })

  it("applies disabled modifier", () => {
    expect(editableClasses({ disabled: true })).toContain("pm-editable--disabled")
    expect(editableClasses({ disabled: false })).not.toContain("pm-editable--disabled")
  })

  it("applies editing modifier", () => {
    expect(editableClasses({ editing: true })).toContain("pm-editable--editing")
    expect(editableClasses({ editing: false })).not.toContain("pm-editable--editing")
  })

  it("always includes base class", () => {
    expect(editableClasses()).toMatch(/^pm-editable\s/)
  })

  it("combines multiple options", () => {
    const result = editableClasses({
      size: "lg",
      disabled: true,
      editing: true,
    })
    expect(result).toBe(
      "pm-editable pm-editable--lg pm-editable--disabled pm-editable--editing",
    )
  })
})

describe("editableModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-editable": "pm_abc_editableText",
    "pm-editable--md": "pm_abc_md",
    "pm-editable--sm": "pm_abc_sm",
    "pm-editable--lg": "pm_abc_lg",
    "pm-editable--disabled": "pm_abc_disabled",
    "pm-editable--editing": "pm_abc_editing",
  }

  it("returns mapped default classes", () => {
    const result = editableModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_editableText pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = editableModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = editableModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps editing class", () => {
    const result = editableModuleClasses(mockClassMap, { editing: true })
    expect(result).toContain("pm_abc_editing")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-editable": "pm_abc_editableText",
    }
    const result = editableModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_editableText")
    expect(result).not.toContain("undefined")
  })
})
