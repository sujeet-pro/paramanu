import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { flexClasses } from "./flex.classes.js"

describe("flex accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${flexClasses()}">Content</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${flexClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-flex")).toBe(true)
  })

  it("supports aria-label for identification", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${flexClasses()}" aria-label="Toolbar actions">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.getAttribute("aria-label")).toBe("Toolbar actions")
  })

  it("supports aria-labelledby for identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <h2 id="flex-heading">Layout</h2>
      <div class="${flexClasses()}" aria-labelledby="flex-heading">Test</div>
    </body>`)
    const el = dom.window.document.querySelector(`.pm-flex`)
    expect(el?.getAttribute("aria-labelledby")).toBe("flex-heading")
  })

  it("preserves modifier classes without affecting semantics", () => {
    const classes = flexClasses({ direction: "column", gap: "4" })
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${classes}">Test</div></body>`)
    const el = dom.window.document.querySelector(".pm-flex")
    expect(el).not.toBeNull()
    expect(el?.classList.contains("pm-flex--col")).toBe(true)
    expect(el?.classList.contains("pm-flex--gap-4")).toBe(true)
  })
})
