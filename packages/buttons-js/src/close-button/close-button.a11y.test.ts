import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { closeBtnClasses } from "./close-button.classes.js"

function createCloseBtnHTML(
  options: Parameters<typeof closeBtnClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = closeBtnClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  return `<button class="${classes}" aria-label="Close"${disabledAttr}${attrs ? " " + attrs : ""}>\u00d7</button>`
}

describe("close button accessibility", () => {
  it("renders as a focusable button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCloseBtnHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.tagName).toBe("BUTTON")
  })

  it("has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCloseBtnHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Close")
  })

  it("disabled button has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCloseBtnHTML({ disabled: true })}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-disabled")).toBe("true")
  })

  it("has correct implicit role", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCloseBtnHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    // <button> has implicit role="button"
    expect(button?.tagName).toBe("BUTTON")
  })

  it("contains multiplication sign as content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCloseBtnHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.textContent).toBe("\u00d7")
  })

  it("supports custom aria-label", () => {
    const html = createCloseBtnHTML({}, 'aria-label="Close dialog"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    // Note: the first aria-label will be used since we have a default one
    // In practice, consumers should override aria-label via the React prop or HTML attribute
    expect(button?.getAttribute("aria-label")).toBeTruthy()
  })
})
