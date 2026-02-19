import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Colorpicker } from "./color-picker.js"

afterEach(cleanup)

describe("Colorpicker", () => {
  it("renders a trigger button", () => {
    render(<Colorpicker />)
    expect(screen.getByRole("button", { name: "Select color" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<Colorpicker />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-colorpicker")
    expect(wrapper?.className).toContain("pm-colorpicker--md")
  })

  it("applies size class", () => {
    const { container } = render(<Colorpicker size="lg" />)
    expect(container.firstElementChild?.className).toContain("pm-colorpicker--lg")
  })

  it("applies sm size class", () => {
    const { container } = render(<Colorpicker size="sm" />)
    expect(container.firstElementChild?.className).toContain("pm-colorpicker--sm")
  })

  it("applies open modifier", () => {
    const { container } = render(<Colorpicker open />)
    expect(container.firstElementChild?.className).toContain("pm-colorpicker--open")
  })

  it("applies disabled modifier", () => {
    const { container } = render(<Colorpicker disabled />)
    expect(container.firstElementChild?.className).toContain("pm-colorpicker--disabled")
  })

  it("sets aria-expanded based on open prop", () => {
    const { rerender } = render(<Colorpicker open={false} />)
    expect(screen.getByRole("button", { name: "Select color" })).toHaveAttribute(
      "aria-expanded",
      "false",
    )
    rerender(<Colorpicker open />)
    expect(screen.getByRole("button", { name: "Select color" })).toHaveAttribute(
      "aria-expanded",
      "true",
    )
  })

  it("has aria-haspopup=dialog on trigger", () => {
    render(<Colorpicker />)
    expect(screen.getByRole("button", { name: "Select color" })).toHaveAttribute(
      "aria-haspopup",
      "dialog",
    )
  })

  it("renders dialog popover", () => {
    render(<Colorpicker />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("sets disabled on trigger", () => {
    render(<Colorpicker disabled />)
    expect(screen.getByRole("button", { name: "Select color" })).toBeDisabled()
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<Colorpicker ref={(el) => (divRef = el)} />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Colorpicker className="custom" />)
    expect(container.firstElementChild?.className).toContain("pm-colorpicker")
    expect(container.firstElementChild?.className).toContain("custom")
  })

  it("hides swatch from screen readers", () => {
    const { container } = render(<Colorpicker />)
    const swatch = container.querySelector(".pm-colorpicker__swatch")
    expect(swatch).toHaveAttribute("aria-hidden", "true")
  })
})
