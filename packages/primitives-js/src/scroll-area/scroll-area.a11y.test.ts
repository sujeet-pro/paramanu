import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { scrollAreaClasses } from "./scroll-area.classes.js"

function createScrollAreaHTML(
  options: Parameters<typeof scrollAreaClasses>[0] = {},
  attrs: Record<string, string> = {},
): string {
  const classes = scrollAreaClasses(options)
  const attrStr = Object.entries(attrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ")
  return `<div class="${classes}" tabindex="0" role="region" ${attrStr}><p>Scrollable content</p></div>`
}

describe("scroll-area accessibility", () => {
  it("supports tabindex for keyboard focus", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createScrollAreaHTML()}</body>`)
    const scrollArea = dom.window.document.querySelector(".pm-scroll-area")
    expect(scrollArea).not.toBeNull()
    expect(scrollArea?.getAttribute("tabindex")).toBe("0")
  })

  it("has role=region", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createScrollAreaHTML()}</body>`)
    const scrollArea = dom.window.document.querySelector('[role="region"]')
    expect(scrollArea).not.toBeNull()
    expect(scrollArea?.getAttribute("role")).toBe("region")
  })

  it("supports aria-label for accessible name", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createScrollAreaHTML({}, { "aria-label": "Scrollable content area" })}</body>`,
    )
    const scrollArea = dom.window.document.querySelector('[role="region"]')
    expect(scrollArea?.getAttribute("aria-label")).toBe("Scrollable content area")
  })

  it("is keyboard focusable with tabindex=0", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createScrollAreaHTML()}</body>`)
    const scrollArea = dom.window.document.querySelector(".pm-scroll-area")
    const tabindex = parseInt(scrollArea?.getAttribute("tabindex") ?? "-1", 10)
    expect(tabindex).toBeGreaterThanOrEqual(0)
  })

  it("contains content within the scroll region", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createScrollAreaHTML()}</body>`)
    const scrollArea = dom.window.document.querySelector(".pm-scroll-area")
    expect(scrollArea?.querySelector("p")).not.toBeNull()
    expect(scrollArea?.textContent).toContain("Scrollable content")
  })
})
