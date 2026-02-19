import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Editable } from "./editable-text.js"

afterEach(cleanup)

describe("Editable", () => {
  it("renders a group element", () => {
    render(<Editable aria-label="Editable text" />)
    expect(screen.getByRole("group", { name: "Editable text" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Editable aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el.className).toContain("pm-editable")
    expect(el.className).toContain("pm-editable--md")
  })

  it("applies size class", () => {
    render(<Editable size="lg" aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el.className).toContain("pm-editable--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<Editable disabled aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el).toHaveAttribute("aria-disabled", "true")
    expect(el.className).toContain("pm-editable--disabled")
  })

  it("applies editing modifier", () => {
    render(<Editable editing aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el.className).toContain("pm-editable--editing")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<Editable ref={(el) => (elRef = el)} aria-label="Editable text" />)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Editable className="custom-class" aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el.className).toContain("pm-editable")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Editable data-testid="my-editable" aria-label="Editable text" />)
    expect(screen.getByTestId("my-editable")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <Editable aria-label="Editable text">
        <span>Preview text</span>
      </Editable>,
    )
    expect(screen.getByText("Preview text")).toBeInTheDocument()
  })
})
