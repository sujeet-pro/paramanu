import { describe, it, expect } from "vitest"
import {
  skipNavClasses,
  skipNavTargetClasses,
  skipNavModuleClasses,
  skipNavTargetModuleClasses,
} from "./skip-nav.classes.js"

describe("skipNavClasses", () => {
  it("returns skip nav class", () => {
    expect(skipNavClasses()).toBe("pm-skip-nav")
  })
})

describe("skipNavTargetClasses", () => {
  it("returns skip nav target class", () => {
    expect(skipNavTargetClasses()).toBe("pm-skip-nav-target")
  })
})

describe("skipNavModuleClasses", () => {
  it("returns mapped skip nav class", () => {
    const map = { "pm-skip-nav": "pm_abc_skip" }
    expect(skipNavModuleClasses(map)).toBe("pm_abc_skip")
  })

  it("returns empty string for missing entry", () => {
    expect(skipNavModuleClasses({})).toBe("")
  })
})

describe("skipNavTargetModuleClasses", () => {
  it("returns mapped skip nav target class", () => {
    const map = { "pm-skip-nav-target": "pm_abc_target" }
    expect(skipNavTargetModuleClasses(map)).toBe("pm_abc_target")
  })

  it("returns empty string for missing entry", () => {
    expect(skipNavTargetModuleClasses({})).toBe("")
  })
})
