import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { iconClasses } from "./icon.classes.js"

function createDecorativeIconHTML(options: Parameters<typeof iconClasses>[0] = {}): string {
  const classes = iconClasses(options)
  return `<span class="${classes}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg></span>`
}

function createLabeledIconHTML(
  label: string,
  options: Parameters<typeof iconClasses>[0] = {},
): string {
  const classes = iconClasses(options)
  return `<span class="${classes}" role="img" aria-label="${label}"><svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg></span>`
}

describe("icon accessibility", () => {
  it("decorative icon has aria-hidden=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDecorativeIconHTML()}</body>`)
    const icon = dom.window.document.querySelector(".pm-icon")
    expect(icon?.getAttribute("aria-hidden")).toBe("true")
  })

  it("labeled icon has role=img and aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createLabeledIconHTML("Warning")}</body>`)
    const icon = dom.window.document.querySelector(".pm-icon")
    expect(icon?.getAttribute("role")).toBe("img")
    expect(icon?.getAttribute("aria-label")).toBe("Warning")
  })

  it("contains an SVG element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDecorativeIconHTML()}</body>`)
    const svg = dom.window.document.querySelector(".pm-icon svg")
    expect(svg).not.toBeNull()
  })

  it("decorative icon is hidden from assistive technology", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDecorativeIconHTML()}</body>`)
    const icon = dom.window.document.querySelector(".pm-icon")
    expect(icon?.getAttribute("aria-hidden")).toBe("true")
    expect(icon?.getAttribute("role")).toBeNull()
  })
})
