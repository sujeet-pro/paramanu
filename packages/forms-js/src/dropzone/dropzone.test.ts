import { describe, it, expect } from "vitest"
import { dropzoneClasses, dropzoneModuleClasses } from "./dropzone.classes.js"

describe("dropzoneClasses", () => {
  it("returns default classes", () => {
    const result = dropzoneClasses()
    expect(result).toBe("pm-dropzone")
  })

  it("applies disabled modifier", () => {
    expect(dropzoneClasses({ disabled: true })).toContain("pm-dropzone--disabled")
    expect(dropzoneClasses({ disabled: false })).not.toContain("pm-dropzone--disabled")
  })

  it("applies dragging modifier", () => {
    expect(dropzoneClasses({ dragging: true })).toContain("pm-dropzone--dragging")
    expect(dropzoneClasses({ dragging: false })).not.toContain("pm-dropzone--dragging")
  })

  it("always includes base class", () => {
    expect(dropzoneClasses()).toBe("pm-dropzone")
  })

  it("combines multiple options", () => {
    const result = dropzoneClasses({
      disabled: true,
      dragging: true,
    })
    expect(result).toBe("pm-dropzone pm-dropzone--disabled pm-dropzone--dragging")
  })
})

describe("dropzoneModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-dropzone": "pm_abc_dropzone",
    "pm-dropzone--disabled": "pm_abc_disabled",
    "pm-dropzone--dragging": "pm_abc_dragging",
  }

  it("returns mapped default classes", () => {
    const result = dropzoneModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_dropzone")
  })

  it("maps disabled class", () => {
    const result = dropzoneModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("maps dragging class", () => {
    const result = dropzoneModuleClasses(mockClassMap, { dragging: true })
    expect(result).toContain("pm_abc_dragging")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-dropzone": "pm_abc_dropzone",
    }
    const result = dropzoneModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_dropzone")
    expect(result).not.toContain("undefined")
  })
})
