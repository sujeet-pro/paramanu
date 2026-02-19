import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Datagrid, DatagridRow, DatagridCell, DatagridColumnHeader } from "./data-grid.js"

afterEach(cleanup)

describe("Datagrid", () => {
  it("renders with role=grid", () => {
    render(<Datagrid>Content</Datagrid>)
    expect(screen.getByRole("grid")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Datagrid>Content</Datagrid>)
    const grid = screen.getByRole("grid")
    expect(grid.className).toContain("pm-datagrid")
    expect(grid.className).toContain("pm-datagrid--md")
  })

  it("applies bordered modifier", () => {
    render(<Datagrid bordered>Content</Datagrid>)
    expect(screen.getByRole("grid").className).toContain("pm-datagrid--bordered")
  })

  it("applies hoverable modifier", () => {
    render(<Datagrid hoverable>Content</Datagrid>)
    expect(screen.getByRole("grid").className).toContain("pm-datagrid--hoverable")
  })

  it("applies resizable modifier", () => {
    render(<Datagrid resizable>Content</Datagrid>)
    expect(screen.getByRole("grid").className).toContain("pm-datagrid--resizable")
  })

  it("forwards ref", () => {
    let gridRef: HTMLDivElement | null = null
    render(<Datagrid ref={(el) => (gridRef = el)}>Content</Datagrid>)
    expect(gridRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Datagrid className="custom">Content</Datagrid>)
    const grid = screen.getByRole("grid")
    expect(grid.className).toContain("pm-datagrid")
    expect(grid.className).toContain("custom")
  })
})

describe("DatagridRow", () => {
  it("renders with role=row", () => {
    render(<DatagridRow>Content</DatagridRow>)
    expect(screen.getByRole("row")).toBeInTheDocument()
    expect(screen.getByRole("row").className).toContain("pm-datagrid__row")
  })
})

describe("DatagridCell", () => {
  it("renders with role=gridcell", () => {
    render(<DatagridCell>Cell</DatagridCell>)
    expect(screen.getByRole("gridcell")).toBeInTheDocument()
    expect(screen.getByRole("gridcell").className).toContain("pm-datagrid__cell")
  })
})

describe("DatagridColumnHeader", () => {
  it("renders with role=columnheader", () => {
    render(<DatagridColumnHeader>Header</DatagridColumnHeader>)
    expect(screen.getByRole("columnheader")).toBeInTheDocument()
    expect(screen.getByRole("columnheader").className).toContain("pm-datagrid__column-header")
  })
})
