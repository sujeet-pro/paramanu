import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Link } from "./link.js"

afterEach(cleanup)

describe("Link", () => {
  it("renders with text content", () => {
    render(<Link href="#">Home</Link>)
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Link href="#">Default</Link>)
    const link = screen.getByRole("link", { name: "Default" })
    expect(link.className).toContain("pm-link")
    expect(link.className).toContain("pm-link--default")
  })

  it("applies variant class", () => {
    render(
      <Link href="#" variant="nav">
        Nav
      </Link>,
    )
    const link = screen.getByRole("link", { name: "Nav" })
    expect(link.className).toContain("pm-link--nav")
  })

  it("sets disabled attributes", () => {
    render(
      <Link href="#" disabled>
        Disabled
      </Link>,
    )
    const link = screen.getByRole("link", { name: "Disabled" })
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("tabindex", "-1")
  })

  it("sets external link attributes", () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    )
    const link = screen.getByRole("link", { name: "External" })
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
    expect(link.className).toContain("pm-link--external")
  })

  it("sets aria-current for active link", () => {
    render(
      <Link href="#" active>
        Active
      </Link>,
    )
    const link = screen.getByRole("link", { name: "Active" })
    expect(link).toHaveAttribute("aria-current", "page")
    expect(link.className).toContain("pm-link--active")
  })

  it("forwards ref", () => {
    let linkRef: HTMLAnchorElement | null = null
    render(
      <Link href="#" ref={(el) => (linkRef = el)}>
        Ref
      </Link>,
    )
    expect(linkRef).toBeInstanceOf(HTMLAnchorElement)
  })

  it("merges custom className", () => {
    render(
      <Link href="#" className="custom-class">
        Custom
      </Link>,
    )
    const link = screen.getByRole("link", { name: "Custom" })
    expect(link.className).toContain("pm-link")
    expect(link.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Link href="#" data-testid="my-link">
        Test
      </Link>,
    )
    expect(screen.getByTestId("my-link")).toBeInTheDocument()
  })
})
