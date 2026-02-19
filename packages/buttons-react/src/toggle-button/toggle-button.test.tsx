import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ToggleBtn } from "./toggle-button.js"

afterEach(cleanup)

describe("ToggleBtn", () => {
  it("renders with text content", () => {
    render(<ToggleBtn>Bold</ToggleBtn>)
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<ToggleBtn>Bold</ToggleBtn>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-btn")
    expect(button.className).toContain("pm-toggle-btn--default")
    expect(button.className).toContain("pm-toggle-btn--md")
  })

  it("applies variant class", () => {
    render(<ToggleBtn variant="outline">Bold</ToggleBtn>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-btn--outline")
  })

  it("applies size class", () => {
    render(<ToggleBtn size="lg">Bold</ToggleBtn>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-btn--lg")
  })

  it("applies pressed class and aria-pressed=true", () => {
    render(<ToggleBtn pressed>Bold</ToggleBtn>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-btn--pressed")
    expect(button).toHaveAttribute("aria-pressed", "true")
  })

  it("has aria-pressed=false when not pressed", () => {
    render(<ToggleBtn>Bold</ToggleBtn>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button).toHaveAttribute("aria-pressed", "false")
    expect(button.className).not.toContain("pm-toggle-btn--pressed")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<ToggleBtn disabled>Bold</ToggleBtn>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("supports pressed and disabled together", () => {
    render(
      <ToggleBtn pressed disabled>
        Bold
      </ToggleBtn>,
    )
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button).toHaveAttribute("aria-pressed", "true")
    expect(button).toBeDisabled()
    expect(button.className).toContain("pm-toggle-btn--pressed")
    expect(button.className).toContain("pm-toggle-btn--disabled")
  })

  it("defaults to type=button", () => {
    render(<ToggleBtn>Bold</ToggleBtn>)
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<ToggleBtn ref={(el) => (buttonRef = el)}>Bold</ToggleBtn>)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<ToggleBtn className="custom-class">Bold</ToggleBtn>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-btn")
    expect(button.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<ToggleBtn data-testid="my-toggle-button">Bold</ToggleBtn>)
    expect(screen.getByTestId("my-toggle-button")).toBeInTheDocument()
  })
})
