import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Input } from "./input.js"

afterEach(cleanup)

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input aria-label="Name" />)
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Input aria-label="Name" />)
    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input.className).toContain("pm-input")
    expect(input.className).toContain("pm-input--outline")
    expect(input.className).toContain("pm-input--md")
  })

  it("applies variant class", () => {
    render(<Input variant="filled" aria-label="Name" />)
    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input.className).toContain("pm-input--filled")
  })

  it("applies size class", () => {
    render(<Input size="lg" aria-label="Name" />)
    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input.className).toContain("pm-input--lg")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<Input disabled aria-label="Name" />)
    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<Input invalid aria-label="Name" />)
    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input.className).toContain("pm-input--invalid")
  })

  it("sets readOnly attribute", () => {
    render(<Input readOnly aria-label="Name" />)
    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input).toHaveAttribute("readonly")
    expect(input.className).toContain("pm-input--read-only")
  })

  it("applies full-width modifier", () => {
    render(<Input fullWidth aria-label="Name" />)
    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input.className).toContain("pm-input--full-width")
  })

  it("defaults to type=text", () => {
    render(<Input aria-label="Name" />)
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("type", "text")
  })

  it("allows type=email", () => {
    render(<Input type="email" aria-label="Email" />)
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("type", "email")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<Input ref={(el) => (inputRef = el)} aria-label="Name" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<Input className="custom-class" aria-label="Name" />)
    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input.className).toContain("pm-input")
    expect(input.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Input data-testid="my-input" aria-label="Name" placeholder="Enter name" />)
    const input = screen.getByTestId("my-input")
    expect(input).toHaveAttribute("placeholder", "Enter name")
  })
})
