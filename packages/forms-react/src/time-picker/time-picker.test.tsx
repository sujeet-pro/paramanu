import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Timepicker } from "./time-picker.js"

afterEach(cleanup)

describe("Timepicker", () => {
  it("renders a combobox input", () => {
    render(<Timepicker aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<Timepicker aria-label="Select time" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-timepicker")
    expect(wrapper?.className).toContain("pm-timepicker--outline")
    expect(wrapper?.className).toContain("pm-timepicker--md")
  })

  it("applies variant class", () => {
    const { container } = render(<Timepicker variant="filled" aria-label="Select time" />)
    expect(container.firstElementChild?.className).toContain("pm-timepicker--filled")
  })

  it("applies size class", () => {
    const { container } = render(<Timepicker size="lg" aria-label="Select time" />)
    expect(container.firstElementChild?.className).toContain("pm-timepicker--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<Timepicker open aria-label="Select time" />)
    expect(container.firstElementChild?.className).toContain("pm-timepicker--open")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<Timepicker open={false} aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<Timepicker open aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-haspopup=listbox", () => {
    render(<Timepicker aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "listbox")
  })

  it("renders dropdown listbox", () => {
    render(<Timepicker aria-label="Select time" />)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("sets disabled on input", () => {
    render(<Timepicker disabled aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("sets aria-invalid when invalid", () => {
    render(<Timepicker invalid aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to input", () => {
    let inputRef: HTMLInputElement | null = null
    render(<Timepicker ref={(el) => (inputRef = el)} aria-label="Select time" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Timepicker className="custom" aria-label="Select time" />)
    expect(container.firstElementChild?.className).toContain("pm-timepicker")
    expect(container.firstElementChild?.className).toContain("custom")
  })

  it("passes through placeholder", () => {
    render(<Timepicker placeholder="HH:MM" aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "HH:MM")
  })
})
