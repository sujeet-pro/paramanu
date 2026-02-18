import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Transfer } from "./transfer.js"

afterEach(cleanup)

describe("Transfer", () => {
  it("renders a group element", () => {
    render(<Transfer aria-label="Transfer items" />)
    expect(screen.getByRole("group", { name: "Transfer items" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Transfer aria-label="Transfer items" />)
    const el = screen.getByRole("group", { name: "Transfer items" })
    expect(el.className).toContain("pm-transfer")
    expect(el.className).toContain("pm-transfer--md")
  })

  it("applies size class", () => {
    render(<Transfer size="lg" aria-label="Transfer items" />)
    const el = screen.getByRole("group", { name: "Transfer items" })
    expect(el.className).toContain("pm-transfer--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<Transfer disabled aria-label="Transfer items" />)
    const el = screen.getByRole("group", { name: "Transfer items" })
    expect(el).toHaveAttribute("aria-disabled", "true")
    expect(el.className).toContain("pm-transfer--disabled")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<Transfer ref={(el) => (elRef = el)} aria-label="Transfer items" />)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Transfer className="custom-class" aria-label="Transfer items" />)
    const el = screen.getByRole("group", { name: "Transfer items" })
    expect(el.className).toContain("pm-transfer")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Transfer data-testid="my-transfer" aria-label="Transfer items" />)
    expect(screen.getByTestId("my-transfer")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <Transfer aria-label="Transfer items">
        <div>Source list</div>
        <div>Target list</div>
      </Transfer>,
    )
    expect(screen.getByText("Source list")).toBeInTheDocument()
    expect(screen.getByText("Target list")).toBeInTheDocument()
  })
})
