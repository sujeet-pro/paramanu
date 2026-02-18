import { describe, it, expect } from "vitest"
import { avatarClasses, avatarModuleClasses } from "./avatar.classes.js"

describe("avatarClasses", () => {
  it("returns default classes (md, circle, primary)", () => {
    const result = avatarClasses()
    expect(result.root).toBe("pm-avatar pm-avatar--md pm-avatar--circle pm-avatar--primary")
    expect(result.image).toBe("pm-avatar__image")
    expect(result.fallback).toBe("pm-avatar__fallback")
  })

  it("applies size", () => {
    expect(avatarClasses({ size: "xs" }).root).toContain("pm-avatar--xs")
    expect(avatarClasses({ size: "sm" }).root).toContain("pm-avatar--sm")
    expect(avatarClasses({ size: "lg" }).root).toContain("pm-avatar--lg")
    expect(avatarClasses({ size: "xl" }).root).toContain("pm-avatar--xl")
    expect(avatarClasses({ size: "2xl" }).root).toContain("pm-avatar--2xl")
  })

  it("applies variant", () => {
    expect(avatarClasses({ variant: "circle" }).root).toContain("pm-avatar--circle")
    expect(avatarClasses({ variant: "square" }).root).toContain("pm-avatar--square")
  })

  it("applies color", () => {
    expect(avatarClasses({ color: "neutral" }).root).toContain("pm-avatar--neutral")
    expect(avatarClasses({ color: "danger" }).root).toContain("pm-avatar--danger")
    expect(avatarClasses({ color: "success" }).root).toContain("pm-avatar--success")
  })

  it("always includes base class in root", () => {
    expect(avatarClasses().root).toMatch(/^pm-avatar\s/)
  })

  it("returns consistent sub-part classes", () => {
    const a = avatarClasses({ size: "sm" })
    const b = avatarClasses({ size: "xl" })
    expect(a.image).toBe(b.image)
    expect(a.fallback).toBe(b.fallback)
  })

  it("combines multiple options", () => {
    const result = avatarClasses({ size: "xl", variant: "square", color: "danger" })
    expect(result.root).toBe("pm-avatar pm-avatar--xl pm-avatar--square pm-avatar--danger")
  })
})

describe("avatarModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-avatar": "pm_abc_avatar",
    "pm-avatar--md": "pm_abc_md",
    "pm-avatar--lg": "pm_abc_lg",
    "pm-avatar--circle": "pm_abc_circle",
    "pm-avatar--square": "pm_abc_square",
    "pm-avatar--primary": "pm_abc_primary",
    "pm-avatar--neutral": "pm_abc_neutral",
    "pm-avatar__image": "pm_abc_image",
    "pm-avatar__fallback": "pm_abc_fallback",
  }

  it("returns mapped default classes", () => {
    const result = avatarModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_avatar pm_abc_md pm_abc_circle pm_abc_primary")
    expect(result.image).toBe("pm_abc_image")
    expect(result.fallback).toBe("pm_abc_fallback")
  })

  it("maps variant classes correctly", () => {
    const result = avatarModuleClasses(mockClassMap, { variant: "square" })
    expect(result.root).toContain("pm_abc_square")
  })

  it("maps color classes correctly", () => {
    const result = avatarModuleClasses(mockClassMap, { color: "neutral" })
    expect(result.root).toContain("pm_abc_neutral")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-avatar": "pm_abc_avatar",
    }
    const result = avatarModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_avatar")
    expect(result.root).not.toContain("undefined")
    expect(result.image).toBe("")
    expect(result.fallback).toBe("")
  })
})
