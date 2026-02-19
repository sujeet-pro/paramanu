import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { floatClasses } from "./float.classes.js"

describe("float accessibility", () => {
  it("renders as a generic positioning wrapper element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${floatClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${floatClasses()}">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-float")).toBe(true)
  })

  it("preserves child content and accessibility attributes", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${floatClasses()}">
        <span aria-label="Notif count">3</span>
      </div>
    </body>`)
    const span = dom.window.document.querySelector("span")
    expect(span).not.toBeNull()
    expect(span?.getAttribute("aria-label")).toBe("Notif count")
  })

  it("does not introduce unwanted roles or aria attributes", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${floatClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector(".pm-float")
    expect(el?.getAttribute("role")).toBeNull()
    expect(el?.getAttribute("aria-hidden")).toBeNull()
  })

  it("preserves modifier classes for different placements without affecting semantics", () => {
    const classes = floatClasses({ placement: "bottom-start" })
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${classes}">Badge</div></body>`)
    const el = dom.window.document.querySelector(".pm-float")
    expect(el).not.toBeNull()
    expect(el?.classList.contains("pm-float--bottom-start")).toBe(true)
    expect(el?.textContent).toBe("Badge")
  })
})
