import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Cascader } from "./cascader.js"

afterEach(cleanup)

describe("Cascader", () => {
  it("renders a combobox trigger", () => {
    render(<Cascader aria-label="Location" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<Cascader aria-label="Location" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-cascader")
    expect(wrapper?.className).toContain("pm-cascader--outline")
    expect(wrapper?.className).toContain("pm-cascader--md")
  })

  it("applies variant class", () => {
    const { container } = render(<Cascader variant="filled" aria-label="Location" />)
    expect(container.firstElementChild?.className).toContain("pm-cascader--filled")
  })

  it("applies size class", () => {
    const { container } = render(<Cascader size="lg" aria-label="Location" />)
    expect(container.firstElementChild?.className).toContain("pm-cascader--lg")
  })

  it("applies open modifier", () => {
    const { container } = render(<Cascader open aria-label="Location" />)
    expect(container.firstElementChild?.className).toContain("pm-cascader--open")
  })

  it("applies full-width modifier", () => {
    const { container } = render(<Cascader fullWidth aria-label="Location" />)
    expect(container.firstElementChild?.className).toContain("pm-cascader--full-width")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<Cascader open={false} aria-label="Location" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false")
    rerender(<Cascader open aria-label="Location" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-haspopup=listbox on trigger", () => {
    render(<Cascader aria-label="Location" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "listbox")
  })

  it("sets disabled on trigger", () => {
    render(<Cascader disabled aria-label="Location" />)
    const trigger = screen.getByRole("combobox")
    expect(trigger).toBeDisabled()
    expect(trigger).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<Cascader invalid aria-label="Location" />)
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("renders placeholder text", () => {
    render(<Cascader placeholder="Pick location" aria-label="Location" />)
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick location")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<Cascader ref={(el) => (divRef = el)} aria-label="Location" />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Cascader className="custom" aria-label="Location" />)
    expect(container.firstElementChild?.className).toContain("pm-cascader")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
