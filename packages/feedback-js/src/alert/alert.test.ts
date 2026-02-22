import { describe, it, expect } from "vitest"
import { alertClasses, alertModuleClasses } from "./alert.classes.js"

describe("alertClasses", () => {
  it("returns default classes (info, subtle, not dismissible)", () => {
    const result = alertClasses()
    expect(result.root).toBe("pm-alert pm-alert--info pm-alert--subtle")
    expect(result.icon).toBe("pm-alert__icon")
    expect(result.content).toBe("pm-alert__content")
    expect(result.title).toBe("pm-alert__title")
    expect(result.description).toBe("pm-alert__description")
    expect(result.close).toBe("pm-alert__close")
  })

  it("applies variant", () => {
    expect(alertClasses({ variant: "info" }).root).toContain("pm-alert--info")
    expect(alertClasses({ variant: "success" }).root).toContain("pm-alert--success")
    expect(alertClasses({ variant: "warning" }).root).toContain("pm-alert--warning")
    expect(alertClasses({ variant: "danger" }).root).toContain("pm-alert--danger")
  })

  it("applies dismissible modifier", () => {
    expect(alertClasses({ dismissible: true }).root).toContain("pm-alert--dismissible")
    expect(alertClasses({ dismissible: false }).root).not.toContain("pm-alert--dismissible")
  })

  it("always includes base class in root", () => {
    expect(alertClasses().root).toMatch(/^pm-alert\s/)
  })

  it("combines multiple options", () => {
    const result = alertClasses({
      variant: "danger",
      dismissible: true,
    })
    expect(result.root).toBe("pm-alert pm-alert--danger pm-alert--subtle pm-alert--dismissible")
  })

  it("returns all sub-element classes", () => {
    const result = alertClasses()
    expect(result).toHaveProperty("root")
    expect(result).toHaveProperty("icon")
    expect(result).toHaveProperty("content")
    expect(result).toHaveProperty("title")
    expect(result).toHaveProperty("description")
    expect(result).toHaveProperty("close")
  })
})

describe("alertModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-alert": "pm_abc_alert",
    "pm-alert--info": "pm_abc_info",
    "pm-alert--success": "pm_abc_success",
    "pm-alert--warning": "pm_abc_warning",
    "pm-alert--danger": "pm_abc_danger",
    "pm-alert--subtle": "pm_abc_subtle",
    "pm-alert--filled": "pm_abc_filled",
    "pm-alert--dismissible": "pm_abc_dismissible",
    "pm-alert__icon": "pm_abc_icon",
    "pm-alert__content": "pm_abc_content",
    "pm-alert__title": "pm_abc_title",
    "pm-alert__description": "pm_abc_description",
    "pm-alert__close": "pm_abc_close",
  }

  it("returns mapped default classes", () => {
    const result = alertModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_alert pm_abc_info pm_abc_subtle")
    expect(result.icon).toBe("pm_abc_icon")
    expect(result.content).toBe("pm_abc_content")
    expect(result.title).toBe("pm_abc_title")
    expect(result.description).toBe("pm_abc_description")
    expect(result.close).toBe("pm_abc_close")
  })

  it("maps variant classes correctly", () => {
    const result = alertModuleClasses(mockClassMap, { variant: "danger" })
    expect(result.root).toContain("pm_abc_danger")
  })

  it("maps dismissible class", () => {
    const result = alertModuleClasses(mockClassMap, { dismissible: true })
    expect(result.root).toContain("pm_abc_dismissible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-alert": "pm_abc_alert",
    }
    const result = alertModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_alert")
    expect(result.root).not.toContain("undefined")
    expect(result.icon).toBe("")
    expect(result.content).toBe("")
  })
})
