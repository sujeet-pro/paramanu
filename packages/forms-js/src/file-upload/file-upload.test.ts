import { describe, it, expect } from "vitest"
import { uploadClasses, uploadModuleClasses } from "./file-upload.classes.js"

describe("uploadClasses", () => {
  it("returns default classes (md)", () => {
    const result = uploadClasses()
    expect(result).toBe("pm-upload pm-upload--md")
  })

  it("applies size", () => {
    expect(uploadClasses({ size: "sm" })).toContain("pm-upload--sm")
    expect(uploadClasses({ size: "md" })).toContain("pm-upload--md")
    expect(uploadClasses({ size: "lg" })).toContain("pm-upload--lg")
  })

  it("applies disabled modifier", () => {
    expect(uploadClasses({ disabled: true })).toContain("pm-upload--disabled")
    expect(uploadClasses({ disabled: false })).not.toContain("pm-upload--disabled")
  })

  it("always includes base class", () => {
    expect(uploadClasses()).toMatch(/^pm-upload\s/)
  })

  it("combines multiple options", () => {
    const result = uploadClasses({
      size: "lg",
      disabled: true,
    })
    expect(result).toBe("pm-upload pm-upload--lg pm-upload--disabled")
  })
})

describe("uploadModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-upload": "pm_abc_fileUpload",
    "pm-upload--md": "pm_abc_md",
    "pm-upload--sm": "pm_abc_sm",
    "pm-upload--lg": "pm_abc_lg",
    "pm-upload--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = uploadModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_fileUpload pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = uploadModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = uploadModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-upload": "pm_abc_fileUpload",
    }
    const result = uploadModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_fileUpload")
    expect(result).not.toContain("undefined")
  })
})
