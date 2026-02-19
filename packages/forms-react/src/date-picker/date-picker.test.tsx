import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Datepicker } from "./date-picker.js"

afterEach(cleanup)

describe("Datepicker", () => {
  it("renders a combobox input", () => {
    render(<Datepicker aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<Datepicker aria-label="Select date" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-datepicker")
    expect(wrapper?.className).toContain("pm-datepicker--outline")
    expect(wrapper?.className).toContain("pm-datepicker--md")
  })

  it("applies variant class", () => {
    const { container } = render(<Datepicker variant="filled" aria-label="Select date" />)
    expect(container.firstElementChild?.className).toContain("pm-datepicker--filled")
  })

  it("applies size class", () => {
    const { container } = render(<Datepicker size="lg" aria-label="Select date" />)
    expect(container.firstElementChild?.className).toContain("pm-datepicker--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<Datepicker open aria-label="Select date" />)
    expect(container.firstElementChild?.className).toContain("pm-datepicker--open")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<Datepicker open={false} aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<Datepicker open aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-haspopup=dialog", () => {
    render(<Datepicker aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "dialog")
  })

  it("renders popover dialog", () => {
    render(<Datepicker aria-label="Select date" />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("sets disabled on input", () => {
    render(<Datepicker disabled aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("sets aria-invalid when invalid", () => {
    render(<Datepicker invalid aria-label="Select date" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to input", () => {
    let inputRef: HTMLInputElement | null = null
    render(<Datepicker ref={(el) => (inputRef = el)} aria-label="Select date" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Datepicker className="custom" aria-label="Select date" />)
    expect(container.firstElementChild?.className).toContain("pm-datepicker")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
