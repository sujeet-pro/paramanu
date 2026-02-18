import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group.js"

afterEach(cleanup)

describe("ToggleGroup", () => {
  it("renders with role=group", () => {
    render(
      <ToggleGroup aria-label="Formatting">
        <ToggleGroupItem>Bold</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <ToggleGroup aria-label="Formatting">
        <ToggleGroupItem>Bold</ToggleGroupItem>
      </ToggleGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-toggle-group")
    expect(group.className).toContain("pm-toggle-group--horizontal")
    expect(group.className).toContain("pm-toggle-group--md")
  })

  it("applies orientation class", () => {
    render(
      <ToggleGroup aria-label="Formatting" orientation="vertical">
        <ToggleGroupItem>Bold</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole("group").className).toContain("pm-toggle-group--vertical")
  })

  it("applies attached class", () => {
    render(
      <ToggleGroup aria-label="Formatting" attached>
        <ToggleGroupItem>Bold</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole("group").className).toContain("pm-toggle-group--attached")
  })

  it("merges custom className", () => {
    render(
      <ToggleGroup aria-label="Formatting" className="custom-class">
        <ToggleGroupItem>Bold</ToggleGroupItem>
      </ToggleGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-toggle-group")
    expect(group.className).toContain("custom-class")
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(
      <ToggleGroup aria-label="Formatting" ref={(el) => (groupRef = el)}>
        <ToggleGroupItem>Bold</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("ToggleGroupItem", () => {
  it("renders as a button", () => {
    render(<ToggleGroupItem>Bold</ToggleGroupItem>)
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument()
  })

  it("applies pressed class and aria-pressed", () => {
    render(<ToggleGroupItem pressed>Bold</ToggleGroupItem>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-group__item--pressed")
    expect(button).toHaveAttribute("aria-pressed", "true")
  })

  it("has aria-pressed=false when not pressed", () => {
    render(<ToggleGroupItem>Bold</ToggleGroupItem>)
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "false")
  })

  it("sets disabled and aria-disabled", () => {
    render(<ToggleGroupItem disabled>Bold</ToggleGroupItem>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("defaults to type=button", () => {
    render(<ToggleGroupItem>Bold</ToggleGroupItem>)
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<ToggleGroupItem ref={(el) => (buttonRef = el)}>Bold</ToggleGroupItem>)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })
})
