import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  Table,
  TableContainer,
  TableCaption,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./table.js"

afterEach(cleanup)

describe("Table", () => {
  it("renders a table element", () => {
    render(
      <Table data-testid="table">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    )
    expect(screen.getByTestId("table")).toBeInTheDocument()
    expect(screen.getByTestId("table").tagName).toBe("TABLE")
  })

  it("applies default classes", () => {
    render(
      <Table data-testid="table">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    )
    const table = screen.getByTestId("table")
    expect(table.className).toContain("pm-table")
    expect(table.className).toContain("pm-table--simple")
    expect(table.className).toContain("pm-table--md")
  })

  it("applies variant class", () => {
    render(
      <Table variant="striped" data-testid="table">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    )
    expect(screen.getByTestId("table").className).toContain("pm-table--striped")
  })

  it("applies hoverable modifier", () => {
    render(
      <Table hoverable data-testid="table">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    )
    expect(screen.getByTestId("table").className).toContain("pm-table--hoverable")
  })

  it("forwards ref", () => {
    let tableRef: HTMLTableElement | null = null
    render(
      <Table ref={(el) => (tableRef = el)}>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    )
    expect(tableRef).toBeInstanceOf(HTMLTableElement)
  })

  it("merges custom className", () => {
    render(
      <Table className="custom" data-testid="table">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    )
    const table = screen.getByTestId("table")
    expect(table.className).toContain("pm-table")
    expect(table.className).toContain("custom")
  })
})

describe("TableContainer", () => {
  it("renders with container class", () => {
    render(<TableContainer data-testid="container">Content</TableContainer>)
    expect(screen.getByTestId("container").className).toContain("pm-table__container")
  })
})

describe("TableCaption", () => {
  it("renders with caption class", () => {
    render(
      <table>
        <TableCaption data-testid="caption">Caption</TableCaption>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("caption").className).toContain("pm-table__caption")
  })
})

describe("TableHead", () => {
  it("renders with head class", () => {
    render(
      <table>
        <TableHead data-testid="head">
          <tr>
            <th>Header</th>
          </tr>
        </TableHead>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("head").className).toContain("pm-table__head")
  })
})

describe("TableRow", () => {
  it("renders with row class", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("row").className).toContain("pm-table__row")
  })
})

describe("TableHeaderCell", () => {
  it("renders with header-cell class", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell data-testid="th">Header</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("th").className).toContain("pm-table__header-cell")
  })
})

describe("TableCell", () => {
  it("renders with cell class", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell data-testid="td">Cell</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByTestId("td").className).toContain("pm-table__cell")
  })
})
