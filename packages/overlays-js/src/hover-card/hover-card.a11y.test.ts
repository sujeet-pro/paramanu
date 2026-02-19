import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { hovercardClasses } from "./hover-card.classes.js"

function createHovercardHTML(): string {
  const classes = hovercardClasses()
  return `
    <a id="trigger" href="https://example.com">
      @username
    </a>
    <div id="hover-card-content" class="${classes}">
      <p>User profile information</p>
      <a href="https://example.com/profile">View profile</a>
    </div>
  `
}

describe("hover card accessibility", () => {
  it("hover card does not have role='dialog' (not modal)", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createHovercardHTML()}</body>`)
    const card = dom.window.document.querySelector(".pm-hovercard")
    expect(card).not.toBeNull()
    expect(card?.getAttribute("role")).not.toBe("dialog")
  })

  it("hover card does not trap focus", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createHovercardHTML()}</body>`)
    const card = dom.window.document.querySelector(".pm-hovercard")
    // No aria-modal or focus trap indicators
    expect(card?.getAttribute("aria-modal")).toBeNull()
  })

  it("hover card allows interactive content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createHovercardHTML()}</body>`)
    const card = dom.window.document.querySelector(".pm-hovercard")
    const link = card?.querySelector("a")
    expect(link).not.toBeNull()
    expect(link?.getAttribute("href")).toBe("https://example.com/profile")
  })

  it("hover card content is not pointer-events: none (unlike tooltip)", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createHovercardHTML()}</body>`)
    const card = dom.window.document.querySelector(".pm-hovercard")
    // Hover card is interactive, so it should not have pointer-events: none in its markup
    const style = card?.getAttribute("style") ?? ""
    expect(style).not.toContain("pointer-events: none")
  })

  it("trigger is an interactive element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createHovercardHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger")
    expect(trigger?.tagName.toLowerCase()).toBe("a")
    expect(trigger?.getAttribute("href")).toBeTruthy()
  })

  it("hover card does not have aria-describedby (it is not a tooltip)", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createHovercardHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger")
    expect(trigger?.getAttribute("aria-describedby")).toBeNull()
  })
})
