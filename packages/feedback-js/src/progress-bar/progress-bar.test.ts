import { describe, it, expect } from "vitest"
import { progressClasses, progressModuleClasses } from "./progress-bar.classes.js"

describe("progressClasses", () => {
  it("returns default classes (primary, md)", () => {
    const result = progressClasses()
    expect(result.root).toBe("pm-progress pm-progress--md pm-progress--primary")
    expect(result.track).toBe("pm-progress__track")
    expect(result.fill).toBe("pm-progress__fill")
  })

  it("applies size", () => {
    expect(progressClasses({ size: "xs" }).root).toContain("pm-progress--xs")
    expect(progressClasses({ size: "sm" }).root).toContain("pm-progress--sm")
    expect(progressClasses({ size: "lg" }).root).toContain("pm-progress--lg")
  })

  it("applies variant", () => {
    expect(progressClasses({ variant: "success" }).root).toContain("pm-progress--success")
    expect(progressClasses({ variant: "warning" }).root).toContain("pm-progress--warning")
    expect(progressClasses({ variant: "danger" }).root).toContain("pm-progress--danger")
  })

  it("applies striped modifier", () => {
    expect(progressClasses({ striped: true }).root).toContain("pm-progress--striped")
    expect(progressClasses({ striped: false }).root).not.toContain("pm-progress--striped")
  })

  it("applies animated modifier", () => {
    expect(progressClasses({ animated: true }).root).toContain("pm-progress--animated")
    expect(progressClasses({ animated: false }).root).not.toContain("pm-progress--animated")
  })

  it("applies indeterminate modifier", () => {
    expect(progressClasses({ indeterminate: true }).root).toContain(
      "pm-progress--indeterminate",
    )
    expect(progressClasses({ indeterminate: false }).root).not.toContain(
      "pm-progress--indeterminate",
    )
  })

  it("always includes base class in root", () => {
    expect(progressClasses().root).toMatch(/^pm-progress\s/)
  })

  it("combines multiple options", () => {
    const result = progressClasses({
      size: "lg",
      variant: "danger",
      striped: true,
      animated: true,
    })
    expect(result.root).toBe(
      "pm-progress pm-progress--lg pm-progress--danger pm-progress--striped pm-progress--animated",
    )
  })

  it("sub-element classes are always the same", () => {
    const result1 = progressClasses({ size: "xs" })
    const result2 = progressClasses({ size: "lg", striped: true })
    expect(result1.track).toBe(result2.track)
    expect(result1.fill).toBe(result2.fill)
  })
})

describe("progressModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-progress": "pm_abc_progressBar",
    "pm-progress--primary": "pm_abc_primary",
    "pm-progress--success": "pm_abc_success",
    "pm-progress--md": "pm_abc_md",
    "pm-progress--sm": "pm_abc_sm",
    "pm-progress--striped": "pm_abc_striped",
    "pm-progress--animated": "pm_abc_animated",
    "pm-progress--indeterminate": "pm_abc_indeterminate",
    "pm-progress__track": "pm_abc_track",
    "pm-progress__fill": "pm_abc_fill",
  }

  it("returns mapped default classes", () => {
    const result = progressModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_progressBar pm_abc_md pm_abc_primary")
    expect(result.track).toBe("pm_abc_track")
    expect(result.fill).toBe("pm_abc_fill")
  })

  it("maps variant classes correctly", () => {
    const result = progressModuleClasses(mockClassMap, { variant: "success" })
    expect(result.root).toContain("pm_abc_success")
  })

  it("maps modifier classes correctly", () => {
    const result = progressModuleClasses(mockClassMap, { striped: true, animated: true })
    expect(result.root).toContain("pm_abc_striped")
    expect(result.root).toContain("pm_abc_animated")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-progress": "pm_abc_progressBar",
    }
    const result = progressModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_progressBar")
    expect(result.root).not.toContain("undefined")
    expect(result.track).toBe("")
    expect(result.fill).toBe("")
  })
})
