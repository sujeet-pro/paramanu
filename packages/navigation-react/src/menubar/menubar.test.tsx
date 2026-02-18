import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Menubar, MenubarItem } from "./menubar.js"

afterEach(cleanup)

describe("Menubar", () => {
  it("renders children", () => {
    render(
      <Menubar>
        <MenubarItem>File</MenubarItem>
      </Menubar>,
    )
    expect(screen.getByRole("menubar")).toBeInTheDocument()
    expect(screen.getByText("File")).toBeInTheDocument()
  })

  it("applies base class", () => {
    render(<Menubar>content</Menubar>)
    expect(screen.getByRole("menubar").className).toContain("pm-menubar")
  })

  it("has role=menubar", () => {
    render(<Menubar>content</Menubar>)
    expect(screen.getByRole("menubar")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let menubarRef: HTMLUListElement | null = null
    render(<Menubar ref={(el) => (menubarRef = el)}>content</Menubar>)
    expect(menubarRef).toBeInstanceOf(HTMLUListElement)
  })

  it("merges custom className", () => {
    render(<Menubar className="custom">content</Menubar>)
    const menubar = screen.getByRole("menubar")
    expect(menubar.className).toContain("pm-menubar")
    expect(menubar.className).toContain("custom")
  })
})

describe("MenubarItem", () => {
  it("renders children as button with role=menuitem", () => {
    render(
      <Menubar>
        <MenubarItem>File</MenubarItem>
      </Menubar>,
    )
    const item = screen.getByRole("menuitem")
    expect(item.tagName).toBe("BUTTON")
    expect(item.textContent).toBe("File")
  })

  it("applies default item class", () => {
    render(
      <Menubar>
        <MenubarItem>File</MenubarItem>
      </Menubar>,
    )
    expect(screen.getByRole("menuitem").className).toContain("pm-menubar__item")
  })

  it("applies active modifier", () => {
    render(
      <Menubar>
        <MenubarItem active>Edit</MenubarItem>
      </Menubar>,
    )
    expect(screen.getByRole("menuitem").className).toContain("pm-menubar__item--active")
  })

  it("applies disabled with aria-disabled", () => {
    render(
      <Menubar>
        <MenubarItem disabled>View</MenubarItem>
      </Menubar>,
    )
    const item = screen.getByRole("menuitem")
    expect(item.className).toContain("pm-menubar__item--disabled")
    expect(item).toHaveAttribute("aria-disabled", "true")
    expect(item).toBeDisabled()
  })

  it("forwards ref to button", () => {
    let itemRef: HTMLButtonElement | null = null
    render(
      <Menubar>
        <MenubarItem ref={(el) => (itemRef = el)}>Ref</MenubarItem>
      </Menubar>,
    )
    expect(itemRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(
      <Menubar>
        <MenubarItem className="custom">File</MenubarItem>
      </Menubar>,
    )
    const item = screen.getByRole("menuitem")
    expect(item.className).toContain("pm-menubar__item")
    expect(item.className).toContain("custom")
  })

  it("wraps button in li with role=none", () => {
    render(
      <Menubar>
        <MenubarItem>File</MenubarItem>
      </Menubar>,
    )
    const button = screen.getByRole("menuitem")
    const li = button.parentElement
    expect(li?.tagName).toBe("LI")
    expect(li?.getAttribute("role")).toBe("none")
  })
})
