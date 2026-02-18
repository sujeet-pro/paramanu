import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { EditableText } from "./editable-text.js"

afterEach(cleanup)

describe("EditableText", () => {
  it("renders a group element", () => {
    render(<EditableText aria-label="Editable text" />)
    expect(screen.getByRole("group", { name: "Editable text" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<EditableText aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el.className).toContain("pm-editable-text")
    expect(el.className).toContain("pm-editable-text--md")
  })

  it("applies size class", () => {
    render(<EditableText size="lg" aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el.className).toContain("pm-editable-text--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<EditableText disabled aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el).toHaveAttribute("aria-disabled", "true")
    expect(el.className).toContain("pm-editable-text--disabled")
  })

  it("applies editing modifier", () => {
    render(<EditableText editing aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el.className).toContain("pm-editable-text--editing")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<EditableText ref={(el) => (elRef = el)} aria-label="Editable text" />)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<EditableText className="custom-class" aria-label="Editable text" />)
    const el = screen.getByRole("group", { name: "Editable text" })
    expect(el.className).toContain("pm-editable-text")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<EditableText data-testid="my-editable" aria-label="Editable text" />)
    expect(screen.getByTestId("my-editable")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <EditableText aria-label="Editable text">
        <span>Preview text</span>
      </EditableText>,
    )
    expect(screen.getByText("Preview text")).toBeInTheDocument()
  })
})
