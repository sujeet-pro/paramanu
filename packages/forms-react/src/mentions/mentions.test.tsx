import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Mentions } from "./mentions.js"

afterEach(cleanup)

describe("Mentions", () => {
  it("renders a div element", () => {
    render(<Mentions data-testid="mentions" />)
    expect(screen.getByTestId("mentions")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Mentions data-testid="mentions" />)
    const el = screen.getByTestId("mentions")
    expect(el.className).toContain("pm-mentions")
    expect(el.className).toContain("pm-mentions--outline")
    expect(el.className).toContain("pm-mentions--md")
  })

  it("applies variant class", () => {
    render(<Mentions variant="filled" data-testid="mentions" />)
    const el = screen.getByTestId("mentions")
    expect(el.className).toContain("pm-mentions--filled")
  })

  it("applies size class", () => {
    render(<Mentions size="lg" data-testid="mentions" />)
    const el = screen.getByTestId("mentions")
    expect(el.className).toContain("pm-mentions--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<Mentions disabled data-testid="mentions" />)
    const el = screen.getByTestId("mentions")
    expect(el).toHaveAttribute("aria-disabled", "true")
    expect(el.className).toContain("pm-mentions--disabled")
  })

  it("applies invalid modifier", () => {
    render(<Mentions invalid data-testid="mentions" />)
    const el = screen.getByTestId("mentions")
    expect(el.className).toContain("pm-mentions--invalid")
  })

  it("forwards ref", () => {
    let mentionsRef: HTMLDivElement | null = null
    render(<Mentions ref={(el) => (mentionsRef = el)} data-testid="mentions" />)
    expect(mentionsRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Mentions className="custom-class" data-testid="mentions" />)
    const el = screen.getByTestId("mentions")
    expect(el.className).toContain("pm-mentions")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Mentions data-testid="my-mentions" />)
    expect(screen.getByTestId("my-mentions")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <Mentions data-testid="mentions">
        <textarea aria-label="Text" />
      </Mentions>,
    )
    expect(screen.getByRole("textbox", { name: "Text" })).toBeInTheDocument()
  })
})
