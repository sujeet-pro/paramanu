import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { PasswordInput } from "./password-input.js"

afterEach(cleanup)

describe("PasswordInput", () => {
  it("renders a password input by default", () => {
    render(<PasswordInput aria-label="Password" />)
    const input = screen.getByLabelText("Password")
    expect(input).toHaveAttribute("type", "password")
  })

  it("applies wrapper classes", () => {
    const { container } = render(<PasswordInput aria-label="Password" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-password-input")
    expect(wrapper?.className).toContain("pm-password-input--outline")
    expect(wrapper?.className).toContain("pm-password-input--md")
  })

  it("applies input classes", () => {
    render(<PasswordInput aria-label="Password" />)
    const input = screen.getByLabelText("Password")
    expect(input.className).toContain("pm-input")
    expect(input.className).toContain("pm-input--outline")
    expect(input.className).toContain("pm-input--md")
  })

  it("applies variant class", () => {
    const { container } = render(<PasswordInput variant="filled" aria-label="Password" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-password-input--filled")
  })

  it("applies size class", () => {
    const { container } = render(<PasswordInput size="lg" aria-label="Password" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-password-input--lg")
  })

  it("toggles password visibility on button click", () => {
    render(<PasswordInput aria-label="Password" />)
    const input = screen.getByLabelText("Password")
    const toggle = screen.getByRole("button", { name: "Show password" })

    expect(input).toHaveAttribute("type", "password")

    fireEvent.click(toggle)
    expect(input).toHaveAttribute("type", "text")
    expect(toggle).toHaveAccessibleName("Hide password")

    fireEvent.click(toggle)
    expect(input).toHaveAttribute("type", "password")
    expect(toggle).toHaveAccessibleName("Show password")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<PasswordInput disabled aria-label="Password" />)
    const input = screen.getByLabelText("Password")
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<PasswordInput invalid aria-label="Password" />)
    const input = screen.getByLabelText("Password")
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to the input element", () => {
    let inputRef: HTMLInputElement | null = null
    render(<PasswordInput ref={(el) => (inputRef = el)} aria-label="Password" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
    expect(inputRef?.type).toBe("password")
  })

  it("merges custom className on wrapper", () => {
    const { container } = render(<PasswordInput className="custom-class" aria-label="Password" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-password-input")
    expect(wrapper?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<PasswordInput data-testid="my-password" aria-label="Password" placeholder="Enter password" />)
    const input = screen.getByTestId("my-password")
    expect(input).toHaveAttribute("placeholder", "Enter password")
  })
})
