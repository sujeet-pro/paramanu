import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Heading } from "./heading.js"

afterEach(cleanup)

describe("Heading", () => {
  it("renders with text content", () => {
    render(<Heading>Hello</Heading>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("renders <h2> by default", () => {
    render(<Heading>Default</Heading>)
    const el = screen.getByRole("heading", { name: "Default" })
    expect(el.tagName).toBe("H2")
  })

  it("applies default classes", () => {
    render(<Heading>Default</Heading>)
    const el = screen.getByRole("heading", { name: "Default" })
    expect(el.className).toContain("pm-heading")
  })

  it("renders <h1> for level 1", () => {
    render(<Heading level={1}>Title</Heading>)
    const el = screen.getByRole("heading", { name: "Title", level: 1 })
    expect(el.tagName).toBe("H1")
  })

  it("renders <h3> for level 3", () => {
    render(<Heading level={3}>Subtitle</Heading>)
    const el = screen.getByRole("heading", { name: "Subtitle", level: 3 })
    expect(el.tagName).toBe("H3")
  })

  it("renders <h4> for level 4", () => {
    render(<Heading level={4}>H4</Heading>)
    const el = screen.getByRole("heading", { name: "H4", level: 4 })
    expect(el.tagName).toBe("H4")
  })

  it("renders <h5> for level 5", () => {
    render(<Heading level={5}>H5</Heading>)
    const el = screen.getByRole("heading", { name: "H5", level: 5 })
    expect(el.tagName).toBe("H5")
  })

  it("renders <h6> for level 6", () => {
    render(<Heading level={6}>H6</Heading>)
    const el = screen.getByRole("heading", { name: "H6", level: 6 })
    expect(el.tagName).toBe("H6")
  })

  it("applies size class", () => {
    render(<Heading size="xl">XL Heading</Heading>)
    const el = screen.getByRole("heading", { name: "XL Heading" })
    expect(el.className).toContain("pm-heading--size-xl")
  })

  it("applies weight class", () => {
    render(<Heading weight="semibold">Semibold</Heading>)
    const el = screen.getByRole("heading", { name: "Semibold" })
    expect(el.className).toContain("pm-heading--weight-semibold")
  })

  it("applies align class", () => {
    render(<Heading align="center">Centered</Heading>)
    const el = screen.getByRole("heading", { name: "Centered" })
    expect(el.className).toContain("pm-heading--align-center")
  })

  it("applies truncate class", () => {
    render(<Heading truncate>Truncated</Heading>)
    const el = screen.getByRole("heading", { name: "Truncated" })
    expect(el.className).toContain("pm-heading--truncate")
  })

  it("forwards ref", () => {
    let headingRef: HTMLHeadingElement | null = null
    render(<Heading ref={(el) => (headingRef = el)}>Ref</Heading>)
    expect(headingRef).toBeInstanceOf(HTMLHeadingElement)
  })

  it("merges custom className", () => {
    render(<Heading className="custom-class">Custom</Heading>)
    const el = screen.getByRole("heading", { name: "Custom" })
    expect(el.className).toContain("pm-heading")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Heading data-testid="my-heading">Test</Heading>)
    expect(screen.getByTestId("my-heading")).toBeInTheDocument()
  })
})
