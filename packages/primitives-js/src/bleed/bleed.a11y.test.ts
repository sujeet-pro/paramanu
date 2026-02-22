import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { bleedClasses } from "./bleed.classes.js"

describe("bleed accessibility", () => {
  it("renders as a generic layout wrapper element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${bleedClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${bleedClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-bleed")).toBe(true)
  })

  it("preserves child content and accessibility attributes", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${bleedClasses()}">
        <img src="banner.jpg" alt="Full width banner" />
      </div>
    </body>`)
    const img = dom.window.document.querySelector("img")
    expect(img).not.toBeNull()
    expect(img?.getAttribute("alt")).toBe("Full width banner")
  })

  it("does not introduce unwanted roles or aria attributes", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${bleedClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector(".pm-bleed")
    expect(el?.getAttribute("role")).toBeNull()
    expect(el?.getAttribute("aria-hidden")).toBeNull()
  })

  it("preserves modifier classes without affecting semantics", () => {
    const classes = bleedClasses({ inline: "4" })
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${classes}">Test</div></body>`)
    const el = dom.window.document.querySelector(".pm-bleed")
    expect(el).not.toBeNull()
  })
})
