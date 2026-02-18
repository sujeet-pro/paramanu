import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { accordionTriggerClasses, accordionContentClasses } from "./accordion.classes.js"

function createAccordionHTML(
  items: Array<{ label: string; content: string; open?: boolean; disabled?: boolean }>,
): string {
  const itemsHTML = items
    .map((item, i) => {
      const triggerClasses = accordionTriggerClasses({ open: item.open, disabled: item.disabled })
      const contentClasses = accordionContentClasses({ open: item.open })
      const disabledAttr = item.disabled ? ' aria-disabled="true" disabled' : ""

      return `
      <div class="pm-accordion__item">
        <h3>
          <button
            class="${triggerClasses}"
            aria-expanded="${item.open || false}"
            aria-controls="content-${i}"
            id="trigger-${i}"
            ${disabledAttr}
          >
            ${item.label}
          </button>
        </h3>
        <div
          class="${contentClasses}"
          role="region"
          id="content-${i}"
          aria-labelledby="trigger-${i}"
        >
          <div class="pm-accordion__content-inner">
            <p>${item.content}</p>
          </div>
        </div>
      </div>
    `
    })
    .join("")

  return `<div class="pm-accordion">${itemsHTML}</div>`
}

describe("accordion accessibility", () => {
  const defaultItems = [
    { label: "Section 1", content: "Content 1" },
    { label: "Section 2", content: "Content 2", open: true },
    { label: "Section 3", content: "Content 3", disabled: true },
  ]

  it("triggers are button elements", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const buttons = dom.window.document.querySelectorAll("button")
    expect(buttons.length).toBe(3)
    buttons.forEach((btn) => expect(btn.tagName).toBe("BUTTON"))
  })

  it("triggers are wrapped in heading elements", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const headings = dom.window.document.querySelectorAll("h3")
    expect(headings.length).toBe(3)
    headings.forEach((h3) => {
      expect(h3.querySelector("button")).not.toBeNull()
    })
  })

  it("closed trigger has aria-expanded=false", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const firstTrigger = dom.window.document.querySelector("#trigger-0")
    expect(firstTrigger?.getAttribute("aria-expanded")).toBe("false")
  })

  it("open trigger has aria-expanded=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const openTrigger = dom.window.document.querySelector("#trigger-1")
    expect(openTrigger?.getAttribute("aria-expanded")).toBe("true")
  })

  it("trigger has aria-controls pointing to content panel", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const trigger = dom.window.document.querySelector("#trigger-0")
    const content = dom.window.document.querySelector("#content-0")
    expect(trigger?.getAttribute("aria-controls")).toBe(content?.id)
  })

  it("content panels have role=region", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const regions = dom.window.document.querySelectorAll('[role="region"]')
    expect(regions.length).toBe(3)
  })

  it("content panels have aria-labelledby pointing to trigger", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const content = dom.window.document.querySelector("#content-1")
    expect(content?.getAttribute("aria-labelledby")).toBe("trigger-1")
  })

  it("disabled trigger has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const disabledTrigger = dom.window.document.querySelector("#trigger-2")
    expect(disabledTrigger?.getAttribute("aria-disabled")).toBe("true")
  })

  it("each trigger has unique id", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const triggers = dom.window.document.querySelectorAll("button")
    const ids = Array.from(triggers).map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("each content panel has unique id", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAccordionHTML(defaultItems)}</body>`)
    const regions = dom.window.document.querySelectorAll('[role="region"]')
    const ids = Array.from(regions).map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
