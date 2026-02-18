import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  sheetClasses,
  sheetHeaderClasses,
  sheetBodyClasses,
  sheetHandleClasses,
} from "./sheet.classes.js"

function createSheetHTML(
  options: Parameters<typeof sheetClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = sheetClasses(options)
  const handleClasses = sheetHandleClasses()
  const headerClasses = sheetHeaderClasses()
  const bodyClasses = sheetBodyClasses()
  return `<div class="${classes}" role="dialog" aria-modal="true" aria-labelledby="sheet-title"${attrs ? " " + attrs : ""}>
    <div class="${handleClasses}"></div>
    <div class="${headerClasses}">
      <h2 id="sheet-title">Sheet Title</h2>
      <button aria-label="Close">\u00d7</button>
    </div>
    <div class="${bodyClasses}">
      <p>Sheet content</p>
    </div>
  </div>`
}

describe("sheet accessibility", () => {
  it("has role=dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSheetHTML()}</body>`)
    const sheet = dom.window.document.querySelector("[role='dialog']")
    expect(sheet).not.toBeNull()
    expect(sheet?.getAttribute("role")).toBe("dialog")
  })

  it("has aria-modal=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSheetHTML()}</body>`)
    const sheet = dom.window.document.querySelector("[role='dialog']")
    expect(sheet?.getAttribute("aria-modal")).toBe("true")
  })

  it("has aria-labelledby pointing to title element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSheetHTML()}</body>`)
    const sheet = dom.window.document.querySelector("[role='dialog']")
    const labelId = sheet?.getAttribute("aria-labelledby")
    expect(labelId).toBe("sheet-title")

    const title = dom.window.document.getElementById(labelId!)
    expect(title).not.toBeNull()
    expect(title?.textContent).toBe("Sheet Title")
  })

  it("supports aria-label as alternative to aria-labelledby", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSheetHTML({}, 'aria-label="Actions menu"')}</body>`,
    )
    const sheet = dom.window.document.querySelector("[role='dialog']")
    expect(sheet?.getAttribute("aria-label")).toBe("Actions menu")
  })

  it("renders with correct size class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSheetHTML({ size: "lg" })}</body>`,
    )
    const sheet = dom.window.document.querySelector(".pm-sheet")
    expect(sheet?.classList.contains("pm-sheet--lg")).toBe(true)
  })

  it("contains a close button with aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSheetHTML()}</body>`)
    const closeBtn = dom.window.document.querySelector("button[aria-label='Close']")
    expect(closeBtn).not.toBeNull()
    expect(closeBtn?.getAttribute("aria-label")).toBe("Close")
  })

  it("has a drag handle element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSheetHTML()}</body>`)
    const handle = dom.window.document.querySelector(".pm-sheet__handle")
    expect(handle).not.toBeNull()
  })

  it("header contains a heading element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSheetHTML()}</body>`)
    const heading = dom.window.document.querySelector(".pm-sheet__header h2")
    expect(heading).not.toBeNull()
    expect(heading?.textContent).toBe("Sheet Title")
  })

  it("body content is accessible", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSheetHTML()}</body>`)
    const body = dom.window.document.querySelector(".pm-sheet__body")
    expect(body).not.toBeNull()
    expect(body?.textContent).toContain("Sheet content")
  })
})
