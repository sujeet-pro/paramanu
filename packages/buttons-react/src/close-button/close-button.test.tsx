import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { CloseBtn } from "./close-button.js"

afterEach(cleanup)

describe("CloseBtn", () => {
  it("renders with default multiplication sign content", () => {
    render(<CloseBtn />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button).toBeInTheDocument()
    expect(button.textContent).toBe("\u00d7")
  })

  it("applies default classes", () => {
    render(<CloseBtn />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button.className).toContain("pm-close-btn")
    expect(button.className).toContain("pm-close-btn--md")
  })

  it("applies size classes", () => {
    const { rerender } = render(<CloseBtn size="sm" />)
    expect(screen.getByRole("button", { name: "Close" }).className).toContain(
      "pm-close-btn--sm",
    )

    rerender(<CloseBtn size="lg" />)
    expect(screen.getByRole("button", { name: "Close" }).className).toContain(
      "pm-close-btn--lg",
    )
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<CloseBtn disabled />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("has aria-label='Close' by default", () => {
    render(<CloseBtn />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button).toHaveAttribute("aria-label", "Close")
  })

  it("allows custom aria-label", () => {
    render(<CloseBtn aria-label="Close dialog" />)
    const button = screen.getByRole("button", { name: "Close dialog" })
    expect(button).toHaveAttribute("aria-label", "Close dialog")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<CloseBtn ref={(el) => (buttonRef = el)} />)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<CloseBtn className="custom-class" />)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button.className).toContain("pm-close-btn")
    expect(button.className).toContain("custom-class")
  })

  it("renders custom children", () => {
    render(<CloseBtn>X</CloseBtn>)
    const button = screen.getByRole("button", { name: "Close" })
    expect(button.textContent).toBe("X")
  })

  it("defaults to type=button", () => {
    render(<CloseBtn />)
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute("type", "button")
  })

  it("passes through additional HTML attributes", () => {
    render(<CloseBtn data-testid="my-close-button" />)
    expect(screen.getByTestId("my-close-button")).toBeInTheDocument()
  })
})
