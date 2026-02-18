import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Combobox } from "./combobox.js"

afterEach(cleanup)

describe("Combobox", () => {
  it("renders a combobox input", () => {
    render(<Combobox aria-label="Search" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<Combobox aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-combobox")
    expect(wrapper?.className).toContain("pm-combobox--outline")
    expect(wrapper?.className).toContain("pm-combobox--md")
  })

  it("applies variant class", () => {
    const { container } = render(<Combobox variant="filled" aria-label="Search" />)
    expect(container.firstElementChild?.className).toContain("pm-combobox--filled")
  })

  it("applies size class", () => {
    const { container } = render(<Combobox size="lg" aria-label="Search" />)
    expect(container.firstElementChild?.className).toContain("pm-combobox--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<Combobox open aria-label="Search" />)
    expect(container.firstElementChild?.className).toContain("pm-combobox--open")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<Combobox open={false} aria-label="Search" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<Combobox open aria-label="Search" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-autocomplete=list", () => {
    render(<Combobox aria-label="Search" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-autocomplete", "list")
  })

  it("has aria-haspopup=listbox", () => {
    render(<Combobox aria-label="Search" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "listbox")
  })

  it("renders listbox", () => {
    render(<Combobox aria-label="Search" />)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("sets disabled on input", () => {
    render(<Combobox disabled aria-label="Search" />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("sets aria-invalid when invalid", () => {
    render(<Combobox invalid aria-label="Search" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to input", () => {
    let inputRef: HTMLInputElement | null = null
    render(<Combobox ref={(el) => (inputRef = el)} aria-label="Search" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("passes through placeholder", () => {
    render(<Combobox placeholder="Type to search..." aria-label="Search" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "Type to search...")
  })
})
