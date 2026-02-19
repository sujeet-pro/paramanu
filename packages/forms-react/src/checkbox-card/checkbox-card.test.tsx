import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ChkCard } from "./checkbox-card.js"

afterEach(cleanup)

describe("ChkCard", () => {
  it("renders with content", () => {
    render(<ChkCard>Premium Plan</ChkCard>)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
    expect(screen.getByText("Premium Plan")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<ChkCard>Default</ChkCard>)
    const label = screen.getByText("Default").closest("label")
    expect(label?.className).toContain("pm-chk-card")
    expect(label?.className).toContain("pm-chk-card--md")
  })

  it("applies size class", () => {
    render(<ChkCard size="lg">Large</ChkCard>)
    const label = screen.getByText("Large").closest("label")
    expect(label?.className).toContain("pm-chk-card--lg")
  })

  it("applies checked state", () => {
    render(
      <ChkCard checked onChange={() => {}}>
        Selected
      </ChkCard>,
    )
    const input = screen.getByRole("checkbox")
    expect(input).toBeChecked()
    const label = screen.getByText("Selected").closest("label")
    expect(label?.className).toContain("pm-chk-card--checked")
  })

  it("applies disabled state", () => {
    render(<ChkCard disabled>Disabled</ChkCard>)
    const input = screen.getByRole("checkbox")
    expect(input).toBeDisabled()
    const label = screen.getByText("Disabled").closest("label")
    expect(label?.className).toContain("pm-chk-card--disabled")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<ChkCard ref={(el) => (inputRef = el)}>Ref</ChkCard>)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<ChkCard className="custom-class">Custom</ChkCard>)
    const label = screen.getByText("Custom").closest("label")
    expect(label?.className).toContain("pm-chk-card")
    expect(label?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<ChkCard data-testid="my-card">Test</ChkCard>)
    expect(screen.getByTestId("my-card")).toBeInTheDocument()
  })
})
