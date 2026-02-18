import { describe, it, expect } from "vitest"
import {
  splitterClasses,
  splitterModuleClasses,
  splitterPanelClasses,
  splitterPanelModuleClasses,
  splitterHandleClasses,
  splitterHandleModuleClasses,
} from "./splitter.classes.js"

describe("splitterClasses", () => {
  it("returns default classes (horizontal)", () => {
    const result = splitterClasses()
    expect(result).toBe("pm-splitter pm-splitter--horizontal")
  })

  it("applies horizontal orientation", () => {
    expect(splitterClasses({ orientation: "horizontal" })).toContain("pm-splitter--horizontal")
  })

  it("applies vertical orientation", () => {
    expect(splitterClasses({ orientation: "vertical" })).toContain("pm-splitter--vertical")
  })

  it("applies disabled modifier", () => {
    expect(splitterClasses({ disabled: true })).toContain("pm-splitter--disabled")
  })

  it("does not include disabled when false", () => {
    expect(splitterClasses({ disabled: false })).not.toContain("pm-splitter--disabled")
  })

  it("always includes base class", () => {
    expect(splitterClasses()).toMatch(/^pm-splitter\s/)
  })

  it("combines multiple options", () => {
    const result = splitterClasses({ orientation: "vertical", disabled: true })
    expect(result).toBe("pm-splitter pm-splitter--vertical pm-splitter--disabled")
  })
})

describe("splitterModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-splitter": "pm_abc_splitter",
    "pm-splitter--horizontal": "pm_abc_horizontal",
    "pm-splitter--vertical": "pm_abc_vertical",
    "pm-splitter--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = splitterModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_splitter pm_abc_horizontal")
  })

  it("maps orientation classes correctly", () => {
    const result = splitterModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("maps disabled class correctly", () => {
    const result = splitterModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-splitter": "pm_abc_splitter",
    }
    const result = splitterModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_splitter")
    expect(result).not.toContain("undefined")
  })
})

describe("splitterPanelClasses", () => {
  it("returns default classes", () => {
    const result = splitterPanelClasses()
    expect(result).toBe("pm-splitter__panel")
  })

  it("applies collapsed modifier", () => {
    expect(splitterPanelClasses({ collapsed: true })).toContain("pm-splitter__panel--collapsed")
  })

  it("does not include collapsed when false", () => {
    expect(splitterPanelClasses({ collapsed: false })).not.toContain(
      "pm-splitter__panel--collapsed",
    )
  })

  it("applies collapsible modifier", () => {
    expect(splitterPanelClasses({ collapsible: true })).toContain("pm-splitter__panel--collapsible")
  })

  it("combines multiple options", () => {
    const result = splitterPanelClasses({ collapsed: true, collapsible: true })
    expect(result).toBe(
      "pm-splitter__panel pm-splitter__panel--collapsed pm-splitter__panel--collapsible",
    )
  })
})

describe("splitterPanelModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-splitter__panel": "pm_abc_panel",
    "pm-splitter__panel--collapsed": "pm_abc_collapsed",
    "pm-splitter__panel--collapsible": "pm_abc_collapsible",
  }

  it("returns mapped default classes", () => {
    const result = splitterPanelModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_panel")
  })

  it("maps collapsed class correctly", () => {
    const result = splitterPanelModuleClasses(mockClassMap, { collapsed: true })
    expect(result).toContain("pm_abc_collapsed")
  })

  it("maps collapsible class correctly", () => {
    const result = splitterPanelModuleClasses(mockClassMap, { collapsible: true })
    expect(result).toContain("pm_abc_collapsible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-splitter__panel": "pm_abc_panel",
    }
    const result = splitterPanelModuleClasses(sparseMap, { collapsed: true })
    expect(result).toContain("pm_abc_panel")
    expect(result).not.toContain("undefined")
  })
})

describe("splitterHandleClasses", () => {
  it("returns default classes (horizontal)", () => {
    const result = splitterHandleClasses()
    expect(result).toBe("pm-splitter__handle pm-splitter__handle--horizontal")
  })

  it("applies horizontal orientation", () => {
    expect(splitterHandleClasses({ orientation: "horizontal" })).toContain(
      "pm-splitter__handle--horizontal",
    )
  })

  it("applies vertical orientation", () => {
    expect(splitterHandleClasses({ orientation: "vertical" })).toContain(
      "pm-splitter__handle--vertical",
    )
  })

  it("applies active modifier", () => {
    expect(splitterHandleClasses({ active: true })).toContain("pm-splitter__handle--active")
  })

  it("does not include active when false", () => {
    expect(splitterHandleClasses({ active: false })).not.toContain("pm-splitter__handle--active")
  })

  it("combines multiple options", () => {
    const result = splitterHandleClasses({ orientation: "vertical", active: true })
    expect(result).toBe(
      "pm-splitter__handle pm-splitter__handle--vertical pm-splitter__handle--active",
    )
  })
})

describe("splitterHandleModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-splitter__handle": "pm_abc_handle",
    "pm-splitter__handle--horizontal": "pm_abc_horizontal",
    "pm-splitter__handle--vertical": "pm_abc_vertical",
    "pm-splitter__handle--active": "pm_abc_active",
  }

  it("returns mapped default classes", () => {
    const result = splitterHandleModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_handle pm_abc_horizontal")
  })

  it("maps orientation classes correctly", () => {
    const result = splitterHandleModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("maps active class correctly", () => {
    const result = splitterHandleModuleClasses(mockClassMap, { active: true })
    expect(result).toContain("pm_abc_active")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-splitter__handle": "pm_abc_handle",
    }
    const result = splitterHandleModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_handle")
    expect(result).not.toContain("undefined")
  })
})
