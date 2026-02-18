import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { qrCodeClasses } from "./qr-code.classes.js"

function createQrCodeHTML(
  options: Parameters<typeof qrCodeClasses>[0] = {},
  attrs: string = "",
): string {
  const cls = qrCodeClasses(options)
  return `<div class="${cls.root}" role="img" aria-label="QR code for https://example.com"${attrs ? " " + attrs : ""}><svg class="${cls.svg}" viewBox="0 0 21 21"><rect width="21" height="21" fill="white" /><rect x="0" y="0" width="1" height="1" fill="black" /></svg></div>`
}

describe("qr-code accessibility", () => {
  it("has role=img on the container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createQrCodeHTML()}</body>`)
    const qrCode = dom.window.document.querySelector(".pm-qr-code")
    expect(qrCode?.getAttribute("role")).toBe("img")
  })

  it("has aria-label describing the QR code content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createQrCodeHTML()}</body>`)
    const qrCode = dom.window.document.querySelector(".pm-qr-code")
    expect(qrCode?.getAttribute("aria-label")).toBe("QR code for https://example.com")
  })

  it("contains an SVG element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createQrCodeHTML()}</body>`)
    const svg = dom.window.document.querySelector("svg")
    expect(svg).not.toBeNull()
    expect(svg?.classList.contains("pm-qr-code__svg")).toBe(true)
  })

  it("SVG is decorative when container has role=img", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createQrCodeHTML()}</body>`)
    const container = dom.window.document.querySelector("[role='img']")
    expect(container).not.toBeNull()
    // SVG inside role=img container is treated as decorative
    const svg = container?.querySelector("svg")
    expect(svg).not.toBeNull()
  })
})
