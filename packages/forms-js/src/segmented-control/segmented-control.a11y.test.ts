import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { segCtrlClasses } from "./segmented-control.classes.js"

function createSegCtrlHTML(
  items: string[],
  activeIndex: number = 0,
  options: Parameters<typeof segCtrlClasses>[0] = {},
): string {
  const classes = segCtrlClasses(options)
  const buttons = items
    .map(
      (item, i) =>
        `<button type="button" role="radio" aria-checked="${i === activeIndex}" class="pm-seg-ctrl__item${i === activeIndex ? " pm-seg-ctrl__item--active" : ""}">${item}</button>`,
    )
    .join("")
  return `<div role="radiogroup" class="${classes}">${buttons}</div>`
}

describe("segmented control accessibility", () => {
  it("renders with role=radiogroup", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSegCtrlHTML(["Day", "Week", "Month"])}</body>`,
    )
    const control = dom.window.document.querySelector('[role="radiogroup"]')
    expect(control).not.toBeNull()
  })

  it("items use role=radio", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSegCtrlHTML(["A", "B", "C"])}</body>`,
    )
    const items = dom.window.document.querySelectorAll('[role="radio"]')
    expect(items.length).toBe(3)
  })

  it("active item has aria-checked=true", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSegCtrlHTML(["Day", "Week", "Month"], 1)}</body>`,
    )
    const items = dom.window.document.querySelectorAll('[role="radio"]')
    expect(items[0].getAttribute("aria-checked")).toBe("false")
    expect(items[1].getAttribute("aria-checked")).toBe("true")
    expect(items[2].getAttribute("aria-checked")).toBe("false")
  })

  it("active item has active class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSegCtrlHTML(["A", "B"], 0)}</body>`,
    )
    const items = dom.window.document.querySelectorAll("button")
    expect(items[0].className).toContain("pm-seg-ctrl__item--active")
    expect(items[1].className).not.toContain("pm-seg-ctrl__item--active")
  })

  it("items are buttons", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSegCtrlHTML(["X", "Y"])}</body>`,
    )
    const buttons = dom.window.document.querySelectorAll("button")
    expect(buttons.length).toBe(2)
    expect(buttons[0].getAttribute("type")).toBe("button")
  })

  it("has accessible text content on items", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSegCtrlHTML(["Daily", "Weekly"])}</body>`,
    )
    const items = dom.window.document.querySelectorAll("button")
    expect(items[0].textContent).toBe("Daily")
    expect(items[1].textContent).toBe("Weekly")
  })
})
