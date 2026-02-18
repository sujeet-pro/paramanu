import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ToggleButton } from "./toggle-button.js"

afterEach(cleanup)

describe("ToggleButton", () => {
  it("renders with text content", () => {
    render(<ToggleButton>Bold</ToggleButton>)
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<ToggleButton>Bold</ToggleButton>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-button")
    expect(button.className).toContain("pm-toggle-button--default")
    expect(button.className).toContain("pm-toggle-button--md")
  })

  it("applies variant class", () => {
    render(<ToggleButton variant="outline">Bold</ToggleButton>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-button--outline")
  })

  it("applies size class", () => {
    render(<ToggleButton size="lg">Bold</ToggleButton>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-button--lg")
  })

  it("applies pressed class and aria-pressed=true", () => {
    render(<ToggleButton pressed>Bold</ToggleButton>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-button--pressed")
    expect(button).toHaveAttribute("aria-pressed", "true")
  })

  it("has aria-pressed=false when not pressed", () => {
    render(<ToggleButton>Bold</ToggleButton>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button).toHaveAttribute("aria-pressed", "false")
    expect(button.className).not.toContain("pm-toggle-button--pressed")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<ToggleButton disabled>Bold</ToggleButton>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("supports pressed and disabled together", () => {
    render(
      <ToggleButton pressed disabled>
        Bold
      </ToggleButton>,
    )
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button).toHaveAttribute("aria-pressed", "true")
    expect(button).toBeDisabled()
    expect(button.className).toContain("pm-toggle-button--pressed")
    expect(button.className).toContain("pm-toggle-button--disabled")
  })

  it("defaults to type=button", () => {
    render(<ToggleButton>Bold</ToggleButton>)
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<ToggleButton ref={(el) => (buttonRef = el)}>Bold</ToggleButton>)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<ToggleButton className="custom-class">Bold</ToggleButton>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-button")
    expect(button.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<ToggleButton data-testid="my-toggle-button">Bold</ToggleButton>)
    expect(screen.getByTestId("my-toggle-button")).toBeInTheDocument()
  })
})
