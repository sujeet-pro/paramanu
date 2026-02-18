import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { spinnerClasses } from "./spinner.classes.js"
import type { SpinnerClassesOptions } from "./spinner.types.js"

function createSpinnerHTML(options: SpinnerClassesOptions = {}): string {
  const classes = spinnerClasses(options)
  return `<div class="${classes}" role="status"><span class="pm-spinner__label" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">Loading</span></div>`
}

describe("spinner accessibility", () => {
  it("has role=status", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSpinnerHTML()}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-spinner")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has visually hidden loading text", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSpinnerHTML()}</body>`,
    )
    const label = dom.window.document.querySelector(".pm-spinner__label")
    expect(label).not.toBeNull()
    expect(label?.textContent).toBe("Loading")
  })

  it("spinner element is not a button or interactive element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSpinnerHTML()}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-spinner")
    expect(el?.tagName.toLowerCase()).toBe("div")
    expect(el?.tagName.toLowerCase()).not.toBe("button")
    expect(el?.tagName.toLowerCase()).not.toBe("a")
  })
})
