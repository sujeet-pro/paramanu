import { describe, it, expect } from "vitest"
import { groupClasses, groupModuleClasses } from "./group.classes.js"

describe("groupClasses", () => {
  it("returns horizontal by default", () => {
    expect(groupClasses()).toBe("pm-group pm-group--horizontal")
  })

  it("returns horizontal with empty options", () => {
    expect(groupClasses({})).toBe("pm-group pm-group--horizontal")
  })

  it("returns horizontal when explicitly specified", () => {
    expect(groupClasses({ orientation: "horizontal" })).toBe("pm-group pm-group--horizontal")
  })

  it("returns vertical orientation", () => {
    expect(groupClasses({ orientation: "vertical" })).toBe("pm-group pm-group--vertical")
  })

  it("adds gap modifier", () => {
    expect(groupClasses({ gap: "4" })).toBe("pm-group pm-group--horizontal pm-group--gap-4")
  })

  it("adds gap-0 modifier", () => {
    expect(groupClasses({ gap: "0" })).toBe("pm-group pm-group--horizontal pm-group--gap-0")
  })

  it("adds attached modifier", () => {
    expect(groupClasses({ attached: true })).toBe(
      "pm-group pm-group--horizontal pm-group--attached",
    )
  })

  it("does not add attached modifier when false", () => {
    expect(groupClasses({ attached: false })).toBe("pm-group pm-group--horizontal")
  })

  it("combines multiple options", () => {
    const result = groupClasses({
      orientation: "vertical",
      gap: "2",
      attached: true,
    })
    expect(result).toContain("pm-group")
    expect(result).toContain("pm-group--vertical")
    expect(result).toContain("pm-group--attached")
    expect(result).toContain("pm-group--gap-2")
  })
})

describe("groupModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-group": "pm_abc_group",
    "pm-group--horizontal": "pm_abc_horizontal",
    "pm-group--vertical": "pm_abc_vertical",
    "pm-group--attached": "pm_abc_attached",
    "pm-group--gap-4": "pm_abc_gap_4",
  }

  it("returns mapped horizontal classes by default", () => {
    expect(groupModuleClasses(mockClassMap)).toBe("pm_abc_group pm_abc_horizontal")
  })

  it("returns mapped vertical classes", () => {
    const result = groupModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_group")
    expect(result).toContain("pm_abc_vertical")
  })

  it("returns mapped classes with all options", () => {
    const result = groupModuleClasses(mockClassMap, {
      orientation: "vertical",
      gap: "4",
      attached: true,
    })
    expect(result).toContain("pm_abc_group")
    expect(result).toContain("pm_abc_vertical")
    expect(result).toContain("pm_abc_attached")
    expect(result).toContain("pm_abc_gap_4")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = groupModuleClasses(sparseMap, { gap: "4" })
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
