import { describe, it, expect } from "vitest"
import { embedClasses, embedModuleClasses } from "./embed.classes.js"

describe("embedClasses", () => {
  it("returns default classes (16/9, not full-width)", () => {
    const result = embedClasses()
    expect(result.root).toBe("pm-embed pm-embed--ratio-16-9")
    expect(result.iframe).toBe("pm-embed__iframe")
  })

  it("applies ratio", () => {
    expect(embedClasses({ ratio: "1/1" }).root).toContain("pm-embed--ratio-1-1")
    expect(embedClasses({ ratio: "4/3" }).root).toContain("pm-embed--ratio-4-3")
    expect(embedClasses({ ratio: "16/9" }).root).toContain("pm-embed--ratio-16-9")
    expect(embedClasses({ ratio: "21/9" }).root).toContain("pm-embed--ratio-21-9")
  })

  it("applies full-width modifier", () => {
    expect(embedClasses({ fullWidth: true }).root).toContain("pm-embed--full-width")
    expect(embedClasses({ fullWidth: false }).root).not.toContain("pm-embed--full-width")
  })

  it("always includes base class in root", () => {
    expect(embedClasses().root).toMatch(/^pm-embed\s/)
  })

  it("combines multiple options", () => {
    const result = embedClasses({ ratio: "4/3", fullWidth: true })
    expect(result.root).toBe("pm-embed pm-embed--ratio-4-3 pm-embed--full-width")
  })
})

describe("embedModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-embed": "pm_abc_embed",
    "pm-embed--ratio-16-9": "pm_abc_ratio_16_9",
    "pm-embed--ratio-4-3": "pm_abc_ratio_4_3",
    "pm-embed--full-width": "pm_abc_full_width",
    "pm-embed__iframe": "pm_abc_iframe",
  }

  it("returns mapped default classes", () => {
    const result = embedModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_embed pm_abc_ratio_16_9")
    expect(result.iframe).toBe("pm_abc_iframe")
  })

  it("maps ratio classes correctly", () => {
    const result = embedModuleClasses(mockClassMap, { ratio: "4/3" })
    expect(result.root).toContain("pm_abc_ratio_4_3")
  })

  it("maps full-width class", () => {
    const result = embedModuleClasses(mockClassMap, { fullWidth: true })
    expect(result.root).toContain("pm_abc_full_width")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-embed": "pm_abc_embed",
    }
    const result = embedModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_embed")
    expect(result.root).not.toContain("undefined")
    expect(result.iframe).toBe("")
  })
})
