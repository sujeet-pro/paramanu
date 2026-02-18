import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Text } from "./text.js"

afterEach(cleanup)

describe("Text", () => {
  it("renders with text content", () => {
    render(<Text>Hello world</Text>)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("renders a <p> by default", () => {
    render(<Text>Paragraph</Text>)
    const el = screen.getByText("Paragraph")
    expect(el.tagName).toBe("P")
  })

  it("applies default classes", () => {
    render(<Text>Default</Text>)
    const el = screen.getByText("Default")
    expect(el.className).toContain("pm-text")
  })

  it("renders with as=span", () => {
    render(<Text as="span">Span text</Text>)
    const el = screen.getByText("Span text")
    expect(el.tagName).toBe("SPAN")
  })

  it("renders with as=div", () => {
    render(<Text as="div">Div text</Text>)
    const el = screen.getByText("Div text")
    expect(el.tagName).toBe("DIV")
  })

  it("renders with as=label", () => {
    render(<Text as="label">Label text</Text>)
    const el = screen.getByText("Label text")
    expect(el.tagName).toBe("LABEL")
  })

  it("renders with as=em", () => {
    render(<Text as="em">Emphasized</Text>)
    const el = screen.getByText("Emphasized")
    expect(el.tagName).toBe("EM")
  })

  it("renders with as=strong", () => {
    render(<Text as="strong">Strong</Text>)
    const el = screen.getByText("Strong")
    expect(el.tagName).toBe("STRONG")
  })

  it("applies size class", () => {
    render(<Text size="lg">Large</Text>)
    const el = screen.getByText("Large")
    expect(el.className).toContain("pm-text--size-lg")
  })

  it("applies weight class", () => {
    render(<Text weight="bold">Bold</Text>)
    const el = screen.getByText("Bold")
    expect(el.className).toContain("pm-text--weight-bold")
  })

  it("applies align class", () => {
    render(<Text align="center">Centered</Text>)
    const el = screen.getByText("Centered")
    expect(el.className).toContain("pm-text--align-center")
  })

  it("applies lineHeight class", () => {
    render(<Text lineHeight="tight">Tight</Text>)
    const el = screen.getByText("Tight")
    expect(el.className).toContain("pm-text--lh-tight")
  })

  it("applies italic class", () => {
    render(<Text italic>Italic</Text>)
    const el = screen.getByText("Italic")
    expect(el.className).toContain("pm-text--italic")
  })

  it("applies truncate class", () => {
    render(<Text truncate>Truncated</Text>)
    const el = screen.getByText("Truncated")
    expect(el.className).toContain("pm-text--truncate")
  })

  it("applies transform class", () => {
    render(<Text transform="uppercase">Upper</Text>)
    const el = screen.getByText("Upper")
    expect(el.className).toContain("pm-text--transform-uppercase")
  })

  it("forwards ref", () => {
    let textRef: HTMLElement | null = null
    render(<Text ref={(el) => (textRef = el)}>Ref</Text>)
    expect(textRef).toBeInstanceOf(HTMLParagraphElement)
  })

  it("merges custom className", () => {
    render(<Text className="custom-class">Custom</Text>)
    const el = screen.getByText("Custom")
    expect(el.className).toContain("pm-text")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Text data-testid="my-text">Test</Text>)
    expect(screen.getByTestId("my-text")).toBeInTheDocument()
  })
})
