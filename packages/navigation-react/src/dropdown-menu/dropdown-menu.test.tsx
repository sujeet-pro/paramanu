import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Dropdown, DropdownTrigger, DropdownContent } from "./dropdown-menu.js"

afterEach(cleanup)

describe("Dropdown", () => {
  it("renders children", () => {
    render(
      <Dropdown>
        <span>content</span>
      </Dropdown>,
    )
    expect(screen.getByText("content")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Dropdown data-testid="root">content</Dropdown>)
    const root = screen.getByTestId("root")
    expect(root.className).toContain("pm-dropdown")
    expect(root.className).toContain("pm-dropdown--md")
  })

  it("applies size class", () => {
    render(
      <Dropdown size="lg" data-testid="root">
        content
      </Dropdown>,
    )
    expect(screen.getByTestId("root").className).toContain("pm-dropdown--lg")
  })

  it("applies open modifier", () => {
    render(
      <Dropdown open data-testid="root">
        content
      </Dropdown>,
    )
    expect(screen.getByTestId("root").className).toContain("pm-dropdown--open")
  })

  it("forwards ref", () => {
    let rootRef: HTMLDivElement | null = null
    render(<Dropdown ref={(el) => (rootRef = el)}>content</Dropdown>)
    expect(rootRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Dropdown className="custom" data-testid="root">
        content
      </Dropdown>,
    )
    const root = screen.getByTestId("root")
    expect(root.className).toContain("pm-dropdown")
    expect(root.className).toContain("custom")
  })
})

describe("DropdownTrigger", () => {
  it("renders as button with aria-haspopup", () => {
    render(<DropdownTrigger>Options</DropdownTrigger>)
    const trigger = screen.getByRole("button", { name: "Options" })
    expect(trigger).toHaveAttribute("aria-haspopup", "true")
  })

  it("applies trigger class", () => {
    render(<DropdownTrigger>Options</DropdownTrigger>)
    expect(screen.getByRole("button").className).toContain("pm-dropdown__trigger")
  })

  it("sets aria-expanded", () => {
    render(<DropdownTrigger expanded={true}>Options</DropdownTrigger>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("forwards ref", () => {
    let triggerRef: HTMLButtonElement | null = null
    render(<DropdownTrigger ref={(el) => (triggerRef = el)}>Options</DropdownTrigger>)
    expect(triggerRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<DropdownTrigger className="custom">Options</DropdownTrigger>)
    const trigger = screen.getByRole("button")
    expect(trigger.className).toContain("pm-dropdown__trigger")
    expect(trigger.className).toContain("custom")
  })
})

describe("DropdownContent", () => {
  it("renders with role=menu", () => {
    render(<DropdownContent>items</DropdownContent>)
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })

  it("applies content class", () => {
    render(<DropdownContent>items</DropdownContent>)
    expect(screen.getByRole("menu").className).toContain("pm-dropdown__content")
  })

  it("forwards ref", () => {
    let contentRef: HTMLDivElement | null = null
    render(<DropdownContent ref={(el) => (contentRef = el)}>items</DropdownContent>)
    expect(contentRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<DropdownContent className="custom">items</DropdownContent>)
    const content = screen.getByRole("menu")
    expect(content.className).toContain("pm-dropdown__content")
    expect(content.className).toContain("custom")
  })
})
