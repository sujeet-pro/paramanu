import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { dialogClasses, dialogHeaderClasses, dialogBodyClasses } from "./dialog.classes.js"

function createDialogHTML(
  options: Parameters<typeof dialogClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = dialogClasses(options)
  const headerClasses = dialogHeaderClasses()
  const bodyClasses = dialogBodyClasses()
  return `
    <div class="${classes}" role="dialog" aria-modal="true" aria-labelledby="dialog-title"${attrs ? " " + attrs : ""}>
      <div class="pm-dialog__panel">
        <div class="${headerClasses}">
          <h2 id="dialog-title">Dialog Title</h2>
          <button aria-label="Close dialog">X</button>
        </div>
        <div class="${bodyClasses}">
          <p>Dialog content</p>
        </div>
      </div>
    </div>
  `
}

describe("dialog accessibility", () => {
  it("has role='dialog'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    expect(dialog).not.toBeNull()
  })

  it("has aria-modal='true'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    expect(dialog?.getAttribute("aria-modal")).toBe("true")
  })

  it("has aria-labelledby referencing the title", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    const labelledBy = dialog?.getAttribute("aria-labelledby")
    expect(labelledBy).toBe("dialog-title")

    const title = dom.window.document.getElementById("dialog-title")
    expect(title).not.toBeNull()
    expect(title?.textContent).toBe("Dialog Title")
  })

  it("contains a close button with accessible label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDialogHTML()}</body>`)
    const closeBtn = dom.window.document.querySelector("button[aria-label]")
    expect(closeBtn).not.toBeNull()
    expect(closeBtn?.getAttribute("aria-label")).toBe("Close dialog")
  })

  it("dialog panel is within the dialog container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    const panel = dialog?.querySelector(".pm-dialog__panel")
    expect(panel).not.toBeNull()
  })

  it("supports aria-describedby for additional context", () => {
    const html = createDialogHTML({}, 'aria-describedby="dialog-desc"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    expect(dialog?.getAttribute("aria-describedby")).toBe("dialog-desc")
  })
})
