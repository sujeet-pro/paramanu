import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { BackToTop } from "./back-to-top.js"

afterEach(cleanup)

describe("BackToTop", () => {
  it("renders as a button", () => {
    render(<BackToTop />)
    expect(screen.getByRole("button", { name: "Back to top" })).toBeInTheDocument()
  })

  it("has default aria-label", () => {
    render(<BackToTop />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button).toHaveAttribute("aria-label", "Back to top")
  })

  it("applies default classes", () => {
    render(<BackToTop />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).toContain("pm-back-to-top")
    expect(button.className).toContain("pm-back-to-top--md")
    expect(button.className).toContain("pm-back-to-top--bottom-right")
    expect(button.className).toContain("pm-back-to-top--visible")
  })

  it("applies size class", () => {
    render(<BackToTop size="lg" />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).toContain("pm-back-to-top--lg")
  })

  it("applies position class", () => {
    render(<BackToTop position="bottom-left" />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).toContain("pm-back-to-top--bottom-left")
  })

  it("hides when visible is false", () => {
    render(<BackToTop visible={false} />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).not.toContain("pm-back-to-top--visible")
  })

  it("renders default arrow content", () => {
    render(<BackToTop />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.textContent).toBe("\u2191")
  })

  it("renders custom children", () => {
    render(<BackToTop>Top</BackToTop>)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.textContent).toBe("Top")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<BackToTop ref={(el) => (buttonRef = el)} />)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<BackToTop className="custom" />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).toContain("pm-back-to-top")
    expect(button.className).toContain("custom")
  })

  it("defaults to type=button", () => {
    render(<BackToTop />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button).toHaveAttribute("type", "button")
  })
})
