import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Masonry } from "./masonry.js"

afterEach(cleanup)

describe("Masonry", () => {
  it("renders with children", () => {
    render(
      <Masonry data-testid="masonry">
        <div>Item 1</div>
        <div>Item 2</div>
      </Masonry>,
    )
    const el = screen.getByTestId("masonry")
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent("Item 1")
  })

  it("applies default classes (3 columns)", () => {
    render(<Masonry data-testid="masonry">Content</Masonry>)
    const el = screen.getByTestId("masonry")
    expect(el.className).toContain("pm-masonry")
    expect(el.className).toContain("pm-masonry--cols-3")
  })

  it("applies 2 columns", () => {
    render(
      <Masonry columns={2} data-testid="masonry">
        Content
      </Masonry>,
    )
    const el = screen.getByTestId("masonry")
    expect(el.className).toContain("pm-masonry--cols-2")
  })

  it("applies 4 columns", () => {
    render(
      <Masonry columns={4} data-testid="masonry">
        Content
      </Masonry>,
    )
    const el = screen.getByTestId("masonry")
    expect(el.className).toContain("pm-masonry--cols-4")
  })

  it("applies 5 columns", () => {
    render(
      <Masonry columns={5} data-testid="masonry">
        Content
      </Masonry>,
    )
    const el = screen.getByTestId("masonry")
    expect(el.className).toContain("pm-masonry--cols-5")
  })

  it("applies 6 columns", () => {
    render(
      <Masonry columns={6} data-testid="masonry">
        Content
      </Masonry>,
    )
    const el = screen.getByTestId("masonry")
    expect(el.className).toContain("pm-masonry--cols-6")
  })

  it("applies gap modifier", () => {
    render(
      <Masonry gap="4" data-testid="masonry">
        Content
      </Masonry>,
    )
    const el = screen.getByTestId("masonry")
    expect(el.className).toContain("pm-masonry--gap-4")
  })

  it("combines columns and gap", () => {
    render(
      <Masonry columns={5} gap="6" data-testid="masonry">
        Content
      </Masonry>,
    )
    const el = screen.getByTestId("masonry")
    expect(el.className).toContain("pm-masonry--cols-5")
    expect(el.className).toContain("pm-masonry--gap-6")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<Masonry ref={(el) => (elRef = el)}>Content</Masonry>)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Masonry className="custom-class" data-testid="masonry">
        Content
      </Masonry>,
    )
    const el = screen.getByTestId("masonry")
    expect(el.className).toContain("pm-masonry")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Masonry data-testid="my-masonry">Content</Masonry>)
    expect(screen.getByTestId("my-masonry")).toBeInTheDocument()
  })
})
