import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { loadingOverlayClasses } from "./loading-overlay.classes.js"
import type { LoadingOverlayClassesOptions } from "./loading-overlay.types.js"

function createLoadingOverlayHTML(options: LoadingOverlayClassesOptions = {}): string {
  const classes = loadingOverlayClasses(options)
  const isVisible = options?.visible ?? false
  return `<div class="${classes.root}" aria-hidden="${!isVisible}"><div class="${classes.backdrop}"></div><div class="${classes.content}"></div></div>`
}

describe("loading overlay accessibility", () => {
  it("hidden overlay has aria-hidden=true", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLoadingOverlayHTML({ visible: false })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-loading-overlay")
    expect(el?.getAttribute("aria-hidden")).toBe("true")
  })

  it("visible overlay has aria-hidden=false", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLoadingOverlayHTML({ visible: true })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-loading-overlay")
    expect(el?.getAttribute("aria-hidden")).toBe("false")
  })
})
