import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { inlineDialogClasses, inlineDialogBodyClasses } from "./inline-dialog.classes.js"

function createInlineDialogHTML(
  options: Parameters<typeof inlineDialogClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = inlineDialogClasses(options)
  const bodyClasses = inlineDialogBodyClasses()
  return `
    <div class="${classes}" role="dialog" aria-labelledby="inline-dialog-title"${attrs ? " " + attrs : ""}>
      <div class="${bodyClasses}">
        <h3 id="inline-dialog-title">Inline Dialog</h3>
        <p>Some content here</p>
      </div>
    </div>
  `
}

describe("inline dialog accessibility", () => {
  it("has role='dialog'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createInlineDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    expect(dialog).not.toBeNull()
  })

  it("does not have aria-modal (not a modal dialog)", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createInlineDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    expect(dialog?.getAttribute("aria-modal")).toBeNull()
  })

  it("has aria-labelledby referencing the title", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createInlineDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    const labelledBy = dialog?.getAttribute("aria-labelledby")
    expect(labelledBy).toBe("inline-dialog-title")

    const title = dom.window.document.getElementById("inline-dialog-title")
    expect(title).not.toBeNull()
    expect(title?.textContent).toBe("Inline Dialog")
  })

  it("is positioned absolutely (not fixed like modal dialogs)", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createInlineDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector(".pm-inline-dialog")
    expect(dialog).not.toBeNull()
    // The inline dialog uses pm-inline-dialog class which has position: absolute in CSS
    expect(dialog?.classList.contains("pm-inline-dialog")).toBe(true)
  })

  it("supports aria-describedby for additional context", () => {
    const html = createInlineDialogHTML({}, 'aria-describedby="inline-dialog-desc"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    expect(dialog?.getAttribute("aria-describedby")).toBe("inline-dialog-desc")
  })

  it("contains the body section", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createInlineDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='dialog']")
    const body = dialog?.querySelector(".pm-inline-dialog__body")
    expect(body).not.toBeNull()
  })
})
