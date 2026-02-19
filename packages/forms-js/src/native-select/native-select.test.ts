import { describe, it, expect } from "vitest"
import { nativeSelClasses, nativeSelModuleClasses } from "./native-select.classes.js"

describe("nativeSelClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = nativeSelClasses()
    expect(result).toBe("pm-native-sel pm-native-sel--outline pm-native-sel--md")
  })

  it("applies variant", () => {
    expect(nativeSelClasses({ variant: "outline" })).toContain("pm-native-sel--outline")
    expect(nativeSelClasses({ variant: "filled" })).toContain("pm-native-sel--filled")
    expect(nativeSelClasses({ variant: "unstyled" })).toContain("pm-native-sel--unstyled")
  })

  it("applies size", () => {
    expect(nativeSelClasses({ size: "sm" })).toContain("pm-native-sel--sm")
    expect(nativeSelClasses({ size: "md" })).toContain("pm-native-sel--md")
    expect(nativeSelClasses({ size: "lg" })).toContain("pm-native-sel--lg")
  })

  it("applies invalid modifier", () => {
    expect(nativeSelClasses({ invalid: true })).toContain("pm-native-sel--invalid")
    expect(nativeSelClasses({ invalid: false })).not.toContain("pm-native-sel--invalid")
  })

  it("applies disabled modifier", () => {
    expect(nativeSelClasses({ disabled: true })).toContain("pm-native-sel--disabled")
    expect(nativeSelClasses({ disabled: false })).not.toContain("pm-native-sel--disabled")
  })

  it("applies full-width modifier", () => {
    expect(nativeSelClasses({ fullWidth: true })).toContain("pm-native-sel--full-width")
    expect(nativeSelClasses({ fullWidth: false })).not.toContain("pm-native-sel--full-width")
  })

  it("always includes base class", () => {
    expect(nativeSelClasses()).toMatch(/^pm-native-sel\s/)
  })

  it("combines multiple options", () => {
    const result = nativeSelClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-native-sel pm-native-sel--filled pm-native-sel--lg pm-native-sel--invalid pm-native-sel--disabled pm-native-sel--full-width",
    )
  })
})

describe("nativeSelModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-native-sel": "pm_abc_nativeSelect",
    "pm-native-sel--outline": "pm_abc_outline",
    "pm-native-sel--filled": "pm_abc_filled",
    "pm-native-sel--md": "pm_abc_md",
    "pm-native-sel--sm": "pm_abc_sm",
    "pm-native-sel--lg": "pm_abc_lg",
    "pm-native-sel--invalid": "pm_abc_invalid",
    "pm-native-sel--disabled": "pm_abc_disabled",
    "pm-native-sel--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = nativeSelModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_nativeSelect pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = nativeSelModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = nativeSelModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps invalid class", () => {
    const result = nativeSelModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = nativeSelModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-native-sel": "pm_abc_nativeSelect",
    }
    const result = nativeSelModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_nativeSelect")
    expect(result).not.toContain("undefined")
  })
})
