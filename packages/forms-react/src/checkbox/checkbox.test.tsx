import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Checkbox } from "./checkbox.js"

afterEach(cleanup)

describe("Checkbox", () => {
  it("renders with text content", () => {
    render(<Checkbox>Accept terms</Checkbox>)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
    expect(screen.getByText("Accept terms")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Checkbox>Default</Checkbox>)
    const label = screen.getByText("Default").closest("label")
    expect(label?.className).toContain("pm-checkbox")
    expect(label?.className).toContain("pm-checkbox--md")
  })

  it("applies size class", () => {
    render(<Checkbox size="lg">Large</Checkbox>)
    const label = screen.getByText("Large").closest("label")
    expect(label?.className).toContain("pm-checkbox--lg")
  })

  it("applies checked state", () => {
    render(
      <Checkbox checked onChange={() => {}}>
        Checked
      </Checkbox>,
    )
    const input = screen.getByRole("checkbox")
    expect(input).toBeChecked()
    expect(input).toHaveAttribute("aria-checked", "true")
  })

  it("applies disabled state", () => {
    render(<Checkbox disabled>Disabled</Checkbox>)
    const input = screen.getByRole("checkbox")
    expect(input).toBeDisabled()
    const label = screen.getByText("Disabled").closest("label")
    expect(label?.className).toContain("pm-checkbox--disabled")
  })

  it("applies invalid state", () => {
    render(<Checkbox invalid>Invalid</Checkbox>)
    const input = screen.getByRole("checkbox")
    expect(input).toHaveAttribute("aria-invalid", "true")
    const label = screen.getByText("Invalid").closest("label")
    expect(label?.className).toContain("pm-checkbox--invalid")
  })

  it("applies indeterminate state", () => {
    render(<Checkbox indeterminate>Mixed</Checkbox>)
    const input = screen.getByRole("checkbox")
    expect(input).toHaveAttribute("aria-checked", "mixed")
    const label = screen.getByText("Mixed").closest("label")
    expect(label?.className).toContain("pm-checkbox--indeterminate")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<Checkbox ref={(el) => (inputRef = el)}>Ref</Checkbox>)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<Checkbox className="custom-class">Custom</Checkbox>)
    const label = screen.getByText("Custom").closest("label")
    expect(label?.className).toContain("pm-checkbox")
    expect(label?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Checkbox data-testid="my-checkbox">Test</Checkbox>)
    expect(screen.getByTestId("my-checkbox")).toBeInTheDocument()
  })
})
