import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Icon } from "./icon.js"

afterEach(cleanup)

describe("Icon", () => {
  it("renders with children", () => {
    render(<Icon data-testid="icon">SVG</Icon>)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Icon data-testid="icon">SVG</Icon>)
    const icon = screen.getByTestId("icon")
    expect(icon.className).toContain("pm-icon")
    expect(icon.className).toContain("pm-icon--md")
    expect(icon.className).toContain("pm-icon--inherit")
  })

  it("applies size class", () => {
    render(<Icon size="lg" data-testid="icon">SVG</Icon>)
    expect(screen.getByTestId("icon").className).toContain("pm-icon--lg")
  })

  it("applies color class", () => {
    render(<Icon color="primary" data-testid="icon">SVG</Icon>)
    expect(screen.getByTestId("icon").className).toContain("pm-icon--primary")
  })

  it("applies spin modifier", () => {
    render(<Icon spin data-testid="icon">SVG</Icon>)
    expect(screen.getByTestId("icon").className).toContain("pm-icon--spin")
  })

  it("sets aria-hidden by default", () => {
    render(<Icon data-testid="icon">SVG</Icon>)
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true")
  })

  it("sets aria-label when label is provided", () => {
    render(<Icon label="Search">SVG</Icon>)
    const icon = screen.getByRole("img", { name: "Search" })
    expect(icon).not.toHaveAttribute("aria-hidden")
  })

  it("forwards ref", () => {
    let iconRef: HTMLSpanElement | null = null
    render(<Icon ref={(el) => (iconRef = el)}>SVG</Icon>)
    expect(iconRef).toBeInstanceOf(HTMLSpanElement)
  })

  it("merges custom className", () => {
    render(<Icon className="custom" data-testid="icon">SVG</Icon>)
    const icon = screen.getByTestId("icon")
    expect(icon.className).toContain("pm-icon")
    expect(icon.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Icon data-testid="my-icon">SVG</Icon>)
    expect(screen.getByTestId("my-icon")).toBeInTheDocument()
  })
})
