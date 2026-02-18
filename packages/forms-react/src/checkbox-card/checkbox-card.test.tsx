import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { CheckboxCard } from "./checkbox-card.js"

afterEach(cleanup)

describe("CheckboxCard", () => {
  it("renders with content", () => {
    render(<CheckboxCard>Premium Plan</CheckboxCard>)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
    expect(screen.getByText("Premium Plan")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<CheckboxCard>Default</CheckboxCard>)
    const label = screen.getByText("Default").closest("label")
    expect(label?.className).toContain("pm-checkbox-card")
    expect(label?.className).toContain("pm-checkbox-card--md")
  })

  it("applies size class", () => {
    render(<CheckboxCard size="lg">Large</CheckboxCard>)
    const label = screen.getByText("Large").closest("label")
    expect(label?.className).toContain("pm-checkbox-card--lg")
  })

  it("applies checked state", () => {
    render(
      <CheckboxCard checked onChange={() => {}}>
        Selected
      </CheckboxCard>,
    )
    const input = screen.getByRole("checkbox")
    expect(input).toBeChecked()
    const label = screen.getByText("Selected").closest("label")
    expect(label?.className).toContain("pm-checkbox-card--checked")
  })

  it("applies disabled state", () => {
    render(<CheckboxCard disabled>Disabled</CheckboxCard>)
    const input = screen.getByRole("checkbox")
    expect(input).toBeDisabled()
    const label = screen.getByText("Disabled").closest("label")
    expect(label?.className).toContain("pm-checkbox-card--disabled")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<CheckboxCard ref={(el) => (inputRef = el)}>Ref</CheckboxCard>)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<CheckboxCard className="custom-class">Custom</CheckboxCard>)
    const label = screen.getByText("Custom").closest("label")
    expect(label?.className).toContain("pm-checkbox-card")
    expect(label?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<CheckboxCard data-testid="my-card">Test</CheckboxCard>)
    expect(screen.getByTestId("my-card")).toBeInTheDocument()
  })
})
