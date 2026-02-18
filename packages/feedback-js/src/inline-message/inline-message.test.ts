import { describe, it, expect } from "vitest"
import { inlineMessageClasses, inlineMessageModuleClasses } from "./inline-message.classes.js"

describe("inlineMessageClasses", () => {
  it("returns default classes (info)", () => {
    const result = inlineMessageClasses()
    expect(result).toBe("pm-inline-message pm-inline-message--info")
  })

  it("applies variant", () => {
    expect(inlineMessageClasses({ variant: "info" })).toContain("pm-inline-message--info")
    expect(inlineMessageClasses({ variant: "success" })).toContain("pm-inline-message--success")
    expect(inlineMessageClasses({ variant: "warning" })).toContain("pm-inline-message--warning")
    expect(inlineMessageClasses({ variant: "danger" })).toContain("pm-inline-message--danger")
  })

  it("always includes base class", () => {
    expect(inlineMessageClasses()).toMatch(/^pm-inline-message\s/)
  })

  it("does not include other variant when one is set", () => {
    const result = inlineMessageClasses({ variant: "success" })
    expect(result).not.toContain("pm-inline-message--info")
    expect(result).not.toContain("pm-inline-message--warning")
    expect(result).not.toContain("pm-inline-message--danger")
  })
})

describe("inlineMessageModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-inline-message": "pm_abc_inlineMessage",
    "pm-inline-message--info": "pm_abc_info",
    "pm-inline-message--success": "pm_abc_success",
    "pm-inline-message--warning": "pm_abc_warning",
    "pm-inline-message--danger": "pm_abc_danger",
  }

  it("returns mapped default classes", () => {
    const result = inlineMessageModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_inlineMessage pm_abc_info")
  })

  it("maps variant classes correctly", () => {
    const result = inlineMessageModuleClasses(mockClassMap, { variant: "success" })
    expect(result).toContain("pm_abc_success")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-inline-message": "pm_abc_inlineMessage",
    }
    const result = inlineMessageModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_inlineMessage")
    expect(result).not.toContain("undefined")
  })
})
