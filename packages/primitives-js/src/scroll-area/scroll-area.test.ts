import { describe, it, expect } from "vitest"
import { scrollClasses, scrollModuleClasses } from "./scroll-area.classes.js"

describe("scrollClasses", () => {
  it("returns default classes (vertical, auto)", () => {
    const result = scrollClasses()
    expect(result).toBe("pm-scroll pm-scroll--vertical pm-scroll--scrollbar-auto")
  })

  it("returns default classes with empty options", () => {
    const result = scrollClasses({})
    expect(result).toBe("pm-scroll pm-scroll--vertical pm-scroll--scrollbar-auto")
  })

  it("applies vertical direction", () => {
    const result = scrollClasses({ direction: "vertical" })
    expect(result).toContain("pm-scroll--vertical")
  })

  it("applies horizontal direction", () => {
    const result = scrollClasses({ direction: "horizontal" })
    expect(result).toContain("pm-scroll--horizontal")
  })

  it("applies both direction", () => {
    const result = scrollClasses({ direction: "both" })
    expect(result).toContain("pm-scroll--both")
  })

  it("applies auto scrollbar", () => {
    const result = scrollClasses({ scrollbar: "auto" })
    expect(result).toContain("pm-scroll--scrollbar-auto")
  })

  it("applies always scrollbar", () => {
    const result = scrollClasses({ scrollbar: "always" })
    expect(result).toContain("pm-scroll--scrollbar-always")
  })

  it("applies hover scrollbar", () => {
    const result = scrollClasses({ scrollbar: "hover" })
    expect(result).toContain("pm-scroll--scrollbar-hover")
  })

  it("combines direction and scrollbar options", () => {
    const result = scrollClasses({ direction: "horizontal", scrollbar: "always" })
    expect(result).toBe("pm-scroll pm-scroll--horizontal pm-scroll--scrollbar-always")
  })

  it("always includes base class", () => {
    expect(scrollClasses({ direction: "both" })).toMatch(/^pm-scroll\s/)
  })
})

describe("scrollModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-scroll": "pm_abc_scroll-area",
    "pm-scroll--vertical": "pm_abc_vertical",
    "pm-scroll--horizontal": "pm_abc_horizontal",
    "pm-scroll--both": "pm_abc_both",
    "pm-scroll--scrollbar-auto": "pm_abc_scrollbar-auto",
    "pm-scroll--scrollbar-always": "pm_abc_scrollbar-always",
    "pm-scroll--scrollbar-hover": "pm_abc_scrollbar-hover",
  }

  it("returns mapped default classes", () => {
    const result = scrollModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_scroll-area pm_abc_vertical pm_abc_scrollbar-auto")
  })

  it("maps direction classes correctly", () => {
    const result = scrollModuleClasses(mockClassMap, { direction: "horizontal" })
    expect(result).toContain("pm_abc_horizontal")
  })

  it("maps scrollbar classes correctly", () => {
    const result = scrollModuleClasses(mockClassMap, { scrollbar: "always" })
    expect(result).toContain("pm_abc_scrollbar-always")
  })

  it("maps combined options correctly", () => {
    const result = scrollModuleClasses(mockClassMap, {
      direction: "both",
      scrollbar: "hover",
    })
    expect(result).toBe("pm_abc_scroll-area pm_abc_both pm_abc_scrollbar-hover")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-scroll": "pm_abc_scroll-area",
    }
    const result = scrollModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_scroll-area")
    expect(result).not.toContain("undefined")
  })
})
