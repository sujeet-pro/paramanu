import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { NumberInput } from "./number-input.js"

afterEach(cleanup)

describe("NumberInput", () => {
  it("renders a number input", () => {
    render(<NumberInput aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toHaveAttribute("type", "number")
  })

  it("applies wrapper classes", () => {
    const { container } = render(<NumberInput aria-label="Quantity" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-number-input")
    expect(wrapper?.className).toContain("pm-number-input--outline")
    expect(wrapper?.className).toContain("pm-number-input--md")
  })

  it("applies input classes", () => {
    render(<NumberInput aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input.className).toContain("pm-input")
    expect(input.className).toContain("pm-input--outline")
    expect(input.className).toContain("pm-input--md")
  })

  it("applies variant class", () => {
    const { container } = render(<NumberInput variant="filled" aria-label="Quantity" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-number-input--filled")
  })

  it("applies size class", () => {
    const { container } = render(<NumberInput size="lg" aria-label="Quantity" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-number-input--lg")
  })

  it("renders increment and decrement buttons", () => {
    render(<NumberInput aria-label="Quantity" />)
    expect(screen.getByLabelText("Increment")).toBeInTheDocument()
    expect(screen.getByLabelText("Decrement")).toBeInTheDocument()
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<NumberInput disabled aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<NumberInput invalid aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("passes min, max, step to input", () => {
    render(<NumberInput min={0} max={100} step={5} aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toHaveAttribute("min", "0")
    expect(input).toHaveAttribute("max", "100")
    expect(input).toHaveAttribute("step", "5")
  })

  it("has inputMode=numeric", () => {
    render(<NumberInput aria-label="Quantity" />)
    const input = screen.getByLabelText("Quantity")
    expect(input).toHaveAttribute("inputmode", "numeric")
  })

  it("forwards ref to the input element", () => {
    let inputRef: HTMLInputElement | null = null
    render(<NumberInput ref={(el) => (inputRef = el)} aria-label="Quantity" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
    expect(inputRef?.type).toBe("number")
  })

  it("merges custom className on wrapper", () => {
    const { container } = render(<NumberInput className="custom-class" aria-label="Quantity" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-number-input")
    expect(wrapper?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<NumberInput data-testid="my-number" aria-label="Quantity" placeholder="0" />)
    const input = screen.getByTestId("my-number")
    expect(input).toHaveAttribute("placeholder", "0")
  })
})
