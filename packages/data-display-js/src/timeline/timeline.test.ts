import { describe, it, expect } from "vitest"
import {
  timelineClasses,
  timelineModuleClasses,
  timelineDotClasses,
  timelineDotModuleClasses,
} from "./timeline.classes.js"

describe("timelineClasses", () => {
  it("returns default classes (vertical, start)", () => {
    const result = timelineClasses()
    expect(result.root).toBe("pm-timeline pm-timeline--vertical pm-timeline--start")
    expect(result.item).toBe("pm-timeline__item")
    expect(result.connector).toBe("pm-timeline__connector")
    expect(result.dot).toBe("pm-timeline__dot")
    expect(result.content).toBe("pm-timeline__content")
    expect(result.opposite).toBe("pm-timeline__opposite")
  })

  it("applies orientation", () => {
    expect(timelineClasses({ orientation: "horizontal" }).root).toContain("pm-timeline--horizontal")
    expect(timelineClasses({ orientation: "vertical" }).root).toContain("pm-timeline--vertical")
  })

  it("applies align", () => {
    expect(timelineClasses({ align: "center" }).root).toContain("pm-timeline--center")
    expect(timelineClasses({ align: "alternate" }).root).toContain("pm-timeline--alternate")
    expect(timelineClasses({ align: "start" }).root).toContain("pm-timeline--start")
  })

  it("always includes base class in root", () => {
    expect(timelineClasses().root).toMatch(/^pm-timeline\s/)
  })

  it("combines multiple options", () => {
    const result = timelineClasses({ orientation: "horizontal", align: "alternate" })
    expect(result.root).toBe("pm-timeline pm-timeline--horizontal pm-timeline--alternate")
  })
})

describe("timelineDotClasses", () => {
  it("returns default classes (filled, primary)", () => {
    const result = timelineDotClasses()
    expect(result).toBe("pm-timeline__dot pm-timeline__dot--filled pm-timeline__dot--primary")
  })

  it("applies variant", () => {
    expect(timelineDotClasses({ variant: "outline" })).toContain("pm-timeline__dot--outline")
    expect(timelineDotClasses({ variant: "filled" })).toContain("pm-timeline__dot--filled")
  })

  it("applies color", () => {
    expect(timelineDotClasses({ color: "neutral" })).toContain("pm-timeline__dot--neutral")
    expect(timelineDotClasses({ color: "danger" })).toContain("pm-timeline__dot--danger")
    expect(timelineDotClasses({ color: "success" })).toContain("pm-timeline__dot--success")
  })

  it("combines variant and color", () => {
    const result = timelineDotClasses({ variant: "outline", color: "danger" })
    expect(result).toBe("pm-timeline__dot pm-timeline__dot--outline pm-timeline__dot--danger")
  })
})

describe("timelineModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-timeline": "pm_abc_timeline",
    "pm-timeline--vertical": "pm_abc_vertical",
    "pm-timeline--horizontal": "pm_abc_horizontal",
    "pm-timeline--start": "pm_abc_start",
    "pm-timeline--center": "pm_abc_center",
    "pm-timeline__item": "pm_abc_item",
    "pm-timeline__connector": "pm_abc_connector",
    "pm-timeline__dot": "pm_abc_dot",
    "pm-timeline__content": "pm_abc_content",
    "pm-timeline__opposite": "pm_abc_opposite",
  }

  it("returns mapped default classes", () => {
    const result = timelineModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_timeline pm_abc_vertical pm_abc_start")
    expect(result.item).toBe("pm_abc_item")
    expect(result.connector).toBe("pm_abc_connector")
    expect(result.dot).toBe("pm_abc_dot")
    expect(result.content).toBe("pm_abc_content")
    expect(result.opposite).toBe("pm_abc_opposite")
  })

  it("maps orientation classes correctly", () => {
    const result = timelineModuleClasses(mockClassMap, { orientation: "horizontal" })
    expect(result.root).toContain("pm_abc_horizontal")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-timeline": "pm_abc_timeline",
    }
    const result = timelineModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_timeline")
    expect(result.root).not.toContain("undefined")
    expect(result.item).toBe("")
  })
})

describe("timelineDotModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-timeline__dot": "pm_abc_dot",
    "pm-timeline__dot--filled": "pm_abc_filled",
    "pm-timeline__dot--outline": "pm_abc_outline",
    "pm-timeline__dot--primary": "pm_abc_primary",
    "pm-timeline__dot--danger": "pm_abc_danger",
  }

  it("returns mapped default classes", () => {
    const result = timelineDotModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_dot pm_abc_filled pm_abc_primary")
  })

  it("maps variant classes correctly", () => {
    const result = timelineDotModuleClasses(mockClassMap, { variant: "outline" })
    expect(result).toContain("pm_abc_outline")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-timeline__dot": "pm_abc_dot",
    }
    const result = timelineDotModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_dot")
    expect(result).not.toContain("undefined")
  })
})
