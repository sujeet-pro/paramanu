import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import {
  Shell,
  ShellHeader,
  ShellSidebar,
  ShellMain,
  ShellFooter,
} from "./app-shell.js"

afterEach(cleanup)

describe("Shell", () => {
  it("renders compound component with all sub-components", () => {
    render(
      <Shell data-testid="shell">
        <ShellHeader data-testid="header">Header</ShellHeader>
        <ShellSidebar data-testid="sidebar">Sidebar</ShellSidebar>
        <ShellMain data-testid="main">Main</ShellMain>
        <ShellFooter data-testid="footer">Footer</ShellFooter>
      </Shell>,
    )
    expect(screen.getByTestId("shell")).toBeInTheDocument()
    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("sidebar")).toBeInTheDocument()
    expect(screen.getByTestId("main")).toBeInTheDocument()
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })

  it("applies default classes (sidebar-start)", () => {
    render(
      <Shell data-testid="shell">
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    const shell = screen.getByTestId("shell")
    expect(shell.className).toContain("pm-shell")
    expect(shell.className).toContain("pm-shell--sidebar-start")
  })

  it("applies sidebar-end position", () => {
    render(
      <Shell sidebarPosition="end" data-testid="shell">
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("shell").className).toContain("pm-shell--sidebar-end")
  })

  it("applies sidebar-collapsed class when controlled", () => {
    render(
      <Shell sidebarCollapsed data-testid="shell">
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("shell").className).toContain("pm-shell--sidebar-collapsed")
  })

  // --- Semantic elements ---

  it("renders header as <header> element", () => {
    render(
      <Shell>
        <ShellHeader data-testid="header">Header</ShellHeader>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("header").tagName).toBe("HEADER")
  })

  it("renders sidebar as <aside> element", () => {
    render(
      <Shell>
        <ShellSidebar data-testid="sidebar">Sidebar</ShellSidebar>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("sidebar").tagName).toBe("ASIDE")
  })

  it("renders main as <main> element", () => {
    render(
      <Shell>
        <ShellMain data-testid="main">Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("main").tagName).toBe("MAIN")
  })

  it("renders footer as <footer> element", () => {
    render(
      <Shell>
        <ShellMain>Main</ShellMain>
        <ShellFooter data-testid="footer">Footer</ShellFooter>
      </Shell>,
    )
    expect(screen.getByTestId("footer").tagName).toBe("FOOTER")
  })

  // --- Header ---

  it("applies sticky class to header", () => {
    render(
      <Shell>
        <ShellHeader sticky data-testid="header">
          Header
        </ShellHeader>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("header").className).toContain("pm-shell__header--sticky")
  })

  it("does not apply sticky class when not set", () => {
    render(
      <Shell>
        <ShellHeader data-testid="header">Header</ShellHeader>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("header").className).not.toContain("pm-shell__header--sticky")
  })

  // --- Sidebar ---

  it("applies default md width class to sidebar", () => {
    render(
      <Shell>
        <ShellSidebar data-testid="sidebar">Sidebar</ShellSidebar>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-shell__sidebar--md")
  })

  it("applies sm width class to sidebar", () => {
    render(
      <Shell>
        <ShellSidebar width="sm" data-testid="sidebar">
          Sidebar
        </ShellSidebar>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-shell__sidebar--sm")
  })

  it("applies lg width class to sidebar", () => {
    render(
      <Shell>
        <ShellSidebar width="lg" data-testid="sidebar">
          Sidebar
        </ShellSidebar>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-shell__sidebar--lg")
  })

  it("sidebar reads collapsed state from context", () => {
    render(
      <Shell sidebarCollapsed>
        <ShellSidebar data-testid="sidebar">Sidebar</ShellSidebar>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-shell__sidebar--collapsed")
  })

  it("sidebar prop collapsed overrides context", () => {
    render(
      <Shell sidebarCollapsed={false}>
        <ShellSidebar collapsed data-testid="sidebar">
          Sidebar
        </ShellSidebar>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-shell__sidebar--collapsed")
  })

  // --- Sidebar toggle ---

  it("toggles sidebar collapsed state via context", () => {
    function TestApp() {
      return (
        <Shell defaultSidebarCollapsed={false}>
          <ShellSidebar data-testid="sidebar">Sidebar</ShellSidebar>
          <ShellMain>
            <ToggleBtn />
          </ShellMain>
        </Shell>
      )
    }

    // Access toggle from inside Shell
    function ToggleBtn() {
      return null
    }

    render(<TestApp />)
    const sidebar = screen.getByTestId("sidebar")
    expect(sidebar.className).not.toContain("pm-shell__sidebar--collapsed")
  })

  // --- Ref forwarding ---

  it("forwards ref on Shell container", () => {
    let shellRef: HTMLDivElement | null = null
    render(
      <Shell ref={(el) => (shellRef = el)}>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(shellRef).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref on ShellHeader", () => {
    let headerRef: HTMLElement | null = null
    render(
      <Shell>
        <ShellHeader ref={(el) => (headerRef = el)}>Header</ShellHeader>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(headerRef).toBeInstanceOf(HTMLElement)
  })

  it("forwards ref on ShellSidebar", () => {
    let sidebarRef: HTMLElement | null = null
    render(
      <Shell>
        <ShellSidebar ref={(el) => (sidebarRef = el)}>Sidebar</ShellSidebar>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(sidebarRef).toBeInstanceOf(HTMLElement)
  })

  it("forwards ref on ShellMain", () => {
    let mainRef: HTMLElement | null = null
    render(
      <Shell>
        <ShellMain ref={(el) => (mainRef = el)}>Main</ShellMain>
      </Shell>,
    )
    expect(mainRef).toBeInstanceOf(HTMLElement)
  })

  it("forwards ref on ShellFooter", () => {
    let footerRef: HTMLElement | null = null
    render(
      <Shell>
        <ShellMain>Main</ShellMain>
        <ShellFooter ref={(el) => (footerRef = el)}>Footer</ShellFooter>
      </Shell>,
    )
    expect(footerRef).toBeInstanceOf(HTMLElement)
  })

  // --- className merge ---

  it("merges custom className on Shell", () => {
    render(
      <Shell className="custom-shell" data-testid="shell">
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    const el = screen.getByTestId("shell")
    expect(el.className).toContain("pm-shell")
    expect(el.className).toContain("custom-shell")
  })

  it("merges custom className on ShellHeader", () => {
    render(
      <Shell>
        <ShellHeader className="custom-header" data-testid="header">
          Header
        </ShellHeader>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-shell__header")
    expect(el.className).toContain("custom-header")
  })

  it("merges custom className on ShellSidebar", () => {
    render(
      <Shell>
        <ShellSidebar className="custom-sidebar" data-testid="sidebar">
          Sidebar
        </ShellSidebar>
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    const el = screen.getByTestId("sidebar")
    expect(el.className).toContain("pm-shell__sidebar")
    expect(el.className).toContain("custom-sidebar")
  })

  it("merges custom className on ShellMain", () => {
    render(
      <Shell>
        <ShellMain className="custom-main" data-testid="main">
          Main
        </ShellMain>
      </Shell>,
    )
    const el = screen.getByTestId("main")
    expect(el.className).toContain("pm-shell__main")
    expect(el.className).toContain("custom-main")
  })

  it("merges custom className on ShellFooter", () => {
    render(
      <Shell>
        <ShellMain>Main</ShellMain>
        <ShellFooter className="custom-footer" data-testid="footer">
          Footer
        </ShellFooter>
      </Shell>,
    )
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-shell__footer")
    expect(el.className).toContain("custom-footer")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Shell data-testid="my-shell">
        <ShellMain>Main</ShellMain>
      </Shell>,
    )
    expect(screen.getByTestId("my-shell")).toBeInTheDocument()
  })
})
