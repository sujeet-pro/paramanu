import { describe, it, expect } from "vitest"
import { floatClasses, floatModuleClasses } from "./float.classes.js"

describe("floatClasses", () => {
  it("returns default classes (top-end)", () => {
    const result = floatClasses()
    expect(result).toBe("pm-float pm-float--top-end")
  })

  it("returns default classes with empty options", () => {
    const result = floatClasses({})
    expect(result).toBe("pm-float pm-float--top-end")
  })

  it("applies top-start placement", () => {
    const result = floatClasses({ placement: "top-start" })
    expect(result).toBe("pm-float pm-float--top-start")
  })

  it("applies top-center placement", () => {
    const result = floatClasses({ placement: "top-center" })
    expect(result).toBe("pm-float pm-float--top-center")
  })

  it("applies top-end placement", () => {
    const result = floatClasses({ placement: "top-end" })
    expect(result).toBe("pm-float pm-float--top-end")
  })

  it("applies middle-start placement", () => {
    const result = floatClasses({ placement: "middle-start" })
    expect(result).toBe("pm-float pm-float--middle-start")
  })

  it("applies middle-end placement", () => {
    const result = floatClasses({ placement: "middle-end" })
    expect(result).toBe("pm-float pm-float--middle-end")
  })

  it("applies bottom-start placement", () => {
    const result = floatClasses({ placement: "bottom-start" })
    expect(result).toBe("pm-float pm-float--bottom-start")
  })

  it("applies bottom-center placement", () => {
    const result = floatClasses({ placement: "bottom-center" })
    expect(result).toBe("pm-float pm-float--bottom-center")
  })

  it("applies bottom-end placement", () => {
    const result = floatClasses({ placement: "bottom-end" })
    expect(result).toBe("pm-float pm-float--bottom-end")
  })

  it("applies offset modifier", () => {
    const result = floatClasses({ offset: "2" })
    expect(result).toBe("pm-float pm-float--top-end pm-float--offset-2")
  })

  it("combines placement and offset", () => {
    const result = floatClasses({ placement: "bottom-start", offset: "3" })
    expect(result).toBe("pm-float pm-float--bottom-start pm-float--offset-3")
  })

  it("does not include offset modifier when not provided", () => {
    const result = floatClasses({ placement: "top-start" })
    expect(result).not.toContain("offset")
  })

  it("always includes base class", () => {
    expect(floatClasses({ placement: "bottom-end" })).toMatch(/^pm-float\s/)
  })
})

describe("floatModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-float": "pm_abc_float",
    "pm-float--top-start": "pm_abc_top-start",
    "pm-float--top-center": "pm_abc_top-center",
    "pm-float--top-end": "pm_abc_top-end",
    "pm-float--middle-start": "pm_abc_middle-start",
    "pm-float--middle-end": "pm_abc_middle-end",
    "pm-float--bottom-start": "pm_abc_bottom-start",
    "pm-float--bottom-center": "pm_abc_bottom-center",
    "pm-float--bottom-end": "pm_abc_bottom-end",
    "pm-float--offset-0": "pm_abc_offset-0",
    "pm-float--offset-1": "pm_abc_offset-1",
    "pm-float--offset-2": "pm_abc_offset-2",
    "pm-float--offset-3": "pm_abc_offset-3",
    "pm-float--offset-4": "pm_abc_offset-4",
  }

  it("returns mapped default classes", () => {
    const result = floatModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_float pm_abc_top-end")
  })

  it("maps placement classes correctly", () => {
    const result = floatModuleClasses(mockClassMap, { placement: "bottom-start" })
    expect(result).toBe("pm_abc_float pm_abc_bottom-start")
  })

  it("maps offset classes correctly", () => {
    const result = floatModuleClasses(mockClassMap, { offset: "2" })
    expect(result).toBe("pm_abc_float pm_abc_top-end pm_abc_offset-2")
  })

  it("maps combined placement and offset correctly", () => {
    const result = floatModuleClasses(mockClassMap, { placement: "middle-end", offset: "3" })
    expect(result).toBe("pm_abc_float pm_abc_middle-end pm_abc_offset-3")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-float": "pm_abc_float",
    }
    const result = floatModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_float")
    expect(result).not.toContain("undefined")
  })
})
