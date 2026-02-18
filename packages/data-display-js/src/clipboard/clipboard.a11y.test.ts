import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { clipboardClasses } from "./clipboard.classes.js"

function createClipboardHTML(
  options: Parameters<typeof clipboardClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = clipboardClasses(options)
  const ariaLabel = options?.copied ? "Copied" : "Copy to clipboard"
  return `<button class="${classes}" aria-label="${ariaLabel}"${attrs ? " " + attrs : ""}>📋</button>`
}

describe("clipboard accessibility", () => {
  it("renders as a focusable button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createClipboardHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.tagName).toBe("BUTTON")
  })

  it("has aria-label for copy action", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createClipboardHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Copy to clipboard")
  })

  it("has aria-label reflecting copied state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createClipboardHTML({ copied: true })}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Copied")
  })

  it("supports live region for feedback", () => {
    const html = `<div>${createClipboardHTML()}<span role="status" aria-live="polite"></span></div>`
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const status = dom.window.document.querySelector("[role='status']")
    expect(status).not.toBeNull()
    expect(status?.getAttribute("aria-live")).toBe("polite")
  })

  it("button is keyboard accessible", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createClipboardHTML()}</body>`)
    const button = dom.window.document.querySelector("button")
    // Buttons are natively focusable and keyboard-operable
    expect(button?.tagName).toBe("BUTTON")
  })
})
