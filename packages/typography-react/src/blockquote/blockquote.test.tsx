import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Blockquote } from "./blockquote.js"

afterEach(cleanup)

describe("Blockquote", () => {
  it("renders with text content", () => {
    render(<Blockquote>A wise quote</Blockquote>)
    expect(screen.getByText("A wise quote")).toBeInTheDocument()
  })

  it("renders a <blockquote> element", () => {
    render(<Blockquote>Quote</Blockquote>)
    const el = screen.getByText("Quote")
    expect(el.tagName).toBe("BLOCKQUOTE")
  })

  it("applies default classes", () => {
    render(<Blockquote>Default</Blockquote>)
    const el = screen.getByText("Default")
    expect(el.className).toContain("pm-blockquote")
  })

  it("applies variant class", () => {
    render(<Blockquote variant="accent">Accent</Blockquote>)
    const el = screen.getByText("Accent")
    expect(el.className).toContain("pm-blockquote--accent")
  })

  it("applies size class", () => {
    render(<Blockquote size="lg">Large</Blockquote>)
    const el = screen.getByText("Large")
    expect(el.className).toContain("pm-blockquote--lg")
  })

  it("passes through cite attribute", () => {
    render(<Blockquote cite="https://example.com">Cited</Blockquote>)
    const el = screen.getByText("Cited")
    expect(el).toHaveAttribute("cite", "https://example.com")
  })

  it("forwards ref", () => {
    let quoteRef: HTMLQuoteElement | null = null
    render(<Blockquote ref={(el) => (quoteRef = el)}>Ref</Blockquote>)
    expect(quoteRef).toBeInstanceOf(HTMLQuoteElement)
  })

  it("merges custom className", () => {
    render(<Blockquote className="custom-class">Custom</Blockquote>)
    const el = screen.getByText("Custom")
    expect(el.className).toContain("pm-blockquote")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Blockquote data-testid="my-blockquote">Test</Blockquote>)
    expect(screen.getByTestId("my-blockquote")).toBeInTheDocument()
  })
})
