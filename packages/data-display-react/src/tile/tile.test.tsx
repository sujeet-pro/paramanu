import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Tile } from "./tile.js"

afterEach(cleanup)

describe("Tile", () => {
  it("renders with text content", () => {
    render(<Tile>Click me</Tile>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Tile>Default</Tile>)
    const tile = screen.getByRole("button", { name: "Default" })
    expect(tile.className).toContain("pm-tile")
    expect(tile.className).toContain("pm-tile--outline")
    expect(tile.className).toContain("pm-tile--md")
  })

  it("applies variant class", () => {
    render(<Tile variant="filled">Filled</Tile>)
    expect(screen.getByRole("button", { name: "Filled" }).className).toContain("pm-tile--filled")
  })

  it("applies size class", () => {
    render(<Tile size="lg">Large</Tile>)
    expect(screen.getByRole("button", { name: "Large" }).className).toContain("pm-tile--lg")
  })

  it("applies selected state", () => {
    render(<Tile selected>Selected</Tile>)
    const tile = screen.getByRole("button", { name: "Selected" })
    expect(tile.className).toContain("pm-tile--selected")
    expect(tile).toHaveAttribute("aria-selected", "true")
  })

  it("applies disabled state", () => {
    render(<Tile disabled>Disabled</Tile>)
    const tile = screen.getByRole("button", { name: "Disabled" })
    expect(tile.className).toContain("pm-tile--disabled")
    expect(tile).toBeDisabled()
    expect(tile).toHaveAttribute("aria-disabled", "true")
  })

  it("defaults to type=button", () => {
    render(<Tile>Click</Tile>)
    expect(screen.getByRole("button", { name: "Click" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let tileRef: HTMLButtonElement | null = null
    render(<Tile ref={(el) => (tileRef = el)}>Ref</Tile>)
    expect(tileRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<Tile className="custom">Custom</Tile>)
    const tile = screen.getByRole("button", { name: "Custom" })
    expect(tile.className).toContain("pm-tile")
    expect(tile.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Tile data-testid="my-tile">Test</Tile>)
    expect(screen.getByTestId("my-tile")).toBeInTheDocument()
  })
})
