import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Loading } from "./loading-overlay.js"

afterEach(cleanup)

describe("Loading", () => {
  it("renders with aria-hidden=true when not visible", () => {
    const { container } = render(<Loading />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay).toHaveAttribute("aria-hidden", "true")
  })

  it("renders with aria-hidden=false when visible", () => {
    const { container } = render(<Loading visible />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay).toHaveAttribute("aria-hidden", "false")
  })

  it("applies default classes", () => {
    const { container } = render(<Loading />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain("pm-loading")
  })

  it("applies visible class", () => {
    const { container } = render(<Loading visible />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain("pm-loading--visible")
  })

  it("applies blur class", () => {
    const { container } = render(<Loading blur />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain("pm-loading--blur")
  })

  it("renders children", () => {
    render(<Loading>Loading content</Loading>)
    expect(screen.getByText("Loading content")).toBeInTheDocument()
  })

  it("renders backdrop and content elements", () => {
    const { container } = render(<Loading />)
    expect(container.querySelector(".pm-loading__backdrop")).toBeInTheDocument()
    expect(container.querySelector(".pm-loading__content")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let overlayRef: HTMLDivElement | null = null
    render(<Loading ref={(el) => (overlayRef = el)} />)
    expect(overlayRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Loading className="custom-class" />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain("pm-loading")
    expect(overlay.className).toContain("custom-class")
  })
})
