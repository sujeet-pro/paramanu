import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { nprogressClasses } from "./nprogress.classes.js"
import type { NProgressClassesOptions } from "./nprogress.types.js"

function createNProgressHTML(
  value: number = 50,
  options: NProgressClassesOptions = {},
): string {
  const classes = nprogressClasses(options)
  return `<div class="${classes.root}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><div class="${classes.bar}"><div class="${classes.peg}"></div></div></div>`
}

describe("nprogress accessibility", () => {
  it("has role=progressbar", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNProgressHTML()}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-nprogress")
    expect(el?.getAttribute("role")).toBe("progressbar")
  })

  it("has aria-valuenow, aria-valuemin, and aria-valuemax", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNProgressHTML(50)}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-nprogress")
    expect(el?.getAttribute("aria-valuenow")).toBe("50")
    expect(el?.getAttribute("aria-valuemin")).toBe("0")
    expect(el?.getAttribute("aria-valuemax")).toBe("100")
  })
})
