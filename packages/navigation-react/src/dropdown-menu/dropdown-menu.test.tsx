import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "./dropdown-menu.js"

afterEach(cleanup)

describe("DropdownMenu", () => {
  it("renders children", () => {
    render(
      <DropdownMenu>
        <span>content</span>
      </DropdownMenu>,
    )
    expect(screen.getByText("content")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DropdownMenu data-testid="root">content</DropdownMenu>)
    const root = screen.getByTestId("root")
    expect(root.className).toContain("pm-dropdown-menu")
    expect(root.className).toContain("pm-dropdown-menu--md")
  })

  it("applies size class", () => {
    render(
      <DropdownMenu size="lg" data-testid="root">
        content
      </DropdownMenu>,
    )
    expect(screen.getByTestId("root").className).toContain("pm-dropdown-menu--lg")
  })

  it("applies open modifier", () => {
    render(
      <DropdownMenu open data-testid="root">
        content
      </DropdownMenu>,
    )
    expect(screen.getByTestId("root").className).toContain("pm-dropdown-menu--open")
  })

  it("forwards ref", () => {
    let rootRef: HTMLDivElement | null = null
    render(<DropdownMenu ref={(el) => (rootRef = el)}>content</DropdownMenu>)
    expect(rootRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <DropdownMenu className="custom" data-testid="root">
        content
      </DropdownMenu>,
    )
    const root = screen.getByTestId("root")
    expect(root.className).toContain("pm-dropdown-menu")
    expect(root.className).toContain("custom")
  })
})

describe("DropdownMenuTrigger", () => {
  it("renders as button with aria-haspopup", () => {
    render(<DropdownMenuTrigger>Options</DropdownMenuTrigger>)
    const trigger = screen.getByRole("button", { name: "Options" })
    expect(trigger).toHaveAttribute("aria-haspopup", "true")
  })

  it("applies trigger class", () => {
    render(<DropdownMenuTrigger>Options</DropdownMenuTrigger>)
    expect(screen.getByRole("button").className).toContain("pm-dropdown-menu__trigger")
  })

  it("sets aria-expanded", () => {
    render(<DropdownMenuTrigger expanded={true}>Options</DropdownMenuTrigger>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("forwards ref", () => {
    let triggerRef: HTMLButtonElement | null = null
    render(<DropdownMenuTrigger ref={(el) => (triggerRef = el)}>Options</DropdownMenuTrigger>)
    expect(triggerRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<DropdownMenuTrigger className="custom">Options</DropdownMenuTrigger>)
    const trigger = screen.getByRole("button")
    expect(trigger.className).toContain("pm-dropdown-menu__trigger")
    expect(trigger.className).toContain("custom")
  })
})

describe("DropdownMenuContent", () => {
  it("renders with role=menu", () => {
    render(<DropdownMenuContent>items</DropdownMenuContent>)
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })

  it("applies content class", () => {
    render(<DropdownMenuContent>items</DropdownMenuContent>)
    expect(screen.getByRole("menu").className).toContain("pm-dropdown-menu__content")
  })

  it("forwards ref", () => {
    let contentRef: HTMLDivElement | null = null
    render(<DropdownMenuContent ref={(el) => (contentRef = el)}>items</DropdownMenuContent>)
    expect(contentRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<DropdownMenuContent className="custom">items</DropdownMenuContent>)
    const content = screen.getByRole("menu")
    expect(content.className).toContain("pm-dropdown-menu__content")
    expect(content.className).toContain("custom")
  })
})
