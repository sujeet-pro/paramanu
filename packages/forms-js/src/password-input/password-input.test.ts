import { describe, it, expect } from "vitest"
import { pwdInputClasses, pwdInputModuleClasses } from "./password-input.classes.js"

describe("pwdInputClasses", () => {
  it("returns default classes (outline, md)", () => {
    const result = pwdInputClasses()
    expect(result).toBe("pm-pwd-input pm-pwd-input--outline pm-pwd-input--md")
  })

  it("applies variant", () => {
    expect(pwdInputClasses({ variant: "outline" })).toContain("pm-pwd-input--outline")
    expect(pwdInputClasses({ variant: "filled" })).toContain("pm-pwd-input--filled")
    expect(pwdInputClasses({ variant: "unstyled" })).toContain("pm-pwd-input--unstyled")
  })

  it("applies size", () => {
    expect(pwdInputClasses({ size: "sm" })).toContain("pm-pwd-input--sm")
    expect(pwdInputClasses({ size: "md" })).toContain("pm-pwd-input--md")
    expect(pwdInputClasses({ size: "lg" })).toContain("pm-pwd-input--lg")
  })

  it("applies invalid modifier", () => {
    expect(pwdInputClasses({ invalid: true })).toContain("pm-pwd-input--invalid")
    expect(pwdInputClasses({ invalid: false })).not.toContain("pm-pwd-input--invalid")
  })

  it("applies disabled modifier", () => {
    expect(pwdInputClasses({ disabled: true })).toContain("pm-pwd-input--disabled")
    expect(pwdInputClasses({ disabled: false })).not.toContain("pm-pwd-input--disabled")
  })

  it("always includes base class", () => {
    expect(pwdInputClasses()).toMatch(/^pm-pwd-input\s/)
  })

  it("combines multiple options", () => {
    const result = pwdInputClasses({
      variant: "filled",
      size: "lg",
      invalid: true,
      disabled: true,
    })
    expect(result).toBe(
      "pm-pwd-input pm-pwd-input--filled pm-pwd-input--lg pm-pwd-input--invalid pm-pwd-input--disabled",
    )
  })
})

describe("pwdInputModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-pwd-input": "pm_abc_passwordInput",
    "pm-pwd-input--outline": "pm_abc_outline",
    "pm-pwd-input--filled": "pm_abc_filled",
    "pm-pwd-input--md": "pm_abc_md",
    "pm-pwd-input--sm": "pm_abc_sm",
    "pm-pwd-input--lg": "pm_abc_lg",
    "pm-pwd-input--invalid": "pm_abc_invalid",
    "pm-pwd-input--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = pwdInputModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_passwordInput pm_abc_outline pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = pwdInputModuleClasses(mockClassMap, { variant: "filled" })
    expect(result).toContain("pm_abc_filled")
  })

  it("maps invalid class", () => {
    const result = pwdInputModuleClasses(mockClassMap, { invalid: true })
    expect(result).toContain("pm_abc_invalid")
  })

  it("maps disabled class", () => {
    const result = pwdInputModuleClasses(mockClassMap, { disabled: true })
    expect(result).toContain("pm_abc_disabled")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-pwd-input": "pm_abc_passwordInput",
    }
    const result = pwdInputModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_passwordInput")
    expect(result).not.toContain("undefined")
  })
})
