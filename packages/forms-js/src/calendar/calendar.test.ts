import { describe, it, expect } from "vitest"
import { calendarClasses, calendarModuleClasses } from "./calendar.classes.js"

describe("calendarClasses", () => {
  it("returns default classes (md)", () => {
    const result = calendarClasses()
    expect(result).toBe("pm-calendar pm-calendar--md")
  })

  it("applies size", () => {
    expect(calendarClasses({ size: "sm" })).toContain("pm-calendar--sm")
    expect(calendarClasses({ size: "md" })).toContain("pm-calendar--md")
    expect(calendarClasses({ size: "lg" })).toContain("pm-calendar--lg")
  })

  it("always includes base class", () => {
    expect(calendarClasses()).toMatch(/^pm-calendar\s/)
  })
})

describe("calendarModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-calendar": "pm_abc_calendar",
    "pm-calendar--md": "pm_abc_md",
    "pm-calendar--sm": "pm_abc_sm",
    "pm-calendar--lg": "pm_abc_lg",
  }

  it("returns mapped default classes", () => {
    const result = calendarModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_calendar pm_abc_md")
  })

  it("maps size classes correctly", () => {
    const result = calendarModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-calendar": "pm_abc_calendar",
    }
    const result = calendarModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_calendar")
    expect(result).not.toContain("undefined")
  })
})
