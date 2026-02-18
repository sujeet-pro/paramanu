import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { truncateClasses } from "./truncate.classes.js"

function createTruncateHTML(
  text: string,
  options: Parameters<typeof truncateClasses>[0] = {},
  tag: string = "p",
): string {
  const classes = truncateClasses(options)
  return `<${tag} class="${classes}" title="${text}">${text}</${tag}>`
}

describe("truncate accessibility", () => {
  it("has full content accessible via title attribute", () => {
    const fullText = "This is a very long text that will be visually truncated"
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTruncateHTML(fullText)}</body>`)
    const el = dom.window.document.querySelector("p")
    expect(el).not.toBeNull()
    expect(el?.getAttribute("title")).toBe(fullText)
  })

  it("has readable text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTruncateHTML("Truncated content")}</body>`,
    )
    const el = dom.window.document.querySelector("p")
    expect(el?.textContent).toBe("Truncated content")
  })

  it("works with span element for inline truncation", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTruncateHTML("Inline truncated", {}, "span")}</body>`,
    )
    const el = dom.window.document.querySelector("span")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Inline truncated")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTruncateHTML("Styled", { lines: 2 })}</body>`,
    )
    const el = dom.window.document.querySelector("p")
    expect(el?.classList.contains("pm-truncate")).toBe(true)
    expect(el?.classList.contains("pm-truncate--lines-2")).toBe(true)
  })
})
