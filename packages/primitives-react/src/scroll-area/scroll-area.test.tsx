import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Scroll } from "./scroll-area.js"

afterEach(cleanup)

describe("Scroll", () => {
  it("renders with children", () => {
    render(
      <Scroll aria-label="Scrollable" data-testid="scroll-area">
        <p>Scrollable content</p>
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent("Scrollable content")
  })

  it("applies default classes (vertical, auto)", () => {
    render(
      <Scroll aria-label="Scrollable" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll")
    expect(el.className).toContain("pm-scroll--vertical")
    expect(el.className).toContain("pm-scroll--scrollbar-auto")
  })

  it("applies horizontal direction", () => {
    render(
      <Scroll direction="horizontal" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll--horizontal")
  })

  it("applies both direction", () => {
    render(
      <Scroll direction="both" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll--both")
  })

  it("applies always scrollbar", () => {
    render(
      <Scroll scrollbar="always" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll--scrollbar-always")
  })

  it("applies hover scrollbar", () => {
    render(
      <Scroll scrollbar="hover" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll--scrollbar-hover")
  })

  it("has tabIndex 0 for keyboard focus", () => {
    render(
      <Scroll aria-label="Scrollable" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.getAttribute("tabindex")).toBe("0")
  })

  it("has role=region", () => {
    render(
      <Scroll aria-label="Scrollable" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.getAttribute("role")).toBe("region")
  })

  it("supports aria-label", () => {
    render(
      <Scroll aria-label="Messages list" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.getAttribute("aria-label")).toBe("Messages list")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(
      <Scroll ref={(el) => (elRef = el)} aria-label="Scrollable">
        Content
      </Scroll>,
    )
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Scroll className="custom-class" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </Scroll>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Scroll aria-label="Scrollable" data-testid="my-scroll">
        Content
      </Scroll>,
    )
    expect(screen.getByTestId("my-scroll")).toBeInTheDocument()
  })
})
