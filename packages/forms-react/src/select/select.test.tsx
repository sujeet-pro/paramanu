import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Select } from "./select.js"

afterEach(cleanup)

describe("Select", () => {
  it("renders a combobox trigger", () => {
    render(<Select aria-label="Color" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<Select aria-label="Color" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-select")
    expect(wrapper?.className).toContain("pm-select--outline")
    expect(wrapper?.className).toContain("pm-select--md")
  })

  it("applies variant class", () => {
    const { container } = render(<Select variant="filled" aria-label="Color" />)
    expect(container.firstElementChild?.className).toContain("pm-select--filled")
  })

  it("applies size class", () => {
    const { container } = render(<Select size="lg" aria-label="Color" />)
    expect(container.firstElementChild?.className).toContain("pm-select--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<Select open aria-label="Color" />)
    expect(container.firstElementChild?.className).toContain("pm-select--open")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<Select open={false} aria-label="Color" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<Select open aria-label="Color" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-haspopup=listbox on trigger", () => {
    render(<Select aria-label="Color" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "listbox")
  })

  it("renders listbox", () => {
    render(<Select aria-label="Color" />)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("sets disabled on trigger", () => {
    render(<Select disabled aria-label="Color" />)
    const trigger = screen.getByRole("combobox")
    expect(trigger).toBeDisabled()
    expect(trigger).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<Select invalid aria-label="Color" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("renders placeholder text", () => {
    render(<Select placeholder="Pick one" aria-label="Color" />)
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick one")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<Select ref={(el) => (divRef = el)} aria-label="Color" />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Select className="custom" aria-label="Color" />)
    expect(container.firstElementChild?.className).toContain("pm-select")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
