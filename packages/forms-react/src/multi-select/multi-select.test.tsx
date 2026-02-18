import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { MultiSelect } from "./multi-select.js"

afterEach(cleanup)

describe("MultiSelect", () => {
  it("renders a combobox trigger", () => {
    render(<MultiSelect aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<MultiSelect aria-label="Tags" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-multi-select")
    expect(wrapper?.className).toContain("pm-multi-select--outline")
    expect(wrapper?.className).toContain("pm-multi-select--md")
  })

  it("applies variant class", () => {
    const { container } = render(<MultiSelect variant="filled" aria-label="Tags" />)
    expect(container.firstElementChild?.className).toContain("pm-multi-select--filled")
  })

  it("applies size class", () => {
    const { container } = render(<MultiSelect size="lg" aria-label="Tags" />)
    expect(container.firstElementChild?.className).toContain("pm-multi-select--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<MultiSelect open aria-label="Tags" />)
    expect(container.firstElementChild?.className).toContain("pm-multi-select--open")
  })

  it("has aria-multiselectable on listbox", () => {
    render(<MultiSelect aria-label="Tags" />)
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-multiselectable", "true")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<MultiSelect open={false} aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<MultiSelect open aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("sets aria-disabled when disabled", () => {
    render(<MultiSelect disabled aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<MultiSelect invalid aria-label="Tags" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<MultiSelect ref={(el) => (divRef = el)} aria-label="Tags" />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<MultiSelect className="custom" aria-label="Tags" />)
    expect(container.firstElementChild?.className).toContain("pm-multi-select")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
