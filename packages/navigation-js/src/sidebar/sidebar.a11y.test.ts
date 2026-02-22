import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  sidebarClasses,
  sidebarSectionClasses,
  sidebarSectionLabelClasses,
  sidebarItemClasses,
} from "./sidebar.classes.js"

function createSidebarHTML(options?: { position?: "left" | "right"; ariaLabel?: string }): string {
  const rootClasses = sidebarClasses({ position: options?.position })
  const sectionClasses = sidebarSectionClasses()
  const labelClasses = sidebarSectionLabelClasses()
  const itemClasses = sidebarItemClasses()
  const activeClasses = sidebarItemClasses({ active: true })
  const disabledClasses = sidebarItemClasses({ disabled: true })

  return `<nav aria-label="${options?.ariaLabel ?? "Sidebar"}" class="${rootClasses}">
    <div class="${sectionClasses}">
      <div class="${labelClasses}" id="section-label">Section</div>
      <a href="/home" class="${activeClasses}" aria-current="page">Home</a>
      <a href="/about" class="${itemClasses}">About</a>
      <a href="/disabled" class="${disabledClasses}" aria-disabled="true" tabindex="-1">Disabled</a>
    </div>
  </nav>`
}

describe("sidebar accessibility", () => {
  it("uses nav element with aria-label", () => {
    const html = createSidebarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const nav = dom.window.document.querySelector("nav")
    expect(nav).not.toBeNull()
    expect(nav?.getAttribute("aria-label")).toBe("Sidebar")
  })

  it("supports custom aria-label", () => {
    const html = createSidebarHTML({ ariaLabel: "Site sidebar" })
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const nav = dom.window.document.querySelector("nav")
    expect(nav?.getAttribute("aria-label")).toBe("Site sidebar")
  })

  it("active item has aria-current", () => {
    const html = createSidebarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const active = dom.window.document.querySelector("[aria-current='page']")
    expect(active).not.toBeNull()
    expect(active?.textContent).toBe("Home")
  })

  it("disabled item has aria-disabled and tabindex -1", () => {
    const html = createSidebarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const disabled = dom.window.document.querySelector("[aria-disabled='true']")
    expect(disabled).not.toBeNull()
    expect(disabled?.getAttribute("tabindex")).toBe("-1")
  })

  it("uses semantic nav landmark", () => {
    const html = createSidebarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const nav = dom.window.document.querySelector("nav")
    expect(nav?.tagName).toBe("NAV")
  })

  it("uses links for navigation items", () => {
    const html = createSidebarHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const links = dom.window.document.querySelectorAll("a")
    expect(links.length).toBe(3)
  })
})
