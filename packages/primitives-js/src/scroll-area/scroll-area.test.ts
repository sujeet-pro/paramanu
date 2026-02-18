import { describe, it, expect } from "vitest"
import { scrollAreaClasses, scrollAreaModuleClasses } from "./scroll-area.classes.js"

describe("scrollAreaClasses", () => {
  it("returns default classes (vertical, auto)", () => {
    const result = scrollAreaClasses()
    expect(result).toBe("pm-scroll-area pm-scroll-area--vertical pm-scroll-area--scrollbar-auto")
  })

  it("returns default classes with empty options", () => {
    const result = scrollAreaClasses({})
    expect(result).toBe("pm-scroll-area pm-scroll-area--vertical pm-scroll-area--scrollbar-auto")
  })

  it("applies vertical direction", () => {
    const result = scrollAreaClasses({ direction: "vertical" })
    expect(result).toContain("pm-scroll-area--vertical")
  })

  it("applies horizontal direction", () => {
    const result = scrollAreaClasses({ direction: "horizontal" })
    expect(result).toContain("pm-scroll-area--horizontal")
  })

  it("applies both direction", () => {
    const result = scrollAreaClasses({ direction: "both" })
    expect(result).toContain("pm-scroll-area--both")
  })

  it("applies auto scrollbar", () => {
    const result = scrollAreaClasses({ scrollbar: "auto" })
    expect(result).toContain("pm-scroll-area--scrollbar-auto")
  })

  it("applies always scrollbar", () => {
    const result = scrollAreaClasses({ scrollbar: "always" })
    expect(result).toContain("pm-scroll-area--scrollbar-always")
  })

  it("applies hover scrollbar", () => {
    const result = scrollAreaClasses({ scrollbar: "hover" })
    expect(result).toContain("pm-scroll-area--scrollbar-hover")
  })

  it("combines direction and scrollbar options", () => {
    const result = scrollAreaClasses({ direction: "horizontal", scrollbar: "always" })
    expect(result).toBe("pm-scroll-area pm-scroll-area--horizontal pm-scroll-area--scrollbar-always")
  })

  it("always includes base class", () => {
    expect(scrollAreaClasses({ direction: "both" })).toMatch(/^pm-scroll-area\s/)
  })
})

describe("scrollAreaModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-scroll-area": "pm_abc_scroll-area",
    "pm-scroll-area--vertical": "pm_abc_vertical",
    "pm-scroll-area--horizontal": "pm_abc_horizontal",
    "pm-scroll-area--both": "pm_abc_both",
    "pm-scroll-area--scrollbar-auto": "pm_abc_scrollbar-auto",
    "pm-scroll-area--scrollbar-always": "pm_abc_scrollbar-always",
    "pm-scroll-area--scrollbar-hover": "pm_abc_scrollbar-hover",
  }

  it("returns mapped default classes", () => {
    const result = scrollAreaModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_scroll-area pm_abc_vertical pm_abc_scrollbar-auto")
  })

  it("maps direction classes correctly", () => {
    const result = scrollAreaModuleClasses(mockClassMap, { direction: "horizontal" })
    expect(result).toContain("pm_abc_horizontal")
  })

  it("maps scrollbar classes correctly", () => {
    const result = scrollAreaModuleClasses(mockClassMap, { scrollbar: "always" })
    expect(result).toContain("pm_abc_scrollbar-always")
  })

  it("maps combined options correctly", () => {
    const result = scrollAreaModuleClasses(mockClassMap, {
      direction: "both",
      scrollbar: "hover",
    })
    expect(result).toBe("pm_abc_scroll-area pm_abc_both pm_abc_scrollbar-hover")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-scroll-area": "pm_abc_scroll-area",
    }
    const result = scrollAreaModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_scroll-area")
    expect(result).not.toContain("undefined")
  })
})
