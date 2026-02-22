import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Navbar, NavbarInner, NavbarSection, NavbarBrand, NavbarToggle } from "./navbar.js"

afterEach(cleanup)

describe("Navbar", () => {
  it("renders children", () => {
    render(<Navbar aria-label="Main">Content</Navbar>)
    expect(screen.getByRole("navigation", { name: "Main" })).toHaveTextContent("Content")
  })

  it("applies default classes", () => {
    render(<Navbar aria-label="Main">Nav</Navbar>)
    const nav = screen.getByRole("navigation", { name: "Main" })
    expect(nav.className).toContain("pm-navbar")
    expect(nav.className).toContain("pm-navbar--default")
    expect(nav.className).toContain("pm-navbar--static")
  })

  it("applies variant class", () => {
    render(
      <Navbar aria-label="Main" variant="floating">
        Nav
      </Navbar>,
    )
    const nav = screen.getByRole("navigation", { name: "Main" })
    expect(nav.className).toContain("pm-navbar--floating")
  })

  it("applies position class", () => {
    render(
      <Navbar aria-label="Main" position="sticky">
        Nav
      </Navbar>,
    )
    const nav = screen.getByRole("navigation", { name: "Main" })
    expect(nav.className).toContain("pm-navbar--sticky")
  })

  it("forwards ref", () => {
    let navRef: HTMLElement | null = null
    render(
      <Navbar aria-label="Main" ref={(el) => (navRef = el)}>
        Nav
      </Navbar>,
    )
    expect(navRef).toBeInstanceOf(HTMLElement)
  })

  it("merges custom className", () => {
    render(
      <Navbar aria-label="Main" className="custom-class">
        Nav
      </Navbar>,
    )
    const nav = screen.getByRole("navigation", { name: "Main" })
    expect(nav.className).toContain("pm-navbar")
    expect(nav.className).toContain("custom-class")
  })

  it("renders as nav element", () => {
    render(<Navbar aria-label="Main">Nav</Navbar>)
    const nav = screen.getByRole("navigation", { name: "Main" })
    expect(nav.tagName).toBe("NAV")
  })
})

describe("NavbarInner", () => {
  it("renders children", () => {
    render(<NavbarInner data-testid="inner">Inner</NavbarInner>)
    expect(screen.getByTestId("inner")).toHaveTextContent("Inner")
  })

  it("applies class", () => {
    render(<NavbarInner data-testid="inner">Inner</NavbarInner>)
    expect(screen.getByTestId("inner").className).toContain("pm-navbar__inner")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<NavbarInner ref={(el) => (ref = el)}>Inner</NavbarInner>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <NavbarInner data-testid="inner" className="custom">
        Inner
      </NavbarInner>,
    )
    const el = screen.getByTestId("inner")
    expect(el.className).toContain("pm-navbar__inner")
    expect(el.className).toContain("custom")
  })
})

describe("NavbarSection", () => {
  it("renders children", () => {
    render(<NavbarSection data-testid="section">Section</NavbarSection>)
    expect(screen.getByTestId("section")).toHaveTextContent("Section")
  })

  it("applies default align class", () => {
    render(<NavbarSection data-testid="section">Section</NavbarSection>)
    expect(screen.getByTestId("section").className).toContain("pm-navbar__section--start")
  })

  it("applies align class", () => {
    render(
      <NavbarSection data-testid="section" align="end">
        Section
      </NavbarSection>,
    )
    expect(screen.getByTestId("section").className).toContain("pm-navbar__section--end")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<NavbarSection ref={(el) => (ref = el)}>Section</NavbarSection>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })
})

describe("NavbarBrand", () => {
  it("renders children", () => {
    render(<NavbarBrand data-testid="brand">Brand</NavbarBrand>)
    expect(screen.getByTestId("brand")).toHaveTextContent("Brand")
  })

  it("applies class", () => {
    render(<NavbarBrand data-testid="brand">Brand</NavbarBrand>)
    expect(screen.getByTestId("brand").className).toContain("pm-navbar__brand")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<NavbarBrand ref={(el) => (ref = el)}>Brand</NavbarBrand>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })
})

describe("NavbarToggle", () => {
  it("renders children", () => {
    render(<NavbarToggle aria-label="Toggle">Menu</NavbarToggle>)
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveTextContent("Menu")
  })

  it("applies class", () => {
    render(<NavbarToggle aria-label="Toggle">Menu</NavbarToggle>)
    expect(screen.getByRole("button", { name: "Toggle" }).className).toContain("pm-navbar__toggle")
  })

  it("defaults to type=button", () => {
    render(<NavbarToggle aria-label="Toggle">Menu</NavbarToggle>)
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute("type", "button")
  })

  it("forwards ref", () => {
    let ref: HTMLButtonElement | null = null
    render(
      <NavbarToggle aria-label="Toggle" ref={(el) => (ref = el)}>
        Menu
      </NavbarToggle>,
    )
    expect(ref).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(
      <NavbarToggle aria-label="Toggle" className="custom">
        Menu
      </NavbarToggle>,
    )
    const el = screen.getByRole("button", { name: "Toggle" })
    expect(el.className).toContain("pm-navbar__toggle")
    expect(el.className).toContain("custom")
  })
})
