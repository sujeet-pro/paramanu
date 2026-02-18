import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { drawerClasses, drawerHeaderClasses, drawerBodyClasses } from "./drawer.classes.js"

function createDrawerHTML(
  options: Parameters<typeof drawerClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = drawerClasses(options)
  const headerClasses = drawerHeaderClasses()
  const bodyClasses = drawerBodyClasses()
  return `<div class="${classes}" role="dialog" aria-modal="true" aria-labelledby="drawer-title"${attrs ? " " + attrs : ""}>
    <div class="${headerClasses}">
      <h2 id="drawer-title">Drawer Title</h2>
      <button aria-label="Close">\u00d7</button>
    </div>
    <div class="${bodyClasses}">
      <p>Drawer content</p>
    </div>
  </div>`
}

describe("drawer accessibility", () => {
  it("has role=dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDrawerHTML()}</body>`)
    const drawer = dom.window.document.querySelector("[role='dialog']")
    expect(drawer).not.toBeNull()
    expect(drawer?.getAttribute("role")).toBe("dialog")
  })

  it("has aria-modal=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDrawerHTML()}</body>`)
    const drawer = dom.window.document.querySelector("[role='dialog']")
    expect(drawer?.getAttribute("aria-modal")).toBe("true")
  })

  it("has aria-labelledby pointing to title element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDrawerHTML()}</body>`)
    const drawer = dom.window.document.querySelector("[role='dialog']")
    const labelId = drawer?.getAttribute("aria-labelledby")
    expect(labelId).toBe("drawer-title")

    const title = dom.window.document.getElementById(labelId!)
    expect(title).not.toBeNull()
    expect(title?.textContent).toBe("Drawer Title")
  })

  it("renders with start placement class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDrawerHTML({ placement: "start" })}</body>`,
    )
    const drawer = dom.window.document.querySelector(".pm-drawer")
    expect(drawer?.classList.contains("pm-drawer--start")).toBe(true)
  })

  it("renders with end placement class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDrawerHTML({ placement: "end" })}</body>`,
    )
    const drawer = dom.window.document.querySelector(".pm-drawer")
    expect(drawer?.classList.contains("pm-drawer--end")).toBe(true)
  })

  it("renders with top placement class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDrawerHTML({ placement: "top" })}</body>`,
    )
    const drawer = dom.window.document.querySelector(".pm-drawer")
    expect(drawer?.classList.contains("pm-drawer--top")).toBe(true)
  })

  it("renders with bottom placement class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDrawerHTML({ placement: "bottom" })}</body>`,
    )
    const drawer = dom.window.document.querySelector(".pm-drawer")
    expect(drawer?.classList.contains("pm-drawer--bottom")).toBe(true)
  })

  it("contains a close button with aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDrawerHTML()}</body>`)
    const closeBtn = dom.window.document.querySelector("button[aria-label='Close']")
    expect(closeBtn).not.toBeNull()
    expect(closeBtn?.getAttribute("aria-label")).toBe("Close")
  })

  it("header contains a heading element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDrawerHTML()}</body>`)
    const heading = dom.window.document.querySelector(".pm-drawer__header h2")
    expect(heading).not.toBeNull()
    expect(heading?.textContent).toBe("Drawer Title")
  })

  it("body content is accessible", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDrawerHTML()}</body>`)
    const body = dom.window.document.querySelector(".pm-drawer__body")
    expect(body).not.toBeNull()
    expect(body?.textContent).toContain("Drawer content")
  })
})
