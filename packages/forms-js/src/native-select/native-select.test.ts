import { describe, it, expect } from "vitest"
import { nativeSelectClasses, nativeSelectModuleClasses } from "./native-select.classes.js"

describe("nativeSelectClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = nativeSelectClasses()
    expect(result).toBe("pm-native-select pm-native-select--outline pm-native-select--md")
  })

  it("applies variant", () => {
    expect(nativeSelectClasses({ variant: "outline" })).toContain("pm-native-select--outline")
    expect(nativeSelectClasses({ variant: "filled" })).toContain("pm-native-select--filled")
    expect(nativeSelectClasses({ variant: "unstyled" })).toContain("pm-native-select--unstyled")
  })

  it("applies size", () => {
    expect(nativeSelectClasses({ size: "sm" })).toContain("pm-native-select--sm")
    expect(nativeSelectClasses({ size: "md" })).toContain("pm-native-select--md")
    expect(nativeSelectClasses({ size: "lg" })).toContain("pm-native-select--lg")
  })

  it("applies invalid modifier", () => {
    expect(nativeSelectClasses({ invalid: true })).toContain("pm-native-select--invalid")
    expect(nativeSelectClasses({ invalid: false })).not.toContain("pm-native-select--invalid")
  })

  it("applies disabled modifier", () => {
    expect(nativeSelectClasses({ disabled: true })).toContain("pm-native-select--disabled")
    expect(nativeSelectClasses({ disabled: false })).not.toContain("pm-native-select--disabled")
  })

  it("applies full-width modifier", () => {
    expect(nativeSelectClasses({ fullWidth: true })).toContain("pm-native-select--full-width")
    expect(nativeSelectClasses({ fullWidth: false })).not.toContain("pm-native-select--full-width")
  })

  it("always includes base class", () => {
    expect(nativeSelectClasses()).toMatch(/^pm-native-select\s/)
  })

  it("combines multiple options", () => {
    const result = nativeSelectClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
      fullWidth: true,
    })
    expect(result).toBe(
      "pm-native-select pm-native-select--filled pm-native-select--lg pm-native-select--invalid pm-native-select--disabled pm-native-select--full-width",
    )
  })
})

describe("nativeSelectModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-native-select": "pm_abc_nativeSelect",
    "pm-native-select--outline": "pm_abc_outline",
    "pm-native-select--filled": "pm_abc_filled",
    "pm-native-select--md": "pm_abc_md",
    "pm-native-select--sm": "pm_abc_sm",
    "pm-native-select--lg": "pm_abc_lg",
    "pm-native-select--invalid": "pm_abc_invalid",
    "pm-native-select--disabled": "pm_abc_disabled",
    "pm-native-select--full-width": "pm_abc_fullWidth",
  }

  it("returns mapped default classes", () => {
    const result = nativeSelectModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_nativeSelect pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = nativeSelectModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps size classes correctly", () => {
    const result = nativeSelectModuleClasses(mockClassMap, { size: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps invalid class", () => {
    const result = nativeSelectModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = nativeSelectModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-native-select": "pm_abc_nativeSelect",
    }
    const result = nativeSelectModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_nativeSelect")
    expect(result).not.toContain("undefined")
  })
})
