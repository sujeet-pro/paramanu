import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  Datatable,
  DatatableToolbar,
  DatatableHeaderCell,
  DatatableRow,
  DatatableCell,
  DatatablePagination,
} from "./data-table.js"

afterEach(cleanup)

describe("Datatable", () => {
  it("renders with children", () => {
    render(<Datatable data-testid="dt">Content</Datatable>)
    expect(screen.getByTestId("dt")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Datatable data-testid="dt">Content</Datatable>)
    const dt = screen.getByTestId("dt")
    expect(dt.className).toContain("pm-datatable")
    expect(dt.className).toContain("pm-datatable--simple")
    expect(dt.className).toContain("pm-datatable--md")
  })

  it("applies variant class", () => {
    render(
      <Datatable variant="striped" data-testid="dt">
        Content
      </Datatable>,
    )
    expect(screen.getByTestId("dt").className).toContain("pm-datatable--striped")
  })

  it("applies hoverable modifier", () => {
    render(
      <Datatable hoverable data-testid="dt">
        Content
      </Datatable>,
    )
    expect(screen.getByTestId("dt").className).toContain("pm-datatable--hoverable")
  })

  it("applies bordered modifier", () => {
    render(
      <Datatable bordered data-testid="dt">
        Content
      </Datatable>,
    )
    expect(screen.getByTestId("dt").className).toContain("pm-datatable--bordered")
  })

  it("applies selectable modifier", () => {
    render(
      <Datatable selectable data-testid="dt">
        Content
      </Datatable>,
    )
    expect(screen.getByTestId("dt").className).toContain("pm-datatable--selectable")
  })

  it("forwards ref", () => {
    let dtRef: HTMLDivElement | null = null
    render(<Datatable ref={(el) => (dtRef = el)}>Content</Datatable>)
    expect(dtRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Datatable className="custom" data-testid="dt">
        Content
      </Datatable>,
    )
    const dt = screen.getByTestId("dt")
    expect(dt.className).toContain("pm-datatable")
    expect(dt.className).toContain("custom")
  })
})

describe("DatatableToolbar", () => {
  it("renders with toolbar class", () => {
    render(<DatatableToolbar data-testid="toolbar">Toolbar</DatatableToolbar>)
    expect(screen.getByTestId("toolbar").className).toContain("pm-datatable__toolbar")
  })
})

describe("DatatableHeaderCell", () => {
  it("renders with header-cell class", () => {
    render(
      <table>
        <thead>
          <tr>
            <DatatableHeaderCell data-testid="th">Header</DatatableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("th").className).toContain("pm-datatable__header-cell")
  })

  it("applies sortable modifier", () => {
    render(
      <table>
        <thead>
          <tr>
            <DatatableHeaderCell sortable data-testid="th">
              Header
            </DatatableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("th").className).toContain("pm-datatable__header-cell--sortable")
  })

  it("sets aria-sort for ascending", () => {
    render(
      <table>
        <thead>
          <tr>
            <DatatableHeaderCell sortable sortDirection="asc" data-testid="th">
              Header
            </DatatableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("th")).toHaveAttribute("aria-sort", "ascending")
  })
})

describe("DatatableRow", () => {
  it("renders with row class", () => {
    render(
      <table>
        <tbody>
          <DatatableRow data-testid="row">
            <td>Cell</td>
          </DatatableRow>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("row").className).toContain("pm-datatable__row")
  })
})

describe("DatatableCell", () => {
  it("renders with cell class", () => {
    render(
      <table>
        <tbody>
          <tr>
            <DatatableCell data-testid="td">Cell</DatatableCell>
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("td").className).toContain("pm-datatable__cell")
  })
})

describe("DatatablePagination", () => {
  it("renders with pagination class", () => {
    render(<DatatablePagination data-testid="pagination">Pagination</DatatablePagination>)
    expect(screen.getByTestId("pagination").className).toContain("pm-datatable__pagination")
  })
})
