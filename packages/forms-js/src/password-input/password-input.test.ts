import { describe, it, expect } from "vitest"
import { passwordInputClasses, passwordInputModuleClasses } from "./password-input.classes.js"

describe("passwordInputClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = passwordInputClasses()
    expect(result).toBe("pm-password-input pm-password-input--outline pm-password-input--md")
  })

  it("applies variant", () => {
    expect(passwordInputClasses({ variant: "outline" })).toContain("pm-password-input--outline")
    expect(passwordInputClasses({ variant: "filled" })).toContain("pm-password-input--filled")
    expect(passwordInputClasses({ variant: "unstyled" })).toContain("pm-password-input--unstyled")
  })

  it("applies size", () => {
    expect(passwordInputClasses({ size: "sm" })).toContain("pm-password-input--sm")
    expect(passwordInputClasses({ size: "md" })).toContain("pm-password-input--md")
    expect(passwordInputClasses({ size: "lg" })).toContain("pm-password-input--lg")
  })

  it("applies invalid modifier", () => {
    expect(passwordInputClasses({ invalid: true })).toContain("pm-password-input--invalid")
    expect(passwordInputClasses({ invalid: false })).not.toContain("pm-password-input--invalid")
  })

  it("applies disabled modifier", () => {
    expect(passwordInputClasses({ disabled: true })).toContain("pm-password-input--disabled")
    expect(passwordInputClasses({ disabled: false })).not.toContain("pm-password-input--disabled")
  })

  it("always includes base class", () => {
    expect(passwordInputClasses()).toMatch(/^pm-password-input\s/)
  })

  it("combines multiple options", () => {
    const result = passwordInputClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-password-input pm-password-input--filled pm-password-input--lg pm-password-input--invalid pm-password-input--disabled",
    )
  })
})

describe("passwordInputModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-password-input": "pm_abc_passwordInput",
    "pm-password-input--outline": "pm_abc_outline",
    "pm-password-input--filled": "pm_abc_filled",
    "pm-password-input--md": "pm_abc_md",
    "pm-password-input--sm": "pm_abc_sm",
    "pm-password-input--lg": "pm_abc_lg",
    "pm-password-input--invalid": "pm_abc_invalid",
    "pm-password-input--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = passwordInputModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_passwordInput pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = passwordInputModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps invalid class", () => {
    const result = passwordInputModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = passwordInputModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-password-input": "pm_abc_passwordInput",
    }
    const result = passwordInputModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_passwordInput")
    expect(result).not.toContain("undefined")
  })
})
