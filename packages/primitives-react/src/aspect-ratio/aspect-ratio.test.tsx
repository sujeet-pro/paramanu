import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Aspect } from "./aspect-ratio.js"

afterEach(cleanup)

describe("Aspect", () => {
  it("renders with children", () => {
    render(
      <Aspect data-testid="aspect-ratio">
        <img src="test.jpg" alt="test" />
      </Aspect>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el).toBeInTheDocument()
    expect(el.querySelector("img")).not.toBeNull()
  })

  it("applies default 16/9 ratio class", () => {
    render(<Aspect data-testid="aspect-ratio">Content</Aspect>)
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect")
    expect(el.className).toContain("pm-aspect--16-9")
  })

  it("applies 1/1 ratio", () => {
    render(
      <Aspect ratio="1/1" data-testid="aspect-ratio">
        Content
      </Aspect>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect--1-1")
  })

  it("applies 4/3 ratio", () => {
    render(
      <Aspect ratio="4/3" data-testid="aspect-ratio">
        Content
      </Aspect>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect--4-3")
  })

  it("applies 21/9 ratio", () => {
    render(
      <Aspect ratio="21/9" data-testid="aspect-ratio">
        Content
      </Aspect>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect--21-9")
  })

  it("applies 3/4 ratio", () => {
    render(
      <Aspect ratio="3/4" data-testid="aspect-ratio">
        Content
      </Aspect>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect--3-4")
  })

  it("applies 9/16 ratio", () => {
    render(
      <Aspect ratio="9/16" data-testid="aspect-ratio">
        Content
      </Aspect>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect--9-16")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<Aspect ref={(el) => (elRef = el)}>Content</Aspect>)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Aspect className="custom-class" data-testid="aspect-ratio">
        Content
      </Aspect>,
    )
    const el = screen.getByTestId("aspect-ratio")
    expect(el.className).toContain("pm-aspect")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Aspect data-testid="my-aspect">Content</Aspect>)
    expect(screen.getByTestId("my-aspect")).toBeInTheDocument()
  })
})
