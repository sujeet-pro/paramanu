import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Textarea } from "./textarea.js"

afterEach(cleanup)

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea aria-label="Description" />)
    expect(screen.getByRole("textbox", { name: "Description" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Textarea aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea.className).toContain("pm-textarea")
    expect(textarea.className).toContain("pm-textarea--outline")
    expect(textarea.className).toContain("pm-textarea--md")
    expect(textarea.className).toContain("pm-textarea--resize-vertical")
  })

  it("applies variant class", () => {
    render(<Textarea variant="filled" aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea.className).toContain("pm-textarea--filled")
  })

  it("applies size class", () => {
    render(<Textarea size="lg" aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea.className).toContain("pm-textarea--lg")
  })

  it("applies resize modifier", () => {
    render(<Textarea resize="none" aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea.className).toContain("pm-textarea--resize-none")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<Textarea disabled aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<Textarea invalid aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea).toHaveAttribute("aria-invalid", "true")
    expect(textarea.className).toContain("pm-textarea--invalid")
  })

  it("sets readOnly attribute", () => {
    render(<Textarea readOnly aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea).toHaveAttribute("readonly")
    expect(textarea.className).toContain("pm-textarea--read-only")
  })

  it("passes rows attribute", () => {
    render(<Textarea rows={6} aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea).toHaveAttribute("rows", "6")
  })

  it("forwards ref", () => {
    let textareaRef: HTMLTextAreaElement | null = null
    render(<Textarea ref={(el) => (textareaRef = el)} aria-label="Description" />)
    expect(textareaRef).toBeInstanceOf(HTMLTextAreaElement)
  })

  it("merges custom className", () => {
    render(<Textarea className="custom-class" aria-label="Description" />)
    const textarea = screen.getByRole("textbox", { name: "Description" })
    expect(textarea.className).toContain("pm-textarea")
    expect(textarea.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Textarea data-testid="my-textarea" aria-label="Description" placeholder="Enter text" />)
    const textarea = screen.getByTestId("my-textarea")
    expect(textarea).toHaveAttribute("placeholder", "Enter text")
  })
})
