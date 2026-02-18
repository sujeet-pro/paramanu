import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Dropzone } from "./dropzone.js"

afterEach(cleanup)

describe("Dropzone", () => {
  it("renders a button role element", () => {
    render(<Dropzone aria-label="Drop files" />)
    expect(screen.getByRole("button", { name: "Drop files" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Dropzone aria-label="Drop files" />)
    const el = screen.getByRole("button", { name: "Drop files" })
    expect(el.className).toContain("pm-dropzone")
  })

  it("applies dragging modifier", () => {
    render(<Dropzone dragging aria-label="Drop files" />)
    const el = screen.getByRole("button", { name: "Drop files" })
    expect(el.className).toContain("pm-dropzone--dragging")
  })

  it("sets aria-disabled when disabled", () => {
    render(<Dropzone disabled aria-label="Drop files" />)
    const el = screen.getByRole("button", { name: "Drop files" })
    expect(el).toHaveAttribute("aria-disabled", "true")
    expect(el.className).toContain("pm-dropzone--disabled")
  })

  it("is keyboard focusable when not disabled", () => {
    render(<Dropzone aria-label="Drop files" />)
    const el = screen.getByRole("button", { name: "Drop files" })
    expect(el).toHaveAttribute("tabindex", "0")
  })

  it("is not keyboard focusable when disabled", () => {
    render(<Dropzone disabled aria-label="Drop files" />)
    const el = screen.getByRole("button", { name: "Drop files" })
    expect(el).not.toHaveAttribute("tabindex")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<Dropzone ref={(el) => (elRef = el)} aria-label="Drop files" />)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Dropzone className="custom-class" aria-label="Drop files" />)
    const el = screen.getByRole("button", { name: "Drop files" })
    expect(el.className).toContain("pm-dropzone")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Dropzone data-testid="my-dropzone" aria-label="Drop files" />)
    expect(screen.getByTestId("my-dropzone")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <Dropzone aria-label="Drop files">
        <span>Drop files here</span>
      </Dropzone>,
    )
    expect(screen.getByText("Drop files here")).toBeInTheDocument()
  })
})
