import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Backdrop } from "./backdrop.js"

afterEach(cleanup)

describe("Backdrop", () => {
  it("renders with children", () => {
    render(<Backdrop>Overlay content</Backdrop>)
    expect(screen.getByText("Overlay content")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Backdrop data-testid="backdrop" />)
    const el = screen.getByTestId("backdrop")
    expect(el.className).toContain("pm-backdrop")
    expect(el.className).toContain("pm-backdrop--default")
  })

  it("applies variant class", () => {
    render(<Backdrop variant="transparent" data-testid="backdrop" />)
    const el = screen.getByTestId("backdrop")
    expect(el.className).toContain("pm-backdrop--transparent")
  })

  it("applies visible class when visible", () => {
    render(<Backdrop visible data-testid="backdrop" />)
    const el = screen.getByTestId("backdrop")
    expect(el.className).toContain("pm-backdrop--visible")
  })

  it("does not apply visible class when not visible", () => {
    render(<Backdrop data-testid="backdrop" />)
    const el = screen.getByTestId("backdrop")
    expect(el.className).not.toContain("pm-backdrop--visible")
  })

  it("has aria-hidden attribute", () => {
    render(<Backdrop data-testid="backdrop" />)
    const el = screen.getByTestId("backdrop")
    expect(el).toHaveAttribute("aria-hidden", "true")
  })

  it("forwards ref", () => {
    let backdropRef: HTMLDivElement | null = null
    render(<Backdrop ref={(el) => (backdropRef = el)} />)
    expect(backdropRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Backdrop className="custom-class" data-testid="backdrop" />)
    const el = screen.getByTestId("backdrop")
    expect(el.className).toContain("pm-backdrop")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Backdrop data-testid="my-backdrop" />)
    expect(screen.getByTestId("my-backdrop")).toBeInTheDocument()
  })
})
