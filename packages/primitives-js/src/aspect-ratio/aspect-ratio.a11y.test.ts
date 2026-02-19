import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { aspectClasses } from "./aspect-ratio.classes.js"

describe("aspect-ratio accessibility", () => {
  it("renders as a generic wrapper element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${aspectClasses()}"><img src="photo.jpg" alt="Photo" /></div></body>`,
    )
    const el = dom.window.document.querySelector(".pm-aspect")
    expect(el).not.toBeNull()
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${aspectClasses()}">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-aspect")).toBe(true)
  })

  it("preserves child content and accessibility attributes", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${aspectClasses()}"><img src="photo.jpg" alt="A landscape photo" /></div></body>`,
    )
    const img = dom.window.document.querySelector("img")
    expect(img).not.toBeNull()
    expect(img?.getAttribute("alt")).toBe("A landscape photo")
  })

  it("does not introduce unwanted roles or aria attributes", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${aspectClasses()}">Content</div></body>`,
    )
    const el = dom.window.document.querySelector(".pm-aspect")
    expect(el?.getAttribute("role")).toBeNull()
    expect(el?.getAttribute("aria-hidden")).toBeNull()
  })

  it("preserves modifier classes for different ratios without affecting semantics", () => {
    const classes = aspectClasses({ ratio: "4/3" })
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${classes}"><video>Video content</video></div></body>`,
    )
    const el = dom.window.document.querySelector(".pm-aspect")
    expect(el).not.toBeNull()
    expect(el?.classList.contains("pm-aspect--4-3")).toBe(true)
    expect(el?.querySelector("video")).not.toBeNull()
  })
})
