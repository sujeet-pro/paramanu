import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Badge } from "./badge.js"

afterEach(cleanup)

describe("Badge", () => {
  it("renders with text content", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText("Default")
    expect(badge.className).toContain("pm-badge")
    expect(badge.className).toContain("pm-badge--filled")
    expect(badge.className).toContain("pm-badge--md")
    expect(badge.className).toContain("pm-badge--primary")
  })

  it("applies variant class", () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText("Outline").className).toContain("pm-badge--outline")
  })

  it("applies size class", () => {
    render(<Badge size="lg">Large</Badge>)
    expect(screen.getByText("Large").className).toContain("pm-badge--lg")
  })

  it("applies color class", () => {
    render(<Badge color="danger">Danger</Badge>)
    expect(screen.getByText("Danger").className).toContain("pm-badge--danger")
  })

  it("applies pill modifier", () => {
    render(<Badge pill>Pill</Badge>)
    expect(screen.getByText("Pill").className).toContain("pm-badge--pill")
  })

  it("forwards ref", () => {
    let badgeRef: HTMLSpanElement | null = null
    render(<Badge ref={(el) => (badgeRef = el)}>Ref</Badge>)
    expect(badgeRef).toBeInstanceOf(HTMLSpanElement)
  })

  it("merges custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText("Custom")
    expect(badge.className).toContain("pm-badge")
    expect(badge.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Badge data-testid="my-badge">Test</Badge>)
    expect(screen.getByTestId("my-badge")).toBeInTheDocument()
  })
})
