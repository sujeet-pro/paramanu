import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { containerClasses } from "./container.classes.js"

describe("container accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${containerClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${containerClasses()}">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-container")).toBe(true)
  })

  it("can serve as a main landmark with role attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><main class="${containerClasses()}" aria-label="Page content">Test</main></body>`,
    )
    const el = dom.window.document.querySelector("main")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("MAIN")
    expect(el?.getAttribute("aria-label")).toBe("Page content")
  })

  it("supports aria-labelledby for identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <h1 id="page-title">Dashboard</h1>
      <div class="${containerClasses()}" role="main" aria-labelledby="page-title">Test</div>
    </body>`)
    const el = dom.window.document.querySelector('[role="main"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute("aria-labelledby")).toBe("page-title")
  })

  it("can be used with region role for sectioning", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${containerClasses()}" role="region" aria-label="Feature section">Test</div></body>`,
    )
    const el = dom.window.document.querySelector('[role="region"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute("aria-label")).toBe("Feature section")
  })
})
