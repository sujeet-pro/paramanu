import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import {
  CmdPalette,
  CmdPaletteInput,
  CmdPaletteList,
  CmdPaletteItem,
  CmdPaletteGroup,
  CmdPaletteEmpty,
} from "./command-palette.js"

afterEach(cleanup)

describe("CmdPalette", () => {
  it("renders children when open", () => {
    render(<CmdPalette open>Palette content</CmdPalette>)
    expect(screen.getByText("Palette content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(<CmdPalette>Palette content</CmdPalette>)
    expect(screen.queryByText("Palette content")).not.toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <CmdPalette open data-testid="palette">
        Content
      </CmdPalette>,
    )
    const el = screen.getByTestId("palette")
    expect(el.className).toContain("pm-cmd-palette")
  })

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn()
    render(
      <CmdPalette open onClose={onClose}>
        Content
      </CmdPalette>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose when Escape is pressed and closed", () => {
    const onClose = vi.fn()
    render(<CmdPalette onClose={onClose}>Content</CmdPalette>)
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).not.toHaveBeenCalled()
  })

  it("forwards ref", () => {
    let paletteRef: HTMLDivElement | null = null
    render(
      <CmdPalette open ref={(el) => (paletteRef = el)}>
        Content
      </CmdPalette>,
    )
    expect(paletteRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CmdPalette open className="custom-class" data-testid="palette">
        Content
      </CmdPalette>,
    )
    const el = screen.getByTestId("palette")
    expect(el.className).toContain("pm-cmd-palette")
    expect(el.className).toContain("custom-class")
  })
})

describe("CmdPaletteInput", () => {
  it("renders with default classes", () => {
    render(<CmdPaletteInput data-testid="input" />)
    const el = screen.getByTestId("input")
    expect(el.className).toContain("pm-cmd-palette__input")
  })

  it("has role combobox", () => {
    render(<CmdPaletteInput />)
    const el = screen.getByRole("combobox")
    expect(el).toBeInTheDocument()
  })

  it("has aria-expanded attribute", () => {
    render(<CmdPaletteInput data-testid="input" />)
    const el = screen.getByTestId("input")
    expect(el).toHaveAttribute("aria-expanded", "true")
  })

  it("has aria-autocomplete attribute", () => {
    render(<CmdPaletteInput data-testid="input" />)
    const el = screen.getByTestId("input")
    expect(el).toHaveAttribute("aria-autocomplete", "list")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<CmdPaletteInput ref={(el) => (inputRef = el)} />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<CmdPaletteInput className="custom-input" data-testid="input" />)
    const el = screen.getByTestId("input")
    expect(el.className).toContain("pm-cmd-palette__input")
    expect(el.className).toContain("custom-input")
  })
})

describe("CmdPaletteList", () => {
  it("renders with default classes", () => {
    render(<CmdPaletteList data-testid="list">Items</CmdPaletteList>)
    const el = screen.getByTestId("list")
    expect(el.className).toContain("pm-cmd-palette__list")
  })

  it("has role listbox", () => {
    render(<CmdPaletteList>Items</CmdPaletteList>)
    const el = screen.getByRole("listbox")
    expect(el).toBeInTheDocument()
  })

  it("renders children", () => {
    render(<CmdPaletteList>List items here</CmdPaletteList>)
    expect(screen.getByText("List items here")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let listRef: HTMLDivElement | null = null
    render(<CmdPaletteList ref={(el) => (listRef = el)}>Items</CmdPaletteList>)
    expect(listRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CmdPaletteList className="custom-list" data-testid="list">
        Items
      </CmdPaletteList>,
    )
    const el = screen.getByTestId("list")
    expect(el.className).toContain("pm-cmd-palette__list")
    expect(el.className).toContain("custom-list")
  })
})

describe("CmdPaletteItem", () => {
  it("renders with default classes", () => {
    render(<CmdPaletteItem data-testid="item">Item</CmdPaletteItem>)
    const el = screen.getByTestId("item")
    expect(el.className).toContain("pm-cmd-palette__item")
  })

  it("has role option", () => {
    render(<CmdPaletteItem>Item</CmdPaletteItem>)
    const el = screen.getByRole("option")
    expect(el).toBeInTheDocument()
  })

  it("applies active class when active", () => {
    render(
      <CmdPaletteItem active data-testid="item">
        Item
      </CmdPaletteItem>,
    )
    const el = screen.getByTestId("item")
    expect(el.className).toContain("pm-cmd-palette__item--active")
  })

  it("does not apply active class when not active", () => {
    render(<CmdPaletteItem data-testid="item">Item</CmdPaletteItem>)
    const el = screen.getByTestId("item")
    expect(el.className).not.toContain("pm-cmd-palette__item--active")
  })

  it("sets aria-selected when active", () => {
    render(
      <CmdPaletteItem active data-testid="item">
        Item
      </CmdPaletteItem>,
    )
    const el = screen.getByTestId("item")
    expect(el).toHaveAttribute("aria-selected", "true")
  })

  it("does not set aria-selected when not active", () => {
    render(<CmdPaletteItem data-testid="item">Item</CmdPaletteItem>)
    const el = screen.getByTestId("item")
    expect(el).not.toHaveAttribute("aria-selected")
  })

  it("sets data-value attribute", () => {
    render(
      <CmdPaletteItem value="search" data-testid="item">
        Item
      </CmdPaletteItem>,
    )
    const el = screen.getByTestId("item")
    expect(el).toHaveAttribute("data-value", "search")
  })

  it("forwards ref", () => {
    let itemRef: HTMLDivElement | null = null
    render(<CmdPaletteItem ref={(el) => (itemRef = el)}>Item</CmdPaletteItem>)
    expect(itemRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CmdPaletteItem className="custom-item" data-testid="item">
        Item
      </CmdPaletteItem>,
    )
    const el = screen.getByTestId("item")
    expect(el.className).toContain("pm-cmd-palette__item")
    expect(el.className).toContain("custom-item")
  })
})

describe("CmdPaletteGroup", () => {
  it("renders with default classes", () => {
    render(<CmdPaletteGroup data-testid="group">Group</CmdPaletteGroup>)
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-cmd-palette__group")
  })

  it("has role group", () => {
    render(<CmdPaletteGroup>Group content</CmdPaletteGroup>)
    const el = screen.getByRole("group")
    expect(el).toBeInTheDocument()
  })

  it("renders children", () => {
    render(<CmdPaletteGroup>Group items</CmdPaletteGroup>)
    expect(screen.getByText("Group items")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(<CmdPaletteGroup ref={(el) => (groupRef = el)}>Group</CmdPaletteGroup>)
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CmdPaletteGroup className="custom-group" data-testid="group">
        Group
      </CmdPaletteGroup>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-cmd-palette__group")
    expect(el.className).toContain("custom-group")
  })
})

describe("CmdPaletteEmpty", () => {
  it("renders with default classes", () => {
    render(<CmdPaletteEmpty data-testid="empty">No results</CmdPaletteEmpty>)
    const el = screen.getByTestId("empty")
    expect(el.className).toContain("pm-cmd-palette__empty")
  })

  it("renders children", () => {
    render(<CmdPaletteEmpty>No results found</CmdPaletteEmpty>)
    expect(screen.getByText("No results found")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let emptyRef: HTMLDivElement | null = null
    render(<CmdPaletteEmpty ref={(el) => (emptyRef = el)}>No results</CmdPaletteEmpty>)
    expect(emptyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <CmdPaletteEmpty className="custom-empty" data-testid="empty">
        No results
      </CmdPaletteEmpty>,
    )
    const el = screen.getByTestId("empty")
    expect(el.className).toContain("pm-cmd-palette__empty")
    expect(el.className).toContain("custom-empty")
  })
})
