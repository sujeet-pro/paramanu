import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { progressClasses } from "./progress-bar.classes.js"
import type { ProgressClassesOptions } from "./progress-bar.types.js"

function createProgressHTML(
  value: number | null = 50,
  options: ProgressClassesOptions = {},
): string {
  const classes = progressClasses(options)
  const valueAttrs =
    value !== null
      ? ` aria-valuenow="${value}"`
      : ""

  return `<div class="${classes.root}" role="progressbar"${valueAttrs} aria-valuemin="0" aria-valuemax="100"><div class="${classes.track}"><div class="${classes.fill}"></div></div></div>`
}

describe("progress bar accessibility", () => {
  it("has role=progressbar", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createProgressHTML()}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-progress")
    expect(el?.getAttribute("role")).toBe("progressbar")
  })

  it("has aria-valuenow attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createProgressHTML(50)}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-progress")
    expect(el?.getAttribute("aria-valuenow")).toBe("50")
  })

  it("has aria-valuemin and aria-valuemax", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createProgressHTML(50)}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-progress")
    expect(el?.getAttribute("aria-valuemin")).toBe("0")
    expect(el?.getAttribute("aria-valuemax")).toBe("100")
  })

  it("indeterminate mode can omit aria-valuenow", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createProgressHTML(null, { indeterminate: true })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-progress")
    expect(el?.getAttribute("role")).toBe("progressbar")
    expect(el?.hasAttribute("aria-valuenow")).toBe(false)
  })
})
