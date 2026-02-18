import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { proseClasses } from "./prose.classes.js"

function createProseHTML(
  text: string,
  options: Parameters<typeof proseClasses>[0] = {},
  tag: string = "article",
): string {
  const classes = proseClasses(options)
  return `<${tag} class="${classes}">${text}</${tag}>`
}

describe("prose accessibility", () => {
  it("renders in a semantic article element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createProseHTML("<p>Hello world</p>")}</body>`)
    const el = dom.window.document.querySelector("article")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("ARTICLE")
  })

  it("renders in a div element when used as a generic container", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createProseHTML("<p>Hello world</p>", {}, "div")}</body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("DIV")
  })

  it("has readable text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createProseHTML("Some readable content")}</body>`,
    )
    const el = dom.window.document.querySelector("article")
    expect(el?.textContent).toBe("Some readable content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createProseHTML("Styled prose", { size: "lg" })}</body>`,
    )
    const el = dom.window.document.querySelector("article")
    expect(el?.classList.contains("pm-prose")).toBe(true)
    expect(el?.classList.contains("pm-prose--lg")).toBe(true)
  })
})
