import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { LoadingOverlay } from "./loading-overlay.js"

afterEach(cleanup)

describe("LoadingOverlay", () => {
  it("renders with aria-hidden=true when not visible", () => {
    const { container } = render(<LoadingOverlay />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay).toHaveAttribute("aria-hidden", "true")
  })

  it("renders with aria-hidden=false when visible", () => {
    const { container } = render(<LoadingOverlay visible />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay).toHaveAttribute("aria-hidden", "false")
  })

  it("applies default classes", () => {
    const { container } = render(<LoadingOverlay />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain("pm-loading-overlay")
  })

  it("applies visible class", () => {
    const { container } = render(<LoadingOverlay visible />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain("pm-loading-overlay--visible")
  })

  it("applies blur class", () => {
    const { container } = render(<LoadingOverlay blur />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain("pm-loading-overlay--blur")
  })

  it("renders children", () => {
    render(<LoadingOverlay>Loading content</LoadingOverlay>)
    expect(screen.getByText("Loading content")).toBeInTheDocument()
  })

  it("renders backdrop and content elements", () => {
    const { container } = render(<LoadingOverlay />)
    expect(container.querySelector(".pm-loading-overlay__backdrop")).toBeInTheDocument()
    expect(container.querySelector(".pm-loading-overlay__content")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let overlayRef: HTMLDivElement | null = null
    render(<LoadingOverlay ref={(el) => (overlayRef = el)} />)
    expect(overlayRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<LoadingOverlay className="custom-class" />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain("pm-loading-overlay")
    expect(overlay.className).toContain("custom-class")
  })
})
