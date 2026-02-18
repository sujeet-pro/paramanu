import { describe, it, expect, vi, beforeEach } from "vitest"
import { JSDOM } from "jsdom"
import { createFocusTrap, FOCUSABLE_SELECTOR } from "./focus-trap.js"

function setupDOM(html: string) {
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`, {
    url: "http://localhost",
  })
  const { document } = dom.window

  // Patch global document/HTMLElement for the module
  Object.defineProperty(globalThis, "document", { value: document, writable: true })
  Object.defineProperty(globalThis, "HTMLElement", {
    value: dom.window.HTMLElement,
    writable: true,
  })

  return { dom, document }
}

describe("FOCUSABLE_SELECTOR", () => {
  it("is a non-empty string", () => {
    expect(FOCUSABLE_SELECTOR).toBeTruthy()
    expect(typeof FOCUSABLE_SELECTOR).toBe("string")
  })

  it("includes common focusable elements", () => {
    expect(FOCUSABLE_SELECTOR).toContain("a[href]")
    expect(FOCUSABLE_SELECTOR).toContain("button:not([disabled])")
    expect(FOCUSABLE_SELECTOR).toContain("input:not([disabled])")
  })
})

describe("createFocusTrap", () => {
  beforeEach(() => {
    // Clean up global patches
    Object.defineProperty(globalThis, "document", {
      value: undefined,
      writable: true,
    })
  })

  it("returns an instance with activate, deactivate, destroy", () => {
    const { document } = setupDOM(`
      <div id="trap"><button>A</button><button>B</button></div>
    `)
    const el = document.getElementById("trap")!
    const instance = createFocusTrap(el)

    expect(typeof instance.activate).toBe("function")
    expect(typeof instance.deactivate).toBe("function")
    expect(typeof instance.destroy).toBe("function")
  })

  it("focuses first focusable element on activate", () => {
    const { document } = setupDOM(`
      <div id="trap"><button id="a">A</button><button id="b">B</button></div>
    `)
    const el = document.getElementById("trap")!
    const btnA = document.getElementById("a")!
    const focusSpy = vi.spyOn(btnA, "focus")

    const trap = createFocusTrap(el)
    trap.activate()

    expect(focusSpy).toHaveBeenCalled()
    trap.destroy()
  })

  it("focuses initialFocus element on activate", () => {
    const { document } = setupDOM(`
      <div id="trap"><button id="a">A</button><button id="b">B</button></div>
    `)
    const el = document.getElementById("trap")!
    const btnB = document.getElementById("b")!
    const focusSpy = vi.spyOn(btnB, "focus")

    const trap = createFocusTrap(el, { initialFocus: btnB })
    trap.activate()

    expect(focusSpy).toHaveBeenCalled()
    trap.destroy()
  })

  it("focuses initialFocus by selector on activate", () => {
    const { document } = setupDOM(`
      <div id="trap"><button id="a">A</button><button id="b">B</button></div>
    `)
    const el = document.getElementById("trap")!
    const btnB = document.getElementById("b")!
    const focusSpy = vi.spyOn(btnB, "focus")

    const trap = createFocusTrap(el, { initialFocus: "#b" })
    trap.activate()

    expect(focusSpy).toHaveBeenCalled()
    trap.destroy()
  })

  it("calls onEscapeKey when Escape is pressed", () => {
    const { document } = setupDOM(`
      <div id="trap"><button id="a">A</button></div>
    `)
    const el = document.getElementById("trap")!
    const onEscape = vi.fn()

    const trap = createFocusTrap(el, { onEscapeKey: onEscape })
    trap.activate()

    const event = new (globalThis as any).document.defaultView.KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
    })
    el.dispatchEvent(event)

    expect(onEscape).toHaveBeenCalledOnce()
    trap.destroy()
  })

  it("deactivate removes event listener", () => {
    const { document } = setupDOM(`
      <div id="trap"><button id="a">A</button></div>
    `)
    const el = document.getElementById("trap")!
    const removeSpy = vi.spyOn(el, "removeEventListener")

    const trap = createFocusTrap(el)
    trap.activate()
    trap.deactivate()

    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function))
  })

  it("destroy cleans up completely", () => {
    const { document } = setupDOM(`
      <div id="trap"><button>A</button></div>
    `)
    const el = document.getElementById("trap")!

    const trap = createFocusTrap(el)
    trap.activate()
    trap.destroy()

    // Should not throw when called again
    expect(() => trap.destroy()).not.toThrow()
  })
})
