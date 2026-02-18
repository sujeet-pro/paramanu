import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { boxClasses } from "./box.classes.js"

describe("box accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${boxClasses()}">Content</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${boxClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-box")).toBe(true)
  })

  it("supports aria-label for identification", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${boxClasses()}" aria-label="Content area">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.getAttribute("aria-label")).toBe("Content area")
  })

  it("supports aria-labelledby for identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <h2 id="section-heading">Section</h2>
      <div class="${boxClasses()}" aria-labelledby="section-heading">Test</div>
    </body>`)
    const el = dom.window.document.querySelector(`.pm-box`)
    expect(el?.getAttribute("aria-labelledby")).toBe("section-heading")
  })

  it("can serve as a landmark with role attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${boxClasses()}" role="region" aria-label="Main content">Test</div></body>`,
    )
    const el = dom.window.document.querySelector('[role="region"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute("aria-label")).toBe("Main content")
  })
})
