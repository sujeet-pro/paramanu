import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { gridClasses } from "./grid.classes.js"

describe("grid accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${gridClasses()}">Content</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${gridClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-grid")).toBe(true)
  })

  it("supports aria-label for identification", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${gridClasses()}" aria-label="Product grid">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.getAttribute("aria-label")).toBe("Product grid")
  })

  it("supports aria-labelledby for identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <h2 id="grid-heading">Gallery</h2>
      <div class="${gridClasses()}" aria-labelledby="grid-heading">Test</div>
    </body>`)
    const el = dom.window.document.querySelector(`.pm-grid`)
    expect(el?.getAttribute("aria-labelledby")).toBe("grid-heading")
  })

  it("preserves modifier classes without affecting semantics", () => {
    const classes = gridClasses({ columns: 3, gap: "4" })
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${classes}">Test</div></body>`)
    const el = dom.window.document.querySelector(".pm-grid")
    expect(el).not.toBeNull()
    expect(el?.classList.contains("pm-grid--cols-3")).toBe(true)
    expect(el?.classList.contains("pm-grid--gap-4")).toBe(true)
  })
})
