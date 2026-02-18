import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { wrapClasses } from "./wrap.classes.js"

describe("wrap accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${wrapClasses()}">Content</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${wrapClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-wrap")).toBe(true)
  })

  it("supports aria-label for identification", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${wrapClasses()}" aria-label="Tag list">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.getAttribute("aria-label")).toBe("Tag list")
  })

  it("supports aria-labelledby for identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <h2 id="wrap-heading">Tags</h2>
      <div class="${wrapClasses()}" aria-labelledby="wrap-heading">Test</div>
    </body>`)
    const el = dom.window.document.querySelector(`.pm-wrap`)
    expect(el?.getAttribute("aria-labelledby")).toBe("wrap-heading")
  })

  it("preserves children order for screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${wrapClasses()}">
        <span>Tag 1</span>
        <span>Tag 2</span>
        <span>Tag 3</span>
      </div>
    </body>`)
    const children = dom.window.document.querySelectorAll(".pm-wrap > span")
    expect(children.length).toBe(3)
    expect(children[0]?.textContent).toBe("Tag 1")
    expect(children[2]?.textContent).toBe("Tag 3")
  })
})
