import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { centerClasses } from "./center.classes.js"

describe("center accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${centerClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${centerClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-center")).toBe(true)
  })

  it("supports aria-label for identification", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${centerClasses()}" aria-label="Centered content">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.getAttribute("aria-label")).toBe("Centered content")
  })

  it("preserves children within the centered container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${centerClasses()}">
        <h1>Title</h1>
        <p>Description</p>
      </div>
    </body>`)
    const center = dom.window.document.querySelector(".pm-center")
    expect(center?.querySelector("h1")).not.toBeNull()
    expect(center?.querySelector("p")).not.toBeNull()
  })

  it("does not introduce unwanted roles or aria attributes", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${centerClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector(".pm-center")
    expect(el?.getAttribute("role")).toBeNull()
    expect(el?.getAttribute("aria-hidden")).toBeNull()
  })
})
