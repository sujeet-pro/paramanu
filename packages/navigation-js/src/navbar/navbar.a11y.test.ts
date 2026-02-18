import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  navbarClasses,
  navbarInnerClasses,
  navbarSectionClasses,
  navbarBrandClasses,
  navbarToggleClasses,
} from "./navbar.classes.js"

function createNavbarHTML(options?: {
  variant?: "default" | "floating" | "bordered"
  position?: "static" | "sticky" | "fixed"
  ariaLabel?: string
}): string {
  const rootClasses = navbarClasses({
    variant: options?.variant,
    position: options?.position,
  })
  const innerClasses = navbarInnerClasses()
  const startClasses = navbarSectionClasses({ align: "start" })
  const endClasses = navbarSectionClasses({ align: "end" })
  const brandClasses = navbarBrandClasses()
  const toggleClasses = navbarToggleClasses()

  return `<nav aria-label="${options?.ariaLabel ?? "Main"}" class="${rootClasses}">
    <div class="${innerClasses}">
      <div class="${startClasses}">
        <div class="${brandClasses}">Brand</div>
      </div>
      <div class="${endClasses}">
        <button class="${toggleClasses}" aria-label="Toggle navigation" aria-expanded="false">
          <span>Menu</span>
        </button>
      </div>
    </div>
  </nav>`
}

describe("navbar accessibility", () => {
  it("uses nav element with aria-label", () => {
    const html = createNavbarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const nav = dom.window.document.querySelector("nav")
    expect(nav).not.toBeNull()
    expect(nav?.getAttribute("aria-label")).toBe("Main")
  })

  it("supports custom aria-label", () => {
    const html = createNavbarHTML({ ariaLabel: "Site navigation" })
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const nav = dom.window.document.querySelector("nav")
    expect(nav?.getAttribute("aria-label")).toBe("Site navigation")
  })

  it("toggle button has aria-label", () => {
    const html = createNavbarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const toggle = dom.window.document.querySelector("button")
    expect(toggle).not.toBeNull()
    expect(toggle?.getAttribute("aria-label")).toBe("Toggle navigation")
  })

  it("toggle button has aria-expanded", () => {
    const html = createNavbarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const toggle = dom.window.document.querySelector("button")
    expect(toggle?.getAttribute("aria-expanded")).toBe("false")
  })

  it("uses semantic nav landmark", () => {
    const html = createNavbarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const nav = dom.window.document.querySelector("nav")
    expect(nav?.tagName).toBe("NAV")
  })
})
