import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  StructList,
  StructListHead,
  StructListBody,
  StructListRow,
  StructListCell,
  StructListHeaderCell,
} from "./structured-list.js"

afterEach(cleanup)

describe("StructList", () => {
  it("renders with role=table", () => {
    render(<StructList>Content</StructList>)
    expect(screen.getByRole("table")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<StructList>Content</StructList>)
    const sl = screen.getByRole("table")
    expect(sl.className).toContain("pm-struct-list")
    expect(sl.className).toContain("pm-struct-list--md")
  })

  it("applies selectable modifier", () => {
    render(<StructList selectable>Content</StructList>)
    expect(screen.getByRole("table").className).toContain("pm-struct-list--selectable")
  })

  it("applies bordered modifier", () => {
    render(<StructList bordered>Content</StructList>)
    expect(screen.getByRole("table").className).toContain("pm-struct-list--bordered")
  })

  it("forwards ref", () => {
    let slRef: HTMLDivElement | null = null
    render(<StructList ref={(el) => (slRef = el)}>Content</StructList>)
    expect(slRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<StructList className="custom">Content</StructList>)
    const sl = screen.getByRole("table")
    expect(sl.className).toContain("pm-struct-list")
    expect(sl.className).toContain("custom")
  })
})

describe("StructListHead", () => {
  it("renders with head class", () => {
    render(<StructListHead data-testid="head">Head</StructListHead>)
    expect(screen.getByTestId("head").className).toContain("pm-struct-list__head")
  })
})

describe("StructListBody", () => {
  it("renders with body class", () => {
    render(<StructListBody data-testid="body">Body</StructListBody>)
    expect(screen.getByTestId("body").className).toContain("pm-struct-list__body")
  })
})

describe("StructListRow", () => {
  it("renders with role=row and row class", () => {
    render(<StructListRow>Row</StructListRow>)
    const row = screen.getByRole("row")
    expect(row.className).toContain("pm-struct-list__row")
  })
})

describe("StructListCell", () => {
  it("renders with role=cell and cell class", () => {
    render(<StructListCell>Cell</StructListCell>)
    const cell = screen.getByRole("cell")
    expect(cell.className).toContain("pm-struct-list__cell")
  })
})

describe("StructListHeaderCell", () => {
  it("renders with role=columnheader and header-cell class", () => {
    render(<StructListHeaderCell>Header</StructListHeaderCell>)
    const hc = screen.getByRole("columnheader")
    expect(hc.className).toContain("pm-struct-list__header-cell")
  })
})
