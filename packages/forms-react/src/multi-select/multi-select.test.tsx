import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { MultiSel } from "./multi-select.js"

afterEach(cleanup)

describe("MultiSel", () => {
  it("renders a combobox trigger", () => {
    render(<MultiSel aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<MultiSel aria-label="Tags" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-multi-sel")
    expect(wrapper?.className).toContain("pm-multi-sel--outline")
    expect(wrapper?.className).toContain("pm-multi-sel--md")
  })

  it("applies variant class", () => {
    const { container } = render(<MultiSel variant="filled" aria-label="Tags" />)
    expect(container.firstElementChild?.className).toContain("pm-multi-sel--filled")
  })

  it("applies size class", () => {
    const { container } = render(<MultiSel size="lg" aria-label="Tags" />)
    expect(container.firstElementChild?.className).toContain("pm-multi-sel--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<MultiSel open aria-label="Tags" />)
    expect(container.firstElementChild?.className).toContain("pm-multi-sel--open")
  })

  it("has aria-multiselectable on listbox", () => {
    render(<MultiSel aria-label="Tags" />)
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-multiselectable", "true")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<MultiSel open={false} aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<MultiSel open aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("sets aria-disabled when disabled", () => {
    render(<MultiSel disabled aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<MultiSel invalid aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<MultiSel ref={(el) => (divRef = el)} aria-label="Tags" />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<MultiSel className="custom" aria-label="Tags" />)
    expect(container.firstElementChild?.className).toContain("pm-multi-sel")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
