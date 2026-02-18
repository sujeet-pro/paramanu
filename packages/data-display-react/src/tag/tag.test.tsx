import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Tag } from "./tag.js"

afterEach(cleanup)

describe("Tag", () => {
  it("renders with text content", () => {
    render(<Tag>React</Tag>)
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Tag data-testid="tag">Default</Tag>)
    const tag = screen.getByTestId("tag")
    expect(tag.className).toContain("pm-tag")
    expect(tag.className).toContain("pm-tag--filled")
    expect(tag.className).toContain("pm-tag--md")
    expect(tag.className).toContain("pm-tag--primary")
  })

  it("applies variant class", () => {
    render(<Tag variant="outline" data-testid="tag">Outline</Tag>)
    expect(screen.getByTestId("tag").className).toContain("pm-tag--outline")
  })

  it("applies size class", () => {
    render(<Tag size="lg" data-testid="tag">Large</Tag>)
    expect(screen.getByTestId("tag").className).toContain("pm-tag--lg")
  })

  it("applies color class", () => {
    render(<Tag color="success" data-testid="tag">Success</Tag>)
    expect(screen.getByTestId("tag").className).toContain("pm-tag--success")
  })

  it("renders remove button when removable", () => {
    render(<Tag removable>Remove</Tag>)
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument()
  })

  it("applies interactive modifier", () => {
    render(<Tag interactive data-testid="tag">Interactive</Tag>)
    expect(screen.getByTestId("tag").className).toContain("pm-tag--interactive")
  })

  it("applies disabled modifier", () => {
    render(<Tag disabled data-testid="tag">Disabled</Tag>)
    expect(screen.getByTestId("tag").className).toContain("pm-tag--disabled")
  })

  it("forwards ref", () => {
    let tagRef: HTMLSpanElement | null = null
    render(<Tag ref={(el) => (tagRef = el)}>Ref</Tag>)
    expect(tagRef).toBeInstanceOf(HTMLSpanElement)
  })

  it("merges custom className", () => {
    render(<Tag className="custom" data-testid="tag">Custom</Tag>)
    const tag = screen.getByTestId("tag")
    expect(tag.className).toContain("pm-tag")
    expect(tag.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Tag data-testid="my-tag">Test</Tag>)
    expect(screen.getByTestId("my-tag")).toBeInTheDocument()
  })
})
