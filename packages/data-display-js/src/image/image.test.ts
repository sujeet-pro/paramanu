import { describe, it, expect } from "vitest"
import { imgClasses, imgModuleClasses } from "./image.classes.js"

describe("imgClasses", () => {
  it("returns default classes (cover, no radius)", () => {
    const result = imgClasses()
    expect(result.root).toBe("pm-img pm-img--fit-cover")
    expect(result.img).toBe("pm-img__img")
    expect(result.fallback).toBe("pm-img__fallback")
    expect(result.caption).toBe("pm-img__caption")
  })

  it("applies fit", () => {
    expect(imgClasses({ fit: "contain" }).root).toContain("pm-img--fit-contain")
    expect(imgClasses({ fit: "fill" }).root).toContain("pm-img--fit-fill")
    expect(imgClasses({ fit: "none" }).root).toContain("pm-img--fit-none")
    expect(imgClasses({ fit: "scale-down" }).root).toContain("pm-img--fit-scale-down")
  })

  it("applies radius", () => {
    expect(imgClasses({ radius: "sm" }).root).toContain("pm-img--radius-sm")
    expect(imgClasses({ radius: "md" }).root).toContain("pm-img--radius-md")
    expect(imgClasses({ radius: "lg" }).root).toContain("pm-img--radius-lg")
    expect(imgClasses({ radius: "xl" }).root).toContain("pm-img--radius-xl")
    expect(imgClasses({ radius: "full" }).root).toContain("pm-img--radius-full")
  })

  it("does not add radius class when none", () => {
    expect(imgClasses({ radius: "none" }).root).not.toContain("pm-img--radius")
  })

  it("applies fallback modifier", () => {
    expect(imgClasses({ fallback: true }).root).toContain("pm-img--fallback")
    expect(imgClasses({ fallback: false }).root).not.toContain("pm-img--fallback")
  })

  it("applies loading modifier", () => {
    expect(imgClasses({ loading: true }).root).toContain("pm-img--loading")
    expect(imgClasses({ loading: false }).root).not.toContain("pm-img--loading")
  })

  it("always includes base class in root", () => {
    expect(imgClasses().root).toMatch(/^pm-img\s/)
  })

  it("returns consistent sub-part classes", () => {
    const a = imgClasses({ fit: "cover" })
    const b = imgClasses({ fit: "contain" })
    expect(a.img).toBe(b.img)
    expect(a.fallback).toBe(b.fallback)
    expect(a.caption).toBe(b.caption)
  })

  it("combines multiple options", () => {
    const result = imgClasses({ fit: "contain", radius: "lg", fallback: true, loading: true })
    expect(result.root).toBe(
      "pm-img pm-img--fit-contain pm-img--radius-lg pm-img--fallback pm-img--loading",
    )
  })
})

describe("imgModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-img": "pm_abc_image",
    "pm-img--fit-cover": "pm_abc_cover",
    "pm-img--fit-contain": "pm_abc_contain",
    "pm-img--radius-md": "pm_abc_radius_md",
    "pm-img--fallback": "pm_abc_fallback_mod",
    "pm-img--loading": "pm_abc_loading",
    "pm-img__img": "pm_abc_img",
    "pm-img__fallback": "pm_abc_fallback",
    "pm-img__caption": "pm_abc_caption",
  }

  it("returns mapped default classes", () => {
    const result = imgModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_image pm_abc_cover")
    expect(result.img).toBe("pm_abc_img")
    expect(result.fallback).toBe("pm_abc_fallback")
    expect(result.caption).toBe("pm_abc_caption")
  })

  it("maps fit classes correctly", () => {
    const result = imgModuleClasses(mockClassMap, { fit: "contain" })
    expect(result.root).toContain("pm_abc_contain")
  })

  it("maps radius classes correctly", () => {
    const result = imgModuleClasses(mockClassMap, { radius: "md" })
    expect(result.root).toContain("pm_abc_radius_md")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-img": "pm_abc_image",
    }
    const result = imgModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_image")
    expect(result.root).not.toContain("undefined")
    expect(result.img).toBe("")
    expect(result.fallback).toBe("")
    expect(result.caption).toBe("")
  })
})
