import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { QrCode } from "./qr-code.js"

afterEach(cleanup)

describe("QrCode", () => {
  it("renders with role=img", () => {
    render(<QrCode aria-label="QR Code">SVG</QrCode>)
    expect(screen.getByRole("img", { name: "QR Code" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<QrCode aria-label="QR Code">SVG</QrCode>)
    const qr = screen.getByRole("img")
    expect(qr.className).toContain("pm-qr-code")
    expect(qr.className).toContain("pm-qr-code--md")
  })

  it("applies size class", () => {
    render(<QrCode size="lg" aria-label="QR Code">SVG</QrCode>)
    expect(screen.getByRole("img").className).toContain("pm-qr-code--lg")
  })

  it("forwards ref", () => {
    let qrRef: HTMLDivElement | null = null
    render(<QrCode ref={(el) => (qrRef = el)} aria-label="QR Code">SVG</QrCode>)
    expect(qrRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<QrCode className="custom" aria-label="QR Code">SVG</QrCode>)
    const qr = screen.getByRole("img")
    expect(qr.className).toContain("pm-qr-code")
    expect(qr.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<QrCode data-testid="my-qr" aria-label="QR Code">SVG</QrCode>)
    expect(screen.getByTestId("my-qr")).toBeInTheDocument()
  })
})
