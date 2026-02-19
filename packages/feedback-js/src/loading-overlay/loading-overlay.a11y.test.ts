import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { loadingClasses } from "./loading-overlay.classes.js"
import type { LoadingClassesOptions } from "./loading-overlay.types.js"

function createLoadingHTML(options: LoadingClassesOptions = {}): string {
  const classes = loadingClasses(options)
  const isVisible = options?.visible ?? false
  return `<div class="${classes.root}" aria-hidden="${!isVisible}"><div class="${classes.backdrop}"></div><div class="${classes.content}"></div></div>`
}

describe("loading overlay accessibility", () => {
  it("hidden overlay has aria-hidden=true", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLoadingHTML({ visible: false })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-loading")
    expect(el?.getAttribute("aria-hidden")).toBe("true")
  })

  it("visible overlay has aria-hidden=false", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLoadingHTML({ visible: true })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-loading")
    expect(el?.getAttribute("aria-hidden")).toBe("false")
  })
})
