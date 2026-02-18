import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { dividerClasses } from "./divider.classes.js"

function createHorizontalDividerHTML(
  options: Parameters<typeof dividerClasses>[0] = {},
): string {
  const classes = dividerClasses({ ...options, orientation: "horizontal" })
  return `<hr class="${classes}" aria-orientation="horizontal" />`
}

function createVerticalDividerHTML(
  options: Parameters<typeof dividerClasses>[0] = {},
): string {
  const classes = dividerClasses({ ...options, orientation: "vertical" })
  return `<div role="separator" class="${classes}" aria-orientation="vertical"></div>`
}

describe("divider accessibility", () => {
  it("horizontal divider uses semantic hr element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createHorizontalDividerHTML()}</body>`,
    )
    const hr = dom.window.document.querySelector("hr")
    expect(hr).not.toBeNull()
    expect(hr?.tagName).toBe("HR")
  })

  it("horizontal divider has aria-orientation", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createHorizontalDividerHTML()}</body>`,
    )
    const hr = dom.window.document.querySelector("hr")
    expect(hr?.getAttribute("aria-orientation")).toBe("horizontal")
  })

  it("vertical divider uses div with role=separator", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createVerticalDividerHTML()}</body>`,
    )
    const separator = dom.window.document.querySelector('[role="separator"]')
    expect(separator).not.toBeNull()
    expect(separator?.tagName).toBe("DIV")
  })

  it("vertical divider has aria-orientation=vertical", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createVerticalDividerHTML()}</body>`,
    )
    const separator = dom.window.document.querySelector('[role="separator"]')
    expect(separator?.getAttribute("aria-orientation")).toBe("vertical")
  })

  it("horizontal divider has correct role implicitly", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createHorizontalDividerHTML()}</body>`,
    )
    const hr = dom.window.document.querySelector("hr")
    // <hr> has implicit role="separator"
    expect(hr?.tagName).toBe("HR")
  })
})
