import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Fab } from "./fab.js"

afterEach(cleanup)

describe("Fab", () => {
  it("renders with aria-label", () => {
    render(<Fab aria-label="Add item">+</Fab>)
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Fab aria-label="Add">+</Fab>)
    const button = screen.getByRole("button", { name: "Add" })
    expect(button.className).toContain("pm-fab")
    expect(button.className).toContain("pm-fab--md")
    expect(button.className).toContain("pm-fab--bottom-right")
  })

  it("applies size class", () => {
    render(
      <Fab aria-label="Add" size="lg">
        +
      </Fab>,
    )
    expect(screen.getByRole("button", { name: "Add" }).className).toContain("pm-fab--lg")
  })

  it("applies position class", () => {
    render(
      <Fab aria-label="Add" position="bottom-left">
        +
      </Fab>,
    )
    expect(screen.getByRole("button", { name: "Add" }).className).toContain("pm-fab--bottom-left")
  })

  it("applies extended class", () => {
    render(
      <Fab aria-label="Add item" extended>
        + Add Item
      </Fab>,
    )
    expect(screen.getByRole("button", { name: "Add item" }).className).toContain("pm-fab--extended")
  })

  it("sets disabled and aria-disabled", () => {
    render(
      <Fab aria-label="Add" disabled>
        +
      </Fab>,
    )
    const button = screen.getByRole("button", { name: "Add" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("defaults to type=button", () => {
    render(<Fab aria-label="Add">+</Fab>)
    expect(screen.getByRole("button", { name: "Add" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(
      <Fab aria-label="Add" ref={(el) => (buttonRef = el)}>
        +
      </Fab>,
    )
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(
      <Fab aria-label="Add" className="custom-class">
        +
      </Fab>,
    )
    const button = screen.getByRole("button", { name: "Add" })
    expect(button.className).toContain("pm-fab")
    expect(button.className).toContain("custom-class")
  })

  it("renders children", () => {
    render(
      <Fab aria-label="Add">
        <svg data-testid="icon" />
      </Fab>,
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })
})
