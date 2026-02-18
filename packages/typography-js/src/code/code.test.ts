import { describe, it, expect } from "vitest"
import { codeClasses, codeModuleClasses } from "./code.classes.js"

describe("codeClasses", () => {
  it("returns inline code base class by default", () => {
    expect(codeClasses()).toBe("pm-code")
  })

  it("returns block code base class when block is true", () => {
    expect(codeClasses({ block: true })).toBe("pm-code-block")
  })

  it("applies size to inline code", () => {
    expect(codeClasses({ size: "sm" })).toBe("pm-code pm-code--size-sm")
    expect(codeClasses({ size: "lg" })).toBe("pm-code pm-code--size-lg")
  })

  it("applies size to block code", () => {
    expect(codeClasses({ block: true, size: "sm" })).toBe("pm-code-block pm-code-block--size-sm")
    expect(codeClasses({ block: true, size: "lg" })).toBe("pm-code-block pm-code-block--size-lg")
  })

  it("does not add size class when not specified", () => {
    expect(codeClasses()).toBe("pm-code")
    expect(codeClasses({ block: true })).toBe("pm-code-block")
  })
})

describe("codeModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-code": "pm_abc_code",
    "pm-code--size-sm": "pm_abc_codeSizeSm",
    "pm-code-block": "pm_abc_codeBlock",
    "pm-code-block--size-lg": "pm_abc_codeBlockSizeLg",
  }

  it("returns mapped inline code class by default", () => {
    expect(codeModuleClasses(mockClassMap)).toBe("pm_abc_code")
  })

  it("returns mapped block code class when block is true", () => {
    expect(codeModuleClasses(mockClassMap, { block: true })).toBe("pm_abc_codeBlock")
  })

  it("maps inline size classes correctly", () => {
    const result = codeModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_codeSizeSm")
  })

  it("maps block size classes correctly", () => {
    const result = codeModuleClasses(mockClassMap, { block: true, size: "lg" })
    expect(result).toContain("pm_abc_codeBlockSizeLg")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-code": "pm_abc_code",
    }
    const result = codeModuleClasses(sparseMap, { size: "sm" })
    expect(result).toContain("pm_abc_code")
    expect(result).not.toContain("undefined")
  })
})
