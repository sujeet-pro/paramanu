import { describe, it, expect } from "vitest"
import { qrCodeClasses, qrCodeModuleClasses } from "./qr-code.classes.js"

describe("qrCodeClasses", () => {
  it("returns default classes (md)", () => {
    const result = qrCodeClasses()
    expect(result.root).toBe("pm-qr-code pm-qr-code--md")
    expect(result.svg).toBe("pm-qr-code__svg")
  })

  it("applies size", () => {
    expect(qrCodeClasses({ size: "sm" }).root).toContain("pm-qr-code--sm")
    expect(qrCodeClasses({ size: "md" }).root).toContain("pm-qr-code--md")
    expect(qrCodeClasses({ size: "lg" }).root).toContain("pm-qr-code--lg")
    expect(qrCodeClasses({ size: "xl" }).root).toContain("pm-qr-code--xl")
  })

  it("always includes base class in root", () => {
    expect(qrCodeClasses().root).toMatch(/^pm-qr-code\s/)
  })
})

describe("qrCodeModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-qr-code": "pm_abc_qr_code",
    "pm-qr-code--md": "pm_abc_md",
    "pm-qr-code--lg": "pm_abc_lg",
    "pm-qr-code__svg": "pm_abc_svg",
  }

  it("returns mapped default classes", () => {
    const result = qrCodeModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_qr_code pm_abc_md")
    expect(result.svg).toBe("pm_abc_svg")
  })

  it("maps size classes correctly", () => {
    const result = qrCodeModuleClasses(mockClassMap, { size: "lg" })
    expect(result.root).toContain("pm_abc_lg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-qr-code": "pm_abc_qr_code",
    }
    const result = qrCodeModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_qr_code")
    expect(result.root).not.toContain("undefined")
    expect(result.svg).toBe("")
  })
})
