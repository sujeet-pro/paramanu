import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { srOnlyClasses } from "./visually-hidden.classes.js"

describe("visually-hidden accessibility", () => {
  it("content is hidden visually but present in DOM", () => {
    const classes = srOnlyClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><span class="${classes}">Screen reader text</span></body>`,
    )
    const el = dom.window.document.querySelector(".pm-sr-only")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Screen reader text")
  })

  it("focusable variant is accessible to keyboard users", () => {
    const classes = srOnlyClasses({ focusable: true })
    const dom = new JSDOM(
      `<!DOCTYPE html><body><a href="#main" class="${classes}">Skip to content</a></body>`,
    )
    const link = dom.window.document.querySelector("a")
    expect(link).not.toBeNull()
    expect(link?.getAttribute("href")).toBe("#main")
    expect(link?.textContent).toBe("Skip to content")
  })
})
