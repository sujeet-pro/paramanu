import { describe, it, expect } from "vitest"
import { dataGridClasses, dataGridModuleClasses } from "./data-grid.classes.js"

describe("dataGridClasses", () => {
  it("returns default classes (md)", () => {
    const result = dataGridClasses()
    expect(result.root).toBe("pm-data-grid pm-data-grid--md")
    expect(result.row).toBe("pm-data-grid__row")
    expect(result.cell).toBe("pm-data-grid__cell")
    expect(result.columnHeader).toBe("pm-data-grid__column-header")
  })

  it("applies size", () => {
    expect(dataGridClasses({ size: "sm" }).root).toContain("pm-data-grid--sm")
  })

  it("applies bordered modifier", () => {
    expect(dataGridClasses({ bordered: true }).root).toContain("pm-data-grid--bordered")
    expect(dataGridClasses({ bordered: false }).root).not.toContain("pm-data-grid--bordered")
  })

  it("applies hoverable modifier", () => {
    expect(dataGridClasses({ hoverable: true }).root).toContain("pm-data-grid--hoverable")
  })

  it("applies stickyHeader modifier", () => {
    expect(dataGridClasses({ stickyHeader: true }).root).toContain("pm-data-grid--sticky-header")
  })

  it("applies resizable modifier", () => {
    expect(dataGridClasses({ resizable: true }).root).toContain("pm-data-grid--resizable")
  })

  it("combines multiple options", () => {
    const result = dataGridClasses({
      size: "sm",
      bordered: true,
      hoverable: true,
      stickyHeader: true,
      resizable: true,
    })
    expect(result.root).toBe(
      "pm-data-grid pm-data-grid--sm pm-data-grid--bordered pm-data-grid--hoverable pm-data-grid--sticky-header pm-data-grid--resizable",
    )
  })
})

describe("dataGridModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-data-grid": "pm_abc_dataGrid",
    "pm-data-grid--md": "pm_abc_md",
    "pm-data-grid__row": "pm_abc_row",
    "pm-data-grid__cell": "pm_abc_cell",
    "pm-data-grid__column-header": "pm_abc_columnHeader",
  }

  it("returns mapped default classes", () => {
    const result = dataGridModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_dataGrid pm_abc_md")
    expect(result.row).toBe("pm_abc_row")
    expect(result.cell).toBe("pm_abc_cell")
    expect(result.columnHeader).toBe("pm_abc_columnHeader")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-data-grid": "pm_abc_dataGrid",
    }
    const result = dataGridModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_dataGrid")
    expect(result.root).not.toContain("undefined")
  })
})
