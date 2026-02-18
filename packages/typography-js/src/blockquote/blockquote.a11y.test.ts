import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { blockquoteClasses } from "./blockquote.classes.js"

function createBlockquoteHTML(
  text: string,
  options: Parameters<typeof blockquoteClasses>[0] = {},
): string {
  const classes = blockquoteClasses(options)
  return `<blockquote class="${classes}">${text}</blockquote>`
}

describe("blockquote accessibility", () => {
  it("renders as a blockquote element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createBlockquoteHTML("A wise quote")}</body>`,
    )
    const el = dom.window.document.querySelector("blockquote")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("BLOCKQUOTE")
  })

  it("has readable text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createBlockquoteHTML("To be or not to be")}</body>`,
    )
    const el = dom.window.document.querySelector("blockquote")
    expect(el?.textContent).toBe("To be or not to be")
  })

  it("supports cite attribute", () => {
    const classes = blockquoteClasses()
    const html = `<blockquote class="${classes}" cite="https://example.com">Quote</blockquote>`
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const el = dom.window.document.querySelector("blockquote")
    expect(el?.getAttribute("cite")).toBe("https://example.com")
  })
})
