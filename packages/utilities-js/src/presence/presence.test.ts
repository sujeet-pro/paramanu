import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { JSDOM } from "jsdom"
import { createPresence } from "./presence.js"
import { presenceClasses, presenceModuleClasses } from "./presence.classes.js"

function setupDOM() {
  const dom = new JSDOM(`<!DOCTYPE html><body><div id="el"></div></body>`, {
    url: "http://localhost",
  })
  const { document } = dom.window
  Object.defineProperty(globalThis, "document", { value: document, writable: true })
  Object.defineProperty(globalThis, "HTMLElement", {
    value: dom.window.HTMLElement,
    writable: true,
  })
  return { dom, document }
}

describe("createPresence", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    Object.defineProperty(globalThis, "document", {
      value: undefined,
      writable: true,
    })
  })

  it("starts in exited state", () => {
    const { document } = setupDOM()
    const el = document.getElementById("el")!
    const presence = createPresence(el)

    expect(presence.state).toBe("exited")
    presence.destroy()
  })

  it("transitions to entering then entered when setPresent(true)", () => {
    const { document } = setupDOM()
    const el = document.getElementById("el")!
    const onEntered = vi.fn()
    const presence = createPresence(el, { duration: 200, onEntered })

    presence.setPresent(true)
    expect(presence.state).toBe("entering")
    expect(el.getAttribute("data-pm-presence")).toBe("entering")

    vi.advanceTimersByTime(200)
    expect(presence.state).toBe("entered")
    expect(el.getAttribute("data-pm-presence")).toBe("entered")
    expect(onEntered).toHaveBeenCalledOnce()

    presence.destroy()
  })

  it("transitions to exiting then exited when setPresent(false)", () => {
    const { document } = setupDOM()
    const el = document.getElementById("el")!
    const onExited = vi.fn()
    const presence = createPresence(el, { duration: 200, onExited })

    presence.setPresent(true)
    vi.advanceTimersByTime(200)

    presence.setPresent(false)
    expect(presence.state).toBe("exiting")
    expect(el.getAttribute("data-pm-presence")).toBe("exiting")

    vi.advanceTimersByTime(200)
    expect(presence.state).toBe("exited")
    expect(el.hasAttribute("data-pm-presence")).toBe(false)
    expect(onExited).toHaveBeenCalledOnce()

    presence.destroy()
  })

  it("uses default duration of 200ms", () => {
    const { document } = setupDOM()
    const el = document.getElementById("el")!
    const presence = createPresence(el)

    presence.setPresent(true)
    expect(presence.state).toBe("entering")

    vi.advanceTimersByTime(199)
    expect(presence.state).toBe("entering")

    vi.advanceTimersByTime(1)
    expect(presence.state).toBe("entered")

    presence.destroy()
  })

  it("cancels pending transition on rapid toggle", () => {
    const { document } = setupDOM()
    const el = document.getElementById("el")!
    const onEntered = vi.fn()
    const presence = createPresence(el, { duration: 200, onEntered })

    presence.setPresent(true)
    vi.advanceTimersByTime(100)
    presence.setPresent(false)

    vi.advanceTimersByTime(200)
    expect(presence.state).toBe("exited")
    expect(onEntered).not.toHaveBeenCalled()

    presence.destroy()
  })

  it("destroy cleans up attribute and timers", () => {
    const { document } = setupDOM()
    const el = document.getElementById("el")!
    const presence = createPresence(el)

    presence.setPresent(true)
    presence.destroy()

    expect(el.hasAttribute("data-pm-presence")).toBe(false)
  })
})

describe("presenceClasses", () => {
  it("returns base class without state", () => {
    expect(presenceClasses()).toBe("pm-presence")
  })

  it("returns base class with state", () => {
    expect(presenceClasses({ state: "entering" })).toBe("pm-presence pm-presence--entering")
    expect(presenceClasses({ state: "entered" })).toBe("pm-presence pm-presence--entered")
    expect(presenceClasses({ state: "exiting" })).toBe("pm-presence pm-presence--exiting")
    expect(presenceClasses({ state: "exited" })).toBe("pm-presence pm-presence--exited")
  })
})

describe("presenceModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-presence": "pm_abc_presence",
    "pm-presence--entering": "pm_abc_entering",
    "pm-presence--entered": "pm_abc_entered",
  }

  it("returns mapped base class", () => {
    expect(presenceModuleClasses(mockClassMap)).toBe("pm_abc_presence")
  })

  it("returns mapped state class", () => {
    expect(presenceModuleClasses(mockClassMap, { state: "entering" })).toBe(
      "pm_abc_presence pm_abc_entering",
    )
  })

  it("handles missing entries gracefully", () => {
    const result = presenceModuleClasses({})
    expect(result).not.toContain("undefined")
  })
})
