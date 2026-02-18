import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Button } from "./button.js"

afterEach(cleanup)

describe("Button", () => {
  it("renders with text content", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole("button", { name: "Default" })
    expect(button.className).toContain("pm-button")
    expect(button.className).toContain("pm-button--primary")
    expect(button.className).toContain("pm-button--md")
  })

  it("applies variant class", () => {
    render(<Button variant="danger">Danger</Button>)
    const button = screen.getByRole("button", { name: "Danger" })
    expect(button.className).toContain("pm-button--danger")
  })

  it("applies size class", () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole("button", { name: "Large" })
    expect(button.className).toContain("pm-button--lg")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button", { name: "Disabled" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("defaults to type=button", () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole("button", { name: "Click" })).toHaveAttribute("type", "button")
  })

  it("allows type=submit", () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<Button ref={(el) => (buttonRef = el)}>Ref</Button>)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole("button", { name: "Custom" })
    expect(button.className).toContain("pm-button")
    expect(button.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Button data-testid="my-button">Test</Button>)
    expect(screen.getByTestId("my-button")).toBeInTheDocument()
  })
})
