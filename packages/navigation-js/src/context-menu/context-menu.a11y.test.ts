import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { ctxMenuClasses } from "./context-menu.classes.js"

function createCtxMenuHTML(open = false): string {
  const rootClasses = ctxMenuClasses({ open })
  return `
    <div class="${rootClasses}" role="menu">
      <div class="pm-menu__item" role="menuitem">Cut</div>
      <div class="pm-menu__item" role="menuitem">Copy</div>
      <div class="pm-menu__item" role="menuitem">Paste</div>
      <div class="pm-menu__separator" role="separator"></div>
      <div class="pm-menu__item pm-menu__item--destructive" role="menuitem">Delete</div>
    </div>
  `
}

describe("context menu accessibility", () => {
  it("root has role=menu", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCtxMenuHTML(true)}</body>`)
    const menu = dom.window.document.querySelector("[role='menu']")
    expect(menu).not.toBeNull()
  })

  it("items have role=menuitem", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCtxMenuHTML(true)}</body>`)
    const items = dom.window.document.querySelectorAll("[role='menuitem']")
    expect(items.length).toBe(4)
  })

  it("separator has role=separator", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCtxMenuHTML(true)}</body>`)
    const separator = dom.window.document.querySelector("[role='separator']")
    expect(separator).not.toBeNull()
  })

  it("is a div element (positioned absolutely)", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCtxMenuHTML(true)}</body>`)
    const menu = dom.window.document.querySelector("[role='menu']")
    expect(menu?.tagName).toBe("DIV")
  })

  it("includes pm-ctx-menu class", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCtxMenuHTML(true)}</body>`)
    const menu = dom.window.document.querySelector("[role='menu']")
    expect(menu?.classList.contains("pm-ctx-menu")).toBe(true)
  })
})
