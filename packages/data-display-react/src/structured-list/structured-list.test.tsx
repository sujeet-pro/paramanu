import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  StructuredList,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListHeaderCell,
} from "./structured-list.js"

afterEach(cleanup)

describe("StructuredList", () => {
  it("renders with role=table", () => {
    render(<StructuredList>Content</StructuredList>)
    expect(screen.getByRole("table")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<StructuredList>Content</StructuredList>)
    const sl = screen.getByRole("table")
    expect(sl.className).toContain("pm-structured-list")
    expect(sl.className).toContain("pm-structured-list--md")
  })

  it("applies selectable modifier", () => {
    render(<StructuredList selectable>Content</StructuredList>)
    expect(screen.getByRole("table").className).toContain("pm-structured-list--selectable")
  })

  it("applies bordered modifier", () => {
    render(<StructuredList bordered>Content</StructuredList>)
    expect(screen.getByRole("table").className).toContain("pm-structured-list--bordered")
  })

  it("forwards ref", () => {
    let slRef: HTMLDivElement | null = null
    render(<StructuredList ref={(el) => (slRef = el)}>Content</StructuredList>)
    expect(slRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<StructuredList className="custom">Content</StructuredList>)
    const sl = screen.getByRole("table")
    expect(sl.className).toContain("pm-structured-list")
    expect(sl.className).toContain("custom")
  })
})

describe("StructuredListHead", () => {
  it("renders with head class", () => {
    render(<StructuredListHead data-testid="head">Head</StructuredListHead>)
    expect(screen.getByTestId("head").className).toContain("pm-structured-list__head")
  })
})

describe("StructuredListBody", () => {
  it("renders with body class", () => {
    render(<StructuredListBody data-testid="body">Body</StructuredListBody>)
    expect(screen.getByTestId("body").className).toContain("pm-structured-list__body")
  })
})

describe("StructuredListRow", () => {
  it("renders with role=row and row class", () => {
    render(<StructuredListRow>Row</StructuredListRow>)
    const row = screen.getByRole("row")
    expect(row.className).toContain("pm-structured-list__row")
  })
})

describe("StructuredListCell", () => {
  it("renders with role=cell and cell class", () => {
    render(<StructuredListCell>Cell</StructuredListCell>)
    const cell = screen.getByRole("cell")
    expect(cell.className).toContain("pm-structured-list__cell")
  })
})

describe("StructuredListHeaderCell", () => {
  it("renders with role=columnheader and header-cell class", () => {
    render(<StructuredListHeaderCell>Header</StructuredListHeaderCell>)
    const hc = screen.getByRole("columnheader")
    expect(hc.className).toContain("pm-structured-list__header-cell")
  })
})
