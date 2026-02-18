import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { popoverClasses } from "./popover.classes.js"

function createPopoverHTML(): string {
  const classes = popoverClasses()
  return `
    <button
      id="trigger"
      aria-expanded="false"
      aria-haspopup="dialog"
      aria-controls="popover-content"
    >
      Open
    </button>
    <div id="popover-content" class="${classes}" role="dialog">
      <p>Popover content</p>
    </div>
  `
}

describe("popover accessibility", () => {
  it("trigger has aria-expanded attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPopoverHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger")
    expect(trigger).not.toBeNull()
    expect(trigger?.getAttribute("aria-expanded")).toBe("false")
  })

  it("trigger has aria-haspopup attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPopoverHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger")
    expect(trigger?.getAttribute("aria-haspopup")).toBe("dialog")
  })

  it("trigger has aria-controls pointing to popover id", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPopoverHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger")
    const popover = dom.window.document.querySelector("#popover-content")
    expect(trigger?.getAttribute("aria-controls")).toBe(popover?.id)
  })

  it("popover has dialog role", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPopoverHTML()}</body>`)
    const popover = dom.window.document.querySelector(".pm-popover")
    expect(popover?.getAttribute("role")).toBe("dialog")
  })

  it("trigger is a button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPopoverHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger")
    expect(trigger?.tagName.toLowerCase()).toBe("button")
  })

  it("aria-expanded can be toggled to true when open", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPopoverHTML()}</body>`)
    const trigger = dom.window.document.querySelector("#trigger") as Element
    trigger.setAttribute("aria-expanded", "true")
    expect(trigger.getAttribute("aria-expanded")).toBe("true")
  })
})
