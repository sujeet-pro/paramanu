import { describe, it, expect } from "vitest"
import { stackClasses, stackModuleClasses } from "./stack.classes.js"

describe("stackClasses", () => {
  it("returns vertical by default", () => {
    expect(stackClasses()).toBe("pm-stack pm-stack--vertical")
  })

  it("returns vertical with empty options", () => {
    expect(stackClasses({})).toBe("pm-stack pm-stack--vertical")
  })

  it("returns vertical when explicitly specified", () => {
    expect(stackClasses({ direction: "vertical" })).toBe("pm-stack pm-stack--vertical")
  })

  it("returns horizontal direction", () => {
    expect(stackClasses({ direction: "horizontal" })).toBe("pm-stack pm-stack--horizontal")
  })

  it("adds gap modifier", () => {
    expect(stackClasses({ gap: "4" })).toBe("pm-stack pm-stack--vertical pm-stack--gap-4")
  })

  it("adds gap-0 modifier", () => {
    expect(stackClasses({ gap: "0" })).toBe("pm-stack pm-stack--vertical pm-stack--gap-0")
  })

  it("adds align modifier", () => {
    expect(stackClasses({ align: "center" })).toBe(
      "pm-stack pm-stack--vertical pm-stack--align-center",
    )
  })

  it("adds all align variants", () => {
    expect(stackClasses({ align: "start" })).toContain("pm-stack--align-start")
    expect(stackClasses({ align: "end" })).toContain("pm-stack--align-end")
    expect(stackClasses({ align: "stretch" })).toContain("pm-stack--align-stretch")
    expect(stackClasses({ align: "baseline" })).toContain("pm-stack--align-baseline")
  })

  it("adds justify modifier", () => {
    expect(stackClasses({ justify: "between" })).toContain("pm-stack--justify-between")
  })

  it("adds all justify variants", () => {
    expect(stackClasses({ justify: "start" })).toContain("pm-stack--justify-start")
    expect(stackClasses({ justify: "center" })).toContain("pm-stack--justify-center")
    expect(stackClasses({ justify: "end" })).toContain("pm-stack--justify-end")
    expect(stackClasses({ justify: "around" })).toContain("pm-stack--justify-around")
    expect(stackClasses({ justify: "evenly" })).toContain("pm-stack--justify-evenly")
  })

  it("combines multiple options", () => {
    const result = stackClasses({
      direction: "horizontal",
      gap: "6",
      align: "center",
      justify: "between",
    })
    expect(result).toContain("pm-stack")
    expect(result).toContain("pm-stack--horizontal")
    expect(result).toContain("pm-stack--gap-6")
    expect(result).toContain("pm-stack--align-center")
    expect(result).toContain("pm-stack--justify-between")
  })
})

describe("stackModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-stack": "pm_abc_stack",
    "pm-stack--vertical": "pm_abc_vertical",
    "pm-stack--horizontal": "pm_abc_horizontal",
    "pm-stack--gap-4": "pm_abc_gap_4",
    "pm-stack--align-center": "pm_abc_align_center",
    "pm-stack--justify-between": "pm_abc_justify_between",
  }

  it("returns mapped vertical classes by default", () => {
    expect(stackModuleClasses(mockClassMap)).toBe("pm_abc_stack pm_abc_vertical")
  })

  it("returns mapped horizontal classes", () => {
    const result = stackModuleClasses(mockClassMap, { direction: "horizontal" })
    expect(result).toContain("pm_abc_stack")
    expect(result).toContain("pm_abc_horizontal")
  })

  it("returns mapped classes with all options", () => {
    const result = stackModuleClasses(mockClassMap, {
      direction: "horizontal",
      gap: "4",
      align: "center",
      justify: "between",
    })
    expect(result).toContain("pm_abc_stack")
    expect(result).toContain("pm_abc_horizontal")
    expect(result).toContain("pm_abc_gap_4")
    expect(result).toContain("pm_abc_align_center")
    expect(result).toContain("pm_abc_justify_between")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = stackModuleClasses(sparseMap, { gap: "4" })
    expect(result).toBe("")
    expect(result).not.toContain("undefined")
  })
})
