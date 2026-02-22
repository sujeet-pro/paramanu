import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { ringProgressClasses } from "./circular-progress.classes.js"
import type { RingProgressClassesOptions } from "./circular-progress.types.js"

function createRingProgressHTML(
  value: number = 75,
  options: RingProgressClassesOptions = {},
): string {
  const classes = ringProgressClasses(options)
  return `<div class="${classes.root}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><svg class="${classes.svg}"><circle class="${classes.track}"/><circle class="${classes.fill}"/></svg></div>`
}

describe("circular progress accessibility", () => {
  it("has role=progressbar", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRingProgressHTML()}</body>`)
    const el = dom.window.document.querySelector(".pm-ring-progress")
    expect(el?.getAttribute("role")).toBe("progressbar")
  })

  it("has aria-valuenow, aria-valuemin, and aria-valuemax", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRingProgressHTML(75)}</body>`)
    const el = dom.window.document.querySelector(".pm-ring-progress")
    expect(el?.getAttribute("aria-valuenow")).toBe("75")
    expect(el?.getAttribute("aria-valuemin")).toBe("0")
    expect(el?.getAttribute("aria-valuemax")).toBe("100")
  })

  it("contains SVG element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRingProgressHTML()}</body>`)
    const svg = dom.window.document.querySelector(".pm-ring-progress svg")
    expect(svg).not.toBeNull()
    expect(svg?.tagName.toLowerCase()).toBe("svg")
  })
})
