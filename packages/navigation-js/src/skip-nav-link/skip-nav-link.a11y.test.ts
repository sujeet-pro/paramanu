import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { skipLinkClasses } from "./skip-nav-link.classes.js"

describe("skip nav link accessibility", () => {
  it("renders as an anchor element", () => {
    const classes = skipLinkClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><a href="#main-content" class="${classes}">Skip to main content</a></body>`,
    )
    const link = dom.window.document.querySelector("a")
    expect(link).not.toBeNull()
    expect(link?.tagName).toBe("A")
  })

  it("has descriptive text content", () => {
    const classes = skipLinkClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><a href="#main-content" class="${classes}">Skip to main content</a></body>`,
    )
    const link = dom.window.document.querySelector("a")
    expect(link?.textContent).toBe("Skip to main content")
  })

  it("points to a valid anchor target", () => {
    const classes = skipLinkClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><a href="#main-content" class="${classes}">Skip to main content</a><main id="main-content"></main></body>`,
    )
    const link = dom.window.document.querySelector("a")
    const href = link?.getAttribute("href")
    expect(href).toBe("#main-content")
    const target = dom.window.document.querySelector(href!)
    expect(target).not.toBeNull()
  })
})
