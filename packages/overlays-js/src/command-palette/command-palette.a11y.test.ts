import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"

function createCommandPaletteHTML(): string {
  return `
    <div class="pm-command-palette" role="dialog" aria-label="Command palette">
      <div class="pm-command-palette__panel">
        <input
          class="pm-command-palette__input"
          role="combobox"
          aria-expanded="true"
          aria-controls="pm-command-palette-listbox"
          aria-activedescendant="pm-command-palette-item-0"
          aria-autocomplete="list"
          placeholder="Type a command..."
        />
        <ul
          class="pm-command-palette__list"
          id="pm-command-palette-listbox"
          role="listbox"
          aria-label="Commands"
        >
          <li
            class="pm-command-palette__item pm-command-palette__item--active"
            id="pm-command-palette-item-0"
            role="option"
            aria-selected="true"
            data-value="search"
          >
            Search
          </li>
          <li
            class="pm-command-palette__item"
            id="pm-command-palette-item-1"
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
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-command-palette__input")
    expect(input).not.toBeNull()
    expect(input?.getAttribute("role")).toBe("combobox")
  })

  it("input has aria-expanded attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector("[role='combobox']")
    expect(input).not.toBeNull()
    expect(input?.hasAttribute("aria-expanded")).toBe(true)
    expect(input?.getAttribute("aria-expanded")).toBe("true")
  })

  it("input has aria-controls pointing to listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector("[role='combobox']")
    const listbox = dom.window.document.querySelector("[role='listbox']")
    expect(input).not.toBeNull()
    expect(listbox).not.toBeNull()
    const controlsId = input?.getAttribute("aria-controls")
    expect(controlsId).toBeTruthy()
    expect(listbox?.getAttribute("id")).toBe(controlsId)
  })

  it("list has role='listbox'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const list = dom.window.document.querySelector(".pm-command-palette__list")
    expect(list).not.toBeNull()
    expect(list?.getAttribute("role")).toBe("listbox")
  })

  it("items have role='option'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const items = dom.window.document.querySelectorAll(".pm-command-palette__item")
    expect(items.length).toBeGreaterThan(0)
    items.forEach((item) => {
      expect(item.getAttribute("role")).toBe("option")
    })
  })

  it("active item is tracked with aria-activedescendant on input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector("[role='combobox']")
    const activeDescendantId = input?.getAttribute("aria-activedescendant")
    expect(activeDescendantId).toBeTruthy()

    const activeItem = dom.window.document.getElementById(activeDescendantId!)
    expect(activeItem).not.toBeNull()
    expect(activeItem?.getAttribute("role")).toBe("option")
    expect(activeItem?.getAttribute("aria-selected")).toBe("true")
  })

  it("active item has aria-selected='true'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const activeItem = dom.window.document.querySelector(
      ".pm-command-palette__item--active",
    )
    expect(activeItem).not.toBeNull()
    expect(activeItem?.getAttribute("aria-selected")).toBe("true")
  })

  it("non-active items have aria-selected='false'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const items = dom.window.document.querySelectorAll(".pm-command-palette__item")
    const nonActiveItems = Array.from(items).filter(
      (item) => !item.classList.contains("pm-command-palette__item--active"),
    )
    expect(nonActiveItems.length).toBeGreaterThan(0)
    nonActiveItems.forEach((item) => {
      expect(item.getAttribute("aria-selected")).toBe("false")
    })
  })

  it("input has aria-autocomplete='list'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const input = dom.window.document.querySelector("[role='combobox']")
    expect(input?.getAttribute("aria-autocomplete")).toBe("list")
  })

  it("listbox has an accessible label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const listbox = dom.window.document.querySelector("[role='listbox']")
    expect(listbox).not.toBeNull()
    const hasLabel =
      listbox?.hasAttribute("aria-label") || listbox?.hasAttribute("aria-labelledby")
    expect(hasLabel).toBe(true)
  })

  it("container has role='dialog' with an accessible label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCommandPaletteHTML()}</body>`)
    const container = dom.window.document.querySelector(".pm-command-palette")
    expect(container).not.toBeNull()
    expect(container?.getAttribute("role")).toBe("dialog")
    const hasLabel =
      container?.hasAttribute("aria-label") || container?.hasAttribute("aria-labelledby")
    expect(hasLabel).toBe(true)
  })
})
