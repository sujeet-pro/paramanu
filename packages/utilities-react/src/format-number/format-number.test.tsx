import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormatNumber } from "./format-number.js"

describe("FormatNumber", () => {
  it("formats a number with defaults", () => {
    render(<FormatNumber value={1234.5} data-testid="num" />)
    expect(screen.getByTestId("num")).toHaveTextContent("1,234.5")
  })

  it("formats as currency", () => {
    render(<FormatNumber value={42.99} style="currency" currency="USD" data-testid="num" />)
    expect(screen.getByTestId("num")).toHaveTextContent("$42.99")
  })

  it("formats as percent", () => {
    render(<FormatNumber value={0.85} style="percent" data-testid="num" />)
    expect(screen.getByTestId("num")).toHaveTextContent("85%")
  })

  it("renders as custom element", () => {
    render(<FormatNumber as="div" value={100} data-testid="num" />)
    expect(screen.getByTestId("num").tagName).toBe("DIV")
  })

  it("renders as span by default", () => {
    render(<FormatNumber value={100} data-testid="num" />)
    expect(screen.getByTestId("num").tagName).toBe("SPAN")
  })

  it("merges custom className", () => {
    render(<FormatNumber value={100} className="custom" data-testid="num" />)
    expect(screen.getByTestId("num")).toHaveClass("custom")
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLElement | null>
    render(<FormatNumber value={100} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
