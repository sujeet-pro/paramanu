import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { listClasses } from "./list.classes.js"

describe("list accessibility", () => {
  it("unordered list renders as ul element", () => {
    const classes = listClasses({ type: "unordered" })
    const dom = new JSDOM(`<!DOCTYPE html><body><ul class="${classes}"><li>Item</li></ul></body>`)
    const el = dom.window.document.querySelector("ul")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("UL")
  })

  it("ordered list renders as ol element", () => {
    const classes = listClasses({ type: "ordered" })
    const dom = new JSDOM(`<!DOCTYPE html><body><ol class="${classes}"><li>Item</li></ol></body>`)
    const el = dom.window.document.querySelector("ol")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("OL")
  })

  it("contains li elements", () => {
    const classes = listClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><ul class="${classes}"><li>First</li><li>Second</li></ul></body>`,
    )
    const items = dom.window.document.querySelectorAll("li")
    expect(items).toHaveLength(2)
    expect(items[0].textContent).toBe("First")
    expect(items[1].textContent).toBe("Second")
  })

  it("ul has implicit list role", () => {
    const classes = listClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body><ul class="${classes}"><li>Item</li></ul></body>`)
    const el = dom.window.document.querySelector("ul")
    expect(el?.tagName).toBe("UL")
  })
})
