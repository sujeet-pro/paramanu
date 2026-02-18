import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Highlight } from "./highlight.js"

afterEach(cleanup)

describe("Highlight", () => {
  it("renders with text content", () => {
    render(<Highlight>Important</Highlight>)
    expect(screen.getByText("Important")).toBeInTheDocument()
  })

  it("renders a <mark> element", () => {
    render(<Highlight>Marked</Highlight>)
    const el = screen.getByText("Marked")
    expect(el.tagName).toBe("MARK")
  })

  it("applies default classes", () => {
    render(<Highlight>Default</Highlight>)
    const el = screen.getByText("Default")
    expect(el.className).toContain("pm-highlight")
  })

  it("applies color class", () => {
    render(<Highlight color="danger">Danger</Highlight>)
    const el = screen.getByText("Danger")
    expect(el.className).toContain("pm-highlight--danger")
  })

  it("applies success color class", () => {
    render(<Highlight color="success">Success</Highlight>)
    const el = screen.getByText("Success")
    expect(el.className).toContain("pm-highlight--success")
  })

  it("applies neutral color class", () => {
    render(<Highlight color="neutral">Neutral</Highlight>)
    const el = screen.getByText("Neutral")
    expect(el.className).toContain("pm-highlight--neutral")
  })

  it("forwards ref", () => {
    let markRef: HTMLElement | null = null
    render(<Highlight ref={(el) => (markRef = el)}>Ref</Highlight>)
    expect(markRef).toBeInstanceOf(HTMLElement)
    expect(markRef!.tagName).toBe("MARK")
  })

  it("merges custom className", () => {
    render(<Highlight className="custom-class">Custom</Highlight>)
    const el = screen.getByText("Custom")
    expect(el.className).toContain("pm-highlight")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Highlight data-testid="my-highlight">Test</Highlight>)
    expect(screen.getByTestId("my-highlight")).toBeInTheDocument()
  })
})
