import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { collapsibleTriggerClasses, collapsibleContentClasses } from "./collapsible.classes.js"

function createCollapsibleHTML(options: { open?: boolean; disabled?: boolean } = {}): string {
  const { open = false, disabled = false } = options
  const triggerClasses = collapsibleTriggerClasses({ open, disabled })
  const contentClasses = collapsibleContentClasses({ open })
  const disabledAttr = disabled ? ' aria-disabled="true" disabled' : ""

  return `
    <div class="pm-collapsible">
      <button
        class="${triggerClasses}"
        aria-expanded="${open}"
        aria-controls="content-1"
        id="trigger-1"
        ${disabledAttr}
      >
        Toggle content
      </button>
      <div
        class="${contentClasses}"
        role="region"
        id="content-1"
        aria-labelledby="trigger-1"
      >
        <div class="pm-collapsible__content-inner">
          <p>Collapsible content here</p>
        </div>
      </div>
    </div>
  `
}

describe("collapsible accessibility", () => {
  it("trigger is a button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCollapsibleHTML()}</body>`)
    const trigger = dom.window.document.querySelector("button")
    expect(trigger).not.toBeNull()
    expect(trigger?.tagName).toBe("BUTTON")
  })

  it("trigger has aria-expanded set to false when closed", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCollapsibleHTML()}</body>`)
    const trigger = dom.window.document.querySelector("button")
    expect(trigger?.getAttribute("aria-expanded")).toBe("false")
  })

  it("trigger has aria-expanded set to true when open", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCollapsibleHTML({ open: true })}</body>`)
    const trigger = dom.window.document.querySelector("button")
    expect(trigger?.getAttribute("aria-expanded")).toBe("true")
  })

  it("trigger has aria-controls pointing to content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCollapsibleHTML()}</body>`)
    const trigger = dom.window.document.querySelector("button")
    const content = dom.window.document.querySelector('[role="region"]')
    expect(trigger?.getAttribute("aria-controls")).toBe(content?.id)
  })

  it("content has role=region", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCollapsibleHTML()}</body>`)
    const content = dom.window.document.querySelector('[role="region"]')
    expect(content).not.toBeNull()
  })

  it("content has aria-labelledby pointing to trigger", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCollapsibleHTML()}</body>`)
    const trigger = dom.window.document.querySelector("button")
    const content = dom.window.document.querySelector('[role="region"]')
    expect(content?.getAttribute("aria-labelledby")).toBe(trigger?.id)
  })

  it("disabled trigger has aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCollapsibleHTML({ disabled: true })}</body>`,
    )
    const trigger = dom.window.document.querySelector("button")
    expect(trigger?.getAttribute("aria-disabled")).toBe("true")
  })

  it("trigger has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCollapsibleHTML()}</body>`)
    const trigger = dom.window.document.querySelector("button")
    expect(trigger?.textContent?.trim()).toBe("Toggle content")
  })
})
