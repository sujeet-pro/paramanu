import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormatByte } from "./format-byte.js"

describe("FormatByte", () => {
  it("formats bytes with defaults", () => {
    render(<FormatByte value={1500} data-testid="byte" />)
    expect(screen.getByTestId("byte")).toHaveTextContent("1.5 KB")
  })

  it("formats zero bytes", () => {
    render(<FormatByte value={0} data-testid="byte" />)
    expect(screen.getByTestId("byte")).toHaveTextContent("0 B")
  })

  it("formats large values", () => {
    render(<FormatByte value={1500000000} data-testid="byte" />)
    expect(screen.getByTestId("byte")).toHaveTextContent("1.5 GB")
  })

  it("formats as bits", () => {
    render(<FormatByte value={1000} unit="bit" data-testid="byte" />)
    expect(screen.getByTestId("byte")).toHaveTextContent("8 Kb")
  })

  it("renders as custom element", () => {
    render(<FormatByte as="div" value={100} data-testid="byte" />)
    expect(screen.getByTestId("byte").tagName).toBe("DIV")
  })

  it("renders as span by default", () => {
    render(<FormatByte value={100} data-testid="byte" />)
    expect(screen.getByTestId("byte").tagName).toBe("SPAN")
  })

  it("merges custom className", () => {
    render(<FormatByte value={100} className="custom" data-testid="byte" />)
    expect(screen.getByTestId("byte")).toHaveClass("custom")
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLElement | null>
    render(<FormatByte value={100} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
