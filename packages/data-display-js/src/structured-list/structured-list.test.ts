import { describe, it, expect } from "vitest"
import {
  structListClasses,
  structListModuleClasses,
} from "./structured-list.classes.js"

describe("structListClasses", () => {
  it("returns default classes (md)", () => {
    const result = structListClasses()
    expect(result.root).toBe("pm-struct-list pm-struct-list--md")
  })

  it("returns correct sub-part class names", () => {
    const result = structListClasses()
    expect(result.head).toBe("pm-struct-list__head")
    expect(result.body).toBe("pm-struct-list__body")
    expect(result.row).toBe("pm-struct-list__row")
    expect(result.cell).toBe("pm-struct-list__cell")
    expect(result.headerCell).toBe("pm-struct-list__header-cell")
  })

  it("applies size", () => {
    expect(structListClasses({ size: "sm" }).root).toContain("pm-struct-list--sm")
    expect(structListClasses({ size: "md" }).root).toContain("pm-struct-list--md")
  })

  it("applies selectable modifier", () => {
    expect(structListClasses({ selectable: true }).root).toContain(
      "pm-struct-list--selectable",
    )
    expect(structListClasses({ selectable: false }).root).not.toContain(
      "pm-struct-list--selectable",
    )
  })

  it("applies bordered modifier", () => {
    expect(structListClasses({ bordered: true }).root).toContain(
      "pm-struct-list--bordered",
    )
    expect(structListClasses({ bordered: false }).root).not.toContain(
      "pm-struct-list--bordered",
    )
  })

  it("always includes base class", () => {
    expect(structListClasses().root).toMatch(/^pm-struct-list\s/)
  })

  it("combines multiple options", () => {
    const result = structListClasses({
      size: "sm",
      selectable: true,
      bordered: true,
    })
    expect(result.root).toBe(
      "pm-struct-list pm-struct-list--sm pm-struct-list--selectable pm-struct-list--bordered",
    )
  })
})

describe("structListModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-struct-list": "pm_abc_structuredList",
    "pm-struct-list--md": "pm_abc_md",
    "pm-struct-list--sm": "pm_abc_sm",
    "pm-struct-list--selectable": "pm_abc_selectable",
    "pm-struct-list--bordered": "pm_abc_bordered",
    "pm-struct-list__head": "pm_abc_head",
    "pm-struct-list__body": "pm_abc_body",
    "pm-struct-list__row": "pm_abc_row",
    "pm-struct-list__cell": "pm_abc_cell",
    "pm-struct-list__header-cell": "pm_abc_headerCell",
  }

  it("returns mapped default classes", () => {
    const result = structListModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_structuredList pm_abc_md")
  })

  it("maps sub-part classes correctly", () => {
    const result = structListModuleClasses(mockClassMap)
    expect(result.head).toBe("pm_abc_head")
    expect(result.body).toBe("pm_abc_body")
    expect(result.row).toBe("pm_abc_row")
    expect(result.cell).toBe("pm_abc_cell")
    expect(result.headerCell).toBe("pm_abc_headerCell")
  })

  it("maps selectable class", () => {
    const result = structListModuleClasses(mockClassMap, { selectable: true })
    expect(result.root).toContain("pm_abc_selectable")
  })

  it("maps bordered class", () => {
    const result = structListModuleClasses(mockClassMap, { bordered: true })
    expect(result.root).toContain("pm_abc_bordered")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-struct-list": "pm_abc_structuredList",
    }
    const result = structListModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_structuredList")
    expect(result.root).not.toContain("undefined")
    expect(result.head).toBe("")
  })
})
