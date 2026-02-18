import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Mark } from "./mark.js"

afterEach(cleanup)

describe("Mark", () => {
  it("renders with text content", () => {
    render(<Mark>Marked text</Mark>)
    expect(screen.getByText("Marked text")).toBeInTheDocument()
  })

  it("renders a <mark> element", () => {
    render(<Mark>Marked</Mark>)
    const el = screen.getByText("Marked")
    expect(el.tagName).toBe("MARK")
  })

  it("applies default classes", () => {
    render(<Mark>Default</Mark>)
    const el = screen.getByText("Default")
    expect(el.className).toContain("pm-mark")
  })

  it("applies variant class", () => {
    render(<Mark variant="underline">Underline</Mark>)
    const el = screen.getByText("Underline")
    expect(el.className).toContain("pm-mark--underline")
  })

  it("applies circle variant class", () => {
    render(<Mark variant="circle">Circle</Mark>)
    const el = screen.getByText("Circle")
    expect(el.className).toContain("pm-mark--circle")
  })

  it("forwards ref", () => {
    let markRef: HTMLElement | null = null
    render(<Mark ref={(el) => (markRef = el)}>Ref</Mark>)
    expect(markRef).toBeInstanceOf(HTMLElement)
    expect(markRef!.tagName).toBe("MARK")
  })

  it("merges custom className", () => {
    render(<Mark className="custom-class">Custom</Mark>)
    const el = screen.getByText("Custom")
    expect(el.className).toContain("pm-mark")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Mark data-testid="my-mark">Test</Mark>)
    expect(screen.getByTestId("my-mark")).toBeInTheDocument()
  })
})
