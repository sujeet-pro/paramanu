import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { tagClasses } from "./tag.classes.js"

describe("tag accessibility", () => {
  it("renders as a span by default", () => {
    const classes = tagClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><span class="${classes.root}">Status</span></body>`,
    )
    const tag = dom.window.document.querySelector(".pm-tag")
    expect(tag).not.toBeNull()
    expect(tag?.textContent).toBe("Status")
  })

  it("interactive tag can be a button element", () => {
    const classes = tagClasses({ interactive: true })
    const dom = new JSDOM(
      `<!DOCTYPE html><body><button class="${classes.root}">Click me</button></body>`,
    )
    const tag = dom.window.document.querySelector("button")
    expect(tag).not.toBeNull()
    expect(tag?.tagName).toBe("BUTTON")
  })

  it("disabled tag has aria-disabled", () => {
    const classes = tagClasses({ disabled: true })
    const dom = new JSDOM(
      `<!DOCTYPE html><body><button class="${classes.root}" aria-disabled="true">Disabled</button></body>`,
    )
    const tag = dom.window.document.querySelector("button")
    expect(tag?.getAttribute("aria-disabled")).toBe("true")
  })

  it("removable tag has accessible remove button", () => {
    const classes = tagClasses({ removable: true })
    const dom = new JSDOM(
      `<!DOCTYPE html><body><span class="${classes.root}">Tag <button class="${classes.remove}" aria-label="Remove tag">×</button></span></body>`,
    )
    const removeBtn = dom.window.document.querySelector(`.${classes.remove.split(" ")[0]}`)
    expect(removeBtn).not.toBeNull()
    expect(removeBtn?.getAttribute("aria-label")).toBe("Remove tag")
  })
})
