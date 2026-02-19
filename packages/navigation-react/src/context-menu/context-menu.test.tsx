import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { CtxMenu } from "./context-menu.js"

afterEach(cleanup)

describe("CtxMenu", () => {
  it("renders children", () => {
    render(<CtxMenu open>items</CtxMenu>)
    expect(screen.getByRole("menu")).toBeInTheDocument()
    expect(screen.getByText("items")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<CtxMenu>content</CtxMenu>)
    const menu = screen.getByRole("menu")
    expect(menu.className).toContain("pm-ctx-menu")
    expect(menu.className).toContain("pm-ctx-menu--md")
  })

  it("applies size class", () => {
    render(<CtxMenu size="sm">content</CtxMenu>)
    expect(screen.getByRole("menu").className).toContain("pm-ctx-menu--sm")
  })

  it("applies open modifier", () => {
    render(<CtxMenu open>content</CtxMenu>)
    expect(screen.getByRole("menu").className).toContain("pm-ctx-menu--open")
  })

  it("does not apply open modifier when closed", () => {
    render(<CtxMenu>content</CtxMenu>)
    expect(screen.getByRole("menu").className).not.toContain("pm-ctx-menu--open")
  })

  it("has role=menu", () => {
    render(<CtxMenu>content</CtxMenu>)
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let menuRef: HTMLDivElement | null = null
    render(<CtxMenu ref={(el) => (menuRef = el)}>content</CtxMenu>)
    expect(menuRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<CtxMenu className="custom">content</CtxMenu>)
    const menu = screen.getByRole("menu")
    expect(menu.className).toContain("pm-ctx-menu")
    expect(menu.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <CtxMenu data-testid="ctx-menu" style={{ top: 100, left: 200 }}>
        content
      </CtxMenu>,
    )
    expect(screen.getByTestId("ctx-menu")).toBeInTheDocument()
  })
})
