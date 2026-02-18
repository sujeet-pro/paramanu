import { describe, it, expect, beforeEach } from "vitest"
import { JSDOM } from "jsdom"
import { createPortal } from "./portal.js"

function setupDOM(html = "") {
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`, {
    url: "http://localhost",
  })
  const { document } = dom.window
  Object.defineProperty(globalThis, "document", { value: document, writable: true })
  Object.defineProperty(globalThis, "HTMLElement", {
    value: dom.window.HTMLElement,
    writable: true,
  })
  return { dom, document }
}

describe("createPortal", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "document", {
      value: undefined,
      writable: true,
    })
  })

  it("creates a container with data-pm-portal attribute", () => {
    const { document } = setupDOM()
    const portal = createPortal()

    expect(portal.container).toBeDefined()
    expect(portal.container.getAttribute("data-pm-portal")).toBe("")
    expect(document.body.contains(portal.container)).toBe(true)
    portal.destroy()
  })

  it("appends container to body by default", () => {
    const { document } = setupDOM()
    const portal = createPortal()

    expect(document.body.lastElementChild).toBe(portal.container)
    portal.destroy()
  })

  it("appends container to custom selector target", () => {
    const { document } = setupDOM('<div id="custom"></div>')
    const portal = createPortal({ target: "#custom" })
    const custom = document.getElementById("custom")!

    expect(custom.contains(portal.container)).toBe(true)
    portal.destroy()
  })

  it("appends container to HTMLElement target", () => {
    const { document } = setupDOM('<div id="custom"></div>')
    const custom = document.getElementById("custom")!
    const portal = createPortal({ target: custom })

    expect(custom.contains(portal.container)).toBe(true)
    portal.destroy()
  })

  it("throws when target selector not found", () => {
    setupDOM()
    expect(() => createPortal({ target: "#nonexistent" })).toThrow(
      '[paramanu] Portal target "#nonexistent" not found',
    )
  })

  it("mount adds content to container", () => {
    const { document } = setupDOM()
    const portal = createPortal()
    const content = document.createElement("p")
    content.textContent = "Hello"

    portal.mount(content)

    expect(portal.container.contains(content)).toBe(true)
    expect(portal.container.querySelector("p")?.textContent).toBe("Hello")
    portal.destroy()
  })

  it("unmount removes children from container", () => {
    const { document } = setupDOM()
    const portal = createPortal()
    const content = document.createElement("p")
    portal.mount(content)

    portal.unmount()

    expect(portal.container.children.length).toBe(0)
    portal.destroy()
  })

  it("destroy removes container from DOM", () => {
    const { document } = setupDOM()
    const portal = createPortal()

    portal.destroy()

    expect(document.body.contains(portal.container)).toBe(false)
  })
})
