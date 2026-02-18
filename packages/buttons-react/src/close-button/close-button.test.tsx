import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { CloseButton } from "./close-button.js"

afterEach(cleanup)

describe("CloseButton", () => {
  it("renders with default multiplication sign content", () => {
    render(<CloseButton />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button).toBeInTheDocument()
    expect(button.textContent).toBe("\u00d7")
  })

  it("applies default classes", () => {
    render(<CloseButton />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button.className).toContain("pm-close-button")
    expect(button.className).toContain("pm-close-button--md")
  })

  it("applies size classes", () => {
    const { rerender } = render(<CloseButton size="sm" />)
    expect(screen.getByRole("button", { name: "Close" }).className).toContain(
      "pm-close-button--sm",
    )

    rerender(<CloseButton size="lg" />)
    expect(screen.getByRole("button", { name: "Close" }).className).toContain(
      "pm-close-button--lg",
    )
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<CloseButton disabled />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("has aria-label='Close' by default", () => {
    render(<CloseButton />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button).toHaveAttribute("aria-label", "Close")
  })

  it("allows custom aria-label", () => {
    render(<CloseButton aria-label="Close dialog" />)
    const button = screen.getByRole("button", { name: "Close dialog" })
    expect(button).toHaveAttribute("aria-label", "Close dialog")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<CloseButton ref={(el) => (buttonRef = el)} />)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<CloseButton className="custom-class" />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button.className).toContain("pm-close-button")
    expect(button.className).toContain("custom-class")
  })

  it("renders custom children", () => {
    render(<CloseButton>X</CloseButton>)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button.textContent).toBe("X")
  })

  it("defaults to type=button", () => {
    render(<CloseButton />)
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute("type", "button")
  })

  it("passes through additional HTML attributes", () => {
    render(<CloseButton data-testid="my-close-button" />)
    expect(screen.getByTestId("my-close-button")).toBeInTheDocument()
  })
})
