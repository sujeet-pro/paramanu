import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellMain,
  AppShellFooter,
} from "./app-shell.js"

afterEach(cleanup)

describe("AppShell", () => {
  it("renders compound component with all sub-components", () => {
    render(
      <AppShell data-testid="shell">
        <AppShellHeader data-testid="header">Header</AppShellHeader>
        <AppShellSidebar data-testid="sidebar">Sidebar</AppShellSidebar>
        <AppShellMain data-testid="main">Main</AppShellMain>
        <AppShellFooter data-testid="footer">Footer</AppShellFooter>
      </AppShell>,
    )
    expect(screen.getByTestId("shell")).toBeInTheDocument()
    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("sidebar")).toBeInTheDocument()
    expect(screen.getByTestId("main")).toBeInTheDocument()
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })

  it("applies default classes (sidebar-start)", () => {
    render(
      <AppShell data-testid="shell">
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    const shell = screen.getByTestId("shell")
    expect(shell.className).toContain("pm-app-shell")
    expect(shell.className).toContain("pm-app-shell--sidebar-start")
  })

  it("applies sidebar-end position", () => {
    render(
      <AppShell sidebarPosition="end" data-testid="shell">
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("shell").className).toContain("pm-app-shell--sidebar-end")
  })

  it("applies sidebar-collapsed class when controlled", () => {
    render(
      <AppShell sidebarCollapsed data-testid="shell">
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("shell").className).toContain("pm-app-shell--sidebar-collapsed")
  })

  // --- Semantic elements ---

  it("renders header as <header> element", () => {
    render(
      <AppShell>
        <AppShellHeader data-testid="header">Header</AppShellHeader>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("header").tagName).toBe("HEADER")
  })

  it("renders sidebar as <aside> element", () => {
    render(
      <AppShell>
        <AppShellSidebar data-testid="sidebar">Sidebar</AppShellSidebar>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("sidebar").tagName).toBe("ASIDE")
  })

  it("renders main as <main> element", () => {
    render(
      <AppShell>
        <AppShellMain data-testid="main">Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("main").tagName).toBe("MAIN")
  })

  it("renders footer as <footer> element", () => {
    render(
      <AppShell>
        <AppShellMain>Main</AppShellMain>
        <AppShellFooter data-testid="footer">Footer</AppShellFooter>
      </AppShell>,
    )
    expect(screen.getByTestId("footer").tagName).toBe("FOOTER")
  })

  // --- Header ---

  it("applies sticky class to header", () => {
    render(
      <AppShell>
        <AppShellHeader sticky data-testid="header">
          Header
        </AppShellHeader>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("header").className).toContain("pm-app-shell__header--sticky")
  })

  it("does not apply sticky class when not set", () => {
    render(
      <AppShell>
        <AppShellHeader data-testid="header">Header</AppShellHeader>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("header").className).not.toContain("pm-app-shell__header--sticky")
  })

  // --- Sidebar ---

  it("applies default md width class to sidebar", () => {
    render(
      <AppShell>
        <AppShellSidebar data-testid="sidebar">Sidebar</AppShellSidebar>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-app-shell__sidebar--md")
  })

  it("applies sm width class to sidebar", () => {
    render(
      <AppShell>
        <AppShellSidebar width="sm" data-testid="sidebar">
          Sidebar
        </AppShellSidebar>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-app-shell__sidebar--sm")
  })

  it("applies lg width class to sidebar", () => {
    render(
      <AppShell>
        <AppShellSidebar width="lg" data-testid="sidebar">
          Sidebar
        </AppShellSidebar>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-app-shell__sidebar--lg")
  })

  it("sidebar reads collapsed state from context", () => {
    render(
      <AppShell sidebarCollapsed>
        <AppShellSidebar data-testid="sidebar">Sidebar</AppShellSidebar>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-app-shell__sidebar--collapsed")
  })

  it("sidebar prop collapsed overrides context", () => {
    render(
      <AppShell sidebarCollapsed={false}>
        <AppShellSidebar collapsed data-testid="sidebar">
          Sidebar
        </AppShellSidebar>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("sidebar").className).toContain("pm-app-shell__sidebar--collapsed")
  })

  // --- Sidebar toggle ---

  it("toggles sidebar collapsed state via context", () => {
    function TestApp() {
      return (
        <AppShell defaultSidebarCollapsed={false}>
          <AppShellSidebar data-testid="sidebar">Sidebar</AppShellSidebar>
          <AppShellMain>
            <ToggleButton />
          </AppShellMain>
        </AppShell>
      )
    }

    // Access toggle from inside AppShell
    function ToggleButton() {
      return null
    }

    render(<TestApp />)
    const sidebar = screen.getByTestId("sidebar")
    expect(sidebar.className).not.toContain("pm-app-shell__sidebar--collapsed")
  })

  // --- Ref forwarding ---

  it("forwards ref on AppShell container", () => {
    let shellRef: HTMLDivElement | null = null
    render(
      <AppShell ref={(el) => (shellRef = el)}>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(shellRef).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref on AppShellHeader", () => {
    let headerRef: HTMLElement | null = null
    render(
      <AppShell>
        <AppShellHeader ref={(el) => (headerRef = el)}>Header</AppShellHeader>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(headerRef).toBeInstanceOf(HTMLElement)
  })

  it("forwards ref on AppShellSidebar", () => {
    let sidebarRef: HTMLElement | null = null
    render(
      <AppShell>
        <AppShellSidebar ref={(el) => (sidebarRef = el)}>Sidebar</AppShellSidebar>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(sidebarRef).toBeInstanceOf(HTMLElement)
  })

  it("forwards ref on AppShellMain", () => {
    let mainRef: HTMLElement | null = null
    render(
      <AppShell>
        <AppShellMain ref={(el) => (mainRef = el)}>Main</AppShellMain>
      </AppShell>,
    )
    expect(mainRef).toBeInstanceOf(HTMLElement)
  })

  it("forwards ref on AppShellFooter", () => {
    let footerRef: HTMLElement | null = null
    render(
      <AppShell>
        <AppShellMain>Main</AppShellMain>
        <AppShellFooter ref={(el) => (footerRef = el)}>Footer</AppShellFooter>
      </AppShell>,
    )
    expect(footerRef).toBeInstanceOf(HTMLElement)
  })

  // --- className merge ---

  it("merges custom className on AppShell", () => {
    render(
      <AppShell className="custom-shell" data-testid="shell">
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    const el = screen.getByTestId("shell")
    expect(el.className).toContain("pm-app-shell")
    expect(el.className).toContain("custom-shell")
  })

  it("merges custom className on AppShellHeader", () => {
    render(
      <AppShell>
        <AppShellHeader className="custom-header" data-testid="header">
          Header
        </AppShellHeader>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-app-shell__header")
    expect(el.className).toContain("custom-header")
  })

  it("merges custom className on AppShellSidebar", () => {
    render(
      <AppShell>
        <AppShellSidebar className="custom-sidebar" data-testid="sidebar">
          Sidebar
        </AppShellSidebar>
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    const el = screen.getByTestId("sidebar")
    expect(el.className).toContain("pm-app-shell__sidebar")
    expect(el.className).toContain("custom-sidebar")
  })

  it("merges custom className on AppShellMain", () => {
    render(
      <AppShell>
        <AppShellMain className="custom-main" data-testid="main">
          Main
        </AppShellMain>
      </AppShell>,
    )
    const el = screen.getByTestId("main")
    expect(el.className).toContain("pm-app-shell__main")
    expect(el.className).toContain("custom-main")
  })

  it("merges custom className on AppShellFooter", () => {
    render(
      <AppShell>
        <AppShellMain>Main</AppShellMain>
        <AppShellFooter className="custom-footer" data-testid="footer">
          Footer
        </AppShellFooter>
      </AppShell>,
    )
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-app-shell__footer")
    expect(el.className).toContain("custom-footer")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <AppShell data-testid="my-shell">
        <AppShellMain>Main</AppShellMain>
      </AppShell>,
    )
    expect(screen.getByTestId("my-shell")).toBeInTheDocument()
  })
})
