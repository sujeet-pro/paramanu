import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ToggleGrp, ToggleGrpItem } from "./toggle-group.js"

afterEach(cleanup)

describe("ToggleGrp", () => {
  it("renders with role=group", () => {
    render(
      <ToggleGrp aria-label="Formatting">
        <ToggleGrpItem>Bold</ToggleGrpItem>
      </ToggleGrp>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <ToggleGrp aria-label="Formatting">
        <ToggleGrpItem>Bold</ToggleGrpItem>
      </ToggleGrp>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-toggle-grp")
    expect(group.className).toContain("pm-toggle-grp--horizontal")
    expect(group.className).toContain("pm-toggle-grp--md")
  })

  it("applies orientation class", () => {
    render(
      <ToggleGrp aria-label="Formatting" orientation="vertical">
        <ToggleGrpItem>Bold</ToggleGrpItem>
      </ToggleGrp>,
    )
    expect(screen.getByRole("group").className).toContain("pm-toggle-grp--vertical")
  })

  it("applies attached class", () => {
    render(
      <ToggleGrp aria-label="Formatting" attached>
        <ToggleGrpItem>Bold</ToggleGrpItem>
      </ToggleGrp>,
    )
    expect(screen.getByRole("group").className).toContain("pm-toggle-grp--attached")
  })

  it("merges custom className", () => {
    render(
      <ToggleGrp aria-label="Formatting" className="custom-class">
        <ToggleGrpItem>Bold</ToggleGrpItem>
      </ToggleGrp>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-toggle-grp")
    expect(group.className).toContain("custom-class")
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(
      <ToggleGrp aria-label="Formatting" ref={(el) => (groupRef = el)}>
        <ToggleGrpItem>Bold</ToggleGrpItem>
      </ToggleGrp>,
    )
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("ToggleGrpItem", () => {
  it("renders as a button", () => {
    render(<ToggleGrpItem>Bold</ToggleGrpItem>)
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument()
  })

  it("applies pressed class and aria-pressed", () => {
    render(<ToggleGrpItem pressed>Bold</ToggleGrpItem>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button.className).toContain("pm-toggle-grp__item--pressed")
    expect(button).toHaveAttribute("aria-pressed", "true")
  })

  it("has aria-pressed=false when not pressed", () => {
    render(<ToggleGrpItem>Bold</ToggleGrpItem>)
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "false")
  })

  it("sets disabled and aria-disabled", () => {
    render(<ToggleGrpItem disabled>Bold</ToggleGrpItem>)
    const button = screen.getByRole("button", { name: "Bold" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("defaults to type=button", () => {
    render(<ToggleGrpItem>Bold</ToggleGrpItem>)
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let buttonRef: HTMLButtonElement | null = null
    render(<ToggleGrpItem ref={(el) => (buttonRef = el)}>Bold</ToggleGrpItem>)
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement)
  })
})
