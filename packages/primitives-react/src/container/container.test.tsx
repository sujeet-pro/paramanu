import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Container } from "./container.js"

afterEach(cleanup)

describe("Container", () => {
  it("renders with default md size", () => {
    render(<Container data-testid="container">Content</Container>)
    const container = screen.getByTestId("container")
    expect(container.className).toContain("pm-container")
    expect(container.className).toContain("pm-container--md")
  })

  it("renders children", () => {
    render(<Container data-testid="container">Content</Container>)
    const container = screen.getByTestId("container")
    expect(container).toHaveTextContent("Content")
  })

  it("applies sm size", () => {
    render(
      <Container size="sm" data-testid="container">
        Content
      </Container>,
    )
    const container = screen.getByTestId("container")
    expect(container.className).toContain("pm-container--sm")
  })

  it("applies lg size", () => {
    render(
      <Container size="lg" data-testid="container">
        Content
      </Container>,
    )
    const container = screen.getByTestId("container")
    expect(container.className).toContain("pm-container--lg")
  })

  it("applies xl size", () => {
    render(
      <Container size="xl" data-testid="container">
        Content
      </Container>,
    )
    const container = screen.getByTestId("container")
    expect(container.className).toContain("pm-container--xl")
  })

  it("applies full size", () => {
    render(
      <Container size="full" data-testid="container">
        Content
      </Container>,
    )
    const container = screen.getByTestId("container")
    expect(container.className).toContain("pm-container--full")
  })

  it("forwards ref", () => {
    let containerRef: HTMLDivElement | null = null
    render(<Container ref={(el) => (containerRef = el)}>Ref</Container>)
    expect(containerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Container className="custom-class" data-testid="container">
        Content
      </Container>,
    )
    const container = screen.getByTestId("container")
    expect(container.className).toContain("pm-container")
    expect(container.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Container data-testid="my-container">Test</Container>)
    expect(screen.getByTestId("my-container")).toBeInTheDocument()
  })
})
