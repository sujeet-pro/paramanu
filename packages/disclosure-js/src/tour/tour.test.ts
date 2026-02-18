import { describe, it, expect } from "vitest"
import {
  tourClasses,
  tourModuleClasses,
  tourStepClasses,
  tourStepModuleClasses,
  tourOverlayClasses,
  tourOverlayModuleClasses,
} from "./tour.classes.js"

describe("tourClasses", () => {
  it("returns default classes (closed)", () => {
    const result = tourClasses()
    expect(result).toBe("pm-tour")
  })

  it("applies open modifier", () => {
    expect(tourClasses({ open: true })).toContain("pm-tour--open")
    expect(tourClasses({ open: false })).not.toContain("pm-tour--open")
  })

  it("always includes base class", () => {
    expect(tourClasses()).toMatch(/^pm-tour/)
    expect(tourClasses({ open: true })).toMatch(/^pm-tour/)
  })
})

describe("tourModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tour": "pm_abc_tour",
    "pm-tour--open": "pm_abc_tour_open",
  }

  it("returns mapped default classes", () => {
    const result = tourModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_tour")
  })

  it("maps open class", () => {
    const result = tourModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_tour_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-tour": "pm_abc_tour" }
    const result = tourModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_tour")
    expect(result).not.toContain("undefined")
  })
})

describe("tourStepClasses", () => {
  it("returns default classes (bottom placement, not active)", () => {
    const result = tourStepClasses()
    expect(result).toBe("pm-tour__step pm-tour__step--bottom")
  })

  it("applies placement", () => {
    expect(tourStepClasses({ placement: "top" })).toContain("pm-tour__step--top")
    expect(tourStepClasses({ placement: "bottom" })).toContain("pm-tour__step--bottom")
    expect(tourStepClasses({ placement: "left" })).toContain("pm-tour__step--left")
    expect(tourStepClasses({ placement: "right" })).toContain("pm-tour__step--right")
  })

  it("applies active modifier", () => {
    expect(tourStepClasses({ active: true })).toContain("pm-tour__step--active")
    expect(tourStepClasses({ active: false })).not.toContain("pm-tour__step--active")
  })

  it("combines placement and active", () => {
    const result = tourStepClasses({ placement: "top", active: true })
    expect(result).toBe("pm-tour__step pm-tour__step--top pm-tour__step--active")
  })

  it("always includes base class", () => {
    expect(tourStepClasses()).toMatch(/^pm-tour__step/)
  })
})

describe("tourStepModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tour__step": "pm_abc_step",
    "pm-tour__step--bottom": "pm_abc_step_bottom",
    "pm-tour__step--top": "pm_abc_step_top",
    "pm-tour__step--active": "pm_abc_step_active",
  }

  it("returns mapped default classes", () => {
    const result = tourStepModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_step pm_abc_step_bottom")
  })

  it("maps placement class", () => {
    const result = tourStepModuleClasses(mockClassMap, { placement: "top" })
    expect(result).toContain("pm_abc_step_top")
  })

  it("maps active class", () => {
    const result = tourStepModuleClasses(mockClassMap, { active: true })
    expect(result).toContain("pm_abc_step_active")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-tour__step": "pm_abc_step" }
    const result = tourStepModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_step")
    expect(result).not.toContain("undefined")
  })
})

describe("tourOverlayClasses", () => {
  it("returns default classes (not visible)", () => {
    const result = tourOverlayClasses()
    expect(result).toBe("pm-tour__overlay")
  })

  it("applies visible modifier", () => {
    expect(tourOverlayClasses({ visible: true })).toContain("pm-tour__overlay--visible")
    expect(tourOverlayClasses({ visible: false })).not.toContain("pm-tour__overlay--visible")
  })

  it("always includes base class", () => {
    expect(tourOverlayClasses()).toMatch(/^pm-tour__overlay/)
  })
})

describe("tourOverlayModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tour__overlay": "pm_abc_overlay",
    "pm-tour__overlay--visible": "pm_abc_overlay_visible",
  }

  it("returns mapped default classes", () => {
    const result = tourOverlayModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_overlay")
  })

  it("maps visible class", () => {
    const result = tourOverlayModuleClasses(mockClassMap, { visible: true })
    expect(result).toContain("pm_abc_overlay_visible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-tour__overlay": "pm_abc_overlay" }
    const result = tourOverlayModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_overlay")
    expect(result).not.toContain("undefined")
  })
})
