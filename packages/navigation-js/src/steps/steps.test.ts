import { describe, it, expect } from "vitest"
import {
  stepsClasses,
  stepsModuleClasses,
  stepClasses,
  stepModuleClasses,
  stepIndicatorClasses,
  stepIndicatorModuleClasses,
  stepConnectorClasses,
  stepConnectorModuleClasses,
  stepContentClasses,
  stepContentModuleClasses,
} from "./steps.classes.js"

describe("stepsClasses", () => {
  it("returns default classes (md, horizontal)", () => {
    const result = stepsClasses()
    expect(result).toBe("pm-steps pm-steps--md pm-steps--horizontal")
  })

  it("applies size", () => {
    expect(stepsClasses({ size: "sm" })).toContain("pm-steps--sm")
    expect(stepsClasses({ size: "lg" })).toContain("pm-steps--lg")
  })

  it("applies orientation", () => {
    expect(stepsClasses({ orientation: "vertical" })).toContain("pm-steps--vertical")
    expect(stepsClasses({ orientation: "horizontal" })).toContain("pm-steps--horizontal")
  })

  it("always includes base class", () => {
    expect(stepsClasses()).toMatch(/^pm-steps\s/)
  })

  it("combines multiple options", () => {
    const result = stepsClasses({ size: "lg", orientation: "vertical" })
    expect(result).toBe("pm-steps pm-steps--lg pm-steps--vertical")
  })
})

describe("stepsModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-steps": "pm_abc_steps",
    "pm-steps--md": "pm_abc_md",
    "pm-steps--horizontal": "pm_abc_horizontal",
  }

  it("returns mapped default classes", () => {
    const result = stepsModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_steps pm_abc_md pm_abc_horizontal")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-steps": "pm_abc_steps",
    }
    const result = stepsModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_steps")
    expect(result).not.toContain("undefined")
  })
})

describe("stepClasses", () => {
  it("returns default step classes (incomplete)", () => {
    const result = stepClasses()
    expect(result).toBe("pm-steps__step pm-steps__step--incomplete")
  })

  it("applies status", () => {
    expect(stepClasses({ status: "active" })).toContain("pm-steps__step--active")
    expect(stepClasses({ status: "complete" })).toContain("pm-steps__step--complete")
    expect(stepClasses({ status: "incomplete" })).toContain("pm-steps__step--incomplete")
  })
})

describe("stepModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-steps__step": "pm_abc_step",
    "pm-steps__step--incomplete": "pm_abc_incomplete",
    "pm-steps__step--active": "pm_abc_active",
    "pm-steps__step--complete": "pm_abc_complete",
  }

  it("returns mapped step classes", () => {
    expect(stepModuleClasses(mockClassMap)).toBe("pm_abc_step pm_abc_incomplete")
  })

  it("maps status correctly", () => {
    expect(stepModuleClasses(mockClassMap, { status: "active" })).toContain("pm_abc_active")
  })
})

describe("stepIndicatorClasses", () => {
  it("returns default indicator classes (incomplete)", () => {
    const result = stepIndicatorClasses()
    expect(result).toBe("pm-steps__indicator pm-steps__indicator--incomplete")
  })

  it("applies status", () => {
    expect(stepIndicatorClasses({ status: "active" })).toContain(
      "pm-steps__indicator--active",
    )
    expect(stepIndicatorClasses({ status: "complete" })).toContain(
      "pm-steps__indicator--complete",
    )
  })
})

describe("stepIndicatorModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-steps__indicator": "pm_abc_indicator",
    "pm-steps__indicator--incomplete": "pm_abc_incomplete",
    "pm-steps__indicator--active": "pm_abc_active",
  }

  it("returns mapped indicator classes", () => {
    expect(stepIndicatorModuleClasses(mockClassMap)).toBe("pm_abc_indicator pm_abc_incomplete")
  })

  it("maps status correctly", () => {
    expect(stepIndicatorModuleClasses(mockClassMap, { status: "active" })).toContain(
      "pm_abc_active",
    )
  })
})

describe("stepConnectorClasses", () => {
  it("returns default connector classes (incomplete)", () => {
    const result = stepConnectorClasses()
    expect(result).toBe("pm-steps__connector pm-steps__connector--incomplete")
  })

  it("applies status", () => {
    expect(stepConnectorClasses({ status: "complete" })).toContain(
      "pm-steps__connector--complete",
    )
    expect(stepConnectorClasses({ status: "active" })).toContain(
      "pm-steps__connector--active",
    )
  })
})

describe("stepConnectorModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-steps__connector": "pm_abc_connector",
    "pm-steps__connector--incomplete": "pm_abc_incomplete",
    "pm-steps__connector--complete": "pm_abc_complete",
  }

  it("returns mapped connector classes", () => {
    expect(stepConnectorModuleClasses(mockClassMap)).toBe("pm_abc_connector pm_abc_incomplete")
  })

  it("maps status correctly", () => {
    expect(stepConnectorModuleClasses(mockClassMap, { status: "complete" })).toContain(
      "pm_abc_complete",
    )
  })
})

describe("stepContentClasses", () => {
  it("returns content class", () => {
    expect(stepContentClasses()).toBe("pm-steps__content")
  })
})

describe("stepContentModuleClasses", () => {
  it("returns mapped content class", () => {
    const mockClassMap = { "pm-steps__content": "pm_abc_content" }
    expect(stepContentModuleClasses(mockClassMap)).toBe("pm_abc_content")
  })

  it("handles missing class map entry gracefully", () => {
    expect(stepContentModuleClasses({})).toBe("")
  })
})
