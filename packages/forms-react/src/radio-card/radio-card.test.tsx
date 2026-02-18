import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { RadioCard } from "./radio-card.js"

afterEach(cleanup)

describe("RadioCard", () => {
  it("renders with content", () => {
    render(<RadioCard>Premium Plan</RadioCard>)
    expect(screen.getByRole("radio")).toBeInTheDocument()
    expect(screen.getByText("Premium Plan")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<RadioCard>Default</RadioCard>)
    const label = screen.getByText("Default").closest("label")
    expect(label?.className).toContain("pm-radio-card")
    expect(label?.className).toContain("pm-radio-card--md")
  })

  it("applies size class", () => {
    render(<RadioCard size="lg">Large</RadioCard>)
    const label = screen.getByText("Large").closest("label")
    expect(label?.className).toContain("pm-radio-card--lg")
  })

  it("applies checked state", () => {
    render(
      <RadioCard checked onChange={() => {}}>
        Selected
      </RadioCard>,
    )
    const input = screen.getByRole("radio")
    expect(input).toBeChecked()
    const label = screen.getByText("Selected").closest("label")
    expect(label?.className).toContain("pm-radio-card--checked")
  })

  it("applies disabled state", () => {
    render(<RadioCard disabled>Disabled</RadioCard>)
    const input = screen.getByRole("radio")
    expect(input).toBeDisabled()
    const label = screen.getByText("Disabled").closest("label")
    expect(label?.className).toContain("pm-radio-card--disabled")
  })

  it("sets name and value attributes", () => {
    render(
      <RadioCard name="plan" value="premium">
        Premium
      </RadioCard>,
    )
    const input = screen.getByRole("radio")
    expect(input).toHaveAttribute("name", "plan")
    expect(input).toHaveAttribute("value", "premium")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<RadioCard ref={(el) => (inputRef = el)}>Ref</RadioCard>)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<RadioCard className="custom-class">Custom</RadioCard>)
    const label = screen.getByText("Custom").closest("label")
    expect(label?.className).toContain("pm-radio-card")
    expect(label?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<RadioCard data-testid="my-card">Test</RadioCard>)
    expect(screen.getByTestId("my-card")).toBeInTheDocument()
  })
})
