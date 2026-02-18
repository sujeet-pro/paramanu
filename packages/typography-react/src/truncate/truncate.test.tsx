import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Truncate } from "./truncate.js"

afterEach(cleanup)

describe("Truncate", () => {
  it("renders with text content", () => {
    render(<Truncate>Long text that should be truncated</Truncate>)
    expect(screen.getByText("Long text that should be truncated")).toBeInTheDocument()
  })

  it("renders a <div> element", () => {
    render(<Truncate>Content</Truncate>)
    const el = screen.getByText("Content")
    expect(el.tagName).toBe("DIV")
  })

  it("applies default classes", () => {
    render(<Truncate>Default</Truncate>)
    const el = screen.getByText("Default")
    expect(el.className).toContain("pm-truncate")
  })

  it("applies lines class", () => {
    render(<Truncate lines={3}>Three lines</Truncate>)
    const el = screen.getByText("Three lines")
    expect(el.className).toContain("pm-truncate--lines-3")
  })

  it("applies single line class", () => {
    render(<Truncate lines={1}>One line</Truncate>)
    const el = screen.getByText("One line")
    expect(el.className).toContain("pm-truncate--lines-1")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<Truncate ref={(el) => (divRef = el)}>Ref</Truncate>)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Truncate className="custom-class">Custom</Truncate>)
    const el = screen.getByText("Custom")
    expect(el.className).toContain("pm-truncate")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Truncate data-testid="my-truncate">Test</Truncate>)
    expect(screen.getByTestId("my-truncate")).toBeInTheDocument()
  })
})
