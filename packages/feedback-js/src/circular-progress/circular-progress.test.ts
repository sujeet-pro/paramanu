import { describe, it, expect } from "vitest"
import {
  ringProgressClasses,
  ringProgressModuleClasses,
} from "./circular-progress.classes.js"

describe("ringProgressClasses", () => {
  it("returns default classes (primary, md)", () => {
    const result = ringProgressClasses()
    expect(result.root).toBe(
      "pm-ring-progress pm-ring-progress--md pm-ring-progress--primary",
    )
    expect(result.svg).toBe("pm-ring-progress__svg")
    expect(result.track).toBe("pm-ring-progress__track")
    expect(result.fill).toBe("pm-ring-progress__fill")
  })

  it("applies size", () => {
    expect(ringProgressClasses({ size: "sm" }).root).toContain("pm-ring-progress--sm")
    expect(ringProgressClasses({ size: "lg" }).root).toContain("pm-ring-progress--lg")
    expect(ringProgressClasses({ size: "xl" }).root).toContain("pm-ring-progress--xl")
  })

  it("applies variant", () => {
    expect(ringProgressClasses({ variant: "success" }).root).toContain(
      "pm-ring-progress--success",
    )
    expect(ringProgressClasses({ variant: "warning" }).root).toContain(
      "pm-ring-progress--warning",
    )
    expect(ringProgressClasses({ variant: "danger" }).root).toContain(
      "pm-ring-progress--danger",
    )
  })

  it("applies indeterminate modifier", () => {
    expect(ringProgressClasses({ indeterminate: true }).root).toContain(
      "pm-ring-progress--indeterminate",
    )
    expect(ringProgressClasses({ indeterminate: false }).root).not.toContain(
      "pm-ring-progress--indeterminate",
    )
  })

  it("always includes base class in root", () => {
    expect(ringProgressClasses().root).toMatch(/^pm-ring-progress\s/)
  })

  it("combines multiple options", () => {
    const result = ringProgressClasses({
      size: "xl",
      variant: "danger",
      indeterminate: true,
    })
    expect(result.root).toBe(
      "pm-ring-progress pm-ring-progress--xl pm-ring-progress--danger pm-ring-progress--indeterminate",
    )
  })

  it("sub-element classes are always the same", () => {
    const result1 = ringProgressClasses({ size: "sm" })
    const result2 = ringProgressClasses({ size: "xl", indeterminate: true })
    expect(result1.svg).toBe(result2.svg)
    expect(result1.track).toBe(result2.track)
    expect(result1.fill).toBe(result2.fill)
  })
})

describe("ringProgressModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-ring-progress": "pm_abc_circularProgress",
    "pm-ring-progress--primary": "pm_abc_primary",
    "pm-ring-progress--success": "pm_abc_success",
    "pm-ring-progress--md": "pm_abc_md",
    "pm-ring-progress--sm": "pm_abc_sm",
    "pm-ring-progress--indeterminate": "pm_abc_indeterminate",
    "pm-ring-progress__svg": "pm_abc_svg",
    "pm-ring-progress__track": "pm_abc_track",
    "pm-ring-progress__fill": "pm_abc_fill",
  }

  it("returns mapped default classes", () => {
    const result = ringProgressModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_circularProgress pm_abc_md pm_abc_primary")
    expect(result.svg).toBe("pm_abc_svg")
    expect(result.track).toBe("pm_abc_track")
    expect(result.fill).toBe("pm_abc_fill")
  })

  it("maps variant classes correctly", () => {
    const result = ringProgressModuleClasses(mockClassMap, { variant: "success" })
    expect(result.root).toContain("pm_abc_success")
  })

  it("maps indeterminate modifier correctly", () => {
    const result = ringProgressModuleClasses(mockClassMap, { indeterminate: true })
    expect(result.root).toContain("pm_abc_indeterminate")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-ring-progress": "pm_abc_circularProgress",
    }
    const result = ringProgressModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_circularProgress")
    expect(result.root).not.toContain("undefined")
    expect(result.svg).toBe("")
    expect(result.track).toBe("")
    expect(result.fill).toBe("")
  })
})
