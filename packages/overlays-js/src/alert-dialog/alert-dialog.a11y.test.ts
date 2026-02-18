import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  alertDialogClasses,
  alertDialogHeaderClasses,
  alertDialogBodyClasses,
  alertDialogFooterClasses,
} from "./alert-dialog.classes.js"

function createAlertDialogHTML(
  options: Parameters<typeof alertDialogClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = alertDialogClasses(options)
  const headerClasses = alertDialogHeaderClasses()
  const bodyClasses = alertDialogBodyClasses()
  const footerClasses = alertDialogFooterClasses()
  return `
    <div class="${classes}" role="alertdialog" aria-modal="true" aria-labelledby="alert-dialog-title"${attrs ? " " + attrs : ""}>
      <div class="pm-alert-dialog__panel">
        <div class="${headerClasses}">
          <h2 id="alert-dialog-title">Confirm Action</h2>
        </div>
        <div class="${bodyClasses}">
          <p>Are you sure you want to proceed?</p>
        </div>
        <div class="${footerClasses}">
          <button>Cancel</button>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  `
}

describe("alert dialog accessibility", () => {
  it("has role='alertdialog'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAlertDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='alertdialog']")
    expect(dialog).not.toBeNull()
  })

  it("has aria-modal='true'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAlertDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='alertdialog']")
    expect(dialog?.getAttribute("aria-modal")).toBe("true")
  })

  it("has aria-labelledby referencing the title", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAlertDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='alertdialog']")
    const labelledBy = dialog?.getAttribute("aria-labelledby")
    expect(labelledBy).toBe("alert-dialog-title")

    const title = dom.window.document.getElementById("alert-dialog-title")
    expect(title).not.toBeNull()
    expect(title?.textContent).toBe("Confirm Action")
  })

  it("contains action buttons in the footer", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAlertDialogHTML()}</body>`)
    const footer = dom.window.document.querySelector(".pm-alert-dialog__footer")
    const buttons = footer?.querySelectorAll("button")
    expect(buttons?.length).toBeGreaterThanOrEqual(2)
  })

  it("supports aria-describedby for additional context", () => {
    const html = createAlertDialogHTML({}, 'aria-describedby="alert-dialog-desc"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const dialog = dom.window.document.querySelector("[role='alertdialog']")
    expect(dialog?.getAttribute("aria-describedby")).toBe("alert-dialog-desc")
  })

  it("alert dialog panel is within the container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAlertDialogHTML()}</body>`)
    const dialog = dom.window.document.querySelector("[role='alertdialog']")
    const panel = dialog?.querySelector(".pm-alert-dialog__panel")
    expect(panel).not.toBeNull()
  })

  it("uses correct role for different variants", () => {
    const variants = ["info", "danger", "warning"] as const
    for (const variant of variants) {
      const html = createAlertDialogHTML({ variant })
      const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
      const dialog = dom.window.document.querySelector("[role='alertdialog']")
      expect(dialog).not.toBeNull()
      expect(dialog?.classList.contains(`pm-alert-dialog--${variant}`)).toBe(true)
    }
  })
})
