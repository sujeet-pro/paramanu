import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ContextMenu } from "./context-menu.js"

afterEach(cleanup)

describe("ContextMenu", () => {
  it("renders children", () => {
    render(<ContextMenu open>items</ContextMenu>)
    expect(screen.getByRole("menu")).toBeInTheDocument()
    expect(screen.getByText("items")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<ContextMenu>content</ContextMenu>)
    const menu = screen.getByRole("menu")
    expect(menu.className).toContain("pm-context-menu")
    expect(menu.className).toContain("pm-context-menu--md")
  })

  it("applies size class", () => {
    render(<ContextMenu size="sm">content</ContextMenu>)
    expect(screen.getByRole("menu").className).toContain("pm-context-menu--sm")
  })

  it("applies open modifier", () => {
    render(<ContextMenu open>content</ContextMenu>)
    expect(screen.getByRole("menu").className).toContain("pm-context-menu--open")
  })

  it("does not apply open modifier when closed", () => {
    render(<ContextMenu>content</ContextMenu>)
    expect(screen.getByRole("menu").className).not.toContain("pm-context-menu--open")
  })

  it("has role=menu", () => {
    render(<ContextMenu>content</ContextMenu>)
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let menuRef: HTMLDivElement | null = null
    render(<ContextMenu ref={(el) => (menuRef = el)}>content</ContextMenu>)
    expect(menuRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<ContextMenu className="custom">content</ContextMenu>)
    const menu = screen.getByRole("menu")
    expect(menu.className).toContain("pm-context-menu")
    expect(menu.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <ContextMenu data-testid="ctx-menu" style={{ top: 100, left: 200 }}>
        content
      </ContextMenu>,
    )
    expect(screen.getByTestId("ctx-menu")).toBeInTheDocument()
  })
})
