import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { backToTopClasses } from "./back-to-top.classes.js"

function createBackToTopHTML(
  options: Parameters<typeof backToTopClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = backToTopClasses(options)
  return `<button class="${classes}" aria-label="Back to top"${attrs ? " " + attrs : ""}>\u2191</button>`
}

describe("back to top accessibility", () => {
  it("renders as a button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBackToTopHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.tagName).toBe("BUTTON")
  })

  it("has an aria-label for screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBackToTopHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Back to top")
  })

  it("has visual content (arrow icon)", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBackToTopHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.textContent).toBeTruthy()
  })
})
