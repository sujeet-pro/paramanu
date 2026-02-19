import { describe, it, expect } from "vitest"
import { avatarGrpClasses, avatarGrpModuleClasses } from "./avatar-group.classes.js"

describe("avatarGrpClasses", () => {
  it("returns default classes (md, normal)", () => {
    const result = avatarGrpClasses()
    expect(result.root).toBe("pm-avatar-grp pm-avatar-grp--md pm-avatar-grp--spacing-normal")
    expect(result.overflow).toBe("pm-avatar-grp__overflow")
  })

  it("applies size", () => {
    expect(avatarGrpClasses({ size: "xs" }).root).toContain("pm-avatar-grp--xs")
    expect(avatarGrpClasses({ size: "lg" }).root).toContain("pm-avatar-grp--lg")
    expect(avatarGrpClasses({ size: "2xl" }).root).toContain("pm-avatar-grp--2xl")
  })

  it("applies spacing", () => {
    expect(avatarGrpClasses({ spacing: "tight" }).root).toContain(
      "pm-avatar-grp--spacing-tight",
    )
    expect(avatarGrpClasses({ spacing: "normal" }).root).toContain(
      "pm-avatar-grp--spacing-normal",
    )
  })
})

describe("avatarGrpModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-avatar-grp": "pm_abc_avatarGroup",
    "pm-avatar-grp--md": "pm_abc_md",
    "pm-avatar-grp--spacing-normal": "pm_abc_spacingNormal",
    "pm-avatar-grp__overflow": "pm_abc_overflow",
  }

  it("returns mapped default classes", () => {
    const result = avatarGrpModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_avatarGroup pm_abc_md pm_abc_spacingNormal")
    expect(result.overflow).toBe("pm_abc_overflow")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-avatar-grp": "pm_abc_avatarGroup",
    }
    const result = avatarGrpModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_avatarGroup")
    expect(result.root).not.toContain("undefined")
  })
})
