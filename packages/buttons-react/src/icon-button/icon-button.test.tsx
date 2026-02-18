import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { IconButton } from "./icon-button.js"

afterEach(cleanup)

describe("IconButton", () => {
  it("renders with aria-label", () => {
    render(<IconButton aria-label="Search">S</IconButton>)
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<IconButton aria-label="Search">S</IconButton>)
    const button = screen.getByRole("button", { name: "Search" })
    expect(button.className).toContain("pm-icon-button")
    expect(button.className).toContain("pm-icon-button--primary")
    expect(button.className).toContain("pm-icon-button--md")
    expect(button.className).toContain("pm-icon-button--square")
  })

  it("applies variant class", () => {
    render(
      <IconButton aria-label="Delete" variant="danger">
        D
      </IconButton>,
    )
    const button = screen.getByRole("button", { name: "Delete" })
    expect(button.className).toContain("pm-icon-button--danger")
  })

  it("applies size class", () => {
    render(
      <IconButton aria-label="Search" size="lg">
        S
      </IconButton>,
    )
    const button = screen.getByRole("button", { name: "Search" })
    expect(button.className).toContain("pm-icon-button--lg")
  })

  it("applies shape class", () => {
    render(
      <IconButton aria-label="Profile" shape="circle">
        P
      </IconButton>,
    )
    const button = screen.getByRole("button", { name: "Profile" })
    expect(button.className).toContain("pm-icon-button--circle")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(
      <IconButton aria-label="Search" disabled>
        S
      </IconButton>,
    )
    const button = screen.getByRole("button", { name: "Search" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("has aria-label attribute", () => {
    render(<IconButton aria-label="Search">S</IconButton>)
    const button = screen.getByRole("button", { name: "Search" })
    expect(button).toHaveAttribute("aria-label", "Search")
  })

  it("defaults to type=button", () => {
    render(<IconButton aria-label="Search">S</IconButton>)
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(
      <IconButton aria-label="Search" ref={(el) => (buttonRef = el)}>
        S
      </IconButton>,
    )
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(
      <IconButton aria-label="Search" className="custom-class">
        S
      </IconButton>,
    )
    const button = screen.getByRole("button", { name: "Search" })
    expect(button.className).toContain("pm-icon-button")
    expect(button.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <IconButton aria-label="Search" data-testid="my-icon-button">
        S
      </IconButton>,
    )
    expect(screen.getByTestId("my-icon-button")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <IconButton aria-label="Search">
        <svg data-testid="icon" />
      </IconButton>,
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })
})
