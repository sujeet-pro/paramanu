import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { sgridClasses } from "./simple-grid.classes.js"

describe("simple-grid accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${sgridClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${sgridClasses()}">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-sgrid")).toBe(true)
  })

  it("supports aria-label for identification", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${sgridClasses()}" aria-label="Card grid">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.getAttribute("aria-label")).toBe("Card grid")
  })

  it("preserves children within the grid container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${sgridClasses({ columns: 2 })}">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </div>
    </body>`)
    const children = dom.window.document.querySelectorAll(".pm-sgrid > div")
    expect(children.length).toBe(3)
  })

  it("preserves modifier classes without affecting semantics", () => {
    const classes = sgridClasses({ columns: 3, gap: "4" })
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${classes}">Test</div></body>`)
    const el = dom.window.document.querySelector(".pm-sgrid")
    expect(el).not.toBeNull()
    expect(el?.classList.contains("pm-sgrid--cols-3")).toBe(true)
    expect(el?.classList.contains("pm-sgrid--gap-4")).toBe(true)
  })
})
