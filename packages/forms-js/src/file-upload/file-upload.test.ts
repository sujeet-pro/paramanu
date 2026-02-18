import { describe, it, expect } from "vitest"
import { fileUploadClasses, fileUploadModuleClasses } from "./file-upload.classes.js"

describe("fileUploadClasses", () => {
  it("returns default classes (md)", () => {
    const result = fileUploadClasses()
    expect(result).toBe("pm-file-upload pm-file-upload--md")
  })

  it("applies size", () => {
    expect(fileUploadClasses({ size: "sm" })).toContain("pm-file-upload--sm")
    expect(fileUploadClasses({ size: "md" })).toContain("pm-file-upload--md")
    expect(fileUploadClasses({ size: "lg" })).toContain("pm-file-upload--lg")
  })

  it("applies disabled modifier", () => {
    expect(fileUploadClasses({ disabled: true })).toContain("pm-file-upload--disabled")
    expect(fileUploadClasses({ disabled: false })).not.toContain("pm-file-upload--disabled")
  })

  it("always includes base class", () => {
    expect(fileUploadClasses()).toMatch(/^pm-file-upload\s/)
  })

  it("combines multiple options", () => {
    const result = fileUploadClasses({
      size: "lg",
      disabled: true,
    })
    expect(result).toBe("pm-file-upload pm-file-upload--lg pm-file-upload--disabled")
  })
})

describe("fileUploadModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-file-upload": "pm_abc_fileUpload",
    "pm-file-upload--md": "pm_abc_md",
    "pm-file-upload--sm": "pm_abc_sm",
    "pm-file-upload--lg": "pm_abc_lg",
    "pm-file-upload--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = fileUploadModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_fileUpload pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = fileUploadModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps disabled class", () => {
    const result = fileUploadModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-file-upload": "pm_abc_fileUpload",
    }
    const result = fileUploadModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_fileUpload")
    expect(result).not.toContain("undefined")
  })
})
