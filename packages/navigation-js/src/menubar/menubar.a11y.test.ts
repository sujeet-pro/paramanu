import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { menubarClasses, menubarItemClasses } from "./menubar.classes.js"

function createMenubarHTML(): string {
  return `
    <ul class="${menubarClasses()}" role="menubar">
      <li role="none">
        <button class="${menubarItemClasses()}" role="menuitem">File</button>
      </li>
      <li role="none">
        <button class="${menubarItemClasses({ active: true })}" role="menuitem">Edit</button>
      </li>
      <li role="none">
        <button class="${menubarItemClasses({ disabled: true })}" role="menuitem" aria-disabled="true">View</button>
      </li>
    </ul>
  `
}

describe("menubar accessibility", () => {
  it("root has role=menubar", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenubarHTML()}</body>`)
    const menubar = dom.window.document.querySelector("[role='menubar']")
    expect(menubar).not.toBeNull()
    expect(menubar?.tagName).toBe("UL")
  })

  it("items have role=menuitem", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenubarHTML()}</body>`)
    const items = dom.window.document.querySelectorAll("[role='menuitem']")
    expect(items.length).toBe(3)
  })

  it("items are button elements", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenubarHTML()}</body>`)
    const buttons = dom.window.document.querySelectorAll("button[role='menuitem']")
    expect(buttons.length).toBe(3)
  })

  it("disabled item has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenubarHTML()}</body>`)
    const items = dom.window.document.querySelectorAll("[role='menuitem']")
    const disabledItem = items[2]
    expect(disabledItem?.getAttribute("aria-disabled")).toBe("true")
  })

  it("list items have role=none", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenubarHTML()}</body>`)
    const listItems = dom.window.document.querySelectorAll("li[role='none']")
    expect(listItems.length).toBe(3)
  })
})
