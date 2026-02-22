import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { codeClasses } from "./code.classes.js"

describe("code accessibility", () => {
  it("inline code renders as a code element", () => {
    const classes = codeClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body><code class="${classes}">const x = 1</code></body>`)
    const el = dom.window.document.querySelector("code")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("CODE")
  })

  it("block code renders within a pre element", () => {
    const classes = codeClasses({ block: true })
    const dom = new JSDOM(
      `<!DOCTYPE html><body><pre class="${classes}"><code>const x = 1</code></pre></body>`,
    )
    const pre = dom.window.document.querySelector("pre")
    const code = dom.window.document.querySelector("code")
    expect(pre).not.toBeNull()
    expect(code).not.toBeNull()
  })

  it("has readable text content", () => {
    const classes = codeClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body><code class="${classes}">npm install</code></body>`)
    const el = dom.window.document.querySelector("code")
    expect(el?.textContent).toBe("npm install")
  })

  it("uses monospace font family class", () => {
    const classes = codeClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body><code class="${classes}">code</code></body>`)
    const el = dom.window.document.querySelector("code")
    expect(el?.classList.contains("pm-code")).toBe(true)
  })
})
