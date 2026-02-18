import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Sidebar, SidebarSection, SidebarSectionLabel, SidebarItem } from "./sidebar.js"

afterEach(cleanup)

describe("Sidebar", () => {
  it("renders children", () => {
    render(<Sidebar aria-label="Sidebar">Content</Sidebar>)
    expect(screen.getByRole("navigation", { name: "Sidebar" })).toHaveTextContent("Content")
  })

  it("applies default classes", () => {
    render(<Sidebar aria-label="Sidebar">Nav</Sidebar>)
    const nav = screen.getByRole("navigation", { name: "Sidebar" })
    expect(nav.className).toContain("pm-sidebar")
    expect(nav.className).toContain("pm-sidebar--default")
    expect(nav.className).toContain("pm-sidebar--left")
  })

  it("applies width class", () => {
    render(
      <Sidebar aria-label="Sidebar" width="narrow">
        Nav
      </Sidebar>,
    )
    const nav = screen.getByRole("navigation", { name: "Sidebar" })
    expect(nav.className).toContain("pm-sidebar--narrow")
  })

  it("applies collapsed class", () => {
    render(
      <Sidebar aria-label="Sidebar" collapsed>
        Nav
      </Sidebar>,
    )
    const nav = screen.getByRole("navigation", { name: "Sidebar" })
    expect(nav.className).toContain("pm-sidebar--collapsed")
  })

  it("applies position class", () => {
    render(
      <Sidebar aria-label="Sidebar" position="right">
        Nav
      </Sidebar>,
    )
    const nav = screen.getByRole("navigation", { name: "Sidebar" })
    expect(nav.className).toContain("pm-sidebar--right")
  })

  it("forwards ref", () => {
    let ref: HTMLElement | null = null
    render(
      <Sidebar aria-label="Sidebar" ref={(el) => (ref = el)}>
        Nav
      </Sidebar>,
    )
    expect(ref).toBeInstanceOf(HTMLElement)
  })

  it("merges custom className", () => {
    render(
      <Sidebar aria-label="Sidebar" className="custom-class">
        Nav
      </Sidebar>,
    )
    const nav = screen.getByRole("navigation", { name: "Sidebar" })
    expect(nav.className).toContain("pm-sidebar")
    expect(nav.className).toContain("custom-class")
  })

  it("renders as nav element", () => {
    render(<Sidebar aria-label="Sidebar">Nav</Sidebar>)
    const nav = screen.getByRole("navigation", { name: "Sidebar" })
    expect(nav.tagName).toBe("NAV")
  })
})

describe("SidebarSection", () => {
  it("renders children", () => {
    render(<SidebarSection data-testid="section">Section</SidebarSection>)
    expect(screen.getByTestId("section")).toHaveTextContent("Section")
  })

  it("applies class", () => {
    render(<SidebarSection data-testid="section">Section</SidebarSection>)
    expect(screen.getByTestId("section").className).toContain("pm-sidebar__section")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<SidebarSection ref={(el) => (ref = el)}>Section</SidebarSection>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })
})

describe("SidebarSectionLabel", () => {
  it("renders children", () => {
    render(<SidebarSectionLabel data-testid="label">Label</SidebarSectionLabel>)
    expect(screen.getByTestId("label")).toHaveTextContent("Label")
  })

  it("applies class", () => {
    render(<SidebarSectionLabel data-testid="label">Label</SidebarSectionLabel>)
    expect(screen.getByTestId("label").className).toContain("pm-sidebar__section-label")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<SidebarSectionLabel ref={(el) => (ref = el)}>Label</SidebarSectionLabel>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })
})

describe("SidebarItem", () => {
  it("renders as anchor by default", () => {
    render(
      <SidebarItem href="/home" data-testid="item">
        Home
      </SidebarItem>,
    )
    const item = screen.getByTestId("item")
    expect(item.tagName).toBe("A")
    expect(item).toHaveAttribute("href", "/home")
  })

  it("renders as button when specified", () => {
    render(
      <SidebarItem as="button" data-testid="item">
        Action
      </SidebarItem>,
    )
    expect(screen.getByTestId("item").tagName).toBe("BUTTON")
  })

  it("applies default classes", () => {
    render(
      <SidebarItem href="/home" data-testid="item">
        Home
      </SidebarItem>,
    )
    expect(screen.getByTestId("item").className).toContain("pm-sidebar__item")
  })

  it("applies active class and aria-current", () => {
    render(
      <SidebarItem href="/home" active data-testid="item">
        Home
      </SidebarItem>,
    )
    const item = screen.getByTestId("item")
    expect(item.className).toContain("pm-sidebar__item--active")
    expect(item).toHaveAttribute("aria-current", "page")
  })

  it("applies disabled state for anchor", () => {
    render(
      <SidebarItem href="/disabled" disabled data-testid="item">
        Disabled
      </SidebarItem>,
    )
    const item = screen.getByTestId("item")
    expect(item.className).toContain("pm-sidebar__item--disabled")
    expect(item).toHaveAttribute("aria-disabled", "true")
    expect(item).toHaveAttribute("tabindex", "-1")
  })

  it("applies disabled state for button", () => {
    render(
      <SidebarItem as="button" disabled data-testid="item">
        Disabled
      </SidebarItem>,
    )
    const item = screen.getByTestId("item")
    expect(item.className).toContain("pm-sidebar__item--disabled")
    expect(item).toBeDisabled()
  })

  it("applies indent class", () => {
    render(
      <SidebarItem href="/sub" indent={2} data-testid="item">
        Sub
      </SidebarItem>,
    )
    expect(screen.getByTestId("item").className).toContain("pm-sidebar__item--indent-2")
  })

  it("forwards ref", () => {
    let ref: HTMLAnchorElement | null = null
    render(
      <SidebarItem href="/home" ref={(el) => (ref = el as HTMLAnchorElement)}>
        Home
      </SidebarItem>,
    )
    expect(ref).toBeInstanceOf(HTMLAnchorElement)
  })

  it("merges custom className", () => {
    render(
      <SidebarItem href="/home" className="custom" data-testid="item">
        Home
      </SidebarItem>,
    )
    const item = screen.getByTestId("item")
    expect(item.className).toContain("pm-sidebar__item")
    expect(item.className).toContain("custom")
  })
})
