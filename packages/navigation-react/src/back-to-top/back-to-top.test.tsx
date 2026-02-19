import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Btt } from "./back-to-top.js"

afterEach(cleanup)

describe("Btt", () => {
  it("renders as a button", () => {
    render(<Btt />)
    expect(screen.getByRole("button", { name: "Back to top" })).toBeInTheDocument()
  })

  it("has default aria-label", () => {
    render(<Btt />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button).toHaveAttribute("aria-label", "Back to top")
  })

  it("applies default classes", () => {
    render(<Btt />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).toContain("pm-btt")
    expect(button.className).toContain("pm-btt--md")
    expect(button.className).toContain("pm-btt--bottom-right")
    expect(button.className).toContain("pm-btt--visible")
  })

  it("applies size class", () => {
    render(<Btt size="lg" />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).toContain("pm-btt--lg")
  })

  it("applies position class", () => {
    render(<Btt position="bottom-left" />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).toContain("pm-btt--bottom-left")
  })

  it("hides when visible is false", () => {
    render(<Btt visible={false} />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).not.toContain("pm-btt--visible")
  })

  it("renders default arrow content", () => {
    render(<Btt />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.textContent).toBe("\u2191")
  })

  it("renders custom children", () => {
    render(<Btt>Top</Btt>)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.textContent).toBe("Top")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<Btt ref={(el) => (buttonRef = el)} />)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<Btt className="custom" />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button.className).toContain("pm-btt")
    expect(button.className).toContain("custom")
  })

  it("defaults to type=button", () => {
    render(<Btt />)
    const button = screen.getByRole("button", { name: "Back to top" })
    expect(button).toHaveAttribute("type", "button")
  })
})
