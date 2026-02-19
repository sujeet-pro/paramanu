import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Btn } from "./button.js"

afterEach(cleanup)

describe("Btn", () => {
  it("renders with text content", () => {
    render(<Btn>Click me</Btn>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Btn>Default</Btn>)
    const button = screen.getByRole("button", { name: "Default" })
    expect(button.className).toContain("pm-btn")
    expect(button.className).toContain("pm-btn--primary")
    expect(button.className).toContain("pm-btn--md")
  })

  it("applies variant class", () => {
    render(<Btn variant="danger">Danger</Btn>)
    const button = screen.getByRole("button", { name: "Danger" })
    expect(button.className).toContain("pm-btn--danger")
  })

  it("applies size class", () => {
    render(<Btn size="lg">Large</Btn>)
    const button = screen.getByRole("button", { name: "Large" })
    expect(button.className).toContain("pm-btn--lg")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<Btn disabled>Disabled</Btn>)
    const button = screen.getByRole("button", { name: "Disabled" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("defaults to type=button", () => {
    render(<Btn>Click</Btn>)
    expect(screen.getByRole("button", { name: "Click" })).toHaveAttribute("type", "button")
  })

  it("allows type=submit", () => {
    render(<Btn type="submit">Submit</Btn>)
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<Btn ref={(el) => (buttonRef = el)}>Ref</Btn>)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<Btn className="custom-class">Custom</Btn>)
    const button = screen.getByRole("button", { name: "Custom" })
    expect(button.className).toContain("pm-btn")
    expect(button.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Btn data-testid="my-button">Test</Btn>)
    expect(screen.getByTestId("my-button")).toBeInTheDocument()
  })
})
