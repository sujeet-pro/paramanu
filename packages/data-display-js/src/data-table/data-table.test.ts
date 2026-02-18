import { describe, it, expect } from "vitest"
import {
  dataTableClasses,
  dataTableHeaderCellClasses,
  dataTableModuleClasses,
} from "./data-table.classes.js"

describe("dataTableClasses", () => {
  it("returns default classes (simple, md)", () => {
    const result = dataTableClasses()
    expect(result.root).toBe("pm-data-table pm-data-table--simple pm-data-table--md")
    expect(result.table).toBe("pm-data-table__table")
    expect(result.toolbar).toBe("pm-data-table__toolbar")
    expect(result.headerCell).toBe("pm-data-table__header-cell")
    expect(result.cell).toBe("pm-data-table__cell")
    expect(result.row).toBe("pm-data-table__row")
    expect(result.pagination).toBe("pm-data-table__pagination")
  })

  it("applies variant", () => {
    expect(dataTableClasses({ variant: "striped" }).root).toContain("pm-data-table--striped")
  })

  it("applies size", () => {
    expect(dataTableClasses({ size: "sm" }).root).toContain("pm-data-table--sm")
    expect(dataTableClasses({ size: "lg" }).root).toContain("pm-data-table--lg")
  })

  it("applies hoverable modifier", () => {
    expect(dataTableClasses({ hoverable: true }).root).toContain("pm-data-table--hoverable")
    expect(dataTableClasses({ hoverable: false }).root).not.toContain("pm-data-table--hoverable")
  })

  it("applies bordered modifier", () => {
    expect(dataTableClasses({ bordered: true }).root).toContain("pm-data-table--bordered")
  })

  it("applies stickyHeader modifier", () => {
    expect(dataTableClasses({ stickyHeader: true }).root).toContain(
      "pm-data-table--sticky-header",
    )
  })

  it("applies selectable modifier", () => {
    expect(dataTableClasses({ selectable: true }).root).toContain("pm-data-table--selectable")
  })

  it("combines multiple options", () => {
    const result = dataTableClasses({
      variant: "striped",
      size: "lg",
      hoverable: true,
      bordered: true,
      stickyHeader: true,
      selectable: true,
    })
    expect(result.root).toBe(
      "pm-data-table pm-data-table--striped pm-data-table--lg pm-data-table--hoverable pm-data-table--bordered pm-data-table--sticky-header pm-data-table--selectable",
    )
  })
})

describe("dataTableHeaderCellClasses", () => {
  it("returns base header cell class", () => {
    expect(dataTableHeaderCellClasses()).toBe("pm-data-table__header-cell")
  })

  it("applies sortable modifier", () => {
    expect(dataTableHeaderCellClasses({ sortable: true })).toContain(
      "pm-data-table__header-cell--sortable",
    )
  })

  it("applies sort direction", () => {
    expect(dataTableHeaderCellClasses({ sortDirection: "asc" })).toContain(
      "pm-data-table__header-cell--sort-asc",
    )
    expect(dataTableHeaderCellClasses({ sortDirection: "desc" })).toContain(
      "pm-data-table__header-cell--sort-desc",
    )
  })

  it("does not apply sort class for none direction", () => {
    expect(dataTableHeaderCellClasses({ sortDirection: "none" })).not.toContain(
      "pm-data-table__header-cell--sort",
    )
  })

  it("applies alignment", () => {
    expect(dataTableHeaderCellClasses({ align: "center" })).toContain(
      "pm-data-table__header-cell--align-center",
    )
    expect(dataTableHeaderCellClasses({ align: "end" })).toContain(
      "pm-data-table__header-cell--align-end",
    )
  })

  it("does not apply alignment for start (default)", () => {
    expect(dataTableHeaderCellClasses({ align: "start" })).not.toContain(
      "pm-data-table__header-cell--align",
    )
  })
})

describe("dataTableModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-data-table": "pm_abc_dataTable",
    "pm-data-table--simple": "pm_abc_simple",
    "pm-data-table--md": "pm_abc_md",
    "pm-data-table__table": "pm_abc_table",
    "pm-data-table__toolbar": "pm_abc_toolbar",
    "pm-data-table__header-cell": "pm_abc_headerCell",
    "pm-data-table__cell": "pm_abc_cell",
    "pm-data-table__row": "pm_abc_row",
    "pm-data-table__pagination": "pm_abc_pagination",
  }

  it("returns mapped default classes", () => {
    const result = dataTableModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_dataTable pm_abc_simple pm_abc_md")
    expect(result.table).toBe("pm_abc_table")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-data-table": "pm_abc_dataTable",
    }
    const result = dataTableModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_dataTable")
    expect(result.root).not.toContain("undefined")
  })
})
