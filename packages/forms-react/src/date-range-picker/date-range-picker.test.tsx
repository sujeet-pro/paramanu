import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Daterange } from "./date-range-picker.js"

afterEach(cleanup)

describe("Daterange", () => {
  it("renders a combobox trigger", () => {
    render(<Daterange aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<Daterange aria-label="Date range" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-daterange")
    expect(wrapper?.className).toContain("pm-daterange--outline")
    expect(wrapper?.className).toContain("pm-daterange--md")
  })

  it("applies variant class", () => {
    const { container } = render(<Daterange variant="filled" aria-label="Date range" />)
    expect(container.firstElementChild?.className).toContain("pm-daterange--filled")
  })

  it("applies size class", () => {
    const { container } = render(<Daterange size="lg" aria-label="Date range" />)
    expect(container.firstElementChild?.className).toContain("pm-daterange--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<Daterange open aria-label="Date range" />)
    expect(container.firstElementChild?.className).toContain("pm-daterange--open")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<Daterange open={false} aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<Daterange open aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-haspopup=dialog", () => {
    render(<Daterange aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "dialog")
  })

  it("renders popover dialog", () => {
    render(<Daterange aria-label="Date range" />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("sets disabled on trigger", () => {
    render(<Daterange disabled aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("renders placeholder text", () => {
    render(<Daterange placeholder="Pick range" aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick range")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<Daterange ref={(el) => (divRef = el)} aria-label="Date range" />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Daterange className="custom" aria-label="Date range" />)
    expect(container.firstElementChild?.className).toContain("pm-daterange")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
