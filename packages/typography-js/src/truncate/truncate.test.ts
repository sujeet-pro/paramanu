import { describe, it, expect } from "vitest"
import { truncateClasses, truncateModuleClasses } from "./truncate.classes.js"

describe("truncateClasses", () => {
  it("returns default classes (1 line)", () => {
    expect(truncateClasses()).toBe("pm-truncate pm-truncate--lines-1")
  })

  it("applies lines", () => {
    expect(truncateClasses({ lines: 1 })).toContain("pm-truncate--lines-1")
    expect(truncateClasses({ lines: 2 })).toContain("pm-truncate--lines-2")
    expect(truncateClasses({ lines: 3 })).toContain("pm-truncate--lines-3")
    expect(truncateClasses({ lines: 4 })).toContain("pm-truncate--lines-4")
  })

  it("always includes base class", () => {
    expect(truncateClasses()).toMatch(/^pm-truncate\s/)
  })
})

describe("truncateModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-truncate": "pm_abc_truncate",
    "pm-truncate--lines-1": "pm_abc_lines1",
    "pm-truncate--lines-2": "pm_abc_lines2",
    "pm-truncate--lines-3": "pm_abc_lines3",
  }

  it("returns mapped default classes", () => {
    const result = truncateModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_truncate pm_abc_lines1")
  })

  it("maps lines classes correctly", () => {
    const result = truncateModuleClasses(mockClassMap, { lines: 2 })
    expect(result).toContain("pm_abc_lines2")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-truncate": "pm_abc_truncate",
    }
    const result = truncateModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_truncate")
    expect(result).not.toContain("undefined")
  })
})
