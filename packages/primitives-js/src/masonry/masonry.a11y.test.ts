import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { masonryClasses } from "./masonry.classes.js"

describe("masonry accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${masonryClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${masonryClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-masonry")).toBe(true)
  })

  it("supports aria-label for identification", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${masonryClasses()}" aria-label="Photo gallery">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.getAttribute("aria-label")).toBe("Photo gallery")
  })

  it("supports aria-labelledby for identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <h2 id="masonry-heading">Gallery</h2>
      <div class="${masonryClasses()}" aria-labelledby="masonry-heading">Test</div>
    </body>`)
    const el = dom.window.document.querySelector(`.pm-masonry`)
    expect(el?.getAttribute("aria-labelledby")).toBe("masonry-heading")
  })

  it("preserves children within the masonry container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${masonryClasses({ columns: 2 })}">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </div>
    </body>`)
    const children = dom.window.document.querySelectorAll(".pm-masonry > div")
    expect(children.length).toBe(3)
  })
})
