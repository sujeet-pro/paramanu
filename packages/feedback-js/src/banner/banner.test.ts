import { describe, it, expect } from "vitest"
import { bannerClasses, bannerModuleClasses } from "./banner.classes.js"

describe("bannerClasses", () => {
  it("returns default classes (info, not sticky, not dismissible, top)", () => {
    const result = bannerClasses()
    expect(result.root).toBe("pm-banner pm-banner--info pm-banner--top")
    expect(result.content).toBe("pm-banner__content")
    expect(result.close).toBe("pm-banner__close")
  })

  it("applies variant", () => {
    expect(bannerClasses({ variant: "info" }).root).toContain("pm-banner--info")
    expect(bannerClasses({ variant: "success" }).root).toContain("pm-banner--success")
    expect(bannerClasses({ variant: "warning" }).root).toContain("pm-banner--warning")
    expect(bannerClasses({ variant: "danger" }).root).toContain("pm-banner--danger")
  })

  it("applies sticky modifier", () => {
    expect(bannerClasses({ sticky: true }).root).toContain("pm-banner--sticky")
    expect(bannerClasses({ sticky: false }).root).not.toContain("pm-banner--sticky")
  })

  it("applies dismissible modifier", () => {
    expect(bannerClasses({ dismissible: true }).root).toContain("pm-banner--dismissible")
    expect(bannerClasses({ dismissible: false }).root).not.toContain("pm-banner--dismissible")
  })

  it("always includes base class in root", () => {
    expect(bannerClasses().root).toMatch(/^pm-banner\s/)
  })

  it("combines multiple options", () => {
    const result = bannerClasses({
      variant: "warning",
      sticky: true,
      dismissible: true,
    })
    expect(result.root).toBe(
      "pm-banner pm-banner--warning pm-banner--sticky pm-banner--dismissible pm-banner--top",
    )
  })

  it("returns all sub-element classes", () => {
    const result = bannerClasses()
    expect(result).toHaveProperty("root")
    expect(result).toHaveProperty("content")
    expect(result).toHaveProperty("close")
  })
})

describe("bannerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-banner": "pm_abc_banner",
    "pm-banner--info": "pm_abc_info",
    "pm-banner--success": "pm_abc_success",
    "pm-banner--warning": "pm_abc_warning",
    "pm-banner--danger": "pm_abc_danger",
    "pm-banner--sticky": "pm_abc_sticky",
    "pm-banner--dismissible": "pm_abc_dismissible",
    "pm-banner--top": "pm_abc_top",
    "pm-banner--bottom": "pm_abc_bottom",
    "pm-banner__icon": "pm_abc_icon",
    "pm-banner__content": "pm_abc_content",
    "pm-banner__actions": "pm_abc_actions",
    "pm-banner__close": "pm_abc_close",
  }

  it("returns mapped default classes", () => {
    const result = bannerModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_banner pm_abc_info pm_abc_top")
    expect(result.content).toBe("pm_abc_content")
    expect(result.close).toBe("pm_abc_close")
  })

  it("maps variant classes correctly", () => {
    const result = bannerModuleClasses(mockClassMap, { variant: "warning" })
    expect(result.root).toContain("pm_abc_warning")
  })

  it("maps sticky class", () => {
    const result = bannerModuleClasses(mockClassMap, { sticky: true })
    expect(result.root).toContain("pm_abc_sticky")
  })

  it("maps dismissible class", () => {
    const result = bannerModuleClasses(mockClassMap, { dismissible: true })
    expect(result.root).toContain("pm_abc_dismissible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-banner": "pm_abc_banner",
    }
    const result = bannerModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_banner")
    expect(result.root).not.toContain("undefined")
    expect(result.content).toBe("")
    expect(result.close).toBe("")
  })
})
