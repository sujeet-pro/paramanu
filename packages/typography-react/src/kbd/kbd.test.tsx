import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Kbd } from "./kbd.js"

afterEach(cleanup)

describe("Kbd", () => {
  it("renders with text content", () => {
    render(<Kbd>Ctrl</Kbd>)
    expect(screen.getByText("Ctrl")).toBeInTheDocument()
  })

  it("renders a <kbd> element", () => {
    render(<Kbd>Enter</Kbd>)
    const el = screen.getByText("Enter")
    expect(el.tagName).toBe("KBD")
  })

  it("applies default classes", () => {
    render(<Kbd>Default</Kbd>)
    const el = screen.getByText("Default")
    expect(el.className).toContain("pm-kbd")
  })

  it("applies size class", () => {
    render(<Kbd size="lg">Large</Kbd>)
    const el = screen.getByText("Large")
    expect(el.className).toContain("pm-kbd--lg")
  })

  it("forwards ref", () => {
    let kbdRef: HTMLElement | null = null
    render(<Kbd ref={(el) => (kbdRef = el)}>Ref</Kbd>)
    expect(kbdRef).toBeInstanceOf(HTMLElement)
    expect(kbdRef!.tagName).toBe("KBD")
  })

  it("merges custom className", () => {
    render(<Kbd className="custom-class">Custom</Kbd>)
    const el = screen.getByText("Custom")
    expect(el.className).toContain("pm-kbd")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Kbd data-testid="my-kbd">Test</Kbd>)
    expect(screen.getByTestId("my-kbd")).toBeInTheDocument()
  })
})
