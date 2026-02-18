import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { PinInput } from "./pin-input.js"

afterEach(cleanup)

describe("PinInput", () => {
  it("renders a group element", () => {
    render(<PinInput aria-label="PIN code" />)
    expect(screen.getByRole("group", { name: "PIN code" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<PinInput aria-label="PIN code" />)
    const pinInput = screen.getByRole("group", { name: "PIN code" })
    expect(pinInput.className).toContain("pm-pin-input")
    expect(pinInput.className).toContain("pm-pin-input--md")
  })

  it("applies size class", () => {
    render(<PinInput size="lg" aria-label="PIN code" />)
    const pinInput = screen.getByRole("group", { name: "PIN code" })
    expect(pinInput.className).toContain("pm-pin-input--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<PinInput disabled aria-label="PIN code" />)
    const pinInput = screen.getByRole("group", { name: "PIN code" })
    expect(pinInput).toHaveAttribute("aria-disabled", "true")
    expect(pinInput.className).toContain("pm-pin-input--disabled")
  })

  it("sets aria-invalid when invalid", () => {
    render(<PinInput invalid aria-label="PIN code" />)
    const pinInput = screen.getByRole("group", { name: "PIN code" })
    expect(pinInput).toHaveAttribute("aria-invalid", "true")
    expect(pinInput.className).toContain("pm-pin-input--invalid")
  })

  it("forwards ref", () => {
    let pinRef: HTMLDivElement | null = null
    render(<PinInput ref={(el) => (pinRef = el)} aria-label="PIN code" />)
    expect(pinRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<PinInput className="custom-class" aria-label="PIN code" />)
    const pinInput = screen.getByRole("group", { name: "PIN code" })
    expect(pinInput.className).toContain("pm-pin-input")
    expect(pinInput.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<PinInput data-testid="my-pin" aria-label="PIN code" />)
    expect(screen.getByTestId("my-pin")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <PinInput aria-label="PIN code">
        <input type="text" aria-label="Digit 1" />
      </PinInput>,
    )
    expect(screen.getByRole("textbox", { name: "Digit 1" })).toBeInTheDocument()
  })
})
