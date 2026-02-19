import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { IconBtn } from "./icon-button.js"

afterEach(cleanup)

describe("IconBtn", () => {
  it("renders with aria-label", () => {
    render(<IconBtn aria-label="Search">S</IconBtn>)
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<IconBtn aria-label="Search">S</IconBtn>)
    const button = screen.getByRole("button", { name: "Search" })
    expect(button.className).toContain("pm-icon-btn")
    expect(button.className).toContain("pm-icon-btn--primary")
    expect(button.className).toContain("pm-icon-btn--md")
    expect(button.className).toContain("pm-icon-btn--square")
  })

  it("applies variant class", () => {
    render(
      <IconBtn aria-label="Delete" variant="danger">
        D
      </IconBtn>,
    )
    const button = screen.getByRole("button", { name: "Delete" })
    expect(button.className).toContain("pm-icon-btn--danger")
  })

  it("applies size class", () => {
    render(
      <IconBtn aria-label="Search" size="lg">
        S
      </IconBtn>,
    )
    const button = screen.getByRole("button", { name: "Search" })
    expect(button.className).toContain("pm-icon-btn--lg")
  })

  it("applies shape class", () => {
    render(
      <IconBtn aria-label="Profile" shape="circle">
        P
      </IconBtn>,
    )
    const button = screen.getByRole("button", { name: "Profile" })
    expect(button.className).toContain("pm-icon-btn--circle")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(
      <IconBtn aria-label="Search" disabled>
        S
      </IconBtn>,
    )
    const button = screen.getByRole("button", { name: "Search" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("has aria-label attribute", () => {
    render(<IconBtn aria-label="Search">S</IconBtn>)
    const button = screen.getByRole("button", { name: "Search" })
    expect(button).toHaveAttribute("aria-label", "Search")
  })

  it("defaults to type=button", () => {
    render(<IconBtn aria-label="Search">S</IconBtn>)
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(
      <IconBtn aria-label="Search" ref={(el) => (buttonRef = el)}>
        S
      </IconBtn>,
    )
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(
      <IconBtn aria-label="Search" className="custom-class">
        S
      </IconBtn>,
    )
    const button = screen.getByRole("button", { name: "Search" })
    expect(button.className).toContain("pm-icon-btn")
    expect(button.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <IconBtn aria-label="Search" data-testid="my-icon-button">
        S
      </IconBtn>,
    )
    expect(screen.getByTestId("my-icon-button")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <IconBtn aria-label="Search">
        <svg data-testid="icon" />
      </IconBtn>,
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })
})
