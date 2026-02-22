import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  menuClasses,
  menuItemClasses,
  menuGroupClasses,
  menuSeparatorClasses,
} from "./menu.classes.js"

function createMenuHTML(size?: "sm" | "md" | "lg"): string {
  const rootClasses = menuClasses({ size })
  return `
    <ul class="${rootClasses}" role="menu">
      <li class="${menuItemClasses()}" role="menuitem">Cut</li>
      <li class="${menuItemClasses()}" role="menuitem">Copy</li>
      <li class="${menuSeparatorClasses()}" role="separator"></li>
      <li class="${menuItemClasses({ disabled: true })}" role="menuitem" aria-disabled="true">Paste</li>
    </ul>
  `
}

function createGroupedMenuHTML(): string {
  const rootClasses = menuClasses()
  return `
    <ul class="${rootClasses}" role="menu">
      <li role="none">
        <ul class="${menuGroupClasses()}" role="group" aria-labelledby="group-label">
          <li class="pm-menu__group-label" role="presentation" id="group-label">Actions</li>
          <li class="${menuItemClasses()}" role="menuitem">Edit</li>
          <li class="${menuItemClasses()}" role="menuitem">Duplicate</li>
        </ul>
      </li>
    </ul>
  `
}

describe("menu accessibility", () => {
  it("root has role=menu", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenuHTML()}</body>`)
    const menu = dom.window.document.querySelector("[role='menu']")
    expect(menu).not.toBeNull()
    expect(menu?.tagName).toBe("UL")
  })

  it("items have role=menuitem", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenuHTML()}</body>`)
    const items = dom.window.document.querySelectorAll("[role='menuitem']")
    expect(items.length).toBe(3)
  })

  it("separator has role=separator", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenuHTML()}</body>`)
    const separator = dom.window.document.querySelector("[role='separator']")
    expect(separator).not.toBeNull()
  })

  it("disabled item has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMenuHTML()}</body>`)
    const items = dom.window.document.querySelectorAll("[role='menuitem']")
    const disabledItem = items[2]
    expect(disabledItem?.getAttribute("aria-disabled")).toBe("true")
  })

  it("group has role=group with aria-labelledby", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createGroupedMenuHTML()}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group).not.toBeNull()
    expect(group?.getAttribute("aria-labelledby")).toBe("group-label")
  })

  it("group label has role=presentation", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createGroupedMenuHTML()}</body>`)
    const label = dom.window.document.querySelector("[role='presentation']")
    expect(label).not.toBeNull()
    expect(label?.textContent).toBe("Actions")
  })
})
