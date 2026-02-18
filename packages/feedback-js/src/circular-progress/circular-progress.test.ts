import { describe, it, expect } from "vitest"
import {
  circularProgressClasses,
  circularProgressModuleClasses,
} from "./circular-progress.classes.js"

describe("circularProgressClasses", () => {
  it("returns default classes (primary, md)", () => {
    const result = circularProgressClasses()
    expect(result.root).toBe(
      "pm-circular-progress pm-circular-progress--md pm-circular-progress--primary",
    )
    expect(result.svg).toBe("pm-circular-progress__svg")
    expect(result.track).toBe("pm-circular-progress__track")
    expect(result.fill).toBe("pm-circular-progress__fill")
  })

  it("applies size", () => {
    expect(circularProgressClasses({ size: "sm" }).root).toContain("pm-circular-progress--sm")
    expect(circularProgressClasses({ size: "lg" }).root).toContain("pm-circular-progress--lg")
    expect(circularProgressClasses({ size: "xl" }).root).toContain("pm-circular-progress--xl")
  })

  it("applies variant", () => {
    expect(circularProgressClasses({ variant: "success" }).root).toContain(
      "pm-circular-progress--success",
    )
    expect(circularProgressClasses({ variant: "warning" }).root).toContain(
      "pm-circular-progress--warning",
    )
    expect(circularProgressClasses({ variant: "danger" }).root).toContain(
      "pm-circular-progress--danger",
    )
  })

  it("applies indeterminate modifier", () => {
    expect(circularProgressClasses({ indeterminate: true }).root).toContain(
      "pm-circular-progress--indeterminate",
    )
    expect(circularProgressClasses({ indeterminate: false }).root).not.toContain(
      "pm-circular-progress--indeterminate",
    )
  })

  it("always includes base class in root", () => {
    expect(circularProgressClasses().root).toMatch(/^pm-circular-progress\s/)
  })

  it("combines multiple options", () => {
    const result = circularProgressClasses({
      size: "xl",
      variant: "danger",
      indeterminate: true,
    })
    expect(result.root).toBe(
      "pm-circular-progress pm-circular-progress--xl pm-circular-progress--danger pm-circular-progress--indeterminate",
    )
  })

  it("sub-element classes are always the same", () => {
    const result1 = circularProgressClasses({ size: "sm" })
    const result2 = circularProgressClasses({ size: "xl", indeterminate: true })
    expect(result1.svg).toBe(result2.svg)
    expect(result1.track).toBe(result2.track)
    expect(result1.fill).toBe(result2.fill)
  })
})

describe("circularProgressModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-circular-progress": "pm_abc_circularProgress",
    "pm-circular-progress--primary": "pm_abc_primary",
    "pm-circular-progress--success": "pm_abc_success",
    "pm-circular-progress--md": "pm_abc_md",
    "pm-circular-progress--sm": "pm_abc_sm",
    "pm-circular-progress--indeterminate": "pm_abc_indeterminate",
    "pm-circular-progress__svg": "pm_abc_svg",
    "pm-circular-progress__track": "pm_abc_track",
    "pm-circular-progress__fill": "pm_abc_fill",
  }

  it("returns mapped default classes", () => {
    const result = circularProgressModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_circularProgress pm_abc_md pm_abc_primary")
    expect(result.svg).toBe("pm_abc_svg")
    expect(result.track).toBe("pm_abc_track")
    expect(result.fill).toBe("pm_abc_fill")
  })

  it("maps variant classes correctly", () => {
    const result = circularProgressModuleClasses(mockClassMap, { variant: "success" })
    expect(result.root).toContain("pm_abc_success")
  })

  it("maps indeterminate modifier correctly", () => {
    const result = circularProgressModuleClasses(mockClassMap, { indeterminate: true })
    expect(result.root).toContain("pm_abc_indeterminate")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-circular-progress": "pm_abc_circularProgress",
    }
    const result = circularProgressModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_circularProgress")
    expect(result.root).not.toContain("undefined")
    expect(result.svg).toBe("")
    expect(result.track).toBe("")
    expect(result.fill).toBe("")
  })
})
