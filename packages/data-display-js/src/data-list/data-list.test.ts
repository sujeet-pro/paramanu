import { describe, it, expect } from "vitest"
import { dataListClasses, dataListModuleClasses } from "./data-list.classes.js"

describe("dataListClasses", () => {
  it("returns default classes (vertical, md)", () => {
    const result = dataListClasses()
    expect(result.root).toBe("pm-data-list pm-data-list--vertical pm-data-list--md")
  })

  it("returns correct sub-part class names", () => {
    const result = dataListClasses()
    expect(result.item).toBe("pm-data-list__item")
    expect(result.term).toBe("pm-data-list__term")
    expect(result.detail).toBe("pm-data-list__detail")
  })

  it("applies orientation", () => {
    expect(dataListClasses({ orientation: "horizontal" }).root).toContain(
      "pm-data-list--horizontal",
    )
    expect(dataListClasses({ orientation: "vertical" }).root).toContain("pm-data-list--vertical")
  })

  it("applies size", () => {
    expect(dataListClasses({ size: "sm" }).root).toContain("pm-data-list--sm")
    expect(dataListClasses({ size: "lg" }).root).toContain("pm-data-list--lg")
  })

  it("applies dividers modifier", () => {
    expect(dataListClasses({ dividers: true }).root).toContain("pm-data-list--dividers")
    expect(dataListClasses({ dividers: false }).root).not.toContain("pm-data-list--dividers")
  })

  it("always includes base class", () => {
    expect(dataListClasses().root).toMatch(/^pm-data-list\s/)
  })

  it("combines multiple options", () => {
    const result = dataListClasses({
      orientation: "horizontal",
      size: "lg",
      dividers: true,
    })
    expect(result.root).toBe(
      "pm-data-list pm-data-list--horizontal pm-data-list--lg pm-data-list--dividers",
    )
  })
})

describe("dataListModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-data-list": "pm_abc_dataList",
    "pm-data-list--vertical": "pm_abc_vertical",
    "pm-data-list--horizontal": "pm_abc_horizontal",
    "pm-data-list--md": "pm_abc_md",
    "pm-data-list--sm": "pm_abc_sm",
    "pm-data-list--dividers": "pm_abc_dividers",
    "pm-data-list__item": "pm_abc_item",
    "pm-data-list__term": "pm_abc_term",
    "pm-data-list__detail": "pm_abc_detail",
  }

  it("returns mapped default classes", () => {
    const result = dataListModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_dataList pm_abc_vertical pm_abc_md")
  })

  it("maps sub-part classes correctly", () => {
    const result = dataListModuleClasses(mockClassMap)
    expect(result.item).toBe("pm_abc_item")
    expect(result.term).toBe("pm_abc_term")
    expect(result.detail).toBe("pm_abc_detail")
  })

  it("maps orientation classes correctly", () => {
    const result = dataListModuleClasses(mockClassMap, { orientation: "horizontal" })
    expect(result.root).toContain("pm_abc_horizontal")
  })

  it("maps dividers class", () => {
    const result = dataListModuleClasses(mockClassMap, { dividers: true })
    expect(result.root).toContain("pm_abc_dividers")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-data-list": "pm_abc_dataList",
    }
    const result = dataListModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_dataList")
    expect(result.root).not.toContain("undefined")
    expect(result.item).toBe("")
  })
})
