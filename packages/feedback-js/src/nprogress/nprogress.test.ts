import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { nprogressClasses, nprogressModuleClasses, createNProgress } from "./nprogress.classes.js"

describe("nprogressClasses", () => {
  it("returns default classes (inactive)", () => {
    const result = nprogressClasses()
    expect(result.root).toBe("pm-nprogress")
    expect(result.bar).toBe("pm-nprogress__bar")
    expect(result.peg).toBe("pm-nprogress__peg")
  })

  it("applies active modifier", () => {
    expect(nprogressClasses({ active: true }).root).toContain("pm-nprogress--active")
    expect(nprogressClasses({ active: false }).root).not.toContain("pm-nprogress--active")
  })

  it("always includes base class in root", () => {
    expect(nprogressClasses().root).toMatch(/^pm-nprogress/)
  })

  it("sub-element classes are always the same", () => {
    const result1 = nprogressClasses()
    const result2 = nprogressClasses({ active: true })
    expect(result1.bar).toBe(result2.bar)
    expect(result1.peg).toBe(result2.peg)
  })
})

describe("nprogressModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-nprogress": "pm_abc_nprogress",
    "pm-nprogress--active": "pm_abc_active",
    "pm-nprogress__bar": "pm_abc_bar",
    "pm-nprogress__peg": "pm_abc_peg",
  }

  it("returns mapped default classes", () => {
    const result = nprogressModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_nprogress")
    expect(result.bar).toBe("pm_abc_bar")
    expect(result.peg).toBe("pm_abc_peg")
  })

  it("maps active modifier correctly", () => {
    const result = nprogressModuleClasses(mockClassMap, { active: true })
    expect(result.root).toContain("pm_abc_active")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-nprogress": "pm_abc_nprogress",
    }
    const result = nprogressModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_nprogress")
    expect(result.root).not.toContain("undefined")
    expect(result.bar).toBe("")
    expect(result.peg).toBe("")
  })
})

describe("createNProgress", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("starts with value 0 and inactive", () => {
    const np = createNProgress()
    expect(np.getValue()).toBe(0)
    expect(np.isActive()).toBe(false)
  })

  it("start() sets active and initial value", () => {
    const np = createNProgress()
    np.start()
    expect(np.isActive()).toBe(true)
    expect(np.getValue()).toBeGreaterThan(0)
  })

  it("done() sets value to 1 and deactivates", () => {
    const np = createNProgress()
    np.start()
    np.done()
    expect(np.getValue()).toBe(1)
    expect(np.isActive()).toBe(false)
  })

  it("set() clamps value between 0 and 1", () => {
    const np = createNProgress()
    np.set(0.5)
    expect(np.getValue()).toBe(0.5)
    np.set(-1)
    expect(np.getValue()).toBe(0)
    np.set(2)
    expect(np.getValue()).toBe(1)
  })

  it("set(1) deactivates progress", () => {
    const np = createNProgress()
    np.start()
    expect(np.isActive()).toBe(true)
    np.set(1)
    expect(np.isActive()).toBe(false)
  })

  it("inc() increases value when active", () => {
    const np = createNProgress()
    np.start()
    const initial = np.getValue()
    np.inc()
    expect(np.getValue()).toBeGreaterThan(initial)
  })

  it("inc() does nothing when inactive", () => {
    const np = createNProgress()
    np.set(0.5)
    const before = np.getValue()
    np.inc()
    expect(np.getValue()).toBe(before)
  })

  it("auto-increments via trickle after start", () => {
    const np = createNProgress()
    np.start()
    const initial = np.getValue()
    vi.advanceTimersByTime(1000)
    expect(np.getValue()).toBeGreaterThan(initial)
  })

  it("stops trickle after done()", () => {
    const np = createNProgress()
    np.start()
    np.done()
    const value = np.getValue()
    vi.advanceTimersByTime(1000)
    expect(np.getValue()).toBe(value)
  })

  it("inc() slows down as value approaches 1", () => {
    const np = createNProgress()
    np.start()

    np.set(0.1)
    const lowValue = np.getValue()
    np.inc()
    const lowIncrement = np.getValue() - lowValue

    np.set(0.9)
    const highValue = np.getValue()
    np.inc()
    const highIncrement = np.getValue() - highValue

    expect(lowIncrement).toBeGreaterThan(highIncrement)
  })

  it("value never exceeds 1", () => {
    const np = createNProgress()
    np.start()
    for (let i = 0; i < 1000; i++) {
      np.inc()
    }
    expect(np.getValue()).toBeLessThanOrEqual(1)
  })
})
