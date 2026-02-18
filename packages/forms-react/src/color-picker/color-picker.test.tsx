import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ColorPicker } from "./color-picker.js"

afterEach(cleanup)

describe("ColorPicker", () => {
  it("renders a trigger button", () => {
    render(<ColorPicker />)
    expect(screen.getByRole("button", { name: "Select color" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<ColorPicker />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-color-picker")
    expect(wrapper?.className).toContain("pm-color-picker--md")
  })

  it("applies size class", () => {
    const { container } = render(<ColorPicker size="lg" />)
    expect(container.firstElementChild?.className).toContain("pm-color-picker--lg")
  })

  it("applies sm size class", () => {
    const { container } = render(<ColorPicker size="sm" />)
    expect(container.firstElementChild?.className).toContain("pm-color-picker--sm")
  })

  it("applies open modifier", () => {
    const { container } = render(<ColorPicker open />)
    expect(container.firstElementChild?.className).toContain("pm-color-picker--open")
  })

  it("applies disabled modifier", () => {
    const { container } = render(<ColorPicker disabled />)
    expect(container.firstElementChild?.className).toContain("pm-color-picker--disabled")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<ColorPicker open={false} />)
    expect(screen.getByRole("button", { name: "Select color" })).toHaveAttribute(
      "aria-expanded",
      "false",
    )
    rerender(<ColorPicker open />)
    expect(screen.getByRole("button", { name: "Select color" })).toHaveAttribute(
      "aria-expanded",
      "true",
    )
  })

  it("has aria-haspopup=dialog on trigger", () => {
    render(<ColorPicker />)
    expect(screen.getByRole("button", { name: "Select color" })).toHaveAttribute(
      "aria-haspopup",
      "dialog",
    )
  })

  it("renders dialog popover", () => {
    render(<ColorPicker />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("sets disabled on trigger", () => {
    render(<ColorPicker disabled />)
    expect(screen.getByRole("button", { name: "Select color" })).toBeDisabled()
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<ColorPicker ref={(el) => (divRef = el)} />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<ColorPicker className="custom" />)
    expect(container.firstElementChild?.className).toContain("pm-color-picker")
    expect(container.firstElementChild?.className).toContain("custom")
  })

  it("hides swatch from screen readers", () => {
    const { container } = render(<ColorPicker />)
    const swatch = container.querySelector(".pm-color-picker__swatch")
    expect(swatch).toHaveAttribute("aria-hidden", "true")
  })
})
