import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { DataList, DataListItem, DataListTerm, DataListDetail } from "./data-list.js"

afterEach(cleanup)

describe("DataList", () => {
  it("renders a dl element", () => {
    render(<DataList data-testid="dl"><dt>Term</dt><dd>Detail</dd></DataList>)
    const dl = screen.getByTestId("dl")
    expect(dl).toBeInTheDocument()
    expect(dl.tagName).toBe("DL")
  })

  it("applies default classes", () => {
    render(<DataList data-testid="dl"><dt>T</dt><dd>D</dd></DataList>)
    const dl = screen.getByTestId("dl")
    expect(dl.className).toContain("pm-data-list")
    expect(dl.className).toContain("pm-data-list--vertical")
    expect(dl.className).toContain("pm-data-list--md")
  })

  it("applies orientation class", () => {
    render(<DataList orientation="horizontal" data-testid="dl"><dt>T</dt><dd>D</dd></DataList>)
    expect(screen.getByTestId("dl").className).toContain("pm-data-list--horizontal")
  })

  it("applies dividers modifier", () => {
    render(<DataList dividers data-testid="dl"><dt>T</dt><dd>D</dd></DataList>)
    expect(screen.getByTestId("dl").className).toContain("pm-data-list--dividers")
  })

  it("forwards ref", () => {
    let dlRef: HTMLDListElement | null = null
    render(<DataList ref={(el) => (dlRef = el)}><dt>T</dt><dd>D</dd></DataList>)
    expect(dlRef).toBeInstanceOf(HTMLDListElement)
  })

  it("merges custom className", () => {
    render(<DataList className="custom" data-testid="dl"><dt>T</dt><dd>D</dd></DataList>)
    const dl = screen.getByTestId("dl")
    expect(dl.className).toContain("pm-data-list")
    expect(dl.className).toContain("custom")
  })
})

describe("DataListItem", () => {
  it("renders with item class", () => {
    render(<DataListItem data-testid="item">Item</DataListItem>)
    expect(screen.getByTestId("item").className).toContain("pm-data-list__item")
  })
})

describe("DataListTerm", () => {
  it("renders a dt element with term class", () => {
    render(<DataList><DataListTerm data-testid="term">Term</DataListTerm><dd>D</dd></DataList>)
    const term = screen.getByTestId("term")
    expect(term.tagName).toBe("DT")
    expect(term.className).toContain("pm-data-list__term")
  })
})

describe("DataListDetail", () => {
  it("renders a dd element with detail class", () => {
    render(<DataList><dt>T</dt><DataListDetail data-testid="detail">Detail</DataListDetail></DataList>)
    const detail = screen.getByTestId("detail")
    expect(detail.tagName).toBe("DD")
    expect(detail.className).toContain("pm-data-list__detail")
  })
})
