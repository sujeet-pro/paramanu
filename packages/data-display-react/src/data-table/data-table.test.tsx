import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  DataTable,
  DataTableToolbar,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  DataTablePagination,
} from "./data-table.js"

afterEach(cleanup)

describe("DataTable", () => {
  it("renders with children", () => {
    render(<DataTable data-testid="dt">Content</DataTable>)
    expect(screen.getByTestId("dt")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DataTable data-testid="dt">Content</DataTable>)
    const dt = screen.getByTestId("dt")
    expect(dt.className).toContain("pm-data-table")
    expect(dt.className).toContain("pm-data-table--simple")
    expect(dt.className).toContain("pm-data-table--md")
  })

  it("applies variant class", () => {
    render(<DataTable variant="striped" data-testid="dt">Content</DataTable>)
    expect(screen.getByTestId("dt").className).toContain("pm-data-table--striped")
  })

  it("applies hoverable modifier", () => {
    render(<DataTable hoverable data-testid="dt">Content</DataTable>)
    expect(screen.getByTestId("dt").className).toContain("pm-data-table--hoverable")
  })

  it("applies bordered modifier", () => {
    render(<DataTable bordered data-testid="dt">Content</DataTable>)
    expect(screen.getByTestId("dt").className).toContain("pm-data-table--bordered")
  })

  it("applies selectable modifier", () => {
    render(<DataTable selectable data-testid="dt">Content</DataTable>)
    expect(screen.getByTestId("dt").className).toContain("pm-data-table--selectable")
  })

  it("forwards ref", () => {
    let dtRef: HTMLDivElement | null = null
    render(<DataTable ref={(el) => (dtRef = el)}>Content</DataTable>)
    expect(dtRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<DataTable className="custom" data-testid="dt">Content</DataTable>)
    const dt = screen.getByTestId("dt")
    expect(dt.className).toContain("pm-data-table")
    expect(dt.className).toContain("custom")
  })
})

describe("DataTableToolbar", () => {
  it("renders with toolbar class", () => {
    render(<DataTableToolbar data-testid="toolbar">Toolbar</DataTableToolbar>)
    expect(screen.getByTestId("toolbar").className).toContain("pm-data-table__toolbar")
  })
})

describe("DataTableHeaderCell", () => {
  it("renders with header-cell class", () => {
    render(
      <table><thead><tr><DataTableHeaderCell data-testid="th">Header</DataTableHeaderCell></tr></thead><tbody><tr><td>Cell</td></tr></tbody></table>,
    )
    expect(screen.getByTestId("th").className).toContain("pm-data-table__header-cell")
  })

  it("applies sortable modifier", () => {
    render(
      <table><thead><tr><DataTableHeaderCell sortable data-testid="th">Header</DataTableHeaderCell></tr></thead><tbody><tr><td>Cell</td></tr></tbody></table>,
    )
    expect(screen.getByTestId("th").className).toContain("pm-data-table__header-cell--sortable")
  })

  it("sets aria-sort for ascending", () => {
    render(
      <table><thead><tr><DataTableHeaderCell sortable sortDirection="asc" data-testid="th">Header</DataTableHeaderCell></tr></thead><tbody><tr><td>Cell</td></tr></tbody></table>,
    )
    expect(screen.getByTestId("th")).toHaveAttribute("aria-sort", "ascending")
  })
})

describe("DataTableRow", () => {
  it("renders with row class", () => {
    render(
      <table><tbody><DataTableRow data-testid="row"><td>Cell</td></DataTableRow></tbody></table>,
    )
    expect(screen.getByTestId("row").className).toContain("pm-data-table__row")
  })
})

describe("DataTableCell", () => {
  it("renders with cell class", () => {
    render(
      <table><tbody><tr><DataTableCell data-testid="td">Cell</DataTableCell></tr></tbody></table>,
    )
    expect(screen.getByTestId("td").className).toContain("pm-data-table__cell")
  })
})

describe("DataTablePagination", () => {
  it("renders with pagination class", () => {
    render(<DataTablePagination data-testid="pagination">Pagination</DataTablePagination>)
    expect(screen.getByTestId("pagination").className).toContain("pm-data-table__pagination")
  })
})
