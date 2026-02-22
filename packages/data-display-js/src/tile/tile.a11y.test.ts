import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { tileClasses } from "./tile.classes.js"

describe("tile accessibility", () => {
  it("can render as a button element", () => {
    const classes = tileClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><button class="${classes}">Dashboard</button></body>`,
    )
    const tile = dom.window.document.querySelector("button")
    expect(tile).not.toBeNull()
    expect(tile?.tagName).toBe("BUTTON")
  })

  it("can render as an anchor element", () => {
    const classes = tileClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><a href="/dashboard" class="${classes}">Dashboard</a></body>`,
    )
    const tile = dom.window.document.querySelector("a")
    expect(tile).not.toBeNull()
    expect(tile?.getAttribute("href")).toBe("/dashboard")
  })

  it("selected tile has aria-selected", () => {
    const classes = tileClasses({ selected: true })
    const dom = new JSDOM(
      `<!DOCTYPE html><body><button class="${classes}" aria-selected="true">Selected</button></body>`,
    )
    const tile = dom.window.document.querySelector("button")
    expect(tile?.getAttribute("aria-selected")).toBe("true")
  })

  it("disabled tile has aria-disabled", () => {
    const classes = tileClasses({ disabled: true })
    const dom = new JSDOM(
      `<!DOCTYPE html><body><button class="${classes}" aria-disabled="true">Disabled</button></body>`,
    )
    const tile = dom.window.document.querySelector("button")
    expect(tile?.getAttribute("aria-disabled")).toBe("true")
  })

  it("has accessible text content", () => {
    const classes = tileClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body><button class="${classes}">Reports</button></body>`)
    const tile = dom.window.document.querySelector("button")
    expect(tile?.textContent).toBe("Reports")
  })
})
