import { describe, it, expect } from "vitest"
import { inlineMsgClasses, inlineMsgModuleClasses } from "./inline-message.classes.js"

describe("inlineMsgClasses", () => {
  it("returns default classes (info)", () => {
    const result = inlineMsgClasses()
    expect(result).toBe("pm-inline-msg pm-inline-msg--info")
  })

  it("applies variant", () => {
    expect(inlineMsgClasses({ variant: "info" })).toContain("pm-inline-msg--info")
    expect(inlineMsgClasses({ variant: "success" })).toContain("pm-inline-msg--success")
    expect(inlineMsgClasses({ variant: "warning" })).toContain("pm-inline-msg--warning")
    expect(inlineMsgClasses({ variant: "danger" })).toContain("pm-inline-msg--danger")
  })

  it("always includes base class", () => {
    expect(inlineMsgClasses()).toMatch(/^pm-inline-msg\s/)
  })

  it("does not include other variant when one is set", () => {
    const result = inlineMsgClasses({ variant: "success" })
    expect(result).not.toContain("pm-inline-msg--info")
    expect(result).not.toContain("pm-inline-msg--warning")
    expect(result).not.toContain("pm-inline-msg--danger")
  })
})

describe("inlineMsgModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-inline-msg": "pm_abc_inlineMessage",
    "pm-inline-msg--info": "pm_abc_info",
    "pm-inline-msg--success": "pm_abc_success",
    "pm-inline-msg--warning": "pm_abc_warning",
    "pm-inline-msg--danger": "pm_abc_danger",
  }

  it("returns mapped default classes", () => {
    const result = inlineMsgModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_inlineMessage pm_abc_info")
  })

  it("maps variant classes correctly", () => {
    const result = inlineMsgModuleClasses(mockClassMap, { variant: "success" })
    expect(result).toContain("pm_abc_success")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-inline-msg": "pm_abc_inlineMessage",
    }
    const result = inlineMsgModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_inlineMessage")
    expect(result).not.toContain("undefined")
  })
})
