import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { skipNavClasses, skipNavTargetClasses } from "./skip-nav.classes.js"

describe("skip-nav accessibility", () => {
  it("skip nav link has href pointing to target", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <a href="#main-content" class="${skipNavClasses()}">Skip to content</a>
      <main id="main-content" class="${skipNavTargetClasses()}">Content</main>
    </body>`)
    const link = dom.window.document.querySelector("a")
    expect(link).not.toBeNull()
    expect(link?.getAttribute("href")).toBe("#main-content")
    expect(link?.textContent).toBe("Skip to content")
  })

  it("target element exists and has matching id", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <a href="#main-content" class="${skipNavClasses()}">Skip to content</a>
      <main id="main-content" class="${skipNavTargetClasses()}">Content</main>
    </body>`)
    const target = dom.window.document.getElementById("main-content")
    expect(target).not.toBeNull()
    expect(target?.tagName).toBe("MAIN")
  })
})
