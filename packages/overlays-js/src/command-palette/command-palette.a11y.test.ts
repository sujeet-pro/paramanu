import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"

function createCmdPaletteHTML(): string {
  return `
    <div class="pm-cmd-palette" role="dialog" aria-label="Command palette">
      <div class="pm-cmd-palette__panel">
        <input
          class="pm-cmd-palette__input"
          role="combobox"
          aria-expanded="true"
          aria-controls="pm-cmd-palette-listbox"
          aria-activedescendant="pm-cmd-palette-item-0"
          aria-autocomplete="list"
          placeholder="Type a command..."
        />
        <ul
          class="pm-cmd-palette__list"
          id="pm-cmd-palette-listbox"
          role="listbox"
          aria-label="Commands"
        >
          <li
            class="pm-cmd-palette__item pm-cmd-palette__item--active"
            id="pm-cmd-palette-item-0"
            role="option"
            aria-selected="true"
            data-value="search"
          >
            Search
          </li>
          <li
            class="pm-cmd-palette__item"
            id="pm-cmd-palette-item-1"
            role="option"
            aria-selected="false"
            data-value="settings"
          >
            Settings
          </li>
        </ul>
      </div>
    </div>
  `
}

describe("command palette accessibility", () => {
  it("input has role='combobox'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-cmd-palette__input")
    expect(input).not.toBeNull()
    expect(input?.getAttribute("role")).toBe("combobox")
  })

  it("input has aria-expanded attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector("[role='combobox']")
    expect(input).not.toBeNull()
    expect(input?.hasAttribute("aria-expanded")).toBe(true)
    expect(input?.getAttribute("aria-expanded")).toBe("true")
  })

  it("input has aria-controls pointing to listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector("[role='combobox']")
    const listbox = dom.window.document.querySelector("[role='listbox']")
    expect(input).not.toBeNull()
    expect(listbox).not.toBeNull()
    const controlsId = input?.getAttribute("aria-controls")
    expect(controlsId).toBeTruthy()
    expect(listbox?.getAttribute("id")).toBe(controlsId)
  })

  it("list has role='listbox'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const list = dom.window.document.querySelector(".pm-cmd-palette__list")
    expect(list).not.toBeNull()
    expect(list?.getAttribute("role")).toBe("listbox")
  })

  it("items have role='option'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const items = dom.window.document.querySelectorAll(".pm-cmd-palette__item")
    expect(items.length).toBeGreaterThan(0)
    items.forEach((item) => {
      expect(item.getAttribute("role")).toBe("option")
    })
  })

  it("active item is tracked with aria-activedescendant on input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector("[role='combobox']")
    const activeDescendantId = input?.getAttribute("aria-activedescendant")
    expect(activeDescendantId).toBeTruthy()

    const activeItem = dom.window.document.getElementById(activeDescendantId!)
    expect(activeItem).not.toBeNull()
    expect(activeItem?.getAttribute("role")).toBe("option")
    expect(activeItem?.getAttribute("aria-selected")).toBe("true")
  })

  it("active item has aria-selected='true'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const activeItem = dom.window.document.querySelector(".pm-cmd-palette__item--active")
    expect(activeItem).not.toBeNull()
    expect(activeItem?.getAttribute("aria-selected")).toBe("true")
  })

  it("non-active items have aria-selected='false'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const items = dom.window.document.querySelectorAll(".pm-cmd-palette__item")
    const nonActiveItems = Array.from(items).filter(
      (item) => !item.classList.contains("pm-cmd-palette__item--active"),
    )
    expect(nonActiveItems.length).toBeGreaterThan(0)
    nonActiveItems.forEach((item) => {
      expect(item.getAttribute("aria-selected")).toBe("false")
    })
  })

  it("input has aria-autocomplete='list'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector("[role='combobox']")
    expect(input?.getAttribute("aria-autocomplete")).toBe("list")
  })

  it("listbox has an accessible label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const listbox = dom.window.document.querySelector("[role='listbox']")
    expect(listbox).not.toBeNull()
    const hasLabel = listbox?.hasAttribute("aria-label") || listbox?.hasAttribute("aria-labelledby")
    expect(hasLabel).toBe(true)
  })

  it("container has role='dialog' with an accessible label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCmdPaletteHTML()}</body>`)
    const container = dom.window.document.querySelector(".pm-cmd-palette")
    expect(container).not.toBeNull()
    expect(container?.getAttribute("role")).toBe("dialog")
    const hasLabel =
      container?.hasAttribute("aria-label") || container?.hasAttribute("aria-labelledby")
    expect(hasLabel).toBe(true)
  })
})
