import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Banner } from "./banner.js"

afterEach(cleanup)

describe("Banner", () => {
  it("renders with role=status", () => {
    render(<Banner>Banner content</Banner>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Banner>Default</Banner>)
    const banner = screen.getByRole("status")
    expect(banner.className).toContain("pm-banner")
    expect(banner.className).toContain("pm-banner--info")
  })

  it("applies variant class", () => {
    render(<Banner variant="warning">Warning</Banner>)
    const banner = screen.getByRole("status")
    expect(banner.className).toContain("pm-banner--warning")
  })

  it("applies sticky class", () => {
    render(<Banner sticky>Sticky</Banner>)
    const banner = screen.getByRole("status")
    expect(banner.className).toContain("pm-banner--sticky")
  })

  it("renders children", () => {
    render(<Banner>Hello world</Banner>)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("renders close button when dismissible with onClose", () => {
    const onClose = vi.fn()
    render(<Banner dismissible onClose={onClose}>Content</Banner>)
    expect(screen.getByLabelText("Close")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn()
    render(<Banner dismissible onClose={onClose}>Content</Banner>)
    fireEvent.click(screen.getByLabelText("Close"))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not render close button when not dismissible", () => {
    render(<Banner>Content</Banner>)
    expect(screen.queryByLabelText("Close")).not.toBeInTheDocument()
  })

  it("applies dismissible class", () => {
    const onClose = vi.fn()
    render(<Banner dismissible onClose={onClose}>Content</Banner>)
    const banner = screen.getByRole("status")
    expect(banner.className).toContain("pm-banner--dismissible")
  })

  it("forwards ref", () => {
    let bannerRef: HTMLDivElement | null = null
    render(<Banner ref={(el) => (bannerRef = el)}>Ref</Banner>)
    expect(bannerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Banner className="custom-class">Custom</Banner>)
    const banner = screen.getByRole("status")
    expect(banner.className).toContain("pm-banner")
    expect(banner.className).toContain("custom-class")
  })
})
