import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { SkipNavLink } from "./skip-nav-link.js"

afterEach(cleanup)

describe("SkipNavLink", () => {
  it("renders with default text", () => {
    render(<SkipNavLink />)
    expect(screen.getByRole("link", { name: "Skip to main content" })).toBeInTheDocument()
  })

  it("has default href pointing to #main-content", () => {
    render(<SkipNavLink />)
    const link = screen.getByRole("link", { name: "Skip to main content" })
    expect(link).toHaveAttribute("href", "#main-content")
  })

  it("applies base class", () => {
    render(<SkipNavLink />)
    const link = screen.getByRole("link", { name: "Skip to main content" })
    expect(link.className).toContain("pm-skip-nav-link")
  })

  it("allows custom text", () => {
    render(<SkipNavLink>Skip navigation</SkipNavLink>)
    expect(screen.getByRole("link", { name: "Skip navigation" })).toBeInTheDocument()
  })

  it("allows custom href", () => {
    render(<SkipNavLink href="#content" />)
    const link = screen.getByRole("link", { name: "Skip to main content" })
    expect(link).toHaveAttribute("href", "#content")
  })

  it("forwards ref", () => {
    let linkRef: HTMLAnchorElement | null = null
    render(<SkipNavLink ref={(el) => (linkRef = el)} />)
    expect(linkRef).toBeInstanceOf(HTMLAnchorElement)
  })

  it("merges custom className", () => {
    render(<SkipNavLink className="custom" />)
    const link = screen.getByRole("link", { name: "Skip to main content" })
    expect(link.className).toContain("pm-skip-nav-link")
    expect(link.className).toContain("custom")
  })
})
