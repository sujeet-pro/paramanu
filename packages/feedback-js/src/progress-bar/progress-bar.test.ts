import { describe, it, expect } from "vitest"
import { progressBarClasses, progressBarModuleClasses } from "./progress-bar.classes.js"

describe("progressBarClasses", () => {
  it("returns default classes (primary, md)", () => {
    const result = progressBarClasses()
    expect(result.root).toBe("pm-progress-bar pm-progress-bar--md pm-progress-bar--primary")
    expect(result.track).toBe("pm-progress-bar__track")
    expect(result.fill).toBe("pm-progress-bar__fill")
  })

  it("applies size", () => {
    expect(progressBarClasses({ size: "xs" }).root).toContain("pm-progress-bar--xs")
    expect(progressBarClasses({ size: "sm" }).root).toContain("pm-progress-bar--sm")
    expect(progressBarClasses({ size: "lg" }).root).toContain("pm-progress-bar--lg")
  })

  it("applies variant", () => {
    expect(progressBarClasses({ variant: "success" }).root).toContain("pm-progress-bar--success")
    expect(progressBarClasses({ variant: "warning" }).root).toContain("pm-progress-bar--warning")
    expect(progressBarClasses({ variant: "danger" }).root).toContain("pm-progress-bar--danger")
  })

  it("applies striped modifier", () => {
    expect(progressBarClasses({ striped: true }).root).toContain("pm-progress-bar--striped")
    expect(progressBarClasses({ striped: false }).root).not.toContain("pm-progress-bar--striped")
  })

  it("applies animated modifier", () => {
    expect(progressBarClasses({ animated: true }).root).toContain("pm-progress-bar--animated")
    expect(progressBarClasses({ animated: false }).root).not.toContain("pm-progress-bar--animated")
  })

  it("applies indeterminate modifier", () => {
    expect(progressBarClasses({ indeterminate: true }).root).toContain(
      "pm-progress-bar--indeterminate",
    )
    expect(progressBarClasses({ indeterminate: false }).root).not.toContain(
      "pm-progress-bar--indeterminate",
    )
  })

  it("always includes base class in root", () => {
    expect(progressBarClasses().root).toMatch(/^pm-progress-bar\s/)
  })

  it("combines multiple options", () => {
    const result = progressBarClasses({
      size: "lg",
      variant: "danger",
      striped: true,
      animated: true,
    })
    expect(result.root).toBe(
      "pm-progress-bar pm-progress-bar--lg pm-progress-bar--danger pm-progress-bar--striped pm-progress-bar--animated",
    )
  })

  it("sub-element classes are always the same", () => {
    const result1 = progressBarClasses({ size: "xs" })
    const result2 = progressBarClasses({ size: "lg", striped: true })
    expect(result1.track).toBe(result2.track)
    expect(result1.fill).toBe(result2.fill)
  })
})

describe("progressBarModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-progress-bar": "pm_abc_progressBar",
    "pm-progress-bar--primary": "pm_abc_primary",
    "pm-progress-bar--success": "pm_abc_success",
    "pm-progress-bar--md": "pm_abc_md",
    "pm-progress-bar--sm": "pm_abc_sm",
    "pm-progress-bar--striped": "pm_abc_striped",
    "pm-progress-bar--animated": "pm_abc_animated",
    "pm-progress-bar--indeterminate": "pm_abc_indeterminate",
    "pm-progress-bar__track": "pm_abc_track",
    "pm-progress-bar__fill": "pm_abc_fill",
  }

  it("returns mapped default classes", () => {
    const result = progressBarModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_progressBar pm_abc_md pm_abc_primary")
    expect(result.track).toBe("pm_abc_track")
    expect(result.fill).toBe("pm_abc_fill")
  })

  it("maps variant classes correctly", () => {
    const result = progressBarModuleClasses(mockClassMap, { variant: "success" })
    expect(result.root).toContain("pm_abc_success")
  })

  it("maps modifier classes correctly", () => {
    const result = progressBarModuleClasses(mockClassMap, { striped: true, animated: true })
    expect(result.root).toContain("pm_abc_striped")
    expect(result.root).toContain("pm_abc_animated")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-progress-bar": "pm_abc_progressBar",
    }
    const result = progressBarModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_progressBar")
    expect(result.root).not.toContain("undefined")
    expect(result.track).toBe("")
    expect(result.fill).toBe("")
  })
})
