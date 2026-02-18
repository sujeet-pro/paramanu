import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Clipboard } from "./clipboard.js"

afterEach(cleanup)

describe("Clipboard", () => {
  it("renders with text content", () => {
    render(<Clipboard>Copy</Clipboard>)
    expect(screen.getByRole("button", { name: "Copy to clipboard" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Clipboard>Copy</Clipboard>)
    const btn = screen.getByRole("button", { name: "Copy to clipboard" })
    expect(btn.className).toContain("pm-clipboard")
    expect(btn.className).toContain("pm-clipboard--md")
  })

  it("applies size class", () => {
    render(<Clipboard size="lg">Copy</Clipboard>)
    expect(screen.getByRole("button").className).toContain("pm-clipboard--lg")
  })

  it("applies copied modifier", () => {
    render(<Clipboard copied>Copied!</Clipboard>)
    expect(screen.getByRole("button").className).toContain("pm-clipboard--copied")
  })

  it("has default aria-label", () => {
    render(<Clipboard>Copy</Clipboard>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Copy to clipboard")
  })

  it("defaults to type=button", () => {
    render(<Clipboard>Copy</Clipboard>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let clipRef: HTMLButtonElement | null = null
    render(<Clipboard ref={(el) => (clipRef = el)}>Copy</Clipboard>)
    expect(clipRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<Clipboard className="custom">Copy</Clipboard>)
    const btn = screen.getByRole("button")
    expect(btn.className).toContain("pm-clipboard")
    expect(btn.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Clipboard data-testid="my-clipboard">Copy</Clipboard>)
    expect(screen.getByTestId("my-clipboard")).toBeInTheDocument()
  })
})
