import { describe, it, expect } from "vitest"
import { tableClasses, tableModuleClasses } from "./table.classes.js"

describe("tableClasses", () => {
  it("returns default classes (simple, md, auto)", () => {
    const result = tableClasses()
    expect(result.root).toBe("pm-table pm-table--simple pm-table--md pm-table--layout-auto")
  })

  it("returns correct sub-part class names", () => {
    const result = tableClasses()
    expect(result.container).toBe("pm-table__container")
    expect(result.caption).toBe("pm-table__caption")
    expect(result.head).toBe("pm-table__head")
    expect(result.body).toBe("pm-table__body")
    expect(result.foot).toBe("pm-table__foot")
    expect(result.row).toBe("pm-table__row")
    expect(result.headerCell).toBe("pm-table__header-cell")
    expect(result.cell).toBe("pm-table__cell")
  })

  it("applies variant", () => {
    expect(tableClasses({ variant: "striped" }).root).toContain("pm-table--striped")
    expect(tableClasses({ variant: "simple" }).root).toContain("pm-table--simple")
  })

  it("applies size", () => {
    expect(tableClasses({ size: "sm" }).root).toContain("pm-table--sm")
    expect(tableClasses({ size: "lg" }).root).toContain("pm-table--lg")
  })

  it("applies layout", () => {
    expect(tableClasses({ layout: "fixed" }).root).toContain("pm-table--layout-fixed")
    expect(tableClasses({ layout: "auto" }).root).toContain("pm-table--layout-auto")
  })

  it("applies hoverable modifier", () => {
    expect(tableClasses({ hoverable: true }).root).toContain("pm-table--hoverable")
    expect(tableClasses({ hoverable: false }).root).not.toContain("pm-table--hoverable")
  })

  it("applies bordered modifier", () => {
    expect(tableClasses({ bordered: true }).root).toContain("pm-table--bordered")
    expect(tableClasses({ bordered: false }).root).not.toContain("pm-table--bordered")
  })

  it("applies sticky-header modifier", () => {
    expect(tableClasses({ stickyHeader: true }).root).toContain("pm-table--sticky-header")
    expect(tableClasses({ stickyHeader: false }).root).not.toContain("pm-table--sticky-header")
  })

  it("always includes base class", () => {
    expect(tableClasses().root).toMatch(/^pm-table\s/)
  })

  it("combines multiple options", () => {
    const result = tableClasses({
      variant: "striped",
      size: "lg",
      layout: "fixed",
      hoverable: true,
      bordered: true,
      stickyHeader: true,
    })
    expect(result.root).toBe(
      "pm-table pm-table--striped pm-table--lg pm-table--layout-fixed pm-table--hoverable pm-table--bordered pm-table--sticky-header",
    )
  })
})

describe("tableModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-table": "pm_abc_table",
    "pm-table--simple": "pm_abc_simple",
    "pm-table--striped": "pm_abc_striped",
    "pm-table--md": "pm_abc_md",
    "pm-table--sm": "pm_abc_sm",
    "pm-table--layout-auto": "pm_abc_layoutAuto",
    "pm-table--layout-fixed": "pm_abc_layoutFixed",
    "pm-table--hoverable": "pm_abc_hoverable",
    "pm-table--bordered": "pm_abc_bordered",
    "pm-table--sticky-header": "pm_abc_stickyHeader",
    "pm-table__container": "pm_abc_container",
    "pm-table__caption": "pm_abc_caption",
    "pm-table__head": "pm_abc_head",
    "pm-table__body": "pm_abc_body",
    "pm-table__foot": "pm_abc_foot",
    "pm-table__row": "pm_abc_row",
    "pm-table__header-cell": "pm_abc_headerCell",
    "pm-table__cell": "pm_abc_cell",
  }

  it("returns mapped default classes", () => {
    const result = tableModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_table pm_abc_simple pm_abc_md pm_abc_layoutAuto")
  })

  it("maps sub-part classes correctly", () => {
    const result = tableModuleClasses(mockClassMap)
    expect(result.container).toBe("pm_abc_container")
    expect(result.caption).toBe("pm_abc_caption")
    expect(result.head).toBe("pm_abc_head")
    expect(result.body).toBe("pm_abc_body")
    expect(result.foot).toBe("pm_abc_foot")
    expect(result.row).toBe("pm_abc_row")
    expect(result.headerCell).toBe("pm_abc_headerCell")
    expect(result.cell).toBe("pm_abc_cell")
  })

  it("maps variant classes correctly", () => {
    const result = tableModuleClasses(mockClassMap, { variant: "striped" })
    expect(result.root).toContain("pm_abc_striped")
  })

  it("maps hoverable class", () => {
    const result = tableModuleClasses(mockClassMap, { hoverable: true })
    expect(result.root).toContain("pm_abc_hoverable")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-table": "pm_abc_table",
    }
    const result = tableModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_table")
    expect(result.root).not.toContain("undefined")
    expect(result.container).toBe("")
  })
})
