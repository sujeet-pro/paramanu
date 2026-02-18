import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { backdropClasses } from "./backdrop.classes.js"

function createBackdropHTML(options: Parameters<typeof backdropClasses>[0] = {}): string {
  const classes = backdropClasses(options)
  return `<div class="${classes}" aria-hidden="true"></div>`
}

describe("backdrop accessibility", () => {
  it("renders with aria-hidden='true'", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBackdropHTML()}</body>`)
    const backdrop = dom.window.document.querySelector(".pm-backdrop")
    expect(backdrop).not.toBeNull()
    expect(backdrop?.getAttribute("aria-hidden")).toBe("true")
  })

  it("is not focusable", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBackdropHTML()}</body>`)
    const backdrop = dom.window.document.querySelector(".pm-backdrop")
    expect(backdrop?.getAttribute("tabindex")).toBeNull()
  })

  it("does not have any interactive role", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBackdropHTML()}</body>`)
    const backdrop = dom.window.document.querySelector(".pm-backdrop")
    expect(backdrop?.getAttribute("role")).toBeNull()
  })

  it("is a decorative element hidden from assistive technology", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createBackdropHTML()}</body>`)
    const backdrop = dom.window.document.querySelector("[aria-hidden='true']")
    expect(backdrop).not.toBeNull()
    expect(backdrop?.classList.contains("pm-backdrop")).toBe(true)
  })
})
