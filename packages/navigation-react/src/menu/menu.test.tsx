import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Menu, MenuItem, MenuGroup, MenuGroupLabel, MenuSeparator } from "./menu.js"

afterEach(cleanup)

describe("Menu", () => {
  it("renders children", () => {
    render(
      <Menu>
        <MenuItem>Item 1</MenuItem>
      </Menu>,
    )
    expect(screen.getByRole("menu")).toBeInTheDocument()
    expect(screen.getByText("Item 1")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Menu>content</Menu>)
    const menu = screen.getByRole("menu")
    expect(menu.className).toContain("pm-menu")
    expect(menu.className).toContain("pm-menu--md")
  })

  it("applies size class", () => {
    render(<Menu size="sm">content</Menu>)
    expect(screen.getByRole("menu").className).toContain("pm-menu--sm")
  })

  it("forwards ref", () => {
    let menuRef: HTMLUListElement | null = null
    render(<Menu ref={(el) => (menuRef = el)}>content</Menu>)
    expect(menuRef).toBeInstanceOf(HTMLUListElement)
  })

  it("merges custom className", () => {
    render(<Menu className="custom">content</Menu>)
    const menu = screen.getByRole("menu")
    expect(menu.className).toContain("pm-menu")
    expect(menu.className).toContain("custom")
  })

  it("has role=menu", () => {
    render(<Menu>content</Menu>)
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })
})

describe("MenuItem", () => {
  it("renders children", () => {
    render(
      <Menu>
        <MenuItem>Edit</MenuItem>
      </Menu>,
    )
    expect(screen.getByText("Edit")).toBeInTheDocument()
  })

  it("applies default item class", () => {
    render(
      <Menu>
        <MenuItem>Edit</MenuItem>
      </Menu>,
    )
    expect(screen.getByRole("menuitem").className).toContain("pm-menu__item")
  })

  it("applies active modifier", () => {
    render(
      <Menu>
        <MenuItem active>Active</MenuItem>
      </Menu>,
    )
    expect(screen.getByRole("menuitem").className).toContain("pm-menu__item--active")
  })

  it("applies disabled with aria-disabled", () => {
    render(
      <Menu>
        <MenuItem disabled>Disabled</MenuItem>
      </Menu>,
    )
    const item = screen.getByRole("menuitem")
    expect(item.className).toContain("pm-menu__item--disabled")
    expect(item).toHaveAttribute("aria-disabled", "true")
  })

  it("applies destructive modifier", () => {
    render(
      <Menu>
        <MenuItem destructive>Delete</MenuItem>
      </Menu>,
    )
    expect(screen.getByRole("menuitem").className).toContain("pm-menu__item--destructive")
  })

  it("forwards ref", () => {
    let itemRef: HTMLLIElement | null = null
    render(
      <Menu>
        <MenuItem ref={(el) => (itemRef = el)}>Ref</MenuItem>
      </Menu>,
    )
    expect(itemRef).toBeInstanceOf(HTMLLIElement)
  })
})

describe("MenuGroup", () => {
  it("renders with role=group", () => {
    render(
      <Menu>
        <MenuGroup aria-label="Actions">
          <MenuItem>Edit</MenuItem>
        </MenuGroup>
      </Menu>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("applies group class", () => {
    render(
      <Menu>
        <MenuGroup aria-label="Actions">
          <MenuItem>Edit</MenuItem>
        </MenuGroup>
      </Menu>,
    )
    expect(screen.getByRole("group").className).toContain("pm-menu__group")
  })
})

describe("MenuGroupLabel", () => {
  it("renders with role=presentation", () => {
    render(
      <Menu>
        <MenuGroupLabel>Actions</MenuGroupLabel>
      </Menu>,
    )
    expect(screen.getByText("Actions")).toBeInTheDocument()
    expect(screen.getByText("Actions")).toHaveAttribute("role", "presentation")
  })

  it("applies group label class", () => {
    render(
      <Menu>
        <MenuGroupLabel>Actions</MenuGroupLabel>
      </Menu>,
    )
    expect(screen.getByText("Actions").className).toContain("pm-menu__group-label")
  })
})

describe("MenuSeparator", () => {
  it("renders with role=separator", () => {
    render(
      <Menu>
        <MenuSeparator />
      </Menu>,
    )
    expect(screen.getByRole("separator")).toBeInTheDocument()
  })

  it("applies separator class", () => {
    render(
      <Menu>
        <MenuSeparator />
      </Menu>,
    )
    expect(screen.getByRole("separator").className).toContain("pm-menu__separator")
  })
})
