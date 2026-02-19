import { describe, it, expect } from "vitest"
import { datalistClasses, datalistModuleClasses } from "./data-list.classes.js"

describe("datalistClasses", () => {
  it("returns default classes (vertical, md)", () => {
    const result = datalistClasses()
    expect(result.root).toBe("pm-datalist pm-datalist--vertical pm-datalist--md")
  })

  it("returns correct sub-part class names", () => {
    const result = datalistClasses()
    expect(result.item).toBe("pm-datalist__item")
    expect(result.term).toBe("pm-datalist__term")
    expect(result.detail).toBe("pm-datalist__detail")
  })

  it("applies orientation", () => {
    expect(datalistClasses({ orientation: "horizontal" }).root).toContain(
      "pm-datalist--horizontal",
    )
    expect(datalistClasses({ orientation: "vertical" }).root).toContain("pm-datalist--vertical")
  })

  it("applies size", () => {
    expect(datalistClasses({ size: "sm" }).root).toContain("pm-datalist--sm")
    expect(datalistClasses({ size: "lg" }).root).toContain("pm-datalist--lg")
  })

  it("applies dividers modifier", () => {
    expect(datalistClasses({ dividers: true }).root).toContain("pm-datalist--dividers")
    expect(datalistClasses({ dividers: false }).root).not.toContain("pm-datalist--dividers")
  })

  it("always includes base class", () => {
    expect(datalistClasses().root).toMatch(/^pm-datalist\s/)
  })

  it("combines multiple options", () => {
    const result = datalistClasses({
      orientation: "horizontal",
      size: "lg",
      dividers: true,
    })
    expect(result.root).toBe(
      "pm-datalist pm-datalist--horizontal pm-datalist--lg pm-datalist--dividers",
    )
  })
})

describe("datalistModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-datalist": "pm_abc_dataList",
    "pm-datalist--vertical": "pm_abc_vertical",
    "pm-datalist--horizontal": "pm_abc_horizontal",
    "pm-datalist--md": "pm_abc_md",
    "pm-datalist--sm": "pm_abc_sm",
    "pm-datalist--dividers": "pm_abc_dividers",
    "pm-datalist__item": "pm_abc_item",
    "pm-datalist__term": "pm_abc_term",
    "pm-datalist__detail": "pm_abc_detail",
  }

  it("returns mapped default classes", () => {
    const result = datalistModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_dataList pm_abc_vertical pm_abc_md")
  })

  it("maps sub-part classes correctly", () => {
    const result = datalistModuleClasses(mockClassMap)
    expect(result.item).toBe("pm_abc_item")
    expect(result.term).toBe("pm_abc_term")
    expect(result.detail).toBe("pm_abc_detail")
  })

  it("maps orientation classes correctly", () => {
    const result = datalistModuleClasses(mockClassMap, { orientation: "horizontal" })
    expect(result.root).toContain("pm_abc_horizontal")
  })

  it("maps dividers class", () => {
    const result = datalistModuleClasses(mockClassMap, { dividers: true })
    expect(result.root).toContain("pm_abc_dividers")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-datalist": "pm_abc_dataList",
    }
    const result = datalistModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_dataList")
    expect(result.root).not.toContain("undefined")
    expect(result.item).toBe("")
  })
})
