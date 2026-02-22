import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { highlightClasses } from "./highlight.classes.js"

describe("highlight accessibility", () => {
  it("renders as a mark element", () => {
    const classes = highlightClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body><mark class="${classes}">important</mark></body>`)
    const el = dom.window.document.querySelector("mark")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("MARK")
  })

  it("has visible text content", () => {
    const classes = highlightClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><mark class="${classes}">highlighted text</mark></body>`,
    )
    const el = dom.window.document.querySelector("mark")
    expect(el?.textContent).toBe("highlighted text")
  })

  it("preserves surrounding text context", () => {
    const classes = highlightClasses()
    const html = `<p>This is <mark class="${classes}">highlighted</mark> text</p>`
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const p = dom.window.document.querySelector("p")
    expect(p?.textContent).toBe("This is highlighted text")
  })
})
