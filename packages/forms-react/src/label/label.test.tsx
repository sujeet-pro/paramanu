import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Label } from "./label.js"

afterEach(cleanup)

describe("Label", () => {
  it("renders with text content", () => {
    render(<Label>Username</Label>)
    expect(screen.getByText("Username")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Label>Default</Label>)
    const label = screen.getByText("Default")
    expect(label.className).toContain("pm-label")
    expect(label.className).toContain("pm-label--md")
  })

  it("applies size class", () => {
    render(<Label size="lg">Large</Label>)
    const label = screen.getByText("Large")
    expect(label.className).toContain("pm-label--lg")
  })

  it("applies disabled class", () => {
    render(<Label disabled>Disabled</Label>)
    const label = screen.getByText("Disabled")
    expect(label.className).toContain("pm-label--disabled")
  })

  it("applies required class and aria-required", () => {
    render(<Label required>Required</Label>)
    const label = screen.getByText("Required")
    expect(label.className).toContain("pm-label--required")
    expect(label).toHaveAttribute("aria-required", "true")
  })

  it("sets htmlFor attribute", () => {
    render(<Label htmlFor="email-input">Email</Label>)
    const label = screen.getByText("Email")
    expect(label).toHaveAttribute("for", "email-input")
  })

  it("renders as a label element", () => {
    render(<Label>Name</Label>)
    const label = screen.getByText("Name")
    expect(label.tagName).toBe("LABEL")
  })

  it("forwards ref", () => {
    let labelRef: HTMLLabelElement | null = null
    render(<Label ref={(el) => (labelRef = el)}>Ref</Label>)
    expect(labelRef).toBeInstanceOf(HTMLLabelElement)
  })

  it("merges custom className", () => {
    render(<Label className="custom-class">Custom</Label>)
    const label = screen.getByText("Custom")
    expect(label.className).toContain("pm-label")
    expect(label.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Label data-testid="my-label">Test</Label>)
    expect(screen.getByTestId("my-label")).toBeInTheDocument()
  })
})
