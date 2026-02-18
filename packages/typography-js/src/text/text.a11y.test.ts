import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { textClasses } from "./text.classes.js"

function createTextHTML(
  text: string,
  options: Parameters<typeof textClasses>[0] = {},
  tag: string = "p",
): string {
  const classes = textClasses(options)
  return `<${tag} class="${classes}">${text}</${tag}>`
}

describe("text accessibility", () => {
  it("renders in a semantic element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTextHTML("Hello world")}</body>`)
    const el = dom.window.document.querySelector("p")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("P")
  })

  it("has readable text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTextHTML("Some readable content")}</body>`,
    )
    const el = dom.window.document.querySelector("p")
    expect(el?.textContent).toBe("Some readable content")
  })

  it("works with span element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTextHTML("Inline text", {}, "span")}</body>`,
    )
    const el = dom.window.document.querySelector("span")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Inline text")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTextHTML("Styled", { size: "lg", weight: "bold" })}</body>`,
    )
    const el = dom.window.document.querySelector("p")
    expect(el?.classList.contains("pm-text")).toBe(true)
    expect(el?.classList.contains("pm-text--size-lg")).toBe(true)
  })
})
