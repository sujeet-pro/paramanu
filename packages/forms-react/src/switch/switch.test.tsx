import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Switch } from "./switch.js"

afterEach(cleanup)

describe("Switch", () => {
  it("renders with text content", () => {
    render(<Switch>Notifications</Switch>)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByText("Notifications")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Switch>Default</Switch>)
    const label = screen.getByText("Default").closest("label")
    expect(label?.className).toContain("pm-switch")
    expect(label?.className).toContain("pm-switch--md")
    expect(label?.className).toContain("pm-switch--label-end")
  })

  it("applies size class", () => {
    render(<Switch size="lg">Large</Switch>)
    const label = screen.getByText("Large").closest("label")
    expect(label?.className).toContain("pm-switch--lg")
  })

  it("applies checked state", () => {
    render(
      <Switch checked onChange={() => {}}>
        Active
      </Switch>,
    )
    const input = screen.getByRole("switch")
    expect(input).toBeChecked()
    expect(input).toHaveAttribute("aria-checked", "true")
  })

  it("applies disabled state", () => {
    render(<Switch disabled>Disabled</Switch>)
    const input = screen.getByRole("switch")
    expect(input).toBeDisabled()
    const label = screen.getByText("Disabled").closest("label")
    expect(label?.className).toContain("pm-switch--disabled")
  })

  it("applies label-start placement", () => {
    render(<Switch labelPlacement="start">Label first</Switch>)
    const label = screen.getByText("Label first").closest("label")
    expect(label?.className).toContain("pm-switch--label-start")
  })

  it("uses role=switch", () => {
    render(<Switch>Test</Switch>)
    const input = screen.getByRole("switch")
    expect(input).toHaveAttribute("role", "switch")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<Switch ref={(el) => (inputRef = el)}>Ref</Switch>)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<Switch className="custom-class">Custom</Switch>)
    const label = screen.getByText("Custom").closest("label")
    expect(label?.className).toContain("pm-switch")
    expect(label?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Switch data-testid="my-switch">Test</Switch>)
    expect(screen.getByTestId("my-switch")).toBeInTheDocument()
  })
})
