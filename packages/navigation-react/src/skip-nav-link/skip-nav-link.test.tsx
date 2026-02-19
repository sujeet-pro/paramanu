import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { SkipLink } from "./skip-nav-link.js"

afterEach(cleanup)

describe("SkipLink", () => {
  it("renders with default text", () => {
    render(<SkipLink />)
    expect(screen.getByRole("link", { name: "Skip to main content" })).toBeInTheDocument()
  })

  it("has default href pointing to #main-content", () => {
    render(<SkipLink />)
    const link = screen.getByRole("link", { name: "Skip to main content" })
    expect(link).toHaveAttribute("href", "#main-content")
  })

  it("applies base class", () => {
    render(<SkipLink />)
    const link = screen.getByRole("link", { name: "Skip to main content" })
    expect(link.className).toContain("pm-skip-link")
  })

  it("allows custom text", () => {
    render(<SkipLink>Skip navigation</SkipLink>)
    expect(screen.getByRole("link", { name: "Skip navigation" })).toBeInTheDocument()
  })

  it("allows custom href", () => {
    render(<SkipLink href="#content" />)
    const link = screen.getByRole("link", { name: "Skip to main content" })
    expect(link).toHaveAttribute("href", "#content")
  })

  it("forwards ref", () => {
    let linkRef: HTMLAnchorElement | null = null
    render(<SkipLink ref={(el) => (linkRef = el)} />)
    expect(linkRef).toBeInstanceOf(HTMLAnchorElement)
  })

  it("merges custom className", () => {
    render(<SkipLink className="custom" />)
    const link = screen.getByRole("link", { name: "Skip to main content" })
    expect(link.className).toContain("pm-skip-link")
    expect(link.className).toContain("custom")
  })
})
