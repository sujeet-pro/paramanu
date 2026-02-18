import { describe, it, expect } from "vitest"
import {
  structuredListClasses,
  structuredListModuleClasses,
} from "./structured-list.classes.js"

describe("structuredListClasses", () => {
  it("returns default classes (md)", () => {
    const result = structuredListClasses()
    expect(result.root).toBe("pm-structured-list pm-structured-list--md")
  })

  it("returns correct sub-part class names", () => {
    const result = structuredListClasses()
    expect(result.head).toBe("pm-structured-list__head")
    expect(result.body).toBe("pm-structured-list__body")
    expect(result.row).toBe("pm-structured-list__row")
    expect(result.cell).toBe("pm-structured-list__cell")
    expect(result.headerCell).toBe("pm-structured-list__header-cell")
  })

  it("applies size", () => {
    expect(structuredListClasses({ size: "sm" }).root).toContain("pm-structured-list--sm")
    expect(structuredListClasses({ size: "md" }).root).toContain("pm-structured-list--md")
  })

  it("applies selectable modifier", () => {
    expect(structuredListClasses({ selectable: true }).root).toContain(
      "pm-structured-list--selectable",
    )
    expect(structuredListClasses({ selectable: false }).root).not.toContain(
      "pm-structured-list--selectable",
    )
  })

  it("applies bordered modifier", () => {
    expect(structuredListClasses({ bordered: true }).root).toContain(
      "pm-structured-list--bordered",
    )
    expect(structuredListClasses({ bordered: false }).root).not.toContain(
      "pm-structured-list--bordered",
    )
  })

  it("always includes base class", () => {
    expect(structuredListClasses().root).toMatch(/^pm-structured-list\s/)
  })

  it("combines multiple options", () => {
    const result = structuredListClasses({
      size: "sm",
      selectable: true,
      bordered: true,
    })
    expect(result.root).toBe(
      "pm-structured-list pm-structured-list--sm pm-structured-list--selectable pm-structured-list--bordered",
    )
  })
})

describe("structuredListModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-structured-list": "pm_abc_structuredList",
    "pm-structured-list--md": "pm_abc_md",
    "pm-structured-list--sm": "pm_abc_sm",
    "pm-structured-list--selectable": "pm_abc_selectable",
    "pm-structured-list--bordered": "pm_abc_bordered",
    "pm-structured-list__head": "pm_abc_head",
    "pm-structured-list__body": "pm_abc_body",
    "pm-structured-list__row": "pm_abc_row",
    "pm-structured-list__cell": "pm_abc_cell",
    "pm-structured-list__header-cell": "pm_abc_headerCell",
  }

  it("returns mapped default classes", () => {
    const result = structuredListModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_structuredList pm_abc_md")
  })

  it("maps sub-part classes correctly", () => {
    const result = structuredListModuleClasses(mockClassMap)
    expect(result.head).toBe("pm_abc_head")
    expect(result.body).toBe("pm_abc_body")
    expect(result.row).toBe("pm_abc_row")
    expect(result.cell).toBe("pm_abc_cell")
    expect(result.headerCell).toBe("pm_abc_headerCell")
  })

  it("maps selectable class", () => {
    const result = structuredListModuleClasses(mockClassMap, { selectable: true })
    expect(result.root).toContain("pm_abc_selectable")
  })

  it("maps bordered class", () => {
    const result = structuredListModuleClasses(mockClassMap, { bordered: true })
    expect(result.root).toContain("pm_abc_bordered")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-structured-list": "pm_abc_structuredList",
    }
    const result = structuredListModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_structuredList")
    expect(result.root).not.toContain("undefined")
    expect(result.head).toBe("")
  })
})
