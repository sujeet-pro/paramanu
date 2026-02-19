import { describe, it, expect } from "vitest"
import {
  datatableClasses,
  dataTableHeaderCellClasses,
  datatableModuleClasses,
} from "./data-table.classes.js"

describe("datatableClasses", () => {
  it("returns default classes (simple, md)", () => {
    const result = datatableClasses()
    expect(result.root).toBe("pm-datatable pm-datatable--simple pm-datatable--md")
    expect(result.table).toBe("pm-datatable__table")
    expect(result.toolbar).toBe("pm-datatable__toolbar")
    expect(result.headerCell).toBe("pm-datatable__header-cell")
    expect(result.cell).toBe("pm-datatable__cell")
    expect(result.row).toBe("pm-datatable__row")
    expect(result.pagination).toBe("pm-datatable__pagination")
  })

  it("applies variant", () => {
    expect(datatableClasses({ variant: "striped" }).root).toContain("pm-datatable--striped")
  })

  it("applies size", () => {
    expect(datatableClasses({ size: "sm" }).root).toContain("pm-datatable--sm")
    expect(datatableClasses({ size: "lg" }).root).toContain("pm-datatable--lg")
  })

  it("applies hoverable modifier", () => {
    expect(datatableClasses({ hoverable: true }).root).toContain("pm-datatable--hoverable")
    expect(datatableClasses({ hoverable: false }).root).not.toContain("pm-datatable--hoverable")
  })

  it("applies bordered modifier", () => {
    expect(datatableClasses({ bordered: true }).root).toContain("pm-datatable--bordered")
  })

  it("applies stickyHeader modifier", () => {
    expect(datatableClasses({ stickyHeader: true }).root).toContain(
      "pm-datatable--sticky-header",
    )
  })

  it("applies selectable modifier", () => {
    expect(datatableClasses({ selectable: true }).root).toContain("pm-datatable--selectable")
  })

  it("combines multiple options", () => {
    const result = datatableClasses({
      variant: "striped",
      size: "lg",
      hoverable: true,
      bordered: true,
      stickyHeader: true,
      selectable: true,
    })
    expect(result.root).toBe(
      "pm-datatable pm-datatable--striped pm-datatable--lg pm-datatable--hoverable pm-datatable--bordered pm-datatable--sticky-header pm-datatable--selectable",
    )
  })
})

describe("dataTableHeaderCellClasses", () => {
  it("returns base header cell class", () => {
    expect(dataTableHeaderCellClasses()).toBe("pm-datatable__header-cell")
  })

  it("applies sortable modifier", () => {
    expect(dataTableHeaderCellClasses({ sortable: true })).toContain(
      "pm-datatable__header-cell--sortable",
    )
  })

  it("applies sort direction", () => {
    expect(dataTableHeaderCellClasses({ sortDirection: "asc" })).toContain(
      "pm-datatable__header-cell--sort-asc",
    )
    expect(dataTableHeaderCellClasses({ sortDirection: "desc" })).toContain(
      "pm-datatable__header-cell--sort-desc",
    )
  })

  it("does not apply sort class for none direction", () => {
    expect(dataTableHeaderCellClasses({ sortDirection: "none" })).not.toContain(
      "pm-datatable__header-cell--sort",
    )
  })

  it("applies alignment", () => {
    expect(dataTableHeaderCellClasses({ align: "center" })).toContain(
      "pm-datatable__header-cell--align-center",
    )
    expect(dataTableHeaderCellClasses({ align: "end" })).toContain(
      "pm-datatable__header-cell--align-end",
    )
  })

  it("does not apply alignment for start (default)", () => {
    expect(dataTableHeaderCellClasses({ align: "start" })).not.toContain(
      "pm-datatable__header-cell--align",
    )
  })
})

describe("datatableModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-datatable": "pm_abc_dataTable",
    "pm-datatable--simple": "pm_abc_simple",
    "pm-datatable--md": "pm_abc_md",
    "pm-datatable__table": "pm_abc_table",
    "pm-datatable__toolbar": "pm_abc_toolbar",
    "pm-datatable__header-cell": "pm_abc_headerCell",
    "pm-datatable__cell": "pm_abc_cell",
    "pm-datatable__row": "pm_abc_row",
    "pm-datatable__pagination": "pm_abc_pagination",
  }

  it("returns mapped default classes", () => {
    const result = datatableModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_dataTable pm_abc_simple pm_abc_md")
    expect(result.table).toBe("pm_abc_table")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-datatable": "pm_abc_dataTable",
    }
    const result = datatableModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_dataTable")
    expect(result.root).not.toContain("undefined")
  })
})
