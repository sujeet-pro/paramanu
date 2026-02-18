import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  dropdownMenuClasses,
  dropdownMenuTriggerClasses,
  dropdownMenuContentClasses,
} from "./dropdown-menu.classes.js"

function createDropdownMenuHTML(open = false): string {
  const rootClasses = dropdownMenuClasses({ open })
  return `
    <div class="${rootClasses}">
      <button
        class="${dropdownMenuTriggerClasses()}"
        aria-haspopup="true"
        aria-expanded="${open}"
      >
        Options
      </button>
      <div class="${dropdownMenuContentClasses()}" role="menu">
        <div class="pm-menu__item" role="menuitem">Edit</div>
        <div class="pm-menu__item" role="menuitem">Duplicate</div>
        <div class="pm-menu__separator" role="separator"></div>
        <div class="pm-menu__item pm-menu__item--destructive" role="menuitem">Delete</div>
      </div>
    </div>
  `
}

describe("dropdown menu accessibility", () => {
  it("trigger has aria-haspopup", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropdownMenuHTML()}</body>`)
    const trigger = dom.window.document.querySelector("button")
    expect(trigger?.getAttribute("aria-haspopup")).toBe("true")
  })

  it("trigger has aria-expanded=false when closed", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropdownMenuHTML(false)}</body>`)
    const trigger = dom.window.document.querySelector("button")
    expect(trigger?.getAttribute("aria-expanded")).toBe("false")
  })

  it("trigger has aria-expanded=true when open", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropdownMenuHTML(true)}</body>`)
    const trigger = dom.window.document.querySelector("button")
    expect(trigger?.getAttribute("aria-expanded")).toBe("true")
  })

  it("content has role=menu", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropdownMenuHTML(true)}</body>`)
    const content = dom.window.document.querySelector("[role='menu']")
    expect(content).not.toBeNull()
  })

  it("items have role=menuitem", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropdownMenuHTML(true)}</body>`)
    const items = dom.window.document.querySelectorAll("[role='menuitem']")
    expect(items.length).toBe(3)
  })

  it("separator has role=separator", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropdownMenuHTML(true)}</body>`)
    const separator = dom.window.document.querySelector("[role='separator']")
    expect(separator).not.toBeNull()
  })

  it("trigger is a button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropdownMenuHTML()}</body>`)
    const trigger = dom.window.document.querySelector(`.${dropdownMenuTriggerClasses()}`)
    expect(trigger?.tagName).toBe("BUTTON")
  })
})
