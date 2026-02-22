import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Datalist, DatalistItem, DatalistTerm, DatalistDetail } from "./data-list.js"

afterEach(cleanup)

describe("Datalist", () => {
  it("renders a dl element", () => {
    render(
      <Datalist data-testid="dl">
        <dt>Term</dt>
        <dd>Detail</dd>
      </Datalist>,
    )
    const dl = screen.getByTestId("dl")
    expect(dl).toBeInTheDocument()
    expect(dl.tagName).toBe("DL")
  })

  it("applies default classes", () => {
    render(
      <Datalist data-testid="dl">
        <dt>T</dt>
        <dd>D</dd>
      </Datalist>,
    )
    const dl = screen.getByTestId("dl")
    expect(dl.className).toContain("pm-datalist")
    expect(dl.className).toContain("pm-datalist--vertical")
    expect(dl.className).toContain("pm-datalist--md")
  })

  it("applies orientation class", () => {
    render(
      <Datalist orientation="horizontal" data-testid="dl">
        <dt>T</dt>
        <dd>D</dd>
      </Datalist>,
    )
    expect(screen.getByTestId("dl").className).toContain("pm-datalist--horizontal")
  })

  it("applies dividers modifier", () => {
    render(
      <Datalist dividers data-testid="dl">
        <dt>T</dt>
        <dd>D</dd>
      </Datalist>,
    )
    expect(screen.getByTestId("dl").className).toContain("pm-datalist--dividers")
  })

  it("forwards ref", () => {
    let dlRef: HTMLDListElement | null = null
    render(
      <Datalist ref={(el) => (dlRef = el)}>
        <dt>T</dt>
        <dd>D</dd>
      </Datalist>,
    )
    expect(dlRef).toBeInstanceOf(HTMLDListElement)
  })

  it("merges custom className", () => {
    render(
      <Datalist className="custom" data-testid="dl">
        <dt>T</dt>
        <dd>D</dd>
      </Datalist>,
    )
    const dl = screen.getByTestId("dl")
    expect(dl.className).toContain("pm-datalist")
    expect(dl.className).toContain("custom")
  })
})

describe("DatalistItem", () => {
  it("renders with item class", () => {
    render(<DatalistItem data-testid="item">Item</DatalistItem>)
    expect(screen.getByTestId("item").className).toContain("pm-datalist__item")
  })
})

describe("DatalistTerm", () => {
  it("renders a dt element with term class", () => {
    render(
      <Datalist>
        <DatalistTerm data-testid="term">Term</DatalistTerm>
        <dd>D</dd>
      </Datalist>,
    )
    const term = screen.getByTestId("term")
    expect(term.tagName).toBe("DT")
    expect(term.className).toContain("pm-datalist__term")
  })
})

describe("DatalistDetail", () => {
  it("renders a dd element with detail class", () => {
    render(
      <Datalist>
        <dt>T</dt>
        <DatalistDetail data-testid="detail">Detail</DatalistDetail>
      </Datalist>,
    )
    const detail = screen.getByTestId("detail")
    expect(detail.tagName).toBe("DD")
    expect(detail.className).toContain("pm-datalist__detail")
  })
})
