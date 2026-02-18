import { describe, it, expect } from "vitest"
import { avatarGroupClasses, avatarGroupModuleClasses } from "./avatar-group.classes.js"

describe("avatarGroupClasses", () => {
  it("returns default classes (md, normal)", () => {
    const result = avatarGroupClasses()
    expect(result.root).toBe("pm-avatar-group pm-avatar-group--md pm-avatar-group--spacing-normal")
    expect(result.overflow).toBe("pm-avatar-group__overflow")
  })

  it("applies size", () => {
    expect(avatarGroupClasses({ size: "xs" }).root).toContain("pm-avatar-group--xs")
    expect(avatarGroupClasses({ size: "lg" }).root).toContain("pm-avatar-group--lg")
    expect(avatarGroupClasses({ size: "2xl" }).root).toContain("pm-avatar-group--2xl")
  })

  it("applies spacing", () => {
    expect(avatarGroupClasses({ spacing: "tight" }).root).toContain(
      "pm-avatar-group--spacing-tight",
    )
    expect(avatarGroupClasses({ spacing: "normal" }).root).toContain(
      "pm-avatar-group--spacing-normal",
    )
  })
})

describe("avatarGroupModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-avatar-group": "pm_abc_avatarGroup",
    "pm-avatar-group--md": "pm_abc_md",
    "pm-avatar-group--spacing-normal": "pm_abc_spacingNormal",
    "pm-avatar-group__overflow": "pm_abc_overflow",
  }

  it("returns mapped default classes", () => {
    const result = avatarGroupModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_avatarGroup pm_abc_md pm_abc_spacingNormal")
    expect(result.overflow).toBe("pm_abc_overflow")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-avatar-group": "pm_abc_avatarGroup",
    }
    const result = avatarGroupModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_avatarGroup")
    expect(result.root).not.toContain("undefined")
  })
})
