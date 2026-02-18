import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { AspectRatio } from "./aspect-ratio.js"

afterEach(cleanup)

describe("AspectRatio", () => {
  it("renders with children", () => {
    render(
      <AspectRatio data-testid="aspect-ratio">
        <img src="test.jpg" alt="test" />
      </AspectRatio>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el).toBeInTheDocument()
    expect(el.querySelector("img")).not.toBeNull()
  })

  it("applies default 16/9 ratio class", () => {
    render(<AspectRatio data-testid="aspect-ratio">Content</AspectRatio>)
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect-ratio")
    expect(el.className).toContain("pm-aspect-ratio--16-9")
  })

  it("applies 1/1 ratio", () => {
    render(
      <AspectRatio ratio="1/1" data-testid="aspect-ratio">
        Content
      </AspectRatio>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect-ratio--1-1")
  })

  it("applies 4/3 ratio", () => {
    render(
      <AspectRatio ratio="4/3" data-testid="aspect-ratio">
        Content
      </AspectRatio>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect-ratio--4-3")
  })

  it("applies 21/9 ratio", () => {
    render(
      <AspectRatio ratio="21/9" data-testid="aspect-ratio">
        Content
      </AspectRatio>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect-ratio--21-9")
  })

  it("applies 3/4 ratio", () => {
    render(
      <AspectRatio ratio="3/4" data-testid="aspect-ratio">
        Content
      </AspectRatio>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect-ratio--3-4")
  })

  it("applies 9/16 ratio", () => {
    render(
      <AspectRatio ratio="9/16" data-testid="aspect-ratio">
        Content
      </AspectRatio>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect-ratio--9-16")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<AspectRatio ref={(el) => (elRef = el)}>Content</AspectRatio>)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <AspectRatio className="custom-class" data-testid="aspect-ratio">
        Content
      </AspectRatio>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect-ratio")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<AspectRatio data-testid="my-aspect">Content</AspectRatio>)
    expect(screen.getByTestId("my-aspect")).toBeInTheDocument()
  })
})
