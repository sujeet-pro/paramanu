import { describe, it, expect } from "vitest"
import { inlineMsgClasses, inlineMsgModuleClasses } from "./inline-message.classes.js"

describe("inlineMsgClasses", () => {
  it("returns default classes (info, md)", () => {
    const result = inlineMsgClasses()
    expect(result.root).toBe("pm-inline-msg pm-inline-msg--info pm-inline-msg--md")
    expect(result.icon).toBe("pm-inline-msg__icon")
    expect(result.content).toBe("pm-inline-msg__content")
  })

  it("applies variant", () => {
    expect(inlineMsgClasses({ variant: "info" }).root).toContain("pm-inline-msg--info")
    expect(inlineMsgClasses({ variant: "success" }).root).toContain("pm-inline-msg--success")
    expect(inlineMsgClasses({ variant: "warning" }).root).toContain("pm-inline-msg--warning")
    expect(inlineMsgClasses({ variant: "danger" }).root).toContain("pm-inline-msg--danger")
  })

  it("applies size", () => {
    expect(inlineMsgClasses({ size: "sm" }).root).toContain("pm-inline-msg--sm")
    expect(inlineMsgClasses({ size: "md" }).root).toContain("pm-inline-msg--md")
    expect(inlineMsgClasses({ size: "lg" }).root).toContain("pm-inline-msg--lg")
  })

  it("always includes base class", () => {
    expect(inlineMsgClasses().root).toMatch(/^pm-inline-msg\s/)
  })

  it("does not include other variant when one is set", () => {
    const result = inlineMsgClasses({ variant: "success" })
    expect(result.root).not.toContain("pm-inline-msg--info")
    expect(result.root).not.toContain("pm-inline-msg--warning")
    expect(result.root).not.toContain("pm-inline-msg--danger")
  })

  it("returns all sub-element classes", () => {
    const result = inlineMsgClasses()
    expect(result).toHaveProperty("root")
    expect(result).toHaveProperty("icon")
    expect(result).toHaveProperty("content")
  })
})

describe("inlineMsgModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-inline-msg": "pm_abc_inlineMessage",
    "pm-inline-msg--info": "pm_abc_info",
    "pm-inline-msg--success": "pm_abc_success",
    "pm-inline-msg--warning": "pm_abc_warning",
    "pm-inline-msg--danger": "pm_abc_danger",
    "pm-inline-msg--sm": "pm_abc_sm",
    "pm-inline-msg--md": "pm_abc_md",
    "pm-inline-msg--lg": "pm_abc_lg",
    "pm-inline-msg__icon": "pm_abc_icon",
    "pm-inline-msg__content": "pm_abc_content",
  }

  it("returns mapped default classes", () => {
    const result = inlineMsgModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_inlineMessage pm_abc_info pm_abc_md")
    expect(result.icon).toBe("pm_abc_icon")
    expect(result.content).toBe("pm_abc_content")
  })

  it("maps variant classes correctly", () => {
    const result = inlineMsgModuleClasses(mockClassMap, { variant: "success" })
    expect(result.root).toContain("pm_abc_success")
  })

  it("maps size classes correctly", () => {
    const result = inlineMsgModuleClasses(mockClassMap, { size: "sm" })
    expect(result.root).toContain("pm_abc_sm")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-inline-msg": "pm_abc_inlineMessage",
    }
    const result = inlineMsgModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_inlineMessage")
    expect(result.root).not.toContain("undefined")
    expect(result.icon).toBe("")
    expect(result.content).toBe("")
  })
})
