import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { TimePicker } from "./time-picker.js"

afterEach(cleanup)

describe("TimePicker", () => {
  it("renders a combobox input", () => {
    render(<TimePicker aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<TimePicker aria-label="Select time" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-time-picker")
    expect(wrapper?.className).toContain("pm-time-picker--outline")
    expect(wrapper?.className).toContain("pm-time-picker--md")
  })

  it("applies variant class", () => {
    const { container } = render(<TimePicker variant="filled" aria-label="Select time" />)
    expect(container.firstElementChild?.className).toContain("pm-time-picker--filled")
  })

  it("applies size class", () => {
    const { container } = render(<TimePicker size="lg" aria-label="Select time" />)
    expect(container.firstElementChild?.className).toContain("pm-time-picker--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<TimePicker open aria-label="Select time" />)
    expect(container.firstElementChild?.className).toContain("pm-time-picker--open")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<TimePicker open={false} aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<TimePicker open aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-haspopup=listbox", () => {
    render(<TimePicker aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "listbox")
  })

  it("renders dropdown listbox", () => {
    render(<TimePicker aria-label="Select time" />)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("sets disabled on input", () => {
    render(<TimePicker disabled aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("sets aria-invalid when invalid", () => {
    render(<TimePicker invalid aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to input", () => {
    let inputRef: HTMLInputElement | null = null
    render(<TimePicker ref={(el) => (inputRef = el)} aria-label="Select time" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    const { container } = render(<TimePicker className="custom" aria-label="Select time" />)
    expect(container.firstElementChild?.className).toContain("pm-time-picker")
    expect(container.firstElementChild?.className).toContain("custom")
  })

  it("passes through placeholder", () => {
    render(<TimePicker placeholder="HH:MM" aria-label="Select time" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "HH:MM")
  })
})
