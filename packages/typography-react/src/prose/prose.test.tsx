import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Prose } from "./prose.js"

afterEach(cleanup)

describe("Prose", () => {
  it("renders with text content", () => {
    render(<Prose>Rich text content</Prose>)
    expect(screen.getByText("Rich text content")).toBeInTheDocument()
  })

  it("renders a <div> element", () => {
    render(<Prose>Content</Prose>)
    const el = screen.getByText("Content")
    expect(el.tagName).toBe("DIV")
  })

  it("applies default classes", () => {
    render(<Prose>Default</Prose>)
    const el = screen.getByText("Default")
    expect(el.className).toContain("pm-prose")
  })

  it("applies size class", () => {
    render(<Prose size="lg">Large prose</Prose>)
    const el = screen.getByText("Large prose")
    expect(el.className).toContain("pm-prose--lg")
  })

  it("forwards ref", () => {
    let proseRef: HTMLDivElement | null = null
    render(<Prose ref={(el) => (proseRef = el)}>Ref</Prose>)
    expect(proseRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Prose className="custom-class">Custom</Prose>)
    const el = screen.getByText("Custom")
    expect(el.className).toContain("pm-prose")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Prose data-testid="my-prose">Test</Prose>)
    expect(screen.getByTestId("my-prose")).toBeInTheDocument()
  })
})
