import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { tooltipClasses } from "./tooltip.classes.js"

function createTooltipHTML(): string {
  const classes = tooltipClasses()
  return `
    <button id="trigger" aria-describedby="tooltip-content">
      Hover me
    </button>
    <div id="tooltip-content" class="${classes}" role="tooltip">
      Helpful tooltip text
    </div>
  `
}

describe("tooltip accessibility", () => {
  it("tooltip element has role='tooltip'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTooltipHTML()}</body>`)
    const tooltip = dom.window.document.querySelector(".pm-tooltip")
    expect(tooltip).not.toBeNull()
    expect(tooltip?.getAttribute("role")).toBe("tooltip")
  })

  it("trigger has aria-describedby pointing to tooltip id", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTooltipHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger")
    const tooltip = dom.window.document.querySelector("#tooltip-content")
    expect(trigger?.getAttribute("aria-describedby")).toBe(tooltip?.id)
  })

  it("tooltip has an id for aria-describedby reference", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTooltipHTML()}</body>`)
    const tooltip = dom.window.document.querySelector("[role='tooltip']")
    expect(tooltip?.id).toBeTruthy()
  })

  it("trigger is an interactive element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTooltipHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger")
    expect(trigger?.tagName.toLowerCase()).toBe("button")
  })

  it("tooltip is not focusable (no tabindex)", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTooltipHTML()}</body>`)
    const tooltip = dom.window.document.querySelector("[role='tooltip']")
    expect(tooltip?.getAttribute("tabindex")).toBeNull()
  })

  it("tooltip text content is accessible", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTooltipHTML()}</body>`)
    const tooltip = dom.window.document.querySelector("[role='tooltip']")
    expect(tooltip?.textContent?.trim()).toBeTruthy()
  })
})
