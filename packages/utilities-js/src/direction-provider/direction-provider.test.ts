import { describe, it, expect, beforeEach } from "vitest"
import { JSDOM } from "jsdom"
import { setDirection, getDirection } from "./direction-provider.js"

function setupDOM() {
  const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    url: "http://localhost",
  })
  Object.defineProperty(globalThis, "document", { value: dom.window.document, writable: true })
  return { dom, document: dom.window.document }
}

describe("setDirection", () => {
  beforeEach(() => {
    setupDOM()
  })

  it("sets dir attribute on documentElement by default", () => {
    setDirection("rtl")
    expect(document.documentElement.getAttribute("dir")).toBe("rtl")
  })

  it("sets dir attribute on custom target", () => {
    const target = document.createElement("div")
    setDirection("rtl", target)
    expect(target.getAttribute("dir")).toBe("rtl")
  })

  it("sets ltr direction", () => {
    setDirection("ltr")
    expect(document.documentElement.getAttribute("dir")).toBe("ltr")
  })
})

describe("getDirection", () => {
  beforeEach(() => {
    setupDOM()
  })

  it("returns ltr when no dir attribute is set", () => {
    expect(getDirection()).toBe("ltr")
  })

  it("returns rtl when dir is rtl", () => {
    document.documentElement.setAttribute("dir", "rtl")
    expect(getDirection()).toBe("rtl")
  })

  it("returns direction from custom target", () => {
    const target = document.createElement("div")
    target.setAttribute("dir", "rtl")
    expect(getDirection(target)).toBe("rtl")
  })

  it("defaults to ltr for unknown dir value", () => {
    document.documentElement.setAttribute("dir", "auto")
    expect(getDirection()).toBe("ltr")
  })
})
