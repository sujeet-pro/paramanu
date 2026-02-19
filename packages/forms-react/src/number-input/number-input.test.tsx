import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { NumInput } from "./number-input.js"

afterEach(cleanup)

describe("NumInput", () => {
  it("renders a number input", () => {
    render(<NumInput aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toHaveAttribute("type", "number")
  })

  it("applies wrapper classes", () => {
    const { container } = render(<NumInput aria-label="Quantity" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-num-input")
    expect(wrapper?.className).toContain("pm-num-input--outline")
    expect(wrapper?.className).toContain("pm-num-input--md")
  })

  it("applies input classes", () => {
    render(<NumInput aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input.className).toContain("pm-input")
    expect(input.className).toContain("pm-input--outline")
    expect(input.className).toContain("pm-input--md")
  })

  it("applies variant class", () => {
    const { container } = render(<NumInput variant="filled" aria-label="Quantity" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-num-input--filled")
  })

  it("applies size class", () => {
    const { container } = render(<NumInput size="lg" aria-label="Quantity" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-num-input--lg")
  })

  it("renders increment and decrement buttons", () => {
    render(<NumInput aria-label="Quantity" />)
    expect(screen.getByLabelText("Increment")).toBeInTheDocument()
    expect(screen.getByLabelText("Decrement")).toBeInTheDocument()
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<NumInput disabled aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<NumInput invalid aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("passes min, max, step to input", () => {
    render(<NumInput min={0} max={100} step={5} aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toHaveAttribute("min", "0")
    expect(input).toHaveAttribute("max", "100")
    expect(input).toHaveAttribute("step", "5")
  })

  it("has inputMode=numeric", () => {
    render(<NumInput aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toHaveAttribute("inputmode", "numeric")
  })

  it("forwards ref to the input element", () => {
    let inputRef: HTMLInputElement | null = null
    render(<NumInput ref={(el) => (inputRef = el)} aria-label="Quantity" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
    expect(inputRef?.type).toBe("number")
  })

  it("merges custom className on wrapper", () => {
    const { container } = render(<NumInput className="custom-class" aria-label="Quantity" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-num-input")
    expect(wrapper?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<NumInput data-testid="my-number" aria-label="Quantity" placeholder="0" />)
    const input = screen.getByTestId("my-number")
    expect(input).toHaveAttribute("placeholder", "0")
  })
})
