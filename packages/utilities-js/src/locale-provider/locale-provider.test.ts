import { describe, it, expect, beforeEach } from "vitest"
import { JSDOM } from "jsdom"
import { setLocale, getLocale } from "./locale-provider.js"

function setupDOM() {
  const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    url: "http://localhost",
  })
  Object.defineProperty(globalThis, "document", { value: dom.window.document, writable: true })
  return { dom, document: dom.window.document }
}

describe("setLocale", () => {
  beforeEach(() => {
    setupDOM()
  })

  it("sets lang attribute on documentElement by default", () => {
    setLocale("fr")
    expect(document.documentElement.getAttribute("lang")).toBe("fr")
  })

  it("sets lang attribute on custom target", () => {
    const target = document.createElement("div")
    setLocale("de", { target })
    expect(target.getAttribute("lang")).toBe("de")
  })
})

describe("getLocale", () => {
  beforeEach(() => {
    setupDOM()
  })

  it("returns 'en' when no lang attribute is set", () => {
    expect(getLocale()).toBe("en")
  })

  it("returns the lang attribute value", () => {
    document.documentElement.setAttribute("lang", "ja")
    expect(getLocale()).toBe("ja")
  })

  it("reads from custom target", () => {
    const target = document.createElement("div")
    target.setAttribute("lang", "es")
    expect(getLocale({ target })).toBe("es")
  })
})
