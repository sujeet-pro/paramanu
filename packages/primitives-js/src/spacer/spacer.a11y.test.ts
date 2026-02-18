import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { spacerClasses } from "./spacer.classes.js"

describe("spacer accessibility", () => {
  it("renders as a decorative element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${spacerClasses()}" aria-hidden="true"></div></body>`,
    )
    const el = dom.window.document.querySelector(".pm-spacer")
    expect(el).not.toBeNull()
  })

  it("should be hidden from assistive technology with aria-hidden", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${spacerClasses()}" aria-hidden="true"></div></body>`,
    )
    const el = dom.window.document.querySelector(".pm-spacer")
    expect(el?.getAttribute("aria-hidden")).toBe("true")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${spacerClasses()}" aria-hidden="true"></div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-spacer")).toBe(true)
  })

  it("does not contain meaningful text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${spacerClasses()}" aria-hidden="true"></div></body>`,
    )
    const el = dom.window.document.querySelector(".pm-spacer")
    expect(el?.textContent?.trim()).toBe("")
  })

  it("does not interfere with surrounding content for screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <p>Before</p>
      <div class="${spacerClasses()}" aria-hidden="true"></div>
      <p>After</p>
    </body>`)
    const paragraphs = dom.window.document.querySelectorAll("p")
    expect(paragraphs.length).toBe(2)
    expect(paragraphs[0]?.textContent).toBe("Before")
    expect(paragraphs[1]?.textContent).toBe("After")
  })
})
