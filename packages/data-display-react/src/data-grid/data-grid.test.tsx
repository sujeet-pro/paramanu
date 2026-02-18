import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { DataGrid, DataGridRow, DataGridCell, DataGridColumnHeader } from "./data-grid.js"

afterEach(cleanup)

describe("DataGrid", () => {
  it("renders with role=grid", () => {
    render(<DataGrid>Content</DataGrid>)
    expect(screen.getByRole("grid")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DataGrid>Content</DataGrid>)
    const grid = screen.getByRole("grid")
    expect(grid.className).toContain("pm-data-grid")
    expect(grid.className).toContain("pm-data-grid--md")
  })

  it("applies bordered modifier", () => {
    render(<DataGrid bordered>Content</DataGrid>)
    expect(screen.getByRole("grid").className).toContain("pm-data-grid--bordered")
  })

  it("applies hoverable modifier", () => {
    render(<DataGrid hoverable>Content</DataGrid>)
    expect(screen.getByRole("grid").className).toContain("pm-data-grid--hoverable")
  })

  it("applies resizable modifier", () => {
    render(<DataGrid resizable>Content</DataGrid>)
    expect(screen.getByRole("grid").className).toContain("pm-data-grid--resizable")
  })

  it("forwards ref", () => {
    let gridRef: HTMLDivElement | null = null
    render(<DataGrid ref={(el) => (gridRef = el)}>Content</DataGrid>)
    expect(gridRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<DataGrid className="custom">Content</DataGrid>)
    const grid = screen.getByRole("grid")
    expect(grid.className).toContain("pm-data-grid")
    expect(grid.className).toContain("custom")
  })
})

describe("DataGridRow", () => {
  it("renders with role=row", () => {
    render(<DataGridRow>Content</DataGridRow>)
    expect(screen.getByRole("row")).toBeInTheDocument()
    expect(screen.getByRole("row").className).toContain("pm-data-grid__row")
  })
})

describe("DataGridCell", () => {
  it("renders with role=gridcell", () => {
    render(<DataGridCell>Cell</DataGridCell>)
    expect(screen.getByRole("gridcell")).toBeInTheDocument()
    expect(screen.getByRole("gridcell").className).toContain("pm-data-grid__cell")
  })
})

describe("DataGridColumnHeader", () => {
  it("renders with role=columnheader", () => {
    render(<DataGridColumnHeader>Header</DataGridColumnHeader>)
    expect(screen.getByRole("columnheader")).toBeInTheDocument()
    expect(screen.getByRole("columnheader").className).toContain("pm-data-grid__column-header")
  })
})
