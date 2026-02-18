import { describe, it, expect } from "vitest"
import { imageClasses, imageModuleClasses } from "./image.classes.js"

describe("imageClasses", () => {
  it("returns default classes (cover, no radius)", () => {
    const result = imageClasses()
    expect(result.root).toBe("pm-image pm-image--fit-cover")
    expect(result.img).toBe("pm-image__img")
    expect(result.fallback).toBe("pm-image__fallback")
    expect(result.caption).toBe("pm-image__caption")
  })

  it("applies fit", () => {
    expect(imageClasses({ fit: "contain" }).root).toContain("pm-image--fit-contain")
    expect(imageClasses({ fit: "fill" }).root).toContain("pm-image--fit-fill")
    expect(imageClasses({ fit: "none" }).root).toContain("pm-image--fit-none")
    expect(imageClasses({ fit: "scale-down" }).root).toContain("pm-image--fit-scale-down")
  })

  it("applies radius", () => {
    expect(imageClasses({ radius: "sm" }).root).toContain("pm-image--radius-sm")
    expect(imageClasses({ radius: "md" }).root).toContain("pm-image--radius-md")
    expect(imageClasses({ radius: "lg" }).root).toContain("pm-image--radius-lg")
    expect(imageClasses({ radius: "xl" }).root).toContain("pm-image--radius-xl")
    expect(imageClasses({ radius: "full" }).root).toContain("pm-image--radius-full")
  })

  it("does not add radius class when none", () => {
    expect(imageClasses({ radius: "none" }).root).not.toContain("pm-image--radius")
  })

  it("applies fallback modifier", () => {
    expect(imageClasses({ fallback: true }).root).toContain("pm-image--fallback")
    expect(imageClasses({ fallback: false }).root).not.toContain("pm-image--fallback")
  })

  it("applies loading modifier", () => {
    expect(imageClasses({ loading: true }).root).toContain("pm-image--loading")
    expect(imageClasses({ loading: false }).root).not.toContain("pm-image--loading")
  })

  it("always includes base class in root", () => {
    expect(imageClasses().root).toMatch(/^pm-image\s/)
  })

  it("returns consistent sub-part classes", () => {
    const a = imageClasses({ fit: "cover" })
    const b = imageClasses({ fit: "contain" })
    expect(a.img).toBe(b.img)
    expect(a.fallback).toBe(b.fallback)
    expect(a.caption).toBe(b.caption)
  })

  it("combines multiple options", () => {
    const result = imageClasses({ fit: "contain", radius: "lg", fallback: true, loading: true })
    expect(result.root).toBe(
      "pm-image pm-image--fit-contain pm-image--radius-lg pm-image--fallback pm-image--loading",
    )
  })
})

describe("imageModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-image": "pm_abc_image",
    "pm-image--fit-cover": "pm_abc_cover",
    "pm-image--fit-contain": "pm_abc_contain",
    "pm-image--radius-md": "pm_abc_radius_md",
    "pm-image--fallback": "pm_abc_fallback_mod",
    "pm-image--loading": "pm_abc_loading",
    "pm-image__img": "pm_abc_img",
    "pm-image__fallback": "pm_abc_fallback",
    "pm-image__caption": "pm_abc_caption",
  }

  it("returns mapped default classes", () => {
    const result = imageModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_image pm_abc_cover")
    expect(result.img).toBe("pm_abc_img")
    expect(result.fallback).toBe("pm_abc_fallback")
    expect(result.caption).toBe("pm_abc_caption")
  })

  it("maps fit classes correctly", () => {
    const result = imageModuleClasses(mockClassMap, { fit: "contain" })
    expect(result.root).toContain("pm_abc_contain")
  })

  it("maps radius classes correctly", () => {
    const result = imageModuleClasses(mockClassMap, { radius: "md" })
    expect(result.root).toContain("pm_abc_radius_md")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-image": "pm_abc_image",
    }
    const result = imageModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_image")
    expect(result.root).not.toContain("undefined")
    expect(result.img).toBe("")
    expect(result.fallback).toBe("")
    expect(result.caption).toBe("")
  })
})
