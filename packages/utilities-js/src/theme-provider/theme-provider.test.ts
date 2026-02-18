import { describe, it, expect, beforeEach } from "vitest"
import { JSDOM } from "jsdom"
import { setTheme, getTheme, clearTheme } from "./theme-provider.js"
import { themeProviderClasses, themeProviderModuleClasses } from "./theme-provider.classes.js"

function setupDOM() {
  const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    url: "http://localhost",
  })
  const { document, localStorage } = dom.window
  Object.defineProperty(globalThis, "document", { value: document, writable: true })
  Object.defineProperty(globalThis, "localStorage", { value: localStorage, writable: true })
  return { dom, document }
}

describe("setTheme", () => {
  beforeEach(() => {
    const { document } = setupDOM()
    document.documentElement.removeAttribute("data-pm-theme")
    document.documentElement.style.removeProperty("color-scheme")
    localStorage.clear()
  })

  it("sets data-pm-theme attribute on documentElement", () => {
    setTheme("dark")
    expect(document.documentElement.getAttribute("data-pm-theme")).toBe("dark")
  })

  it("sets color-scheme for light mode", () => {
    setTheme("light")
    expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe("light")
  })

  it("sets color-scheme for dark mode", () => {
    setTheme("dark")
    expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe("dark")
  })

  it("removes color-scheme for system mode", () => {
    setTheme("light")
    setTheme("system")
    expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe("")
  })

  it("stores theme in localStorage", () => {
    setTheme("dark")
    expect(localStorage.getItem("pm-theme")).toBe("dark")
  })

  it("uses custom storage key", () => {
    setTheme("light", { storageKey: "my-theme" })
    expect(localStorage.getItem("my-theme")).toBe("light")
  })

  it("sets attribute on custom target", () => {
    const target = document.createElement("div")
    setTheme("dark", { target })
    expect(target.getAttribute("data-pm-theme")).toBe("dark")
  })
})

describe("getTheme", () => {
  beforeEach(() => {
    setupDOM()
    localStorage.clear()
  })

  it("returns 'system' when no stored value", () => {
    expect(getTheme()).toBe("system")
  })

  it("returns stored theme value", () => {
    localStorage.setItem("pm-theme", "dark")
    expect(getTheme()).toBe("dark")
  })

  it("returns stored value with custom key", () => {
    localStorage.setItem("my-theme", "light")
    expect(getTheme({ storageKey: "my-theme" })).toBe("light")
  })

  it("returns 'system' for invalid stored value", () => {
    localStorage.setItem("pm-theme", "invalid")
    expect(getTheme()).toBe("system")
  })
})

describe("clearTheme", () => {
  beforeEach(() => {
    setupDOM()
    localStorage.clear()
  })

  it("removes data-pm-theme attribute", () => {
    setTheme("dark")
    clearTheme()
    expect(document.documentElement.hasAttribute("data-pm-theme")).toBe(false)
  })

  it("removes color-scheme property", () => {
    setTheme("dark")
    clearTheme()
    expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe("")
  })

  it("removes localStorage entry", () => {
    setTheme("dark")
    clearTheme()
    expect(localStorage.getItem("pm-theme")).toBeNull()
  })
})

describe("themeProviderClasses", () => {
  it("returns base class without mode", () => {
    expect(themeProviderClasses()).toBe("pm-theme-provider")
  })

  it("returns base class with mode", () => {
    expect(themeProviderClasses("dark")).toBe("pm-theme-provider pm-theme-provider--dark")
    expect(themeProviderClasses("light")).toBe("pm-theme-provider pm-theme-provider--light")
  })
})

describe("themeProviderModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-theme-provider": "pm_abc_tp",
    "pm-theme-provider--dark": "pm_abc_dark",
  }

  it("returns mapped base class", () => {
    expect(themeProviderModuleClasses(mockClassMap)).toBe("pm_abc_tp")
  })

  it("returns mapped mode class", () => {
    expect(themeProviderModuleClasses(mockClassMap, "dark")).toBe("pm_abc_tp pm_abc_dark")
  })

  it("handles missing entries gracefully", () => {
    const result = themeProviderModuleClasses({})
    expect(result).not.toContain("undefined")
  })
})
