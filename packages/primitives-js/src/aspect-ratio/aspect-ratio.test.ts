import { describe, it, expect } from "vitest"
import { aspectRatioClasses, aspectRatioModuleClasses } from "./aspect-ratio.classes.js"

describe("aspectRatioClasses", () => {
  it("returns default classes (16/9)", () => {
    const result = aspectRatioClasses()
    expect(result).toBe("pm-aspect-ratio pm-aspect-ratio--16-9")
  })

  it("returns default classes with empty options", () => {
    const result = aspectRatioClasses({})
    expect(result).toBe("pm-aspect-ratio pm-aspect-ratio--16-9")
  })

  it("applies 1/1 ratio", () => {
    const result = aspectRatioClasses({ ratio: "1/1" })
    expect(result).toBe("pm-aspect-ratio pm-aspect-ratio--1-1")
  })

  it("applies 4/3 ratio", () => {
    const result = aspectRatioClasses({ ratio: "4/3" })
    expect(result).toBe("pm-aspect-ratio pm-aspect-ratio--4-3")
  })

  it("applies 16/9 ratio", () => {
    const result = aspectRatioClasses({ ratio: "16/9" })
    expect(result).toBe("pm-aspect-ratio pm-aspect-ratio--16-9")
  })

  it("applies 21/9 ratio", () => {
    const result = aspectRatioClasses({ ratio: "21/9" })
    expect(result).toBe("pm-aspect-ratio pm-aspect-ratio--21-9")
  })

  it("applies 3/4 ratio", () => {
    const result = aspectRatioClasses({ ratio: "3/4" })
    expect(result).toBe("pm-aspect-ratio pm-aspect-ratio--3-4")
  })

  it("applies 9/16 ratio", () => {
    const result = aspectRatioClasses({ ratio: "9/16" })
    expect(result).toBe("pm-aspect-ratio pm-aspect-ratio--9-16")
  })

  it("always includes base class", () => {
    expect(aspectRatioClasses({ ratio: "1/1" })).toMatch(/^pm-aspect-ratio\s/)
  })
})

describe("aspectRatioModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-aspect-ratio": "pm_abc_aspect-ratio",
    "pm-aspect-ratio--1-1": "pm_abc_1-1",
    "pm-aspect-ratio--4-3": "pm_abc_4-3",
    "pm-aspect-ratio--16-9": "pm_abc_16-9",
    "pm-aspect-ratio--21-9": "pm_abc_21-9",
    "pm-aspect-ratio--3-4": "pm_abc_3-4",
    "pm-aspect-ratio--9-16": "pm_abc_9-16",
  }

  it("returns mapped default classes", () => {
    const result = aspectRatioModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_aspect-ratio pm_abc_16-9")
  })

  it("maps ratio classes correctly", () => {
    const result = aspectRatioModuleClasses(mockClassMap, { ratio: "1/1" })
    expect(result).toBe("pm_abc_aspect-ratio pm_abc_1-1")
  })

  it("maps 4/3 ratio correctly", () => {
    const result = aspectRatioModuleClasses(mockClassMap, { ratio: "4/3" })
    expect(result).toContain("pm_abc_4-3")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-aspect-ratio": "pm_abc_aspect-ratio",
    }
    const result = aspectRatioModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_aspect-ratio")
    expect(result).not.toContain("undefined")
  })
})
