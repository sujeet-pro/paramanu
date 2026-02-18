import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { DatePicker } from "./date-picker.js"

afterEach(cleanup)

describe("DatePicker", () => {
  it("renders a combobox input", () => {
    render(<DatePicker aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<DatePicker aria-label="Select date" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-date-picker")
    expect(wrapper?.className).toContain("pm-date-picker--outline")
    expect(wrapper?.className).toContain("pm-date-picker--md")
  })

  it("applies variant class", () => {
    const { container } = render(<DatePicker variant="filled" aria-label="Select date" />)
    expect(container.firstElementChild?.className).toContain("pm-date-picker--filled")
  })

  it("applies size class", () => {
    const { container } = render(<DatePicker size="lg" aria-label="Select date" />)
    expect(container.firstElementChild?.className).toContain("pm-date-picker--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<DatePicker open aria-label="Select date" />)
    expect(container.firstElementChild?.className).toContain("pm-date-picker--open")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<DatePicker open={false} aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<DatePicker open aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-haspopup=dialog", () => {
    render(<DatePicker aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "dialog")
  })

  it("renders popover dialog", () => {
    render(<DatePicker aria-label="Select date" />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("sets disabled on input", () => {
    render(<DatePicker disabled aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("sets aria-invalid when invalid", () => {
    render(<DatePicker invalid aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to input", () => {
    let inputRef: HTMLInputElement | null = null
    render(<DatePicker ref={(el) => (inputRef = el)} aria-label="Select date" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    const { container } = render(<DatePicker className="custom" aria-label="Select date" />)
    expect(container.firstElementChild?.className).toContain("pm-date-picker")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
