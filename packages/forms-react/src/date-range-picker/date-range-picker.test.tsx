import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { DateRangePicker } from "./date-range-picker.js"

afterEach(cleanup)

describe("DateRangePicker", () => {
  it("renders a combobox trigger", () => {
    render(<DateRangePicker aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<DateRangePicker aria-label="Date range" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-date-range-picker")
    expect(wrapper?.className).toContain("pm-date-range-picker--outline")
    expect(wrapper?.className).toContain("pm-date-range-picker--md")
  })

  it("applies variant class", () => {
    const { container } = render(<DateRangePicker variant="filled" aria-label="Date range" />)
    expect(container.firstElementChild?.className).toContain("pm-date-range-picker--filled")
  })

  it("applies size class", () => {
    const { container } = render(<DateRangePicker size="lg" aria-label="Date range" />)
    expect(container.firstElementChild?.className).toContain("pm-date-range-picker--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<DateRangePicker open aria-label="Date range" />)
    expect(container.firstElementChild?.className).toContain("pm-date-range-picker--open")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<DateRangePicker open={false} aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<DateRangePicker open aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-haspopup=dialog", () => {
    render(<DateRangePicker aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "dialog")
  })

  it("renders popover dialog", () => {
    render(<DateRangePicker aria-label="Date range" />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("sets disabled on trigger", () => {
    render(<DateRangePicker disabled aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("renders placeholder text", () => {
    render(<DateRangePicker placeholder="Pick range" aria-label="Date range" />)
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick range")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<DateRangePicker ref={(el) => (divRef = el)} aria-label="Date range" />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<DateRangePicker className="custom" aria-label="Date range" />)
    expect(container.firstElementChild?.className).toContain("pm-date-range-picker")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
