import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { badgeClasses } from "./badge.classes.js"

function createBadgeHTML(
  text: string,
  options: Parameters<typeof badgeClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = badgeClasses(options)
  return `<span class="${classes}"${attrs ? " " + attrs : ""}>${text}</span>`
}

describe("badge accessibility", () => {
  it("renders as a span element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBadgeHTML("New")}</body>`)
    const badge = dom.window.document.querySelector(".pm-badge")
    expect(badge).not.toBeNull()
    expect(badge?.tagName).toBe("SPAN")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBadgeHTML("3 items")}</body>`)
    const badge = dom.window.document.querySelector(".pm-badge")
    expect(badge?.textContent).toBe("3 items")
  })

  it("supports aria-label for additional context", () => {
    const html = createBadgeHTML("5", {}, 'aria-label="5 notifications"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const badge = dom.window.document.querySelector(".pm-badge")
    expect(badge?.getAttribute("aria-label")).toBe("5 notifications")
  })

  it("can be used with role=status for live updates", () => {
    const html = createBadgeHTML("Online", {}, 'role="status"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const badge = dom.window.document.querySelector(".pm-badge")
    expect(badge?.getAttribute("role")).toBe("status")
  })
})
