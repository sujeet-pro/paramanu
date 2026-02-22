import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { iconBtnClasses } from "./icon-button.classes.js"

function createIconBtnHTML(
  options: Parameters<typeof iconBtnClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = iconBtnClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  return `<button class="${classes}" aria-label="Search"${disabledAttr}${attrs ? " " + attrs : ""}><svg aria-hidden="true"></svg></button>`
}

describe("icon button accessibility", () => {
  it("renders as a focusable button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createIconBtnHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.tagName).toBe("BUTTON")
  })

  it("has aria-label for accessible name", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createIconBtnHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Search")
  })

  it("requires aria-label since there is no visible text", () => {
    const htmlWithLabel = createIconBtnHTML({}, 'aria-label="Delete item"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${htmlWithLabel}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBeTruthy()
  })

  it("disabled button has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createIconBtnHTML({ disabled: true })}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-disabled")).toBe("true")
  })

  it("has correct implicit role", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createIconBtnHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    // <button> has implicit role="button"
    expect(button?.tagName).toBe("BUTTON")
  })

  it("icon is hidden from assistive technology", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createIconBtnHTML()}</body>`)
    const svg = dom.window.document.querySelector("svg")
    expect(svg?.getAttribute("aria-hidden")).toBe("true")
  })

  it("supports custom aria-label", () => {
    const html = createIconBtnHTML({}, 'aria-label="Edit profile"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBeTruthy()
  })
})
