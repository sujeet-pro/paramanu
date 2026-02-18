import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Pagination, PaginationItem } from "./pagination.js"

afterEach(cleanup)

describe("Pagination", () => {
  it("renders with nav element and aria-label", () => {
    render(
      <Pagination>
        <PaginationItem active>1</PaginationItem>
      </Pagination>,
    )
    const nav = screen.getByRole("navigation", { name: "Pagination" })
    expect(nav).toBeInTheDocument()
  })

  it("renders unordered list inside nav", () => {
    render(
      <Pagination>
        <PaginationItem active>1</PaginationItem>
      </Pagination>,
    )
    const list = screen.getByRole("list")
    expect(list).toBeInTheDocument()
    expect(list.tagName).toBe("UL")
  })

  it("applies default classes", () => {
    render(
      <Pagination>
        <PaginationItem active>1</PaginationItem>
      </Pagination>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-pagination")
    expect(nav.className).toContain("pm-pagination--default")
    expect(nav.className).toContain("pm-pagination--md")
  })

  it("applies variant and size", () => {
    render(
      <Pagination variant="minimal" size="lg">
        <PaginationItem active>1</PaginationItem>
      </Pagination>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-pagination--minimal")
    expect(nav.className).toContain("pm-pagination--lg")
  })

  it("merges custom className", () => {
    render(
      <Pagination className="custom">
        <PaginationItem active>1</PaginationItem>
      </Pagination>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-pagination")
    expect(nav.className).toContain("custom")
  })

  it("forwards ref", () => {
    let navRef: HTMLElement | null = null
    render(
      <Pagination ref={(el) => (navRef = el)}>
        <PaginationItem active>1</PaginationItem>
      </Pagination>,
    )
    expect(navRef).toBeInstanceOf(HTMLElement)
  })
})

describe("PaginationItem", () => {
  it("renders page button", () => {
    render(
      <Pagination>
        <PaginationItem>1</PaginationItem>
      </Pagination>,
    )
    const button = screen.getByRole("button", { name: "1" })
    expect(button).toBeInTheDocument()
  })

  it("applies item classes", () => {
    render(
      <Pagination>
        <PaginationItem>1</PaginationItem>
      </Pagination>,
    )
    const button = screen.getByRole("button")
    expect(button.className).toContain("pm-pagination__item")
    expect(button.className).toContain("pm-pagination__item--page")
  })

  it("sets aria-current on active item", () => {
    render(
      <Pagination>
        <PaginationItem active>1</PaginationItem>
      </Pagination>,
    )
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-current", "page")
  })

  it("sets disabled and aria-disabled", () => {
    render(
      <Pagination>
        <PaginationItem type="prev" disabled>
          Previous
        </PaginationItem>
      </Pagination>,
    )
    const button = screen.getByRole("button", { name: "Previous" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("renders ellipsis as span with aria-hidden", () => {
    render(
      <Pagination>
        <PaginationItem type="ellipsis">...</PaginationItem>
      </Pagination>,
    )
    const ellipsis = screen.getByText("...")
    expect(ellipsis.tagName).toBe("SPAN")
    expect(ellipsis).toHaveAttribute("aria-hidden", "true")
  })

  it("applies type modifier classes", () => {
    render(
      <Pagination>
        <PaginationItem type="prev">Prev</PaginationItem>
        <PaginationItem type="next">Next</PaginationItem>
      </Pagination>,
    )
    const prev = screen.getByRole("button", { name: "Prev" })
    const next = screen.getByRole("button", { name: "Next" })
    expect(prev.className).toContain("pm-pagination__item--prev")
    expect(next.className).toContain("pm-pagination__item--next")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(
      <Pagination>
        <PaginationItem ref={(el) => (buttonRef = el)}>1</PaginationItem>
      </Pagination>,
    )
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(
      <Pagination>
        <PaginationItem className="custom">1</PaginationItem>
      </Pagination>,
    )
    const button = screen.getByRole("button")
    expect(button.className).toContain("pm-pagination__item")
    expect(button.className).toContain("custom")
  })
})
