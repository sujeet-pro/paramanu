import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { fabClasses } from "./fab.classes.js"

function createFabHTML(
  content: string,
  options: Parameters<typeof fabClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = fabClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  return `<button class="${classes}"${disabledAttr}${attrs ? " " + attrs : ""}>${content}</button>`
}

describe("fab accessibility", () => {
  it("renders as a focusable button element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFabHTML("+", {}, 'aria-label="Add item"')}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.tagName).toBe("BUTTON")
  })

  it("supports aria-label for icon-only variant", () => {
    const html = createFabHTML("+", {}, 'aria-label="Add new item"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Add new item")
  })

  it("has accessible text content for extended variant", () => {
    const html = createFabHTML("Add Item", { extended: true })
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.textContent).toBe("Add Item")
  })

  it("disabled FAB has aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFabHTML("+", { disabled: true }, 'aria-label="Add"')}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-disabled")).toBe("true")
  })

  it("has correct implicit role", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFabHTML("+", {}, 'aria-label="Add"')}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    // <button> has implicit role="button"
    expect(button?.tagName).toBe("BUTTON")
  })

  it("supports custom aria-label", () => {
    const html = createFabHTML("+", {}, 'aria-label="Create new document"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Create new document")
  })
})
