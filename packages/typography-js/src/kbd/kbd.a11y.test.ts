import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { kbdClasses } from "./kbd.classes.js"

describe("kbd accessibility", () => {
  it("renders as a kbd element", () => {
    const classes = kbdClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body><kbd class="${classes}">Ctrl</kbd></body>`)
    const el = dom.window.document.querySelector("kbd")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("KBD")
  })

  it("has readable text content", () => {
    const classes = kbdClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body><kbd class="${classes}">Enter</kbd></body>`)
    const el = dom.window.document.querySelector("kbd")
    expect(el?.textContent).toBe("Enter")
  })

  it("can represent keyboard shortcuts", () => {
    const classes = kbdClasses()
    const html = `<kbd class="${classes}">Ctrl</kbd> + <kbd class="${classes}">C</kbd>`
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const elements = dom.window.document.querySelectorAll("kbd")
    expect(elements).toHaveLength(2)
    expect(elements[0].textContent).toBe("Ctrl")
    expect(elements[1].textContent).toBe("C")
  })
})
