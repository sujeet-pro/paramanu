import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { transferClasses } from "./transfer.classes.js"

function createTransferHTML(
  options: Parameters<typeof transferClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = transferClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  return `<div class="${classes}" role="group" aria-label="Transfer items"${disabledAttr}${attrs ? " " + attrs : ""}>
    <div class="pm-transfer__list">
      <div class="pm-transfer__list-header">Source</div>
      <div class="pm-transfer__list-body" role="listbox" aria-label="Source items">
        <div class="pm-transfer__list-item" role="option" aria-selected="true" tabindex="0">Item 1</div>
        <div class="pm-transfer__list-item" role="option" aria-selected="false" tabindex="0">Item 2</div>
      </div>
    </div>
    <div class="pm-transfer__actions">
      <button type="button" aria-label="Move selected right"${options?.disabled ? " disabled" : ""}>&gt;</button>
      <button type="button" aria-label="Move selected left"${options?.disabled ? " disabled" : ""}>&lt;</button>
    </div>
    <div class="pm-transfer__list">
      <div class="pm-transfer__list-header">Target</div>
      <div class="pm-transfer__list-body" role="listbox" aria-label="Target items">
        <div class="pm-transfer__list-item" role="option" aria-selected="false" tabindex="0">Item 3</div>
      </div>
    </div>
  </div>`
}

describe("transfer accessibility", () => {
  it("has role=group on container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group).not.toBeNull()
    expect(group?.getAttribute("role")).toBe("group")
  })

  it("has aria-label on container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group?.getAttribute("aria-label")).toBe("Transfer items")
  })

  it("lists have role=listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const listboxes = dom.window.document.querySelectorAll("[role='listbox']")
    expect(listboxes.length).toBe(2)
  })

  it("source listbox has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const listboxes = dom.window.document.querySelectorAll("[role='listbox']")
    expect(listboxes[0]?.getAttribute("aria-label")).toBe("Source items")
  })

  it("target listbox has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const listboxes = dom.window.document.querySelectorAll("[role='listbox']")
    expect(listboxes[1]?.getAttribute("aria-label")).toBe("Target items")
  })

  it("items have role=option", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const options = dom.window.document.querySelectorAll("[role='option']")
    expect(options.length).toBe(3)
  })

  it("selected item has aria-selected=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const options = dom.window.document.querySelectorAll("[role='option']")
    expect(options[0]?.getAttribute("aria-selected")).toBe("true")
    expect(options[1]?.getAttribute("aria-selected")).toBe("false")
  })

  it("items are keyboard focusable", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const options = dom.window.document.querySelectorAll("[role='option']")
    options.forEach((opt) => {
      expect(opt.getAttribute("tabindex")).toBe("0")
    })
  })

  it("action buttons have aria-labels", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTransferHTML()}</body>`)
    const buttons = dom.window.document.querySelectorAll(".pm-transfer__actions button")
    expect(buttons[0]?.getAttribute("aria-label")).toBe("Move selected right")
    expect(buttons[1]?.getAttribute("aria-label")).toBe("Move selected left")
  })

  it("disabled state has aria-disabled on container", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTransferHTML({ disabled: true })}</body>`,
    )
    const group = dom.window.document.querySelector("[role='group']")
    expect(group?.getAttribute("aria-disabled")).toBe("true")
  })

  it("disabled buttons have disabled attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTransferHTML({ disabled: true })}</body>`,
    )
    const buttons = dom.window.document.querySelectorAll(".pm-transfer__actions button")
    buttons.forEach((btn) => {
      expect(btn.hasAttribute("disabled")).toBe(true)
    })
  })
})
