import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Spacer } from "./spacer.js"

afterEach(cleanup)

describe("Spacer", () => {
  it("renders as div", () => {
    render(<Spacer data-testid="spacer" />)
    const spacer = screen.getByTestId("spacer")
    expect(spacer.tagName).toBe("DIV")
  })

  it("has aria-hidden=true", () => {
    render(<Spacer data-testid="spacer" />)
    const spacer = screen.getByTestId("spacer")
    expect(spacer).toHaveAttribute("aria-hidden", "true")
  })

  it("applies pm-spacer class", () => {
    render(<Spacer data-testid="spacer" />)
    const spacer = screen.getByTestId("spacer")
    expect(spacer.className).toContain("pm-spacer")
  })

  it("forwards ref", () => {
    let spacerRef: HTMLDivElement | null = null
    render(<Spacer ref={(el) => (spacerRef = el)} />)
    expect(spacerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Spacer className="custom-class" data-testid="spacer" />)
    const spacer = screen.getByTestId("spacer")
    expect(spacer.className).toContain("pm-spacer")
    expect(spacer.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Spacer data-testid="my-spacer" />)
    expect(screen.getByTestId("my-spacer")).toBeInTheDocument()
  })
})
