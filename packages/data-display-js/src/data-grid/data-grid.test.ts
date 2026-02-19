import { describe, it, expect } from "vitest"
import { datagridClasses, datagridModuleClasses } from "./data-grid.classes.js"

describe("datagridClasses", () => {
  it("returns default classes (md)", () => {
    const result = datagridClasses()
    expect(result.root).toBe("pm-datagrid pm-datagrid--md")
    expect(result.row).toBe("pm-datagrid__row")
    expect(result.cell).toBe("pm-datagrid__cell")
    expect(result.columnHeader).toBe("pm-datagrid__column-header")
  })

  it("applies size", () => {
    expect(datagridClasses({ size: "sm" }).root).toContain("pm-datagrid--sm")
  })

  it("applies bordered modifier", () => {
    expect(datagridClasses({ bordered: true }).root).toContain("pm-datagrid--bordered")
    expect(datagridClasses({ bordered: false }).root).not.toContain("pm-datagrid--bordered")
  })

  it("applies hoverable modifier", () => {
    expect(datagridClasses({ hoverable: true }).root).toContain("pm-datagrid--hoverable")
  })

  it("applies stickyHeader modifier", () => {
    expect(datagridClasses({ stickyHeader: true }).root).toContain("pm-datagrid--sticky-header")
  })

  it("applies resizable modifier", () => {
    expect(datagridClasses({ resizable: true }).root).toContain("pm-datagrid--resizable")
  })

  it("combines multiple options", () => {
    const result = datagridClasses({
      size: "sm",
      bordered: true,
      hoverable: true,
      stickyHeader: true,
      resizable: true,
    })
    expect(result.root).toBe(
      "pm-datagrid pm-datagrid--sm pm-datagrid--bordered pm-datagrid--hoverable pm-datagrid--sticky-header pm-datagrid--resizable",
    )
  })
})

describe("datagridModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-datagrid": "pm_abc_dataGrid",
    "pm-datagrid--md": "pm_abc_md",
    "pm-datagrid__row": "pm_abc_row",
    "pm-datagrid__cell": "pm_abc_cell",
    "pm-datagrid__column-header": "pm_abc_columnHeader",
  }

  it("returns mapped default classes", () => {
    const result = datagridModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_dataGrid pm_abc_md")
    expect(result.row).toBe("pm_abc_row")
    expect(result.cell).toBe("pm_abc_cell")
    expect(result.columnHeader).toBe("pm_abc_columnHeader")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-datagrid": "pm_abc_dataGrid",
    }
    const result = datagridModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_dataGrid")
    expect(result.root).not.toContain("undefined")
  })
})
