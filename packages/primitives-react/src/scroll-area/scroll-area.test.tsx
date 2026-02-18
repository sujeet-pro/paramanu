import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ScrollArea } from "./scroll-area.js"

afterEach(cleanup)

describe("ScrollArea", () => {
  it("renders with children", () => {
    render(
      <ScrollArea aria-label="Scrollable" data-testid="scroll-area">
        <p>Scrollable content</p>
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent("Scrollable content")
  })

  it("applies default classes (vertical, auto)", () => {
    render(
      <ScrollArea aria-label="Scrollable" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll-area")
    expect(el.className).toContain("pm-scroll-area--vertical")
    expect(el.className).toContain("pm-scroll-area--scrollbar-auto")
  })

  it("applies horizontal direction", () => {
    render(
      <ScrollArea direction="horizontal" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll-area--horizontal")
  })

  it("applies both direction", () => {
    render(
      <ScrollArea direction="both" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll-area--both")
  })

  it("applies always scrollbar", () => {
    render(
      <ScrollArea scrollbar="always" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll-area--scrollbar-always")
  })

  it("applies hover scrollbar", () => {
    render(
      <ScrollArea scrollbar="hover" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll-area--scrollbar-hover")
  })

  it("has tabIndex 0 for keyboard focus", () => {
    render(
      <ScrollArea aria-label="Scrollable" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.getAttribute("tabindex")).toBe("0")
  })

  it("has role=region", () => {
    render(
      <ScrollArea aria-label="Scrollable" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.getAttribute("role")).toBe("region")
  })

  it("supports aria-label", () => {
    render(
      <ScrollArea aria-label="Messages list" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.getAttribute("aria-label")).toBe("Messages list")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(
      <ScrollArea ref={(el) => (elRef = el)} aria-label="Scrollable">
        Content
      </ScrollArea>,
    )
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <ScrollArea className="custom-class" aria-label="Scrollable" data-testid="scroll-area">
        Content
      </ScrollArea>,
    )
    const el = screen.getByTestId("scroll-area")
    expect(el.className).toContain("pm-scroll-area")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <ScrollArea aria-label="Scrollable" data-testid="my-scroll">
        Content
      </ScrollArea>,
    )
    expect(screen.getByTestId("my-scroll")).toBeInTheDocument()
  })
})
