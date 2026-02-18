import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import {
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteItem,
  CommandPaletteGroup,
  CommandPaletteEmpty,
} from "./command-palette.js"

afterEach(cleanup)

describe("CommandPalette", () => {
  it("renders children when open", () => {
    render(<CommandPalette open>Palette content</CommandPalette>)
    expect(screen.getByText("Palette content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(<CommandPalette>Palette content</CommandPalette>)
    expect(screen.queryByText("Palette content")).not.toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <CommandPalette open data-testid="palette">
        Content
      </CommandPalette>,
    )
    const el = screen.getByTestId("palette")
    expect(el.className).toContain("pm-command-palette")
  })

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn()
    render(
      <CommandPalette open onClose={onClose}>
        Content
      </CommandPalette>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose when Escape is pressed and closed", () => {
    const onClose = vi.fn()
    render(<CommandPalette onClose={onClose}>Content</CommandPalette>)
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).not.toHaveBeenCalled()
  })

  it("forwards ref", () => {
    let paletteRef: HTMLDivElement | null = null
    render(
      <CommandPalette open ref={(el) => (paletteRef = el)}>
        Content
      </CommandPalette>,
    )
    expect(paletteRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CommandPalette open className="custom-class" data-testid="palette">
        Content
      </CommandPalette>,
    )
    const el = screen.getByTestId("palette")
    expect(el.className).toContain("pm-command-palette")
    expect(el.className).toContain("custom-class")
  })
})

describe("CommandPaletteInput", () => {
  it("renders with default classes", () => {
    render(<CommandPaletteInput data-testid="input" />)
    const el = screen.getByTestId("input")
    expect(el.className).toContain("pm-command-palette__input")
  })

  it("has role combobox", () => {
    render(<CommandPaletteInput />)
    const el = screen.getByRole("combobox")
    expect(el).toBeInTheDocument()
  })

  it("has aria-expanded attribute", () => {
    render(<CommandPaletteInput data-testid="input" />)
    const el = screen.getByTestId("input")
    expect(el).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-autocomplete attribute", () => {
    render(<CommandPaletteInput data-testid="input" />)
    const el = screen.getByTestId("input")
    expect(el).toHaveAttribute("aria-autocomplete", "list")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<CommandPaletteInput ref={(el) => (inputRef = el)} />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<CommandPaletteInput className="custom-input" data-testid="input" />)
    const el = screen.getByTestId("input")
    expect(el.className).toContain("pm-command-palette__input")
    expect(el.className).toContain("custom-input")
  })
})

describe("CommandPaletteList", () => {
  it("renders with default classes", () => {
    render(<CommandPaletteList data-testid="list">Items</CommandPaletteList>)
    const el = screen.getByTestId("list")
    expect(el.className).toContain("pm-command-palette__list")
  })

  it("has role listbox", () => {
    render(<CommandPaletteList>Items</CommandPaletteList>)
    const el = screen.getByRole("listbox")
    expect(el).toBeInTheDocument()
  })

  it("renders children", () => {
    render(<CommandPaletteList>List items here</CommandPaletteList>)
    expect(screen.getByText("List items here")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let listRef: HTMLDivElement | null = null
    render(<CommandPaletteList ref={(el) => (listRef = el)}>Items</CommandPaletteList>)
    expect(listRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CommandPaletteList className="custom-list" data-testid="list">
        Items
      </CommandPaletteList>,
    )
    const el = screen.getByTestId("list")
    expect(el.className).toContain("pm-command-palette__list")
    expect(el.className).toContain("custom-list")
  })
})

describe("CommandPaletteItem", () => {
  it("renders with default classes", () => {
    render(<CommandPaletteItem data-testid="item">Item</CommandPaletteItem>)
    const el = screen.getByTestId("item")
    expect(el.className).toContain("pm-command-palette__item")
  })

  it("has role option", () => {
    render(<CommandPaletteItem>Item</CommandPaletteItem>)
    const el = screen.getByRole("option")
    expect(el).toBeInTheDocument()
  })

  it("applies active class when active", () => {
    render(
      <CommandPaletteItem active data-testid="item">
        Item
      </CommandPaletteItem>,
    )
    const el = screen.getByTestId("item")
    expect(el.className).toContain("pm-command-palette__item--active")
  })

  it("does not apply active class when not active", () => {
    render(<CommandPaletteItem data-testid="item">Item</CommandPaletteItem>)
    const el = screen.getByTestId("item")
    expect(el.className).not.toContain("pm-command-palette__item--active")
  })

  it("sets aria-selected when active", () => {
    render(
      <CommandPaletteItem active data-testid="item">
        Item
      </CommandPaletteItem>,
    )
    const el = screen.getByTestId("item")
    expect(el).toHaveAttribute("aria-selected", "true")
  })

  it("does not set aria-selected when not active", () => {
    render(<CommandPaletteItem data-testid="item">Item</CommandPaletteItem>)
    const el = screen.getByTestId("item")
    expect(el).not.toHaveAttribute("aria-selected")
  })

  it("sets data-value attribute", () => {
    render(
      <CommandPaletteItem value="search" data-testid="item">
        Item
      </CommandPaletteItem>,
    )
    const el = screen.getByTestId("item")
    expect(el).toHaveAttribute("data-value", "search")
  })

  it("forwards ref", () => {
    let itemRef: HTMLDivElement | null = null
    render(<CommandPaletteItem ref={(el) => (itemRef = el)}>Item</CommandPaletteItem>)
    expect(itemRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CommandPaletteItem className="custom-item" data-testid="item">
        Item
      </CommandPaletteItem>,
    )
    const el = screen.getByTestId("item")
    expect(el.className).toContain("pm-command-palette__item")
    expect(el.className).toContain("custom-item")
  })
})

describe("CommandPaletteGroup", () => {
  it("renders with default classes", () => {
    render(<CommandPaletteGroup data-testid="group">Group</CommandPaletteGroup>)
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-command-palette__group")
  })

  it("has role group", () => {
    render(<CommandPaletteGroup>Group content</CommandPaletteGroup>)
    const el = screen.getByRole("group")
    expect(el).toBeInTheDocument()
  })

  it("renders children", () => {
    render(<CommandPaletteGroup>Group items</CommandPaletteGroup>)
    expect(screen.getByText("Group items")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(<CommandPaletteGroup ref={(el) => (groupRef = el)}>Group</CommandPaletteGroup>)
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CommandPaletteGroup className="custom-group" data-testid="group">
        Group
      </CommandPaletteGroup>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-command-palette__group")
    expect(el.className).toContain("custom-group")
  })
})

describe("CommandPaletteEmpty", () => {
  it("renders with default classes", () => {
    render(<CommandPaletteEmpty data-testid="empty">No results</CommandPaletteEmpty>)
    const el = screen.getByTestId("empty")
    expect(el.className).toContain("pm-command-palette__empty")
  })

  it("renders children", () => {
    render(<CommandPaletteEmpty>No results found</CommandPaletteEmpty>)
    expect(screen.getByText("No results found")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let emptyRef: HTMLDivElement | null = null
    render(
      <CommandPaletteEmpty ref={(el) => (emptyRef = el)}>No results</CommandPaletteEmpty>,
    )
    expect(emptyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CommandPaletteEmpty className="custom-empty" data-testid="empty">
        No results
      </CommandPaletteEmpty>,
    )
    const el = screen.getByTestId("empty")
    expect(el.className).toContain("pm-command-palette__empty")
    expect(el.className).toContain("custom-empty")
  })
})
